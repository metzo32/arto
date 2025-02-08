"use client";

import { useState, useEffect, useRef } from "react";
import type { ArtistDataProps } from "../../pages/api/artists";
import { Div, Img, H3, H4, Links } from "./ArticleCard.style";
import artistdata from "../../../public/assets/datas/artitstData";
import { auth, db } from "../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import WishList from "../Wishlist/WishList";
import SearchBar from "./SearchBar";
import { usefilteredLength } from "../../stores/states/filteredDataLength";
import useLoading from "../../hooks/useLoading";
import { BaseButton } from "../../../public/assets/design-assets/BaseButton/BaseButton";

interface ArticleCardProps {
  currentSort: string;
}

export default function ArticleCard({ currentSort }: ArticleCardProps) {
  const [artists, setArtists] = useState<ArtistDataProps[]>([]);
  const [cards, setCards] = useState<number[]>([0, 1, 2, 3]);
  const [sortedData, setSortedData] = useState(
    artistdata.map((artist) => ({
      ...artist,
    }))
  );
  const [searchResult, setSearchResult] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);
  const  { isLoading, setIsLoading, loadingProgress} = useLoading();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch("/api/artists"); // 클라이언트에서 API 호출
        const data = await response.json();
        setArtists(data);
      } catch (error) {
        console.error("Error fetching artist data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArtists();
  }, []);


  const handleSearch = (query: string) => {
    setSearchResult(query); // 저장된 쿼리를 기반으로 결과를 필터링
  };

  const filteredData = sortedData.filter((artist) =>
    artist.nickname.toLowerCase().includes(searchResult.toLowerCase())
  );

  useEffect(() => {
    usefilteredLength.setState({ length: filteredData.length });
  }, [filteredData]);

  const loaderRef = useRef<HTMLDivElement | null>(null); // 로더 요소를 참조할 ref 생성
  const count = 4; // 한 번에 추가할 카드 수

  // 무한 스크롤

  // IntersectionObserver 설정
  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    const addCards = () => {
      const newArticles = Array.from(
        { length: count },
        (_, i) => cards.length + i
      );
      setCards((prevArticles) => [...prevArticles, ...newArticles]);
    };
  

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          addCards(); // 로더가 뷰포트에 들어오면 새 카드 추가
        }
      });
    });

    observer.observe(loader);

    return () => {
      if (loader) {
        observer.unobserve(loader);
      }
    };
  }, [loaderRef, cards]);

  useEffect(() => {
    const sortData = () => {
      let sorted;
      switch (currentSort) {
        case "최신순":
          sorted = [...artistdata].sort((a, b) => b.id - a.id);
          break;
        case "오래된순":
          sorted = [...artistdata].sort((a, b) => a.id - b.id);
          break;
        case "오름차순":
          sorted = [...artistdata].sort((a, b) =>
            a.nickname.localeCompare(b.nickname)
          );
          break;
        case "내림차순":
          sorted = [...artistdata].sort((a, b) =>
            b.nickname.localeCompare(a.nickname)
          );
          break;
        default:
          sorted = artistdata;
      }
      setSortedData(sorted);
    };
    sortData();
  }, [currentSort]);

  // 위시리스트
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
    setSearchResult(""); // 검색어 초기화
    setCards([0, 1, 2, 3]); // 초기 카드 리스트로 복원
  };

  return (
    <>
      <Div
        suppressHydrationWarning={true}
        className={`${isMounted ? "wrapper" : "default"}`}
      >
        <SearchBar onSearch={handleSearch} onReset={handleReset} />
        <Div>
          {filteredData.length > 0 ? (
            filteredData.slice(0, cards.length).map((artist) => (
              <Links
                href={`/profile_artist/${artist.nickname}`}
                key={artist.id}
              >
                <Div
                  className="article-cards"
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
            ))
          ) : (
            <Div className="no-result">
              <H4>결과가 없습니다.</H4>
              <BaseButton type="button" text="전체보기" onClick={handleReset} />
            </Div>
          )}
        </Div>
        {filteredData.length > cards.length && (
          <Div ref={loaderRef} className="loader">
            Loading more cards...
          </Div>
        )}
      </Div>
    </>
  );
}
