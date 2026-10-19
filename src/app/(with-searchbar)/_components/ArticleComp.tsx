"use client";

import { useState, useEffect, useContext } from "react";
import { Div } from "../_styles/ArticleComp.style";
import type { ArtistDataProps } from "../../../../public/assets/datas/artistData";
import { AuthContext } from "../../../context/AuthContext";
import { auth, db } from "../../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { usefilteredLength } from "../../../stores/states/filteredDataLength";
import useSort from "../../../stores/states/sortOption";
import useLoading from "../../../hooks/useLoading";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { ArtistCards } from "./ArtistCards";
import NoResult from "./no-result";

interface ArticleCompProps {
  artists?: ArtistDataProps[];
}

export default function ArticleComp({ artists }: ArticleCompProps) {
  const [allArtists, setAllArtists] = useState<ArtistDataProps[]>([]);
  const { currentlyLoggedIn } = useContext(AuthContext);
  const { sortedArtists } = useSort();

  useEffect(() => {
    const fetchArtists = async () => {
      if (artists) return;
      try {
        const response = await fetch(`/api/aristsList`, {});
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setAllArtists(data);
      } catch (error) {
        console.error("Error fetching artist data:", error);
      } finally {
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
    <Div className="wrapper">
      {sortedData.length > 0 ? (
        <ArtistCards
          list={sortedData}
          toggleWishlist={toggleWishlist}
        />
      ) : (
        <NoResult />
        // TODO loading 상태 추가
      )}
    </Div>
  );
}
