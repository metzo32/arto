"use client";

import { Section, Div, Span, H1, H2, H3, H4, P } from "./ArtistProfile.style";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import useWindowSize from "../../hooks/useWindowSize";
import { BaseButton } from "../../../public/assets/design-assets/BaseButton/BaseButton";
import NameCard from "./NameCard/NameCard";
import ScrollToTopbutton from "../ScrollToTopButton/ScrollToTopButton";
import Sidebar from "./Sidebar/Sidebar";
import artistdata from "../../../public/assets/datas/artitstData"; // 아티스트 데이터 가져오기

export default function ArtistProfileComp() {
  const { isMobile } = useWindowSize();
  const contactRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const params = useParams();
  const nickname = params.nickname as string;

  const artist = artistdata.find((artist) => artist.nickname === nickname);

  useEffect(() => {
    if (!contactRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    });

    observer.observe(contactRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  if (!artist) {
    return (
      <Div className="wrapper">
        <H1>아티스트를 찾을 수 없습니다.</H1>
      </Div>
    );
  }

  const handleScrollToBottom = () => {
    window.scrollTo({
      top: 3000,
      behavior: "smooth",
    });
  };

  return (
    <Div className="wrapper">
      <Section>
        <Div className="main-img-container">
          <Div className="text-container">
            <Div className="text-box">
              <H1>{artist.nickname}</H1>
              {!isMobile && (
                <P className="introduction">{artist.introduction}</P>
              )}
            </Div>
            <Span>
              <BaseButton
                type="button"
                text="연락하기"
                onClick={handleScrollToBottom}
              />
            </Span>
          </Div>
        </Div>
      </Section>

      <Section className="value">
        <H2>
          Top values of <Span>{artist.nickname}</Span>
        </H2>
        <H3>{artist.introduction}</H3>
        <Div className="skills-container">
          {artist.skills.map((skill) => (
            <Div key={skill.id} className="skills-box">
              <Div className="skills-title">
                <Div className="icon-container">
                  <skill.iconName />
                </Div>
                <H4>{skill.skill}</H4>
              </Div>
              <P className="skill">{skill.skill}에 대한 키워드</P>
            </Div>
          ))}
        </Div>
      </Section>

      <Section ref={contactRef} className="narrow">
        <NameCard artist={artist} />
        <Sidebar isVisible={isVisible} />
      </Section>
      <ScrollToTopbutton />
    </Div>
  );
}
