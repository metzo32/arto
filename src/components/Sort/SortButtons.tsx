import React, { useState, useEffect } from "react";
import s from "../../stores/styling";
import { ArtistDataProps } from "../../assets/datas/artitst_data";

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
      <s.StyledUl className={`dropdown-box ${"open-drop-left"}`}>
        <s.StyledLi className="dropdown-li">
          <s.Button className="dropdown-btn" onClick={handleSortAlphabet}>
            오름차순
          </s.Button>
        </s.StyledLi>
        <s.StyledLi className="dropdown-li">
          <s.Button
            className="dropdown-btn"
            onClick={handleSortAlphabetReverse}
          >
            내림차순
          </s.Button>
        </s.StyledLi>
        <s.StyledLi className="dropdown-li">
          <s.Button className="dropdown-btn" onClick={handleSortNew}>
            신규순
          </s.Button>
        </s.StyledLi>
        <s.StyledLi className="dropdown-li">
          <s.Button className="dropdown-btn" onClick={handleSortOld}>
            오래된순
          </s.Button>
        </s.StyledLi>
        <s.Button className="sort-menu-close">
          <s.RemoveIcon />
        </s.Button>
      </s.StyledUl>

      <s.Button className="sort-btn">
        <s.SortIcon />
        {/* {isScrolled ? (
          <s.TopArrowIcon onClick={handleScrollToTop} />
        ) : (
          <s.SortIcon onClick={handleDropLeft} />
        )} */}
      </s.Button>
    </>
  );
}
