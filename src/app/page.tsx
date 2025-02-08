"use client";

import { useState } from "react";
import ArticleCard from "../components/Article.page.component/ArticleCard";
import StartFromTop from "../components/StartFromTop";
import SortButton from "../components/Sort/SortButton";

export default function Home() {
  const [currentSort, setCurrentSort] = useState<string>("최신순");

  const handleSortChange = (sortType: string) => {
    setCurrentSort(sortType);
  };

  return (
    <>
      <StartFromTop />
      {/* <ScrollToTbutton /> */}
      <SortButton onSortChange={handleSortChange} />
      <ArticleCard currentSort={currentSort} />
    </>
  );
}
