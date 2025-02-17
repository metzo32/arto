"use client";

import { useEffect, useState } from "react";
import { Area, Button } from "./SortButtons.style";
import { usefilteredLength } from "../../stores/states/filteredDataLength";
import { useIsHeaderFolded } from "../../stores/states/isHeaderFolded";
import useSort from "../../stores/states/sortOption";

const sortName = ["최신순", "오래된순", "오름차순", "내림차순"];

export default function SortButton() {
  const { sort, setSort } = useSort();
  const { length } = usefilteredLength();
  const { folded } = useIsHeaderFolded();
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    setIsMount(true);
  }, []);

  const handleScrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleSortChange = (event: React.MouseEvent) => {
    event.stopPropagation();

    const currentIndex = sortName.indexOf(sort);
    const nextIndex = (currentIndex + 1) % sortName.length;
    const nextSort = sortName[nextIndex];

    setSort(nextSort);
    handleScrollToTop();
  };

  return length > 1 ? (
    <Area className={`${folded ? "fold" : "unfold"}`}>
      <Button onClick={handleSortChange}>{sort}</Button>
    </Area>
  ) : null;
}
