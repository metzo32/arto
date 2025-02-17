"use client";

import { HeaderTag, Nav, Div, Links, Span, Brand } from "./Header.style";
import { useContext, useState, useEffect, use } from "react";
import { useRouter, usePathname } from "next/navigation";
import { headerData, extraItem } from "./Header.data";
import { AuthContext } from "../../context/AuthContext";
import useWindowSize from "../../hooks/useWindowSize";
import { useIsHeaderFolded } from "../../stores/states/isHeaderFolded";
import DarkModeButton from "../DarkModeButton/DarkModeButton";
import RoundButton from "../../../public/assets/design-assets/RoundButton/RoundButton";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

const Header = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const { isMobile } = useWindowSize();
  const { folded, foldAction } = useIsHeaderFolded();
  const { currentlyLoggedIn } = useContext(AuthContext);
  const [clickedItem, setClickedItem] = useState<string | null>(null); //현재 클릭된 인덱스 저장

  const clickLogoHandler = () => {
    router.push("/");
  };

  return (
    <>
      <Div className="header-area" />
      <HeaderTag className={`${folded ? "fold" : ""}`}>
        <Nav>
          <Div>
            {isMobile ? null : (
              <Div className={`brand-box ${folded ? "fold" : ""}`}>
                {folded || isMobile ? null : (
                  <Brand onClick={clickLogoHandler} />
                )}
                <RoundButton onClick={foldAction}>
                  {folded ? <FaArrowRight /> : <FaArrowLeft />}
                </RoundButton>
              </Div>
            )}

            {headerData.map((group, groupIndex) => (
              <Div key={groupIndex} className="line-box">
                {group.map((item, index) => (
                  <Links
                    key={item.id}
                    href={item.path}
                    className={`menu-button ${
                      (currentPath === "/" &&
                        groupIndex === 0 &&
                        index === 0) ||
                      clickedItem === item.id
                        ? ""
                        : ""
                    } ${folded ? "fold-btn" : ""}`}
                  >
                    <Span>{item.icon && <item.icon />}</Span>
                    {isMobile || folded ? null : <Span>{item.name}</Span>}
                  </Links>
                ))}
              </Div>
            ))}

            <Div className="line-box">
              <Links
                key={extraItem.id}
                href={extraItem.path}
                className={`menu-button ${
                  clickedItem === extraItem.id ? "" : ""
                } ${folded ? "fold-btn" : ""}`}
              >
                <Span>{extraItem.icon && <extraItem.icon />}</Span>
                {isMobile || folded ? null : (
                  <Span>
                    {currentlyLoggedIn ? "회원 페이지" : extraItem.name}
                  </Span>
                )}
              </Links>
            </Div>
            <Div className="line-box">
              <DarkModeButton isNarrow={folded} isMobile={isMobile} />
            </Div>
          </Div>
        </Nav>
      </HeaderTag>
    </>
  );
};

export default Header;
