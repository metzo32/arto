"use client";

import { useEffect, useState } from "react";
import { Area, Button } from "./SortButtons.style";
import { usefilteredLength } from "../../stores/states/filteredDataLength";
import { useIsHeaderFolded } from "../../stores/states/isHeaderFolded";

interface SortButtonProps {
  onSortChange: (sortType: string) => void;
}

const SortButton = ({ onSortChange }: SortButtonProps) => {
  const { length } = usefilteredLength();
  const sortName = ["최신순", "오래된순", "오름차순", "내림차순"];
  const [currentSort, setCurrentSort] = useState(sortName[0]);
  const [isMount, setIsMount] = useState(false)
  const { folded } = useIsHeaderFolded();

  useEffect(()=>{
    setIsMount(true)
  },[])

  const handleScrollToTop = () => {
    if (typeof window !== "undefined")
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  const handleSortChange = (event: React.MouseEvent) => {
    event.stopPropagation();
    const currentIndex = sortName.indexOf(currentSort);
    const nextIndex = (currentIndex + 1) % sortName.length;
    setCurrentSort(sortName[nextIndex]);

    const nextSort = sortName[nextIndex];

    setCurrentSort(nextSort);
    onSortChange(nextSort);
    handleScrollToTop();
  };

  return length > 1 ? (
    <Area className={`${folded ? "fold" : "unfold"}`}>
      <Button onClick={handleSortChange}>{currentSort}</Button>
    </Area>
  ) : null;
};


export default SortButton;
