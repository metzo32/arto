import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useModal } from "../hooks/useModal";
import Modal from "./Modal/Modal";
import { SecondaryButton } from "../assets/design-assets/BaseButton/BaseButton";

const LogoutButton = () => {
  const { setCurrentlyLoggedIn } = useContext(AuthContext);
  const { isModalOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();

  const handleLogout = () => {
    openModal();
  };

  const handleOkay = async () => {
    try {
      await auth.signOut(); // Firebase 로그아웃 처리
      setCurrentlyLoggedIn(false); // 로그아웃 후 로컬 상태 업데이트
      navigate("/"); // 로그아웃 후 홈으로 이동
      closeModal(); // 모달 닫기
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  }

  const handleNo = () => {
    closeModal()
  }

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="잠깐!"
        content="정말 로그아웃 하시겠습니까?"
        isOptionOn={true}
        primBtnText="취소"
        secBtnText="로그아웃"
        onSecClose={handleOkay}
      />
      <div className="logout-container">
        <SecondaryButton onClick={handleLogout} text="로그아웃" />
      </div>
    </>
  );
};

export default LogoutButton;
