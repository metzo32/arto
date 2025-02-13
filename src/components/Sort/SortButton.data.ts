import type { ArtistDataProps } from "../../../public/assets/datas/artistData";

const handleSortAlphabet = (data: ArtistDataProps[]) =>
  [...data].sort((a, b) => a.nickname.localeCompare(b.nickname));

const handleSortAlphabetReverse = (data: ArtistDataProps[]) =>
  [...data].sort((a, b) => b.nickname.localeCompare(a.nickname));

const handleSortOld = (data: ArtistDataProps[]) =>
  [...data].sort((a, b) => a.id - b.id);

const handleSortNew = (data: ArtistDataProps[]) =>
  [...data].sort((a, b) => b.id - a.id);

export const sortButtonsData = [
  { id: "alphabet", name: "오름차순", logic: handleSortAlphabet },
  { id: "alphabetReverse", name: "내림차순", logic: handleSortAlphabetReverse },
  { id: "old", name: "오래된순", logic: handleSortOld },
  { id: "new", name: "최신순", logic: handleSortNew },
];
