interface UserProfileProps {
  userData: {
    email: string;
    fullname: string;
    nickname: string;
    phonenumber: string;
    countryCode: string;
    isValidAge: boolean;
    gender: string;
    birthYear: string;
    birthMonth: string;
    birthDay: string;
  };
}

const CurrentUserData = ({ userData }: UserProfileProps) => {
  return (
    <div>
      <p>이름: {userData.fullname}</p>
      <p>닉네임: {userData.nickname}</p>
      <p>이메일: {userData.email}</p>
      <p>
        전화번호: {userData.countryCode} {userData.phonenumber}
      </p>
      <p>성인여부: {userData.isValidAge ? "O" : "X"}</p>
      <p>성별: {userData.gender}</p>
      <p>
        생년월일:
        {`${userData.birthYear}-${userData.birthMonth}-${userData.birthDay}`}
      </p>
      {/* <p>가입한지: {userData.signupDate}일째</p> */}
    </div>
  );
};

export default CurrentUserData;
