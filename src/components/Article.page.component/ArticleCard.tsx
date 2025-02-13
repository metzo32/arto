import { useState, useEffect, useContext } from "react";
import { Div } from "./ArticleCard.style";
import type { ArtistDataProps } from "../../../public/assets/datas/artistData";
import { AuthContext } from "../../context/AuthContext";
import { auth, db } from "../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { usefilteredLength } from "../../stores/states/filteredDataLength";
import useLoading from "../../hooks/useLoading";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { ArtistCard } from "./Card";
import NoResult from "./no-result";
import useSort from "../../stores/states/sortOption";

interface ArticleCardProps {
  artists?: ArtistDataProps[];
}

export default function ArticleCard({ artists }: ArticleCardProps) {
  const [allArtists, setAllArtists] = useState<ArtistDataProps[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const { isLoading, setIsLoading } = useLoading();
  const { currentlyLoggedIn } = useContext(AuthContext);
  const { sortedArtists } = useSort(); 

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchArtists = async () => {
      if (artists) return;
      setIsLoading(false);
      try {
        const response = await fetch(`/api/allArtists`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setAllArtists(data);
      } catch (error) {
        console.error("Error fetching artist data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArtists();
  }, []);

  useEffect(() => {
    if (!currentlyLoggedIn) {
      setAllArtists((prevData) =>
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
          setAllArtists((prevData) =>
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

  const sortedData = sortedArtists(allArtists);

  useEffect(() => {
    usefilteredLength.setState({ length: sortedData.length });
  }, [sortedData]);

  const toggleWishlist = (artistId: number) => {
    setAllArtists((prevData) =>
      prevData.map((artist) =>
        artist.id === artistId
          ? { ...artist, isWishlisted: !artist.isWishlisted }
          : artist
      )
    );
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Div className={`${isMounted ? "wrapper" : "default"}`}>
          <Div>
            {sortedData.length > 0 ? (
              sortedData.map((artist) => (
                <ArtistCard
                  key={artist.id}
                  artist={artist}
                  toggleWishlist={toggleWishlist}
                />
              ))
            ) : (
              <NoResult />
            )}
          </Div>
        </Div>
      )}
    </>
  );
}
