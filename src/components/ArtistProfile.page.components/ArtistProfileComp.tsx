"use client";

import {
  Section,
  Div,
  Span,
  H1,
  H2,
  H3,
  H4,
  P,
  Img,
} from "./ArtistProfile.style";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import useWindowSize from "../../hooks/useWindowSize";
import useLoading from "../../hooks/useLoading";
import type { ArtistDataProps } from "../../../public/assets/datas/artistData";
import { BaseButton } from "../../../public/assets/design-assets/BaseButton/BaseButton";
import NameCard from "./NameCard/NameCard";
import ScrollToTopbutton from "../ScrollToTopButton/ScrollToTopButton";
import Sidebar from "./Sidebar/Sidebar";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { getSkillsIcons } from "../../../public/assets/datas/getSkillsIcons";

export default function ArtistProfileComp() {
  const { isMobile } = useWindowSize();
  const contactRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [artist, setArtist] = useState<ArtistDataProps | null>(null);
  const { isLoading, setIsLoading } = useLoading();

  const params = useParams();

  const nickname = params.nickname as string;
  
  useEffect(() => {
    const fetchArtist = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/indiv?nickname=${nickname}`);
        if (!res.ok) throw new Error("Failed to fetch artist data");

        const data = await res.json();
        setArtist(data); // 단일 아티스트 데이터 저장
      } catch (error) {
        console.error("Error fetching artist data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtist();
  }, [nickname, setIsLoading]);

  useEffect(() => {
    if (!artist || !contactRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    observer.observe(contactRef.current);

    return () => {
      observer.disconnect();
    };
  }, [artist]);

  if (isLoading) {
    return (
      <Div className="wrapper">
        <LoadingSpinner />
      </Div>
    );
  }

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
          <Img
            src={artist.mainImage}
            alt={artist.nickname}
            className="main-img"
          />
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
          {artist.skills.map((skill) => {
            const IconComponent = getSkillsIcons(skill.iconName);
            return (
              <Div key={skill.id} className="skills-box">
                <Div className="skills-title">
                  <Div className="icon-container">
                    {IconComponent ? <IconComponent /> : null}
                  </Div>
                  <H4>{skill.skill}</H4>
                </Div>
                <P className="skill">{skill.skill}에 대한 키워드</P>
              </Div>
            );
          })}
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
        <Sidebar isVisible={isVisible} />
      </Section>
      <ScrollToTopbutton />
    </Div>
  );
}
