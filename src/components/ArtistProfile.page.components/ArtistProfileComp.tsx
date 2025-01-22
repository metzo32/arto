import {
  Section,
  Div,
  H1,
  H2,
  H3,
  H4,
  BarImg,
  Button,
  P,
  Img,
} from "./ArtistProfile.style";
import type { ArtistDataProps } from "../../assets/datas/artitstData";
import useWindowSize from "../../hooks/useWindowSize";
import { useModal } from "../../hooks/useModal";
import { PopUpBelow } from "../FramerMotions/scrollMotions";
import artistdata from "../../assets/datas/artitstData";
import NameCard from "./NameCard/NameCard";

import Modal from "../Modal/Modal";
import Sidebar from "./Sidebar/Sidebar";

export default function ArtistProfileComp({
  artist,
}: {
  artist: ArtistDataProps;
}) {
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    event.stopPropagation(); // 스크롤 이벤트 전파 차단
  };

  const { isMobile } = useWindowSize();
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <Div className="wrapper" onScroll={handleScroll}>
      {isMobile ? null : (
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
      )}

      <Div className="test">내용</Div>
      <Div className="test">내용</Div>
      <Div className="test">
        <Section>
          <Div className="main-img-container">
            {!isMobile && (
              <Div className="text-container">
                <H1>Artist page of {artist.nickname}</H1>
                <P className="introduction">{artist.introduction}</P>
                <Button>버튼</Button>
              </Div>
            )}

            <Img src={artist.randomImage} alt="이미지" className="main-img" />
          </Div>
        </Section>

        <Section className="value">
          <H2>Top values of {artist.nickname}</H2>
          <H3>{artist.introduction}</H3>
          <Div className="skills-container">
            {artist.skills.map((skill) => (
              <Div key={skill.id} className="skills-box">
                <Div className="skills-title">
                  <Div className="icon-container">
                    <skill.icon />
                  </Div>
                  <H4>{skill.skill}</H4>
                </Div>
                <P className="skill">기술 설명 키워드</P>
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

        <Section className="narrow">
          <NameCard artist={artist} />
          <Sidebar />
        </Section>
        <button onClick={openModal}>Open Modal</button>
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="잠깐!"
          content="모달창을 열었습니다."
        />
      </Div>
    </Div>
  );
}
