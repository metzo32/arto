import s from "../stores/styling";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth, db } from "../firebase/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { nicknameRule, fullnameRule } from "../stores/NameRule";
import StartFromTop from "../components/StartFromTop";
import RegisterInputItems from "../components/RegisterInputItems";
import CalculateAge from "../components/CalculateAge";
import GenderSelect from "../components/GenderSelect";
import countrycode from "../assets/datas/country_code";

import HoverButton from "../components/HoverButton";
import useModal from "../hooks/ModalHook";
import WishList from "../components/Wishlist/WishList";
import Modal from "../components/Modal";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPw, setRegisterPw] = useState<string>("");
  const [registerPwConfirm, setRegisterPwConfirm] = useState<string>("");
  const [registerNickname, setRegisterNickname] = useState<string>("");
  const [registerFullname, setRegisterFullname] = useState<string>("");
  const [registerPhonenumber, setRegisterPhonenumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("");
  const [isValidAge, setIsValidAge] = useState<boolean>(false);
  const [birthYear, setBirthYear] = useState<string>("");
  const [birthMonth, setBirthMonth] = useState<string>("");
  const [birthDay, setBirthDay] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  const [step, setStep] = useState<number>(1);

  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();
  const [modalMessage, setModalMessage] = useState<React.ReactNode>("");

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (registerPw !== registerPwConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!validateForm()) {
      alert("필수 입력사항을 모두 입력해주세요.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPw
      );
      const user = userCredential.user;
      console.log("User registered:", user);

      try {
        await setDoc(doc(db, "users", user.uid), {
          photoURL: null,
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
          wishList: [],
        });
        console.log("Firestore에 사용자 정보 저장 성공!");
        handleOpenModal();
      } catch (error) {
        console.error("Firestore에 사용자 정보 저장 실패:", error);
      }

      navigate("/profile");
    } catch (error) {
      const typedError = error as { code: string };
      console.error("Error signing in:", typedError);
      const errorCode = typedError.code;

      switch (errorCode) {
        case "auth/email-already-in-use":
          setModalMessage(<s.StyledP className="modal-text">이미 사용 중인 이메일입니다.</s.StyledP>);
          break;
        case "auth/invalid-email":
          setModalMessage(<s.StyledP className="modal-text">유효하지 않은 이메일 주소입니다.</s.StyledP>);
          break;
        case "auth/operation-not-allowed":
          setModalMessage(<s.StyledP className="modal-text">회원가입이 현재 허용되지 않습니다.</s.StyledP>);
          break;
        default:
          setModalMessage(<s.StyledP className="modal-text">회원가입 중 알 수 없는 오류가 발생했습니다.</s.StyledP>);
      }

      handleOpenModal();
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
          registerPw !== registerPwConfirm) ||
        (target.name === "nickname" && !nicknameRule.test(target.value)) ||
        (target.name === "fullname" && !fullnameRule.test(target.value))
      ) {
        label.classList.add("invalid");
      } else {
        label.classList.remove("invalid");
        label.classList.add("valid");
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

  const handlePhonenumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setRegisterPhonenumber(value);
  };

  const handleCountryCode = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCountryCode(event.target.value);
  };

  const handleAgeValidation = (isValid: boolean | null) => {
    if (!birthYear || !birthMonth || !birthDay) {
      return;
    }

    setIsValidAge(!isValid);
  };

  const handleNextStep = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (validateStepOne()) {
      setStep(step + 1);
    } else {
      alert("필수 입력 사항을 확인해주세요.");
    }
  };

  const validateStepOne = () => {
    return (
      registerEmail.length > 0 &&
      registerPw.length > 0 &&
      registerPwConfirm.length > 0 &&
      registerPw === registerPwConfirm &&
      registerPw.length >= 8
    );
  };

  const validateForm = () => {
    return (
      validateStepOne() &&
      registerFullname.length > 0 &&
      registerPhonenumber.length > 0 &&
      registerNickname.length > 0 &&
      countryCode.length > 0
    );
  };

  const handleBirthdateChange = (year: string, month: string, day: string) => {
    setBirthYear(year);
    setBirthMonth(month);
    setBirthDay(day);
  };

  const handleGenderChange = (onGenderChange: string) => {
    setGender(onGenderChange);
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  return (
    <>
      <StartFromTop />
      <s.LoginDiv className="login-wrapper">
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          modalTitle={"회원가입 오류"}
          showCheckbox={false}
          modalButtonClose={"닫기"}
          addButton={false}
          text={modalMessage}
        />

        <s.Form className="login" onSubmit={handleSignUp}>
          {step === 1 && (
            <s.LoginDiv className="container step01">
              <s.LoginDiv className="input-wrapper step01">
                <RegisterInputItems
                  name={"email"}
                  type={"email"}
                  id={"useremail"}
                  value={registerEmail}
                  minLength={6}
                  onChange={(event) => setRegisterEmail(event.target.value)}
                  onBlur={handleBlur}
                  required={true}
                  label={"이메일"}
                />

                <RegisterInputItems
                  name={"password"}
                  type={"password"}
                  id={"password"}
                  value={registerPw}
                  minLength={8}
                  onChange={(event) => setRegisterPw(event.target.value)}
                  onBlur={handleBlur}
                  required={true}
                  label={"비밀번호"}
                  placeholder={"8자 이상의 영문 또는 숫자"}
                  autocomplete="new-password"
                />

                <RegisterInputItems
                  name={"passwordConfirm"}
                  type={"password"}
                  id={"passwordConfirm"}
                  value={registerPwConfirm}
                  minLength={8}
                  onChange={(event) => setRegisterPwConfirm(event.target.value)}
                  onBlur={handleBlur}
                  required={true}
                  label={"비밀번호 확인"}
                  placeholder={"비밀번호 재입력"}
                  autocomplete="new-password"
                />
              </s.LoginDiv>

              <s.LoginDiv className="button-wrapper">

                <HoverButton
                  type="button"
                  onClick={handleNextStep}
                  value="next"
                  circle={true}
                  text="다음"
                />

                <s.Button
                  type="button"
                  onClick={() => handleNavigation("/login")}
                >
                  이미 계정이 있으신가요?
                </s.Button>
              </s.LoginDiv>
            </s.LoginDiv>
          )}

          {step === 2 && (
            <s.LoginDiv className="container step02">
              <s.Button className="back" onClick={handlePrevStep}>
                <s.LeftIcon className="back-button"/>
              </s.Button>

              <s.LoginDiv className="input-wrapper step02">
                <RegisterInputItems
                  name={"fullname"}
                  type={"text"}
                  id={"fullname"}
                  value={registerFullname}
                  onChange={handleFullnameChange}
                  onBlur={handleBlur}
                  required={true}
                  label={"이름"}
                  placeholder={"자신의 주민등록상 이름"}
                />
                <RegisterInputItems
                  name={"nickname"}
                  type={"text"}
                  id={"nickname"}
                  value={registerNickname}
                  minLength={2}
                  onChange={handleNicknameChange}
                  onBlur={handleBlur}
                  required={true}
                  label={"닉네임"}
                  placeholder={"한글 또는 영문, 숫자 조합"}
                />

                <s.LoginDiv className="item-box register">
                  <CalculateAge
                    isAdult={handleAgeValidation}
                    onBirthdateChange={handleBirthdateChange}
                  />

                  <GenderSelect onGenderChange={handleGenderChange} />

                  <s.LoginDiv
                    className={`number-box ${countryCode ? "valid" : ""}`}
                  >
                    <s.LoginDiv className="countrycode-box">
                      <s.Select
                        name={"countrycode"}
                        id={"countrycode"}
                        defaultValue={"countrycode"}
                        onChange={handleCountryCode}
                        required
                      >
                        <s.Option value="">국가</s.Option>
                        {countrycode.map((item) => (
                          <s.Option
                            key={`${item.country}-${item.code}`}
                            value={item.code}
                          >
                            ({item.code}) {item.country}
                          </s.Option>
                        ))}
                      </s.Select>
                    </s.LoginDiv>

                    <RegisterInputItems
                      name={"phonenumber"}
                      type={"tel"}
                      id={"phonenumber"}
                      value={registerPhonenumber}
                      minLength={8}
                      onChange={handlePhonenumberChange}
                      onBlur={handleBlur}
                      required={true}
                      label={"전화번호"}
                      placeholder={"'-' 없이 입력"}
                      extraClass={"phonenumber-box"}
                    />
                  </s.LoginDiv>
                </s.LoginDiv>
              </s.LoginDiv>
              <s.LoginDiv className="button-wrapper">
                <HoverButton
                  type="submit"
                  value="submit"
                  circle={false}
                  text="가입하기"
                />

                <s.Button
                  type="button"
                  onClick={() => handleNavigation("/login")}
                >
                  이미 계정이 있으신가요?
                </s.Button>
              </s.LoginDiv>
            </s.LoginDiv>
          )}
        </s.Form>
      </s.LoginDiv>
    </>
  );
};

export default RegisterPage;
