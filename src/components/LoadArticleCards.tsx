import { useState, useEffect, useRef } from "react";
import s from "../stores/styling";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import ArtistData from "../assets/datas/artitst_data";
import WishList from "../components/WishList";
import SortButtons from "../components/SortButtons";
import ScrollToTopButton from "./ScrollToTopButton";
import { getRandomImage } from "../assets/datas/getRandomImages";
import StartFromTop from "../components/StartFromTop";

const LoadArticleCards = () => {
  const [articles, setArticles] = useState<number[]>([0, 1, 2, 3]);
  const [sortedData, setSortedData] = useState(
    ArtistData.map((artist) => ({
      ...artist,
      randomImage: getRandomImage(),
    }))
  );
  const loaderRef = useRef<HTMLDivElement | null>(null); // 로더 요소를 참조할 ref 생성
  const count = 4; // 한 번에 추가할 카드 수

  // 무한 스크롤
  const addArticles = () => {
    const newArticles = Array.from({ length: count }, (_, i) => articles.length + i);
    setArticles((prevArticles) => [...prevArticles, ...newArticles]);
  };

  // IntersectionObserver 설정
  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          addArticles(); // 로더가 뷰포트에 들어오면 새 카드 추가
        }
      });
    });

    observer.observe(loader);

    return () => {
      if (loader) {
        observer.unobserve(loader);
      }
    };
  }, [loaderRef, articles]);

  // 위시리스트 관련 함수
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

  const handleCardRedirect = (nickname: string) => {
    const url = `/profile_artist_${nickname}`;
    if (url) {
      window.location.href = url;
    } else {
      console.error("URL 찾을 수 없음");
    }
  };

  const handleSort = (sortedArray: typeof ArtistData) => {
    const sortedWithImages = sortedArray.map((artist) => ({
      ...artist,
      randomImage: getRandomImage(),
    }));
    setSortedData(sortedWithImages);
  };

  const toggleWishlist = (artistId: number) => {
    setSortedData((prevData) =>
      prevData.map((artist) =>
        artist.id === artistId
          ? { ...artist, isWishlisted: !artist.isWishlisted }
          : artist
      )
    );
  };

  return (
    <>
      <StartFromTop />
      <s.ArticleDiv className="article-wrapper">
        
        <SortButtons sortBefore={sortedData} sortHandle={handleSort} />
        <ScrollToTopButton/>

        <s.ArticleDiv className="article-card-wrapper">
          {articles.map((index) => {
            const artist = sortedData[index];
            if (!artist) return null;

            return (
              <s.ArticleDiv
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
                />
   
                  <s.Image
                    src={artist.randomImage}
                    alt={`${artist.nickname}`}
                    className="article-random-image"
                  />
          
                <s.StyledH1 className="article-name">{artist.nickname}</s.StyledH1>
              </s.ArticleDiv>
            );
          })}

          <s.ArticleDiv ref={loaderRef} className="loader">
            Loading more...
          </s.ArticleDiv>
        </s.ArticleDiv>
      </s.ArticleDiv>
    </>
  );
};

export default LoadArticleCards;
