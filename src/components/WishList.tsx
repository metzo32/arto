import { doc, getDoc, updateDoc } from "firebase/firestore";
import s from "../stores/styling";
import { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebaseConfig";

interface WishListProps {
  artistId: number;
  artistNickname: string;
  artistRandomImage: string;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
}

const WishList = ({
  artistId,
  artistNickname,
  artistRandomImage,
  isWishlisted,
  onToggleWishlist,
}: WishListProps) => {
  const [wishButton, setWishButton] = useState<boolean>(isWishlisted);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setWishButton(false); // 로그아웃 시 상태 초기화
      } else {
        const userRef = doc(db, "users", user.uid);
        try {
          const userDoc = await getDoc(userRef);
          const currentWishlist = userDoc.data()?.wishList || [];
          const isAlreadyWishlisted = currentWishlist.some(
            //배열 중 하나라도 만족하면 true
            (item: { id: number }) => item.id === artistId
          );
          setWishButton(isAlreadyWishlisted);
        } catch (error) {
          console.error("위시리스트 임포트 에러:", error);
        }
      }
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 unsubscribe
  }, [artistId]);

  const handleWishlistToggle = async () => {
    const user = auth.currentUser;
    if (!user) {
      console.error("로그인이 필요합니다.");
      return;
    }

    const userRef = doc(db, "users", user.uid);
    const maxWishlistSize = 100;

    try {
      const userDoc = await getDoc(userRef);
      const currentWishlist = userDoc.data()?.wishList || [];

      let updatedWishlist;

      if (wishButton) {
        updatedWishlist = currentWishlist.filter(
          (item: { id: number }) => item.id !== artistId
        );
      } else {
        const newWishlistItem = {
          id: artistId,
          nickname: artistNickname,
          randomImage: artistRandomImage,
        };

        updatedWishlist = [newWishlistItem, ...currentWishlist];

        if (updatedWishlist.length > maxWishlistSize) {
          updatedWishlist = updatedWishlist.slice(0, maxWishlistSize);
        }
      }

      await updateDoc(userRef, { wishList: updatedWishlist });
      setWishButton(!wishButton);
      onToggleWishlist();
    } catch (error) {
      console.error("위시리스트 업데이트 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    setHovered(false); // 상태 변경 시 hover 상태 초기화
  }, [isWishlisted]);

  const handleMouseClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    handleWishlistToggle();
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    event.stopPropagation();
    handleWishlistToggle();
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const renderIcon = () => {
    if (wishButton) {
      return <s.WishIconClicked />;
    } else if (hovered) {
      return <s.WishIconHover />;
    } else {
      return <s.WishIconLine />;
    }
  };

  return (
    <s.ArticleDiv
      className="heart-wrapper"
      onMouseOver={handleMouseEnter}
      onMouseOut={handleMouseLeave}
      onClick={handleMouseClick}
      onTouchStart={handleTouchStart}
    >
      {renderIcon()}
    </s.ArticleDiv>
  );
};

export default WishList;
