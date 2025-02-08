import { ArtistDataProps } from "../../pages/api/artists";

interface SortButtonsProps {
  sortBefore: ArtistDataProps[];
  sortHandle: (sortedArray: ArtistDataProps[]) => void;
}

export default function SortButtons({
  sortBefore,
  sortHandle,
}: SortButtonsProps) {


  const handleSortAlphabet = () => {
    const sorted = [...sortBefore].sort((a, b) =>
      a.nickname.localeCompare(b.nickname)
    );
    sortHandle(sorted);
  };

  const handleSortAlphabetReverse = () => {
    const sorted = [...sortBefore].sort((a, b) =>
      b.nickname.localeCompare(a.nickname)
    );
    sortHandle(sorted);
  };

  const handleSortOld = () => {
    const sorted = [...sortBefore].sort((a, b) => a.id - b.id);
    sortHandle(sorted);
  };

  const handleSortNew = () => {
    const sorted = [...sortBefore].sort((a, b) => b.id - a.id);
    sortHandle(sorted);
  };


  return (
    <>
      <ul className={`dropdown-box ${"open-drop-left"}`}>
        <li className="dropdown-li">
          <button className="dropdown-btn" onClick={handleSortAlphabet}>
            오름차순
          </button>
        </li>
        <li className="dropdown-li">
          <button
            className="dropdown-btn"
            onClick={handleSortAlphabetReverse}
          >
            내림차순
          </button>
        </li>
        <li className="dropdown-li">
          <button className="dropdown-btn" onClick={handleSortNew}>
            신규순
          </button>
        </li>
        <li className="dropdown-li">
          <button className="dropdown-btn" onClick={handleSortOld}>
            오래된순
          </button>
        </li>
        <button className="sort-menu-close">
          {/* <s.RemoveIcon /> */}
          제거 아이콘
        </button>
      </ul>

      <button className="sort-btn">
        정렬아이콘
        {/* <s.SortIcon /> */}
        {/* {isScrolled ? (
          <s.TopArrowIcon onClick={handleScrollToTop} />
        ) : (
          <s.SortIcon onClick={handleDropLeft} />
        )} */}
      </button>
    </>
  );
}
