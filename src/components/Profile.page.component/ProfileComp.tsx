import { useState, useEffect } from "react";
import {
  Section,
  Div,
  H2,
  H3,
  H4,
  H5,
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
import { useNavigate } from "react-router-dom";
import useLoading from "../../hooks/useLoading";
import { useModal } from "../../hooks/useModal";
import Modal from "../Modal/Modal";
import LogoutButton from "../Logout";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import StartFromTop from "../StartFromTop";
import { getSkillsByIds } from "../../assets/datas/artitstData";
import RoundButton from "../../assets/design-assets/RoundButton/RoundButton";
import {
  BaseButton,
  SecondaryButton,
} from "../../assets/design-assets/BaseButton/BaseButton";
import ScrollToTopbutton from "../ScrollToTopButton/ScrollToTopButton";
import { IoMdPhonePortrait } from "react-icons/io";
import { FaBirthdayCake } from "react-icons/fa";
import { PiCirclesThreeBold } from "react-icons/pi";
import { FaExpand } from "react-icons/fa";

const ProfileComp = () => {
  const { isModalOpen, modalTitle, modalContent, openModal, closeModal } =
    useModal();
  const { isLoading, setIsLoading, loadingProgress } = useLoading();
  const [userData, setUserData] = useState<any>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(5); // 처음에 5개만 보여주기
  const [isShowDetail, setIsShowDetail] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // 유저가 로그인되어 있을 때만 데이터를 가져옴
        fetchUserData(user.uid);
      } else {
        setUserData(null); // 유저가 없다면 null로 설정
      }
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 구독 해제
  }, []);

  const fetchUserData = async (uid: string) => {
    try {
      const userDocRef = doc(db, "users", uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserData(data);
        setPhotoURL(data.photoURL);
        loadingProgress();
      } else {
        console.log("No such document!");
        loadingProgress();
      }
    } catch (error) {
      console.error("유저 데이터를 가져오는 중 오류 발생:", error);
      setIsLoading(false);
      loadingProgress();
    }
  };

  const handleCardRedirect = (nickname: string) => {
    const url = `/profile_artist_${nickname}`;
    if (url) {
      window.location.href = url;
    } else {
      console.error("URL 찾을 수 없음");
    }
  };

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 5); // 더보기 버튼을 누르면 5개씩 더 보여줌
  };

  const groupedWishlist = [];
  for (let i = 0; i < visibleCount && i < userData?.wishList?.length; i += 5) {
    groupedWishlist.push(userData.wishList.slice(i, i + 5)); // 5개씩 묶음
  }

  const removeWish = async (artistId: number) => {
    if (!auth.currentUser) {
      openModal("잠깐!", "로그인이 필요합니다.");
      return;
    }

    const userRef = doc(db, "users", auth.currentUser.uid);
    const currentWishlist = userData.wishList || [];

    const updatedWishlist = currentWishlist.filter(
      (wish: any) => wish.id !== artistId
    );

    try {
      // Firestore에 위시리스트 업데이트
      await updateDoc(userRef, { wishList: updatedWishlist });
      // 로컬 상태 업데이트
      setUserData((prevUserData: any) => ({
        ...prevUserData,
        wishList: updatedWishlist,
      }));
    } catch (error) {
      console.error("위시리스트 업데이트 중 오류 발생:", error);
    }
  };

  const handleBrowse = () => {
    navigate("/");
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

          <H4>{userData ? userData.email : ""}</H4>

          <Div className="info-container">
            {userData && (
              <Div className="info-box">
                <IoMdPhonePortrait />
                <H4>
                  +{userData.countryCode} {userData.phonenumber}
                </H4>
              </Div>
            )}

            {userData && (
              <Div className="info-box">
                <FaBirthdayCake />
                <H4>
                  {userData.birthYear}.{userData.birthMonth}.{userData.birthDay}
                </H4>
              </Div>
            )}
          </Div>
        </Section>

        <Section>
          {userData && (
            <Div className="like-container">
              <Div className="like-num-box">
                <H4 className="liked">{userData.wishList.length}</H4>
                <H4 className="profile-details bold">Likes</H4>
              </Div>
              <Div className="like-align-box">
                <RoundButton onClick={handleShowDetail}>
                  {isShowDetail ? <PiCirclesThreeBold /> : <FaExpand />}
                </RoundButton>
              </Div>

              {visibleCount > 5 && (
                <Div className="like-fold-box">
                  <BaseButton onClick={handleFold} text="접기" />
                </Div>
              )}
            </Div>
          )}
          {userData && userData.wishList.length === 0 && (
            <H5 onClick={handleBrowse}>둘러보러 가기</H5>
          )}

          {isShowDetail
            ? groupedWishlist.map((group, groupIndex) => (
                <LargeDiv key={groupIndex} className="likes-container">
                  {group.map((wish: any, index: number) => {
                    // 스킬 ID를 스킬 이름으로 변환
                    const skillNames = getSkillsByIds(wish.skill).map(
                      (skill) => skill.skill
                    );

                    return (
                      <LargeDiv key={index} className="likes-card">
                        <LargeDiv className="name-container">
                          <LargeDiv className="name-box">
                            <Img
                              className="profile"
                              src={wish.randomImage}
                              alt={wish.nickname}
                              onClick={() => handleCardRedirect(wish.nickname)}
                            />
                            <H4 className="profile-like-name">
                              {wish.nickname}
                            </H4>
                          </LargeDiv>
                          <Span>
                            <SecondaryButton
                              type="button"
                              text="삭제하기"
                              onClick={() => removeWish(wish.id)}
                            />
                          </Span>
                        </LargeDiv>
                        <Img
                          className="large-img"
                          src={wish.randomImage}
                          alt={wish.nickname}
                          onClick={() => handleCardRedirect(wish.nickname)}
                        />
                        <LargeDiv className="skills-container">
                          내용 내용 내용
                        </LargeDiv>

                        <LargeDiv className="skills-container">
                          {skillNames.map((skillName, skillIndex) => (
                            <LargeDiv key={skillIndex} className="skill-item">
                              <span>{skillName}</span>
                            </LargeDiv>
                          ))}
                        </LargeDiv>
                      </LargeDiv>
                    );
                  })}
                </LargeDiv>
              ))
            : groupedWishlist.map((group, groupIndex) => (
                <SmallDiv key={groupIndex} className="likes-container">
                  {group.map((wish: any, index: number) => (
                    <SmallDiv key={index} className="likes-card">
                      <Button
                        className="delete-small"
                        onClick={() => removeWish(wish.id)}
                      >
                        <RemoveIcon />
                      </Button>
                      <Img
                        className="small-img"
                        src={wish.randomImage}
                        alt={wish.nickname}
                        onClick={() => handleCardRedirect(wish.nickname)}
                      />
                      <H4 className="profile-like-name">{wish.nickname}</H4>
                    </SmallDiv>
                  ))}
                </SmallDiv>
              ))}

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
