import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "../stores/styling";
import SideBar from "./SideBar";
import { AuthContext } from "../context/AuthContext";
import useWindowSize from "../hooks/WindowSizeHook";

export default function Header() {
  const navigate = useNavigate();

  const { currentlyLoggedIn } = useContext(AuthContext);
  const [sidebar, setSidebar] = useState(false);

  const { width } = useWindowSize();

  const handleProfileNavigation = () => {
    if (currentlyLoggedIn) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <s.HeaderDiv className="header-wrapper">
        <SideBar sidebar={sidebar} showSidebar={showSidebar} />

        <s.Button onClick={showSidebar} className="header-button-item">
          {width && width <= 767 ? <s.HamburgerIcon /> : null}
          메뉴
        </s.Button>

        <s.Button
          onClick={() => handleNavigation("/")}
          className="header-button-item"
        >
          {width && width <= 767 ? <s.HomeIcon /> : null}홈
        </s.Button>

        <s.Button
          onClick={() => handleNavigation("/article")}
          className="header-button-item"
        >
          {width && width <= 767 ? <s.SearchIcon /> : null}
          둘러보기
        </s.Button>

        {/* {!isMobile && <DarkModeButton />} */}
        <s.Button
          onClick={() => handleProfileNavigation()}
          className="header-button-item"
        >
          {width && width <= 767 ? <s.ProfileIcon /> : null}내 정보
        </s.Button>
      </s.HeaderDiv>
    </>
  );
}
