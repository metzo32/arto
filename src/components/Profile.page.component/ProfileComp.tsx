import { useState, useEffect } from "react";
import { Section, Div, H2, H3, H4, H5, Img, RemoveIcon } from "./Profile.style";
import { auth, db } from "../../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../Logout";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import StartFromTop from "../StartFromTop";
import { PopUpBelow } from "../FramerMotions/scrollMotions";
import { getSkillsByIds } from "../../assets/datas/artitstData";
import useLoading from "../../hooks/useLoading";
import { IoMdPhonePortrait } from "react-icons/io";
import { FaBirthdayCake } from "react-icons/fa";
import { BaseButton } from "../../assets/design-assets/BaseButton/BaseButton";

const ProfileComp = () => {
  const { isLoading, setIsLoading, loadingProgress } = useLoading();
  const [userData, setUserData] = useState<any>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(5); // 처음에 5개만 보여주기

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
      alert("로그인이 필요합니다.");
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

  return (
    <>
      <StartFromTop />
      {isLoading && <LoadingSpinner />}
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
            <Div className="like-num-box">
              <H4 className="liked">{userData.wishList.length}</H4>
              <H4 className="profile-details bold">Likes</H4>
            </Div>
          )}
          {userData && userData.wishList.length === 0 && (
            <H5 onClick={handleBrowse}>둘러보러 가기</H5>
          )}

          {groupedWishlist.map((group, groupIndex) => (
            <Div key={groupIndex} className="likes-container-large">
              {group.map((wish: any, index: number) => {
                // 스킬 ID를 스킬 이름으로 변환
                const skillNames = getSkillsByIds(wish.skill).map(
                  (skill) => skill.skill
                );

                return (
                  <Div key={index} className="likes-card-large">
                    <button
                      className="delete"
                      onClick={() => removeWish(wish.id)}
                    >
                      <RemoveIcon />
                    </button>
                    <Img
                      className="large"
                      src={wish.randomImage}
                      alt={wish.nickname}
                      onClick={() => handleCardRedirect(wish.nickname)}
                    />
                    <H4 className="profile-like-name">{wish.nickname}</H4>
                    <Div className="skills-container">
                      {skillNames.map((skillName, skillIndex) => (
                        <Div key={skillIndex} className="skill-item">
                          <span>{skillName}</span>
                        </Div>
                      ))}
                    </Div>
                  </Div>
                );
              })}
            </Div>
          ))}

          {/* {groupedWishlist.map((group, groupIndex) => (
            // <PopUpBelow key={groupIndex}>
            <Div key={groupIndex} className="likes-container">
              {group.map((wish: any, index: number) => (
                <Div key={index} className="likes-card">
                  <button
                    className="delete"
                    onClick={() => removeWish(wish.id)}
                  >
                    <RemoveIcon />
                  </button>
                  <Img
                    src={wish.randomImage}
                    alt={wish.nickname}
                    onClick={() => handleCardRedirect(wish.nickname)}
                  />
                  <H4 className="profile-like-name">{wish.nickname}</H4>
                </Div>
              ))}
            </Div>
            // </PopUpBelow>
          ))} */}

          {visibleCount < userData?.wishList?.length && (
            <BaseButton onClick={loadMore} text="더보기" />
          )}
        </Section>

        <Section>
          <LogoutButton />
        </Section>
      </Div>
    </>
  );
};

export default ProfileComp;
