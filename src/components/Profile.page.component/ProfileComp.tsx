import { useState, useEffect, useContext } from "react";
import { Div } from "./Profile.style";
import { AuthContext } from "../../context/AuthContext";
import { auth, db } from "../../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import LogoutButton from "../Logout";
// import profileBanner from "../assets/images/profile-banner.jpg";
import StartFromTop from "../StartFromTop";
import { PopUpBelow } from "../FramerMotions/scrollMotions";

interface WishProps {
  artistNickname?: string;
  artistRandomImage?: string;
}

const ProfileComp = ({ artistNickname, artistRandomImage }: WishProps) => {
  const { currentlyLoggedIn } = useContext(AuthContext);
  const [userData, setUserData] = useState<any>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(5); // 처음에 5개만 보여주기

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
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("유저 데이터를 가져오는 중 오류 발생:", error);
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

  return (
    <>
      <StartFromTop />

      {/* <img className="profile-label" src={profileBanner} alt="photo" /> */}

      <Div className="container">
        <LogoutButton />
        <Div className="profile-grid">
          <h2 className="profile-name">{userData ? userData.fullname : ""}</h2>
          <h3 className="profile-nickname">
            {userData ? userData.nickname : ""}
          </h3>

          <h4 className="profile-details">{userData ? userData.email : ""}</h4>

          <Div className="profile-contacts-box">
            <Div className="profile-contacts">
              {/* <s.PhoneIcon /> */}연락처 아이콘
              <h4 className="profile-details">
                +{userData ? userData.countryCode : ""}
                {userData ? userData.phonenumber : ""}
              </h4>
            </Div>

            <Div className="profile-contacts">
              {/* <s.BdIcon /> */}생일 아이콘
              <h4 className="profile-details">
                {userData ? userData.birthYear : ""}.
                {userData ? userData.birthMonth : ""}.
                {userData ? userData.birthDay : ""}
              </h4>
            </Div>
          </Div>
        </Div>
        <Div className="like-num-box">
          <h4 className="liked">{userData ? userData.wishList?.length : ""}</h4>
          <h4 className="profile-details bold">Likes</h4>
        </Div>

        {groupedWishlist.map((group, groupIndex) => (
          <PopUpBelow key={groupIndex}>
            <Div key={groupIndex} className="profile-like-info">
              {group.map((wish: any, index: number) => (
                <Div key={index} className="likes-card">
                  <button
                    className="delete"
                    onClick={() => removeWish(wish.id)}
                  >
                    {/* <s.RemoveIcon /> */} 제거하기 아이콘
                  </button>
                  <img
                    className="profile-likes-card"
                    src={wish.randomImage}
                    alt={wish.nickname}
                    onClick={() => handleCardRedirect(wish.nickname)}
                  />
                  <h4 className="profile-like-name">{wish.nickname}</h4>
                </Div>
              ))}
            </Div>
          </PopUpBelow>
        ))}

        {visibleCount < userData?.wishList?.length && (
          <button onClick={loadMore} className="outlined">
            더보기
          </button>
        )}
      </Div>
    </>
  );
};

export default ProfileComp;
