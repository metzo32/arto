import { doc, getDoc, updateDoc } from "firebase/firestore";
import { IconLine, IconClicked, IconHover, Span } from "./Wishlist.style";
import { useState, useEffect } from "react";
import { auth, db } from "../../firebase/firebaseConfig";
import { getSkillsByIds } from "../../assets/datas/artitstData"; // getSkillsByIds 함수 가져오기
import { useModal } from "../../hooks/useModal";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";

interface WishListProps {
  artistId: number;
  artistNickname: string;
  artistmainImage: string;
  artistSkills: number[]; // skill ID 배열로 변경
  isWishlisted: boolean;
  onToggleWishlist: () => void;
}
const WishList = ({
  artistId,
  artistNickname,
  artistmainImage,
  artistSkills,
  isWishlisted,
  onToggleWishlist,
}: WishListProps) => {
  const { isModalOpen, modalTitle, modalContent, openModal, closeModal } =
    useModal();
  const [isClicked, setIsClicked] = useState<boolean>(isWishlisted);
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {     //onAuthStateChanged: 사용자 인증상태가 바뀔 때마다 실행
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setIsClicked(false); // 로그아웃 시 하트 초기화
        return;
      } else {
        const userRef = doc(db, "users", user.uid); // db중 users 항목에서 uid문서 참조
        try {
          const userDoc = await getDoc(userRef); // 참조문서 가져오기
          const currentWishlist = userDoc.data()?.wishList || []; //참조문서 중 wishlist배열
          const isAlreadyWishlisted = currentWishlist.some(
            // 배열 중 하나라도 만족하면 true
            (item: { id: number }) => item.id === artistId
          );
          setIsClicked(isAlreadyWishlisted);
        } catch (error) {
          console.error("위시리스트 임포트 에러:", error);
        }
      }
    });

    return () => unsubscribe(); // 클린업. 컴포넌트 언마운트 시 unsubscribe
  }, [artistId]);

  const handleWishlistToggle = async () => {
    const user = auth.currentUser; //현재 로그인된 사용자
    if (!user) {
      openModal("잠깐!", "로그인이 필요한 서비스입니다.")
      return;
    }

    const userRef = doc(db, "users", user.uid);
    const maxWishlistSize = 100;

    try {
      const userDoc = await getDoc(userRef);
      const currentWishlist = userDoc.data()?.wishList || [];

      let updatedWishlist;

      if (isClicked) {
        updatedWishlist = currentWishlist.filter(
          (item: { id: number }) => item.id !== artistId
        );
      } else {
        const newWishlistItem = {
          id: artistId,
          nickname: artistNickname,
          randomImage: artistmainImage,
          skills: artistSkills, // skill ID 배열 저장
        };

        updatedWishlist = [newWishlistItem, ...currentWishlist];

        if (updatedWishlist.length > maxWishlistSize) {
          updatedWishlist = updatedWishlist.slice(0, maxWishlistSize);
        }
      }

      await updateDoc(userRef, { wishList: updatedWishlist });
      setIsClicked(!isClicked);
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
    if (isClicked) {
      return <IconClicked />;
    } else if (hovered) {
      return <IconHover />;
    } else {
      return <IconLine />;
    }
  };

  const handleNavigation = () => {
    navigate("/login")
  }

  // `artistSkills`를 `getSkillsByIds`를 통해 변환
  const skillComponents = getSkillsByIds(artistSkills);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={handleNavigation}
        title={modalTitle}
        content={modalContent}
        primBtnText="로그인하기"
        isOptionOn={true}
        onSecClose={closeModal}
      />
      <Span
        onMouseOver={handleMouseEnter}
        onMouseOut={handleMouseLeave}
        onClick={handleMouseClick}
        onTouchStart={handleTouchStart}
      >
        {renderIcon()}
      </Span>
    </>
  );
};

export default WishList;
