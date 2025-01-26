import { useState } from "react";
import { Area, Button } from "./SortButtons.style";

interface SortButtonProps {
  isNarrow: boolean;
  onSortChange: (sortType: string) => void;
}

const SortButton = ({ isNarrow, onSortChange }: SortButtonProps) => {

  const sortName = ["최신순", "오래된순", "오름차순", "내림차순"];
  const [currentSort, setCurrentSort] = useState(sortName[0]);

  const handleSortChange = (event: React.MouseEvent) => {
    event.stopPropagation();
    const currentIndex = sortName.indexOf(currentSort);
    const nextIndex = (currentIndex + 1) % sortName.length;
    setCurrentSort(sortName[nextIndex]);

    const nextSort = sortName[nextIndex];

    setCurrentSort(nextSort);
    onSortChange(nextSort);
  };

  return (
    <Area className={isNarrow ? "fold" : ""}>
      <Button onClick={handleSortChange}>{currentSort}</Button>
    </Area>
  );
};

export default SortButton;
