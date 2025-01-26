import { HeaderTag, Nav, Div, Button, Span, Brand } from "./Header.style";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { headerData, bottomItem } from "./Header.data";
import { AuthContext } from "../../context/AuthContext";
import useWindowSize from "../../hooks/useWindowSize";
import DarkModeButton from "../DarkModeButton/DarkModeButton";
import RoundButton from "../../assets/design-assets/RoundButton/RoundButton";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

interface HeaderProps {
  isNarrow: boolean;
  handleFold: () => void;
}

const Header = ({ isNarrow, handleFold }: HeaderProps) => {
  const navigate = useNavigate();
  const { isMobile } = useWindowSize();

  const { currentlyLoggedIn } = useContext(AuthContext);
  const [clickedItem, setClickedItem] = useState<string | null>(null); //현재 클릭된 인덱스 저장

  useEffect(() => {
    localStorage.setItem("isNarrow", String(isNarrow));
  }, [isNarrow]);

  const handleProfileNavigation = () => {
    if (currentlyLoggedIn) {
      navigate("/my");
    } else {
      navigate("/login");
    }
  };

  const handleNavigation = (path: string, id: string) => {
    // 현재 클릭된 버튼과 같은 경우 상태를 변경하지 않음
    if (id !== clickedItem) {
      setClickedItem(id);
    }
    navigate(path);
  };

  const clickLogoHandler = () => {
    navigate("/");
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
      <HeaderTag className={`${isNarrow ? "fold" : ""}`}>
        <Nav>
          {/* {location.pathname === "/" && <SortButton />} */}
          <Div>
            {isMobile ? null : (
              <Div className={`brand-box ${isNarrow ? "fold" : ""}`}>
                {isNarrow || isMobile ? null : (
                  <Brand onClick={clickLogoHandler} />
                )}
                <RoundButton onClick={handleFold}>
                  {isNarrow ? <FaArrowRight /> : <FaArrowLeft />}
                </RoundButton>
              </Div>
            )}

            {headerData.map((group, groupIndex) => (
              <Div key={groupIndex} className="line-box">
                {group.map((item, index) => (
                  <Button
                    key={item.id}
                    onClick={() => handleNavigation(item.path, item.id)}
                    className={`menu-button ${
                      (window.location.pathname === "/" &&
                        groupIndex === 0 &&
                        index === 0) ||
                      clickedItem === item.id
                        ? ""
                        : ""
                    } ${isNarrow ? "fold-btn" : ""}`}
                  >
                    <Span>{item.icon && <item.icon />}</Span>
                    {isMobile || isNarrow ? null : <Span>{item.name}</Span>}
                  </Button>
                ))}
              </Div>
            ))}
          </Div>
          <Div>
            <Div className="line-box bottom">
              <Button
                key={bottomItem.id}
                onClick={() => handleNavigation(bottomItem.path, bottomItem.id)}
                className={`menu-button ${
                  clickedItem === bottomItem.id ? "" : ""
                } ${isNarrow ? "fold-btn" : ""}`}
              >
                <Span>{bottomItem.icon && <bottomItem.icon />}</Span>
                {isMobile || isNarrow ? null : (
                  <Span>
                    {currentlyLoggedIn ? "회원 페이지" : bottomItem.name}
                  </Span>
                )}
              </Button>
            </Div>
            <Div className="line-box bottom">
              <DarkModeButton isNarrow={isNarrow} isMobile={isMobile} />
            </Div>
          </Div>
          {/* <Div className="line-box">
            {sortButtonsData.map((item) => (
              <Button
                key={item.id}
                onClick={() => handleSort(item.logic, item.id)}
                className={`menu-button ${
                  clickedItem === item.id ? "" : ""
                }`}
              >
                {item.name}
              </Button>
            ))}
          </Div> */}
        </Nav>
      </HeaderTag>
    </>
  );
};

export default Header;
