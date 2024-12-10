import React, { useState, useEffect, useContext } from "react";
import s from "../stores/styling";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import StartFromTop from "../components/StartFromTop";
import HoverButton from "../components/HoverButton";

import Modal from "../components/Modal";
import useModal from "../hooks/ModalHook";

const LoginPage = () => {
  const navigate = useNavigate();

  const { currentlyLoggedIn, setCurrentlyLoggedIn } = useContext(AuthContext);

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPw, setSignInPw] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();
  const [modalMessage, setModalMessage] = useState<React.ReactNode>(""); // 모달에 표시될 메시지 상태

  useEffect(() => {
    if (currentlyLoggedIn) {
      navigate("/profile"); // 이미 로그인된 상태라면 프로필 페이지로
    }
  }, [currentlyLoggedIn, navigate]);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await setPersistence(auth, browserSessionPersistence);  //세션에 유저 정보 저장
      const userCredential = await signInWithEmailAndPassword(
        auth,
        signInEmail,
        signInPw
      );
      console.log(userCredential);
      const user = userCredential.user;

      if (rememberMe) {
        // 체크된 경우
        localStorage.setItem("username", signInEmail);
      } else {
        localStorage.removeItem("username");
      }

      setCurrentlyLoggedIn(true);
      setIsLoggedIn(true);
      navigate("/"); // 성공 시 홈으로 이동
    } catch (error) {
      const typedError = error as { code: string }; // error를 명시적으로 타입 단언
      console.error("Error signing in:", typedError);
      const errorCode = typedError.code;

      // 에러 코드에 따라 메시지 설정
      switch (errorCode) {
        case "auth/user-not-found":
          setModalMessage(
            <>
              <s.StyledP className="modal-text">
                등록되지 않은 계정입니다.
              </s.StyledP>
              <s.StyledP className="modal-text">
                회원가입을 진행해 주세요.
              </s.StyledP>
            </>
          );
          break;
        case "auth/wrong-password":
          setModalMessage(
            <>
              <s.StyledP className="modal-text">
                비밀번호가 올바르지 않습니다.
              </s.StyledP>
              <s.StyledP className="modal-text">다시 시도해주세요.</s.StyledP>
            </>
          );
          break;
        case "auth/too-many-requests":
          setModalMessage(
            <>
              <s.StyledP className="modal-text">
                로그인 시도가 너무 많습니다.
              </s.StyledP>
              <s.StyledP className="modal-text">
                잠시 후 다시 시도해주세요.
              </s.StyledP>
            </>
          );
          break;
        default:
          setModalMessage(
            <>
              <s.StyledP className="modal-text">
                로그인에 실패했습니다.
              </s.StyledP>
              <s.StyledP className="modal-text">다시 시도해주세요.</s.StyledP>
            </>
          );
      }

      handleOpenModal(); // 모달 열기
      setCurrentlyLoggedIn(false);
      setIsLoggedIn(false);

      // label에 invalid 추가
      const emailLabel = document.querySelector(`label[for="useremail"]`);
      const passwordLabel = document.querySelector(`label[for="password"]`);
      if (emailLabel) {
        emailLabel.classList.remove("valid");
        emailLabel.classList.add("invalid");
      }
      if (passwordLabel) {
        passwordLabel.classList.remove("valid");
        passwordLabel.classList.add("invalid");
      }
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // 아이디 기억하기
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setSignInEmail(savedUsername);
      setRememberMe(true);
    }
  }, []);

  const handleRememberMeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = event.target.checked;
    setRememberMe(isChecked);

    if (!isChecked) {
      localStorage.removeItem("username");
    }
  };

  //유효한 입력인지 확인
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const target = event.target;
    target.classList.remove("active"); //focus out시 클래스 제거

    if (!target.value) {
      return; // 입력 필드가 비어 있으면 클래스 변화를 발생시키지 않음
    }

    const label = target.nextElementSibling as HTMLLabelElement | null; // 이벤트 타겟의 바로 다음 형제 요소
    if (label) {
      //타입가드
      if (!target.checkValidity()) {
        label.classList.add("invalid");
      } else {
        label.classList.remove("invalid");
        label.classList.add("valid");
      }
    }
  };

  return (
    <>
      <StartFromTop />
      <s.LoginDiv className="login-wrapper">
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          modalTitle={"앗!"}
          showCheckbox={false}
          modalButtonClose={"닫기"}
          addButton={false}
          text={modalMessage}
        />

        <s.Form className="login" onSubmit={handleSignIn}>
          <s.LoginDiv className="container">
            <s.LoginDiv className="input-wrapper login-page-box">
              <s.LoginDiv className="input-box">
                <s.Input
                  name="email"
                  type="email"
                  id="useremail"
                  value={signInEmail}
                  onChange={(event) => setSignInEmail(event.target.value)}
                  onBlur={handleBlur}
                  required
                  autoComplete="username"
                />
                <s.Label
                  className={`login-info ${signInEmail ? "active" : ""}`}
                  htmlFor="useremail"
                >
                  이메일
                </s.Label>
              </s.LoginDiv>
              <s.LoginDiv className="input-box">
                <s.Input
                  name="password"
                  type="password"
                  id="password"
                  value={signInPw}
                  minLength={6}
                  onChange={(event) => setSignInPw(event.target.value)}
                  onBlur={handleBlur}
                  required
                  autoComplete="current-password"
                />
                <s.Label
                  className={`login-info ${signInPw ? "active" : ""}`}
                  htmlFor="password"
                >
                  비밀번호
                </s.Label>
              </s.LoginDiv>
            </s.LoginDiv>
            <s.LoginDiv className="button-wrapper login">
              <s.LoginDiv className="checkbox-box">
                <s.Label className="check-label" htmlFor="remember">
                  Remember me
                  {rememberMe ? (
                    <s.CheckboxAfterIcon className="checkbox-icon-checked" />
                  ) : (
                    <s.CheckboxBeforeIcon className="checkbox-icon" />
                  )}
                </s.Label>
                <s.Input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                  className="remember-check"
                />
              </s.LoginDiv>

              <HoverButton type="submit" circle={false} text={"로그인"} />

              <s.Button
                className="login-btn"
                type="button"
                onClick={() => handleNavigation("/register")}
              >
                가입하기
              </s.Button>
            </s.LoginDiv>
          </s.LoginDiv>
        </s.Form>
      </s.LoginDiv>
    </>
  );
};

export default LoginPage;
