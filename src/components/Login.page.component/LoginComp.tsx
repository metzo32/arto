import {
  Div,
  Form,
  Label,
  Input,
  H3,
  H4,
  P,
  Button,
  IconBox,
  IconCheck,
} from "./Login.style";
import BaseButton from "../../assets/design-assets/BaseButton/BaseButton";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  setPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import Modal from "../Modal/Modal";
import { useModal } from "../../hooks/useModal";

export default function LoginComp() {
  const navigate = useNavigate();

  const { currentlyLoggedIn, setCurrentlyLoggedIn } = useContext(AuthContext);
  const { isModalOpen, modalTitle, modalContent, openModal, closeModal } =
    useModal();
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPw, setSignInPw] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (currentlyLoggedIn) {
      navigate("/my"); // 이미 로그인된 상태라면 프로필 페이지로
    }
  }, [currentlyLoggedIn, navigate]);

  //유효한 입력인지 확인
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const target = event.target;

    if (!target.value) {
      return; // 입력 필드가 비어 있으면 패스
    }

    const label = target.nextElementSibling as HTMLLabelElement | null; // 이벤트 타겟의 바로 다음 형제 요소
    if (label) {
      //타입가드
      if (!target.checkValidity()) {
        label.classList.add("invalid");
      } else {
        label.classList.remove("invalid");
      }
    }
  };

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await setPersistence(auth, browserSessionPersistence); // 세션에 유저 정보 저장
      const userCredential = await signInWithEmailAndPassword(
        auth,
        signInEmail,
        signInPw
      );
      // console.log(userCredential);
      const user = userCredential.user;

      if (rememberMe) {
        // 체크된 경우
        localStorage.setItem("username", signInEmail);
      } else {
        localStorage.removeItem("username");
      }
      setCurrentlyLoggedIn(true);
      navigate("/"); // 성공 시 홈으로 이동
    } catch (error) {
      const typedError = error as { code: string }; // error를 명시적으로 타입 단언
      console.error("Error signing in:", typedError);
      const errorCode = typedError.code;

      switch (errorCode) {
        case "auth/user-not-found":
          openModal(
            undefined,
            <Div className="modal-box">
              <P className="modal-text">등록되지 않은 계정입니다.</P>
              <P className="modal-text">회원가입을 진행해 주세요.</P>
            </Div>
          );
          break;
        case "auth/wrong-password":
          openModal(
            undefined,
            <Div className="modal-box">
              <P className="modal-text">비밀번호가 올바르지 않습니다.</P>
              <P className="modal-text">다시 시도해주세요.</P>
            </Div>
          );
          break;
        case "auth/too-many-requests":
          openModal(
            undefined,
            <Div className="modal-box">
              <P className="modal-text">로그인 시도가 너무 많습니다.</P>
              <P className="modal-text">잠시 후 다시 시도해주세요.</P>
            </Div>
          );
          break;

        default:
          openModal(
            undefined,
            <Div className="modal-box">
              <P className="modal-text">로그인에 실패했습니다.</P>
              <P className="modal-text">다시 시도해주세요.</P>
            </Div>
          );
      }
      setCurrentlyLoggedIn(false);

      // label에 invalid 추가
      const emailLabel = document.querySelector(`label[for="useremail"]`);
      const passwordLabel = document.querySelector(`label[for="password"]`);
      if (emailLabel) {
        emailLabel.classList.add("invalid");
      }
      if (passwordLabel) {
        passwordLabel.classList.add("invalid");
      }
    }
  };

  const handleNavigation = () => {
    navigate("/register");
  };

  // 아이디 불러오기
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setSignInEmail(savedUsername);
      setRememberMe(true);
    }
  }, []);

  // 아이디 기억하기
  const handleRememberMeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = event.target.checked;
    setRememberMe(isChecked);

    if (!isChecked) {
      localStorage.removeItem("username");
    }
  };

  return (
    <Div className="page">
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
        content={modalContent}
      />
      <Div className="container">
        <Form onSubmit={handleSignIn}>
          <Div className="form-wrapper">
            <H3>로그인</H3>
            <Label
              htmlFor="useremail"
              className={`login-info ${signInEmail ? "active" : ""}`}
            >
              이메일
              <Input
                name="email"
                type="email"
                id="useremail"
                value={signInEmail}
                onChange={(event) => setSignInEmail(event.target.value)}
                onBlur={handleBlur}
                required
                autoComplete="username"
                placeholder="you@example.com"
              />
            </Label>

            <Label
              htmlFor="password"
              className={`login-info ${signInPw ? "active" : ""}`}
            >
              비밀번호
              <Input
                name="password"
                type="password"
                id="password"
                value={signInPw}
                minLength={6}
                onChange={(event) => setSignInPw(event.target.value)}
                onBlur={handleBlur}
                required
                autoComplete="current-password"
                placeholder="6자리 이상 입력하세요"
              />
            </Label>
            <Label htmlFor="remember" className="remember">
              {rememberMe ? <IconCheck /> : <IconBox />}
              <Input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={handleRememberMeChange}
                hidden
              />
              Remember me
            </Label>

            <BaseButton type="submit" text="로그인" />

            <Div className="register-box">
              <H4>아직 회원이 아니신가요?</H4>
              <Button type="button" onClick={() => handleNavigation()}>
                가입하기
              </Button>
            </Div>
          </Div>
        </Form>
      </Div>
    </Div>
  );
}
