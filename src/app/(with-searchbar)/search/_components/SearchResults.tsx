"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import ArticleCard from "../../_components/ArticleComp";
import type { ArtistDataProps } from "../../../../../public/assets/datas/artistData";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("nickname") || "검색어가 없습니다.";

  const [filteredArtists, setFilteredArtists] = useState<ArtistDataProps[] | null>(null);

  useEffect(() => {
    if (!query || query === "검색어가 없습니다.") return;

    const fetchSearchResults = async () => {
      try {
        console.log(`Fetching: /api/searchArtists?nickname=${query}`);
        const response = await fetch(`/api/searchArtists?nickname=${encodeURIComponent(query)}`);

        if (!response.ok) {
          throw new Error("검색 결과가 없습니다.");
        }

        const data: ArtistDataProps[] = await response.json();
        console.log("API 응답:", data);

        // 🔹 nickname을 포함하는 데이터만 필터링
        const filteredData = data.filter((artist) => artist.nickname.includes(query));
        setFilteredArtists(filteredData);
      } catch (error) {
        console.error("API 호출 에러:", error);
        setFilteredArtists([]); // 검색 결과 없을 때 빈 배열 반환
      }
    };

    fetchSearchResults();
  }, [query]); // ✅ nickname(query)이 변경될 때마다 실행

  return (
    <div>
      <h2>검색 결과: {query}</h2>
      {filteredArtists === null ? (
        <p>검색을 시작하세요.</p>
      ) : filteredArtists.length > 0 ? (
        <ArticleCard />
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </div>
  );
}
