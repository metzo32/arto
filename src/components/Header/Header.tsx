import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderTag, Div, Button, Span } from "./Header.style";
import { headerData, headerData2 } from "./Header.data";
import { sortButtonsData } from "../Sort/SortButton.data";
import { AuthContext } from "../../context/AuthContext";
import useWindowSize from "../../hooks/useWindowSize";
import { ArtistDataProps } from "../../assets/datas/artitst_data";
import RoundButton from "../../assets/design-assets/RoundButton";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import logo from "../../assets/icons/logo/logo.svg";

// interface HeaderProps {
//   data: ArtistDataProps[];
//   setData: (data: ArtistDataProps[]) => void;
// }

const Header = () => {
  const navigate = useNavigate();
  // const handleProfileNavigation = () => {
  //   if (currentlyLoggedIn) {
  //     navigate("/profile");
  //   } else {
  //     navigate("/login");
  //   }
  // };
  const { isMobile } = useWindowSize();
  const showSidebar = () => setSidebar(!sidebar);

  const { currentlyLoggedIn } = useContext(AuthContext);
  const [sidebar, setSidebar] = useState(false);
  const [clickedItem, setClickedItem] = useState<string | null>(null); //현재 클릭된 인덱스 저장
  const [isFolded, setIsFolded] = useState(() => {
    // localStorage에서 초기값 가져오기
    const savedValue = localStorage.getItem("isFolded");
    return savedValue === "true"; // 문자열을 불리언으로 변환
  });

  useEffect(() => {
    localStorage.setItem("isFolded", String(isFolded));
  }, [isFolded]);

  const handleFoldMenu = () => {
    setIsFolded(!isFolded);
  };

  const handleNavigation = (path: string, id: string) => {
    navigate(path);
    setClickedItem(id === clickedItem ? null : id);
    //선택한 대상이 클릭된 인덱스라면 선택해제, 선택 안돼있었다면 isClicked를 해당 인덱스로 설정
  };

  // const handleSort = (
  //   logic: (data: ArtistDataProps[]) => ArtistDataProps[],
  //   id: string
  // ) => {
  //   const sortedData = logic(data); // 데이터를 정렬
  //   setData(sortedData); // 정렬된 데이터를 업데이트
  //   setClickedItem(id === clickedItem ? null : id); // 클릭 상태 업데이트
  // };

  return (
    <>
      <Div className="header-area" />
      <HeaderTag className={`${isFolded ? "fold" : ""}`}>
        <nav>
          {isMobile ? null : (
            <Div className={`brand-box ${isFolded ? "fold" : ""}`}>
              {isFolded || isMobile ? null : <img src={logo} alt="Arto" />}
              <RoundButton onClick={handleFoldMenu}>
                {isFolded ? <FaArrowRight /> : <FaArrowLeft />}
              </RoundButton>
            </Div>
          )}
          <Div className="line-box">
            {headerData.map((item) => (
              <Button
                key={item.id}
                onClick={() => handleNavigation(item.path, item.id)}
                className={`menu-button ${
                  clickedItem === item.id ? "selected" : ""
                } ${isFolded ? "fold-btn" : ""}`}
              >
                <Span>{item.icon && <item.icon />}</Span>
                {isMobile || isFolded ? null : <Span>{item.name}</Span>}
                {/* <Span className={isMobile || isFolded ? "fold" : ""}>
                  {item.name}
                </Span> */}
              </Button>
            ))}
          </Div>
          <Div className="line-box">
            {headerData2.map((item) => (
              <Button
                key={item.id}
                onClick={() => handleNavigation(item.path, item.id)}
                className={`menu-button ${
                  clickedItem === item.id ? "selected" : ""
                } ${isFolded ? "fold-btn" : ""}`}
              >
                <Span>{item.icon && <item.icon />}</Span>
                {isMobile || isFolded ? null : <Span>{item.name}</Span>}
              </Button>
            ))}
          </Div>
          {/* <Div className="line-box">
            {sortButtonsData.map((item) => (
              <Button
                key={item.id}
                onClick={() => handleSort(item.logic, item.id)}
                className={`menu-button ${
                  clickedItem === item.id ? "selected" : ""
                }`}
              >
                {item.name}
              </Button>
            ))}
          </Div> */}

          {/* <SideBar sidebar={sidebar} showSidebar={showSidebar} /> */}
          {/* 
        <s.Button onClick={showSidebar} className={`${isClicked ? "selected" : ""}`}>
          {width && width <= 767 ? <s.HamburgerIcon /> : null}
          메뉴
        </s.Button>

        <s.Button
          onClick={() => handleNavigation("/")}
          className={`${isClicked ? "selected" : ""}`}
        >
          {width && width <= 767 ? <s.HomeIcon /> : null}홈
        </s.Button>

        <s.Button
          onClick={() => handleNavigation("/article")}
          className={`${isClicked ? "selected" : ""}`}
        >
          {width && width <= 767 ? <s.SearchIcon /> : null}
          둘러보기
        </s.Button>

        <s.Button
          onClick={() => handleProfileNavigation()}
          className={`${isClicked ? "selected" : ""}`}
        >
          {width && width <= 767 ? <s.ProfileIcon /> : null}내 정보
        </s.Button> */}
        </nav>
      </HeaderTag>
    </>
  );
};

export default Header;
