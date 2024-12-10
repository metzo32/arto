import React from "react";
import s from "../stores/styling";
import { SideBarData } from "../stores/SideBarData";
import { useIsMobile } from "../context/MobileContext";
import DarkModeButton from "./DarkModeButton";

interface SideBarProps {
  sidebar: boolean;
  showSidebar: () => void;
}

const SideBar = ({ sidebar, showSidebar }: SideBarProps) => {

  const isMobile = useIsMobile();

  return (
    <>
      {sidebar && <s.Overlay onClick={showSidebar} />}
      <s.SideBar className="sidebar-wrapper">
        <s.NavBar className={`nav-menu ${sidebar ? "active" : ""}`}>
          <s.StyledH3 className="sidebar-logo">Tapttoo</s.StyledH3>

          <s.SideBar className="sidebar-box">
            <s.StyledUl className="nav-menu-items" onClick={showSidebar}>
              {SideBarData.map((item, index) => (
                <s.StyledLi key={index} className={item.className}>
                  <s.StyledLink to={item.path} className="menu-texts">
                    <span>{item.title}</span>
                  </s.StyledLink>
                </s.StyledLi>
              ))}
            </s.StyledUl>

            <s.StyledUl className="nav-menu-items">
              {isMobile && <DarkModeButton />}
            </s.StyledUl>
          </s.SideBar>
        </s.NavBar>
      </s.SideBar>
    </>
  );
};

export default SideBar;
