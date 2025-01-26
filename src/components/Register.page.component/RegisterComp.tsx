import { useState, useEffect, useContext } from "react";
import {
  Div,
  Label,
  Input,
  Form,
  H3,
  H4,
  Button,
} from "../Login.page.component/Login.style";
import { BaseButton } from "../../assets/design-assets/BaseButton/BaseButton";

import { auth, db } from "../../firebase/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { useNavigate } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import Modal from "../Modal/Modal";
import useLoading from "../../hooks/useLoading";
import { nicknameRule, fullnameRule } from "../../stores/NameRule";
import CalculateAge from "./CalculateAge";
import GenderSelect from "./GenderSelect";
import PhoneNumber from "./PhoneNumber";
import { AuthContext } from "../../context/AuthContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

// import WishList from "../components/Wishlist/WishList";

export default function RegisterComp() {
  const navigate = useNavigate();
  const { isModalOpen, modalTitle, modalContent, openModal, closeModal } =
    useModal();
  const { isLoading, loadingProgress } = useLoading();

  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPw, setRegisterPw] = useState<string>("");
  const [registerPwConfirm, setRegisterPwConfirm] = useState<string>("");
  const [registerNickname, setRegisterNickname] = useState<string>("");
  const [registerFullname, setRegisterFullname] = useState<string>("");
  const [isValidAge, setIsValidAge] = useState<boolean>(false);
  const [birthYear, setBirthYear] = useState<string>("");
  const [birthMonth, setBirthMonth] = useState<string>("");
  const [birthDay, setBirthDay] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("");
  const [registerPhonenumber, setRegisterPhonenumber] = useState<string>("");

  const [step, setStep] = useState<number>(1);

  const { currentlyLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    loadingProgress();
  }, []);

  useEffect(() => {
    if (currentlyLoggedIn) {
      navigate("/my"); // 이미 로그인된 상태라면 프로필 페이지로
    }
  }, [currentlyLoggedIn, navigate]);

  // 이메일 유효성 검사
  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // 폼 상태 초기화
  const resetForm = () => {
    setRegisterEmail("");
    setRegisterPw("");
    setRegisterPwConfirm("");
    setRegisterNickname("");
    setRegisterFullname("");
    setBirthYear("");
    setBirthMonth("");
    setBirthDay("");
    setGender("");
    setCountryCode("");
    setRegisterPhonenumber("");
    setIsValidAge(false);
    setStep(1);
  };

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 비밀번호 확인
    if (registerPw !== registerPwConfirm) {
      openModal("잠깐!", "비밀번호가 일치하지 않습니다.");
      return;
    }

    // 이메일 유효성 검사
    if (!isValidEmail(registerEmail)) {
      openModal("잠깐!", "유효하지 않은 이메일 주소입니다.");
      return;
    }

    const validateForm = () => {
      return (
        validateStepOne() &&
        registerFullname.length > 0 &&
        registerPhonenumber.length > 0 &&
        registerNickname.length > 0 &&
        countryCode.length > 0
      );
    };

    if (!validateForm()) {
      openModal("잠깐!", "필수 입력사항을 확인해주세요.");
      return;
    }

    try {
      // 사용자 등록
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPw
      );
      const user = userCredential.user; // 이 부분 떄문에 회원가입 후 자동 로그인된다.

      try {
        // Firestore에 사용자 정보 저장
        const userData = {
          email: registerEmail,
          fullname: registerFullname,
          nickname: registerNickname,
          phonenumber: registerPhonenumber,
          countryCode: countryCode,
          isValidAge: isValidAge,
          birthYear: birthYear,
          birthMonth: birthMonth,
          birthDay: birthDay,
          gender: gender,
          wishList: [], // 초기 위시리스트
        };

        console.log("Firestore에 저장할 데이터:", userData);

        await setDoc(doc(db, "users", user.uid), userData);
        console.log("Firestore에 사용자 정보 저장 성공!");

        await auth.signOut(); // 가입 후 자동 로그아웃 처리
        resetForm(); // 폼 초기화
        openModal("가입 성공!", "로그인 화면으로 이동합니다.");

        const handleModalClose = () => {
          closeModal();
          if (!isModalOpen) {
            // 모달을 닫으면
            navigate("/login"); // 로그인 페이지로 이동
          }
        };
        return (
          <Modal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            title={modalTitle}
            content={modalContent}
          />
        );
      } catch (firestoreError) {
        console.error("Firestore에 사용자 정보 저장 실패:", firestoreError);

        // Firestore 저장 실패 시 사용자 계정 삭제
        await user.delete();
        openModal(undefined, "회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (authError) {
      const error = authError as { code: string };
      console.error("Error signing up:", error);

      // Firebase 인증 에러 처리
      switch (error.code) {
        case "auth/email-already-in-use":
          openModal(undefined, "이미 사용 중인 이메일입니다.");
          break;
        case "auth/invalid-email":
          openModal(undefined, "유효하지 않은 이메일 주소입니다.");
          break;
        case "auth/operation-not-allowed":
          openModal(undefined, "회원가입이 현재 허용되지 않습니다.");
          break;
        default:
          openModal(undefined, "회원가입 중 알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const target = event.target;
    target.classList.remove("active");
    if (!target.value) return;

    const label = target.nextElementSibling as HTMLLabelElement | null;
    if (label) {
      if (
        !target.checkValidity() ||
        (target.name === "passwordConfirm" &&
          registerPw !== "registerPwConfirm") ||
        (target.name === "nickname" && !nicknameRule.test(target.value)) ||
        (target.name === "fullname" && !fullnameRule.test(target.value))
      ) {
        label.classList.add("invalid");
      } else {
        label.classList.remove("invalid");
      }
    }
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const capitalizedNickName = value.charAt(0).toUpperCase() + value.slice(1);
    setRegisterNickname(capitalizedNickName);
  };

  const handleFullnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const capitalizedName = value.charAt(0).toUpperCase() + value.slice(1);
    setRegisterFullname(capitalizedName);
  };

  const handleAgeValidation = (isValid: boolean | null) => {
    if (!birthYear || !birthMonth || !birthDay) {
      return;
    }
    setIsValidAge(!isValid);
  };

  const validateStepOne = () => {
    if (!registerEmail) {
      openModal(undefined, "이메일을 입력해주세요.");
      return false;
    } else if (!isValidEmail(registerEmail)) {
      openModal(undefined, "유효하지 않은 이메일 주소입니다.");
      return false;
    } else if (registerPw !== registerPwConfirm) {
      openModal(undefined, "비밀번호가 일치하지 않습니다.");
      return false;
    } else if (registerPw.length < 6) {
      openModal(undefined, "비밀번호는 6자리 이상이어야 합니다.");
      return false;
    } else {
      return true;
    }
  };

  const handleNextStep = () => {
    if (validateStepOne()) {
      setStep(2);
    }
  };

  const handleBirthdateChange = (year: string, month: string, day: string) => {
    setBirthYear(year);
    setBirthMonth(month);
    setBirthDay(day);
  };

  const handleGenderChange = (onGenderChange: string) => {
    setGender(onGenderChange);
  };

  const handlePhoneNumberChange = (code: string, phoneNumber: string) => {
    setCountryCode(code);
    setRegisterPhonenumber(phoneNumber);
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  return (
    <Div className="page">
      {isLoading && <LoadingSpinner />}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
        content={modalContent}
      />
      <Div className="container">
        <Form onSubmit={handleSignUp}>
          {step === 1 && (
            <Div className="form-wrapper">
              <H3>회원가입</H3>
              <>
                <Label htmlFor="email">
                  이메일
                  <Input
                    name="email"
                    type="email"
                    id="email"
                    value={registerEmail}
                    onChange={(event) => setRegisterEmail(event.target.value)}
                    onBlur={handleBlur}
                    required
                    autoComplete="username"
                    placeholder="you@example.com"
                  />
                </Label>

                <Label htmlFor="password">
                  비밀번호
                  <Input
                    name="password"
                    type="password"
                    id="password"
                    value={registerPw}
                    minLength={6}
                    onChange={(event) => setRegisterPw(event.target.value)}
                    onBlur={handleBlur}
                    required
                    autoComplete="current-password"
                    placeholder="6자리 이상 입력하세요"
                  />
                </Label>

                <Label htmlFor="passwordConfirm">
                  비밀번호 확인
                  <Input
                    name="passwordConfirm"
                    type="password"
                    id="passwordConfirm"
                    value={registerPwConfirm}
                    minLength={6}
                    onChange={(event) =>
                      setRegisterPwConfirm(event.target.value)
                    }
                    onBlur={handleBlur}
                    required
                    autoComplete="current-password"
                    placeholder="6자리 이상 입력하세요"
                  />
                </Label>

                <BaseButton
                  type="button"
                  text="다음"
                  onClick={handleNextStep}
                />
                <Div className="register-box">
                  <H4>이미 회원이신가요?</H4>
                  <Button
                    type="button"
                    onClick={() => handleNavigation("/login")}
                  >
                    로그인하기
                  </Button>
                </Div>
              </>
            </Div>
          )}

          {step === 2 && (
            <Div className="register-step02">
              <Div className="form-wrapper step02-left">
                <Div className="title-container">
                  <H3>회원가입</H3>
                  <Button onClick={handlePrevStep} className="back">
                    이전 단계로
                  </Button>
                </Div>
                <Label htmlFor="fullname">
                  이름
                  <Input
                    name="fullname"
                    type="text"
                    id="fullname"
                    value={registerFullname}
                    onChange={handleFullnameChange}
                    onBlur={handleBlur}
                    required
                    placeholder="자신의 이름"
                  />
                </Label>
                <Label htmlFor="nickname">
                  닉네임
                  <Input
                    name="nickname"
                    type="text"
                    id="nickname"
                    value={registerNickname}
                    minLength={2}
                    onChange={handleNicknameChange}
                    onBlur={handleBlur}
                    required
                    placeholder="한글 또는 영문, 숫자 조합"
                  />
                </Label>

                <CalculateAge
                  isAdult={handleAgeValidation}
                  onBirthdateChange={handleBirthdateChange}
                />
              </Div>

              <Div className="form-wrapper step02-right">
                <PhoneNumber onPhoneNumberChange={handlePhoneNumberChange} />
                <GenderSelect onGenderChange={handleGenderChange} />

                <BaseButton type="submit" text="가입하기" />
                <Div className="register-box">
                  <H4>이미 회원이신가요?</H4>
                  <Button
                    type="button"
                    onClick={() => handleNavigation("/login")}
                  >
                    로그인하기
                  </Button>
                </Div>
              </Div>
            </Div>
          )}
        </Form>
      </Div>
    </Div>
  );
}
