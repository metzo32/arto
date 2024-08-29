import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import s from "../stores/styling";
import SideBar from "./SideBar";
import { AuthContext } from "../context/AuthContext";
import { useIsMobile } from "../context/MobileContext";

import DarkModeButton from "./DarkModeButton";

export default function Header() {
  const navigate = useNavigate();
  const isMobile = useIsMobile()

  const { currentlyLoggedIn } = useContext(AuthContext);
  const [sidebar, setSidebar] = useState(false);

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
        <s.HeaderDiv className="header-button-wrapper-left">
          <s.Button onClick={showSidebar} className="header-button-item">
            <s.HamburgerIcon />
          </s.Button>

          <s.Button
            onClick={() => handleNavigation("/")}
            className="header-button-item"
          >
            <s.HomeIcon />
          </s.Button>

          <s.Button
            onClick={() => handleNavigation("/article")}
            className="header-button-item"
          >
            <s.SearchIcon />
          </s.Button>
        </s.HeaderDiv>
        <s.HeaderDiv className="header-button-wrapper-right">
          {!isMobile && <DarkModeButton />}
          <s.Button
            onClick={() => handleProfileNavigation()}
            className="header-button-item"
          >
            <s.ProfileIcon />
          </s.Button>
        </s.HeaderDiv>
      </s.HeaderDiv>
      <s.HeaderDiv className="header-overlay" />
    </>
  );
}
