import { Div, H1, Img } from "./ArtistProfile.style";
import type { ArtistDataProps } from "../../assets/datas/artitst_data";
import { PopUpBelow } from "../FramerMotions/scrollMotions";

export default function ArtistProfileComp({
  artist,
}: {
  artist: ArtistDataProps;
}) {
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    event.stopPropagation(); // 스크롤 이벤트 전파 차단
  };
  
  return (
    <Div className="wrapper" onScroll={handleScroll}>
      <Div className="box">
        <H1>{artist.nickname}</H1>
      </Div>

      <Div className="image-container">
        <Img src={artist.randomImage} alt={artist.nickname} className="left" />
        <Img
          src={artist.randomImage01}
          alt={artist.nickname}
          className="right"
        />
      </Div>

      <Div className="test">내용</Div>
      <Div className="test">내용</Div>
      <Div className="test">내용</Div>
    </Div>
  );
}
