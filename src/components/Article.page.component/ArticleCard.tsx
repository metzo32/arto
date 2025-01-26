import { Div, Img, H3 } from "./ArticleCard.style";
import { useState, useEffect, useRef } from "react";
import artistdata from "../../assets/datas/artitstData";
import { auth, db } from "../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import WishList from "../Wishlist/WishList";
import SearchBar from "./SearchBar";

interface ArticleCardProps {
  currentSort: string;
}

export default function ArticleCard({ currentSort }: ArticleCardProps) {
  const [cards, setCards] = useState<number[]>([0, 1, 2, 3]);
  const [sortedData, setSortedData] = useState(
    artistdata.map((artist) => ({
      ...artist,
    }))
  );
  const [searchResult, setSearchResult] = useState<string>("");

  const handleSearch = (query: string) => {
    console.log("검색 실행:", query);
    setSearchResult(query); // 결과를 상태로 저장하거나 API 요청을 실행
  };

  const loaderRef = useRef<HTMLDivElement | null>(null); // 로더 요소를 참조할 ref 생성
  const count = 4; // 한 번에 추가할 카드 수

  useEffect(() => {
    const sortData = () => {
      let sorted;
      switch (currentSort) {
        case "최신순":
          sorted = [...artistdata].sort((a, b) => b.id - a.id); 
          break;
        case "오래된순":
          sorted = [...artistdata].sort((a, b) => a.id - b.id); 
          break;
        case "오름차순":
          sorted = [...artistdata].sort((a, b) =>
            a.nickname.localeCompare(b.nickname)
          ); 
          break;
        case "내림차순":
          sorted = [...artistdata].sort((a, b) =>
            b.nickname.localeCompare(a.nickname)
          ); 
          break;
        default:
          sorted = artistdata;
      }
      setSortedData(sorted);
    };
    sortData();
  }, [currentSort]);

  // 무한 스크롤
  const addCards = () => {
    const newArticles = Array.from(
      { length: count },
      (_, i) => cards.length + i
    );
    setCards((prevArticles) => [...prevArticles, ...newArticles]);
  };

  // IntersectionObserver 설정
  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          addCards(); // 로더가 뷰포트에 들어오면 새 카드 추가
        }
      });
    });

    observer.observe(loader);

    return () => {
      if (loader) {
        observer.unobserve(loader);
      }
    };
  }, [loaderRef, cards]);

  // 위시리스트
  useEffect(() => {
    const fetchWishlist = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const wishlistedIds = userDoc.data()?.wishList || [];
          setSortedData((prevData) =>
            prevData.map((artist) => ({
              ...artist,
              isWishlisted: wishlistedIds.includes(artist.id),
            }))
          );
        }
      }
    };
    fetchWishlist();
  }, []);

  const toggleWishlist = (artistId: number) => {
    setSortedData((prevData) =>
      prevData.map((artist) =>
        artist.id === artistId
          ? { ...artist, isWishlisted: !artist.isWishlisted }
          : artist
      )
    );
  };

  const handleCardRedirect = (nickname: string) => {
    const url = `/profile_artist_${nickname}`;
    if (url) {
      window.location.href = url;
    } else {
      console.error("URL 찾을 수 없음");
    }
  };

  return (
    <>
      <Div className="wrapper">
        <SearchBar onSearch={handleSearch} />
        <Div className="article-card-wrapper">
          {cards.map((index) => {
            const artist = sortedData[index];
            if (!artist) return null;
            return (
              <Div
                key={artist.id}
                className="article-cards"
                onClick={() => handleCardRedirect(artist.nickname)}
              >
                <WishList
                  artistId={artist.id}
                  isWishlisted={!!artist.isWishlisted}
                  onToggleWishlist={() => toggleWishlist(artist.id)}
                  artistNickname={artist.nickname}
                  artistRandomImage={artist.randomImage}
                  artistSkills={artist.skills.map((skill) => skill.id)} // ID 배열로 전달
                />

                <Img
                  src={artist.randomImage}
                  alt={`${artist.nickname}`}
                  className="article-random-image"
                />

                <H3 className="article-name">{artist.nickname}</H3>
              </Div>
            );
          })}
          <Div ref={loaderRef} className="loader">
            Loading more...
          </Div>
        </Div>
      </Div>
    </>
  );
}
