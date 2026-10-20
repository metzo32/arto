import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Div,
  Img,
  H3,
  Links,
} from "../_styles/ArticleComp.style";
import WishList from "../../../components/Wishlist/WishList";
import type { ArtistDataProps } from "../../../../public/assets/datas/artistData";

interface ArtistCardProps {
  list: ArtistDataProps[];
  toggleWishlist: (id: number) => void;
}

const TRANSITION_MS = 350;

function getInitialIndex() {
  const stored = localStorage.getItem("lastestId");
  if (!stored) return 0;
  const n = Number(stored) - 1;
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

export const ArtistCards = ({ list, toggleWishlist }: ArtistCardProps) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("nickname") || ""; // 쿼리 유무로 루트페이지 & 검색페이지 구분

  const [currIndex, setCurrIndex] = useState(query ? 0 : getInitialIndex());
  const containerRef = useRef<HTMLDivElement>(null);
  const currIndexRef = useRef(currIndex);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY === 0) return;
      if (isAnimatingRef.current) return;
      const next =
        e.deltaY > 0 ? currIndexRef.current + 1 : currIndexRef.current - 1;

      const nextIndex = Math.max(0, Math.min(list.length - 1, next));
      if (nextIndex === currIndexRef.current) return;
      isAnimatingRef.current = true;
      setCurrIndex(nextIndex);
      setTimeout(() => {
        isAnimatingRef.current = false;
      }, TRANSITION_MS);
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [list.length]);

  useEffect(() => {
    currIndexRef.current = currIndex;

    for (let offset = 3; offset <= 4; offset++) {
      const target = currIndex + offset;
      if (target >= list.length) break;
      const img = new Image();
      img.src = list[target].mainImage;
    }

    if (!query) {
      localStorage.setItem("lastestId", (currIndex + 1).toString());
    }
  }, [currIndex, list]);

  const start = Math.max(0, currIndex - 2);
  const end = Math.min(list.length, currIndex + 3);
  const slicedList = list.slice(start, end);

  return (
    <div ref={containerRef}>
      {slicedList.map((item, i) => {
        const originalIndex = start + i;
        const transform =
          originalIndex <= currIndex ? "translateY(0)" : "translateY(100vh)";
        const isHighPriority =
          originalIndex === currIndex || originalIndex === currIndex + 1;

        return (
          <Links
            key={item.id}
            href={`/detail/${item.nickname}`}
            className="article-cards"
            style={{ zIndex: i, transform }}
          >
              <Img
                src={item.mainImage}
                alt={`${item.nickname}`}
                className="article-random-image"
                fetchPriority={isHighPriority ? "high" : "low"}
                loading={isHighPriority ? "eager" : "lazy"}
                width={500}
                height={200}
                decoding="async"
                draggable="false"
              />
              {/* <Div className="title-container">
                <WishList
                artistId={item.id}
                isWishlisted={!!item.isWishlisted}
                onToggleWishlist={() => toggleWishlist(item.id)}
                artistNickname={item.nickname}
                artistmainImage={item.mainImage}
                artistStreet={item.street_address}
                artistCity={item.city}
                artistSkills={item.skills.map((skill) => skill.id)}
                />
                <H3 className="article-name">{item.nickname}</H3>
                // </Div> */}
          </Links>
        )
      })}
    </div>
  );
};
