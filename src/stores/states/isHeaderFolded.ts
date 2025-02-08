import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UseIsHeaderFoldedProps {
  folded: boolean;
  foldAction: () => void;
}

export const useIsHeaderFolded = create<UseIsHeaderFoldedProps>()(
  persist(
    (set) => ({
      folded: true,
      foldAction: () =>
        set((state) => {
          const newFoldedState = !state.folded;
          return { folded: newFoldedState };
        }),
    }),
    {
      name: "header-folded",  //로컬스토리지에 저장될 키 이름
    }
  )
);
