"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Div } from "../../../components/Article.page.component/ArticleComp.style";
import type { ArtistDataProps } from "../../../../public/assets/datas/artistData";
import { usefilteredLength } from "../../../stores/states/filteredDataLength";
import useLoading from "../../../hooks/useLoading";
import { ArtistCard } from "../../../components/Article.page.component/Card";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import NoResult from "../../../components/Article.page.component/no-result";

export default function SearchComp() {
  const searchParams = useSearchParams();
  const query = searchParams.get("nickname") || "";

  const [isMounted, setIsMounted] = useState(false);
  const [artists, setAllArtists] = useState<ArtistDataProps[]>([]);
  const [filteredArtists, setFilteredArtists] = useState<ArtistDataProps[]>([]);
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    usefilteredLength.setState({ length: artists.length });
  }, [artists]);

  useEffect(() => {
    setIsMounted(true);
    if (query) {
      fetchArtists(query);
    }
  }, [query]);

  const fetchArtists = async (nickname: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/searchArtists?nickname=${encodeURIComponent(nickname)}`
      );
      const data = await response.json();

      if (response.ok) {
        setFilteredArtists(data);
      } else {
        setFilteredArtists([]); 
      }
    } catch (error) {
      console.error("아티스트 검색 오류:", error);
      setFilteredArtists([]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleWishlist = (artistId: number) => {
    setAllArtists((prev) =>
      prev.map((artist) =>
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
            {filteredArtists.length > 0 ? (
              filteredArtists.map((artist, index) => (
                <ArtistCard
                  key={index}
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
