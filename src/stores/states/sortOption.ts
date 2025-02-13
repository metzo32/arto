import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ArtistDataProps } from "../../../public/assets/datas/artistData";

interface UseSortProps {
  sort: string;
  setSort: (sort: string) => void;
  sortedArtists: (artists: ArtistDataProps[]) => ArtistDataProps[];
}

const useSort = create<UseSortProps>()(
  persist(
    (set, get) => ({
      sort: "최신순",
      setSort: (sort) => set({ sort }),

      sortedArtists: (artists) => {
        const { sort } = get();

        return [...artists].sort((a, b) => {
          switch (sort) {
            case "최신순":
              return b.id - a.id;
            case "오래된순":
              return a.id - b.id;
            case "오름차순":
              return a.nickname.localeCompare(b.nickname);
            case "내림차순":
              return b.nickname.localeCompare(a.nickname);
            default:
              return 0;
          }
        });
      },
    }),
    {
      name: "sort-storage",
    }
  )
);

export default useSort;
