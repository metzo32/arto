"use client";

import { useEffect, useState } from "react";
import useLoading from "../../../../hooks/useLoading";
import { useSearchParams } from "next/navigation";
import { usefilteredLength } from "../../../../stores/states/filteredDataLength";
import { Div } from "../../_styles/ArticleComp.style";
import { ArtistCards } from "../../_components/ArtistCards";
import NoResult from "../../_components/no-result";
import type { ArtistDataProps } from "../../../../../public/assets/datas/artistData";

export default function SearchComp() {
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
        `/api/search?nickname=${encodeURIComponent(nickname)}`
      );
      const data = await response.json();
      console.log("응답", data)

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
        <ArtistCards
          list={filteredArtists}
          toggleWishlist={toggleWishlist}
        />
      ) : (
        <NoResult />
      )}
    </Div>
  );
}
