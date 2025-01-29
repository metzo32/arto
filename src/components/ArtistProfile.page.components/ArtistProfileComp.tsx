import {
  Section,
  Div,
  Span,
  H1,
  H2,
  H3,
  H4,
  BarImg,
  P,
  Img,
} from "./ArtistProfile.style";
import { useState, useEffect, useRef } from "react";
import type { ArtistDataProps } from "../../assets/datas/artitstData";
import useWindowSize from "../../hooks/useWindowSize";
import { PopUpBelow } from "../FramerMotions/scrollMotions";
import NameCard from "./NameCard/NameCard";
import { BaseButton } from "../../assets/design-assets/BaseButton/BaseButton";
import ScrollToTopbutton from "../ScrollToTopButton/ScrollToTopButton";

import Sidebar from "./Sidebar/Sidebar";

export default function ArtistProfileComp({
  artist,
}: {
  artist: ArtistDataProps;
}) {
  const contactRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 단일한 요소를 구조분해할당

        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
        console.log(isVisible);
      },
      {
        root: null, // viewport 기준
        rootMargin: "0px",
        threshold: 0.6, // 30% 이상 보일 때 감지
      }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, [isVisible]);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    event.stopPropagation(); // 스크롤 이벤트 전파 차단
  };

  const { isMobile } = useWindowSize();

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <Div className="wrapper" onScroll={handleScroll}>
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
                onClick={scrollToBottom}
              />
            </Span>
          </Div>

          <Img src={artist.mainImage} alt="이미지" className="main-img" />
        </Div>
      </Section>

      {!isMobile && (
        <Section>
          <Div className="image-container">
            <BarImg
              src={artist.randomImage04}
              alt={artist.nickname}
              className="left"
            />
            <BarImg
              src={artist.randomImage01}
              alt={artist.nickname}
              className="right"
            />
          </Div>
        </Section>
      )}

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

      <Section className="narrow">
        <H2 className="left-title">History</H2>
        <Div className="card-wrapper">
          <Div className="card-container">
            {[
              artist.randomImage01,
              artist.randomImage02,
              artist.randomImage03,
              artist.randomImage04,
            ].map((image, index) => (
              <Div key={index} className="skills-card">
                <Img src={image} alt={artist.nickname} className="card-img" />
                <Div className="history-box">
                  <H4>제목</H4>
                  <P className="skill">YYYY MM DD</P>
                </Div>
              </Div>
            ))}
          </Div>
        </Div>
      </Section>

      <Section ref={contactRef} className="narrow">
        <NameCard artist={artist} />
        {isVisible && <Sidebar isVisible={isVisible} />}
      </Section>
      <ScrollToTopbutton />
    </Div>
  );
}
