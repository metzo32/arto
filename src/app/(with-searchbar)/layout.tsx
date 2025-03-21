"use client";

import { ReactNode, useState } from "react";
import SearchBarComp from "../../components/SearchBar/SearchBar";
import SortButton from "../../components/Sort/SortButton";

export default function Layout({ children }: { children: ReactNode }) {
  const [currentSort, setCurrentSort] = useState<string>("최신순");

  const handleSortChange = (sortType: string) => {
    setCurrentSort(sortType);
  };

  return (
    <>
      <SearchBarComp />
      <SortButton />
      {children}
    </>
  );
}
