import { useState } from "react";
import ArticleCard from "../components/Article.page.component/ArticleCard";
import SortButton from "../components/Sort/SortButton";
import ScrollToTbutton from "../components/ScrollToTopButton/ScrollToTopButton";
import StartFromTop from "../components/StartFromTop";

export default function Article({ isNarrow }: { isNarrow: boolean }) {
  const [currentSort, setCurrentSort] = useState<string>("최신순");

  const handleSortChange = (sortType: string) => {
    setCurrentSort(sortType);
  };

  return (
    <div className="Test">
      <StartFromTop/>
      {/* <ScrollToTbutton /> */}
      <SortButton isNarrow={isNarrow} onSortChange={handleSortChange} />
      <ArticleCard currentSort={currentSort} />
    </div>
  );
}
