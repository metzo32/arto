"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Section,
  Div,
  H2,
  H3,
  H4,
  H5,
  Links,
  Button,
  Img,
  SmallDiv,
  LargeDiv,
  Span,
  RemoveIcon,
} from "./Profile.style";
import { auth, db } from "../../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import useLoading from "../../hooks/useLoading";
import { useModal } from "../../hooks/useModal";
import Modal from "../Modal/Modal";
import LogoutButton from "../Logout";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import StartFromTop from "../StartFromTop";
import { getSkillsByIds } from "../../../public/assets/datas/artistData";
import RoundButton from "../../../public/assets/design-assets/RoundButton/RoundButton";
import {
  BaseButton,
  SecondaryButton,
} from "../../../public/assets/design-assets/BaseButton/BaseButton";
import ScrollToTopbutton from "../ScrollToTopButton/ScrollToTopButton";
import { IoMdPhonePortrait } from "react-icons/io";
import { FaBirthdayCake } from "react-icons/fa";
import { PiCirclesThreeBold } from "react-icons/pi";
import { FaExpand } from "react-icons/fa";

const ProfileComp = () => {
  /** ✅ 모든 Hook을 최상단에서 호출 */
  const { isModalOpen, modalTitle, modalContent, openModal, closeModal } =
    useModal();
  const { isLoading, setIsLoading, loadingProgress } = useLoading();
  const [userData, setUserData] = useState<any>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(5);
  const [isShowDetail, setIsShowDetail] = useState(true);

  const fetchUserData = useCallback(
    async (uid: string) => {
      setIsLoading(true);
      try {
        const userDocRef = doc(db, "users", uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data);
          setPhotoURL(data.photoURL);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("유저 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
        loadingProgress();
      }
    },
    [setIsLoading, loadingProgress]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user.uid);
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleCardRedirect = (nickname: string) => {
    window.location.href = `/profile_artist/${nickname}`;
  };

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  const groupedWishlist = userData?.wishList
    ? Array.from({ length: Math.ceil(visibleCount / 5) }, (_, i) =>
        userData.wishList.slice(i * 5, i * 5 + 5)
      )
    : [];

  const removeWish = async (artistId: number) => {
    if (!auth.currentUser) {
      openModal("잠깐!", "로그인이 필요합니다.");
      return;
    }

    const userRef = doc(db, "users", auth.currentUser.uid);
    const updatedWishlist = userData.wishList.filter(
      (wish: any) => wish.id !== artistId
    );

    try {
      await updateDoc(userRef, { wishList: updatedWishlist });
      setUserData((prevUserData: any) => ({
        ...prevUserData,
        wishList: updatedWishlist,
      }));
    } catch (error) {
      console.error("위시리스트 업데이트 중 오류 발생:", error);
    }
  };

  const handleShowDetail = () => {
    setIsShowDetail(!isShowDetail);
  };

  const handleFold = () => {
    setVisibleCount(5);
  };

  return (
    <>
      <StartFromTop />
      {isLoading && <LoadingSpinner />}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
        content={modalContent}
      />
      <Div className="container">
        <Section>
          <Div className="name-container">
            <H2 className="name">{userData ? userData.fullname : ""}</H2>
            <H3 className="nickname">{userData ? userData.nickname : ""}</H3>
          </Div>

          <H4>{userData ? userData.email : "사용자 이메일 로드 실패"}</H4>

          <Div className="info-container">
            {userData && (
              <Div className="info-box">
                <IoMdPhonePortrait />
                <H4>
                  +{userData.countryCode} {userData.phonenumber}
                </H4>
              </Div>
            )}

            <Div className="info-box">
              <FaBirthdayCake />

              <H4>
                {userData
                  ? `${userData.birthYear}.${userData.birthMonth}.${userData.birthDay}`
                  : "생일 정보 로드 실패"}
              </H4>
            </Div>
          </Div>
        </Section>

        <Section>
          {userData && (
            <Div className="like-container">
              <Div className="like-num-box">
                <H4 className="liked">{userData.wishList.length}</H4>
                <H4 className="profile-details bold">Likes</H4>
              </Div>
              {userData && userData.wishList.length !== 0 && (
                <Div className="like-align-box">
                  <RoundButton onClick={handleShowDetail}>
                    {isShowDetail ? <PiCirclesThreeBold /> : <FaExpand />}
                  </RoundButton>
                </Div>
              )}

              {visibleCount > 5 && (
                <Div className="like-fold-box">
                  <BaseButton onClick={handleFold} text="접기" />
                </Div>
              )}
            </Div>
          )}

          {userData && userData.wishList.length === 0 && (
            <Links className="search" href={"/"}>
              둘러보러 가기
            </Links>
          )}

{userData?.wishList.length > 0 && (
  isShowDetail
    ? groupedWishlist.map((group, groupIndex) => (
        <LargeDiv key={groupIndex} className="likes-container">
          {group.map((wish: any, index: number) => (
            <LargeDiv key={index} className="likes-card">
              <LargeDiv className="name-container">
                <LargeDiv className="name-box">
                  <Span className="profile-box">
                    <Img
                      src={wish.randomImage}
                      alt={wish.nickname}
                      onClick={() => handleCardRedirect(wish.nickname)}
                      priority
                    />
                  </Span>
                  <H4 className="profile-like-name">{wish.nickname}</H4>
                </LargeDiv>
                <Span>
                  <SecondaryButton
                    type="button"
                    text="삭제하기"
                    onClick={() => removeWish(wish.id)}
                  />
                </Span>
              </LargeDiv>
              <Span className="large-img-box">
                <Img
                  src={wish.randomImage}
                  alt={wish.nickname}
                  onClick={() => handleCardRedirect(wish.nickname)}
                />
              </Span>
              <LargeDiv className="skills-container">
                <H5 className="address">
                  {wish.street}, {wish.city}
                </H5>
              </LargeDiv>
              <LargeDiv className="skills-container">
                {wish.skills.map((skill: any, index: number) => (
                  <LargeDiv key={index} className="skill-item">
                    <H5 className="skills">#{skill.skill}</H5>
                  </LargeDiv>
                ))}
              </LargeDiv>
            </LargeDiv>
          ))}
        </LargeDiv>
      ))
    : groupedWishlist.map((group, groupIndex) => (
        <SmallDiv key={groupIndex} className="likes-container">
          {group.map((wish: any, index: number) => (
            <SmallDiv key={index} className="likes-card">
              <Button
                type="button"
                className="delete-small"
                onClick={() => removeWish(wish.id)}
              >
                <RemoveIcon />
              </Button>
              <Span className="small-img-box">
                <Img
                  src={wish.randomImage}
                  alt={wish.nickname}
                  onClick={() => handleCardRedirect(wish.nickname)}
                />
              </Span>
              <H4 className="profile-like-name">{wish.nickname}</H4>
            </SmallDiv>
          ))}
        </SmallDiv>
      ))
)}


          {visibleCount < userData?.wishList?.length && (
            <BaseButton onClick={loadMore} text="더보기" />
          )}
        </Section>

        <Section>
          <LogoutButton />
        </Section>
      </Div>
      <ScrollToTopbutton />
    </>
  );
};

export default ProfileComp;
