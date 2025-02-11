"use client";

import { useState, useEffect, useRef, useContext } from "react";
import { Div, Img, H3, H4, Links } from "./ArticleCard.style";
import type { ArtistDataProps } from "../../pages/api/artists";
import { AuthContext } from "../../context/AuthContext";
import { auth, db } from "../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import WishList from "../Wishlist/WishList";
import SearchBar from "./SearchBar";
import { usefilteredLength } from "../../stores/states/filteredDataLength";
import useLoading from "../../hooks/useLoading";
import { BaseButton } from "../../../public/assets/design-assets/BaseButton/BaseButton";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

interface ArticleCardProps {
  currentSort: string;
}

export default function ArticleCard({ currentSort }: ArticleCardProps) {
  const [page, setPage] = useState(0);
  const [artists, setArtists] = useState<ArtistDataProps[]>([]);
  const [sortedData, setSortedData] = useState<ArtistDataProps[]>([]);
  const [searchResult, setSearchResult] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);
  const { isLoading, setIsLoading } = useLoading();
  const { currentlyLoggedIn } = useContext(AuthContext);

  const itemsPerPage = 8;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchArtists = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/artists`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
    
        //전체 데이터를 한 번만 저장
        if (page === 0) {
          setArtists(data);
        }
    
        const startIdx = page * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        const newItems = data.slice(startIdx, endIdx);
    
        if (newItems.length === 0) return;
    
        setSortedData((prev) => [...prev, ...newItems]);
    
        console.log(`총 데이터 개수: ${sortedData.length + newItems.length}`);
      } catch (error) {
        console.error("Error fetching artist data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    
    fetchArtists();
  }, [page]);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!lastItemRef.current || sortedData.length === 0 || isLoading) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    observerRef.current.observe(lastItemRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [sortedData, isLoading]);

  useEffect(() => {
    if (!currentlyLoggedIn) {
      setSortedData((prevData) =>
        prevData.map((artist) => ({
          ...artist,
          isWishlisted: false,
        }))
      );
    }
  }, [currentlyLoggedIn]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const wishlistedIds = userDoc.data()?.wishList || [];
          setSortedData((prevData) =>
            prevData.map((artist) => ({
              ...artist,
              isWishlisted: wishlistedIds.includes(artist.id),
            }))
          );
        }
      }
    };
    fetchWishlist();
  }, []);

  const handleSearch = (query: string) => {
    setSearchResult(query);
  };

  const filteredData = sortedData.filter((artist) =>
    artist.nickname.toLowerCase().includes(searchResult.toLowerCase())
  );

  useEffect(() => {
    usefilteredLength.setState({ length: filteredData.length });
  }, [filteredData]);

  useEffect(() => {
    if (artists.length === 0) return;

    const sortData = () => {
      let sorted;
      switch (currentSort) {
        case "최신순":
          sorted = [...artists].sort((a, b) => b.id - a.id);
          break;
        case "오래된순":
          sorted = [...artists].sort((a, b) => a.id - b.id);
          break;
        case "오름차순":
          sorted = [...artists].sort((a, b) =>
            a.nickname.localeCompare(b.nickname)
          );
          break;
        case "내림차순":
          sorted = [...artists].sort((a, b) =>
            b.nickname.localeCompare(a.nickname)
          );
          break;
        default:
          sorted = artists;
      }
      setSortedData(sorted);
    };
    sortData();
  }, [currentSort, artists]);

  const toggleWishlist = (artistId: number) => {
    setSortedData((prevData) =>
      prevData.map((artist) =>
        artist.id === artistId
          ? { ...artist, isWishlisted: !artist.isWishlisted }
          : artist
      )
    );
  };

  const handleReset = () => {
    setSearchResult("");
  };

  return (
    <>
    {isLoading ? (<LoadingSpinner/>) : (
      <Div className={`${isMounted ? "wrapper" : "default"}`}>
        <SearchBar onSearch={handleSearch} onReset={handleReset} />
        <Div>
          {filteredData.length > 0 ? (
            filteredData.map((artist, index) => {
              const isLastItem = index === filteredData.length - 1;
              return (
                <Links
                  href={`/profile_artist/${artist.nickname}`}
                  key={artist.id}
                >
                  <Div
                    className="article-cards"
                    ref={isLastItem ? lastItemRef : null}
                  >
                    <Img
                      src={artist.mainImage}
                      alt={`${artist.nickname}`}
                      className="article-random-image"
                      priority
                    />
                    <Div className="title-container">
                      <WishList
                        artistId={artist.id}
                        isWishlisted={!!artist.isWishlisted}
                        onToggleWishlist={() => toggleWishlist(artist.id)}
                        artistNickname={artist.nickname}
                        artistmainImage={artist.mainImage}
                        artistStreet={artist.street_address}
                        artistCity={artist.city}
                        artistSkills={artist.skills.map((skill) => skill.id)}
                      />
                      <H3 className="article-name">{artist.nickname}</H3>
                    </Div>
                  </Div>
                </Links>
              );
            })
          ) : (
            <Div className="no-result">
              <H4>결과가 없습니다.</H4>
              <BaseButton type="button" text="전체보기" onClick={handleReset} />
            </Div>
          )}
        </Div>
      </Div>
    )}
      
    </>
  );
}
