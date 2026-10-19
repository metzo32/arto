import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UseIsSidebarFoldedProps {
  folded: boolean;
  foldAction: () => void;
}

export const useIsSidebarFolded = create<UseIsSidebarFoldedProps>()(
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
      name: "Sidebar-folded",  //로컬스토리지에 저장될 키 이름
    }
  )
);
