import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "../stores/styling";
import SideBar from "./SideBar";
import { AuthContext } from "../context/AuthContext";
import { useIsMobile } from "../context/MobileContext";
import useWindowSize from "../hooks/WindowSizeHook";

import DarkModeButton from "./DarkModeButton";



export default function Header() {
  const navigate = useNavigate();
  const isMobile = useIsMobile()

  const { currentlyLoggedIn } = useContext(AuthContext);
  const [sidebar, setSidebar] = useState(false);

  const {width} = useWindowSize()

  const handleProfileNavigation = () => {
    if (currentlyLoggedIn) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    const viewportHeight = window.innerHeight;
    console.log(viewportHeight);
  };

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <s.HeaderDiv className="header-wrapper">
        <SideBar sidebar={sidebar} showSidebar={showSidebar} />
          
          <s.Button onClick={showSidebar} className="header-button-item">
            <s.HamburgerIcon />
            {width && width <= 767 ? "메뉴" : null}
          </s.Button>

          <s.Button
            onClick={() => handleNavigation("/")}
            className="header-button-item"
          >
            <s.HomeIcon />
            {width && width <= 767 ? "홈" : null}
          </s.Button>

          <s.Button
            onClick={() => handleNavigation("/article")}
            className="header-button-item"
          >
            <s.SearchIcon />
            {width && width <= 767 ? "둘러보기" : null}
          </s.Button>

          {!isMobile && <DarkModeButton />}
          <s.Button
            onClick={() => handleProfileNavigation()}
            className="header-button-item"
          >
            <s.ProfileIcon />
            {width && width <= 767 ? "마이" : null}
          </s.Button>
      </s.HeaderDiv>
    </>
  );
}
