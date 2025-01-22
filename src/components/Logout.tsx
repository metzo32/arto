import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useModal } from "../hooks/useModal";
import Modal from "./Modal/Modal";

const LogoutButton = () => {
  const { setCurrentlyLoggedIn } = useContext(AuthContext);
  const { isModalOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();

  const handleLogout = async () => {
    openModal();
    try {
      await auth.signOut(); // Firebase 로그아웃 처리
      setCurrentlyLoggedIn(false); // 로그아웃 후 로컬 상태 업데이트
      navigate("/"); // 로그아웃 후 홈으로 이동
      closeModal(); // 모달 닫기
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={"잠깐!"}
        content={"정말 로그아웃 하시겠습니까?"}
      />
      <div className="logout-container">
        <button onClick={handleLogout}>로그아웃</button>
      </div>
    </>
  );
};

export default LogoutButton;
