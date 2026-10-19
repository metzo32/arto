"use client";

import { useEffect, useState } from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Div } from "../../../components/Article.page.component/ArticleComp.style";
import type { ArtistDataProps } from "../../../../public/assets/datas/artistData";
import { usefilteredLength } from "../../../stores/states/filteredDataLength";
import useLoading from "../../../hooks/useLoading";
import { ArtistCard } from "../../../components/Article.page.component/Card";
import NoResult from "../../../components/Article.page.component/no-result";

export default function SeachComp() {
  const searchParams = useSearchParams();
  const query = searchParams.get("nickname") || "";

  const [artists, setAllArtists] = useState<ArtistDataProps[]>([]);
  const [filteredArtists, setFilteredArtists] = useState<ArtistDataProps[]>([]);
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    usefilteredLength.setState({ length: artists.length });
  }, [artists]);

  useEffect(() => {
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
      <Div className="wrapper">
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
  );
}
