import { Div, H3, P, BrandDark, BrandLight, A } from "./NameCard.style";
import type { ArtistDataProps } from "../../../../public/assets/datas/artitstData";
import { useDark } from "../../../hooks/useDark";

export default function NameCard({ artist }: { artist: ArtistDataProps }) {
  const copyHandler = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(`${artist.street_address}, ${artist.city}`);
    alert("주소가 복사되었습니다!");
  };

  const isDark = useDark();

  return (
    <Div className="wrapper">
      <Div className="contact-container">
        <Div className="name-container">
          <H3>
            {artist.nickname} {artist.last_name}
          </H3>
          <P>Artist</P>
        </Div>
        <Div className="name-container">
          <A href={`mailto:${artist.email}`}>{artist.email}</A>
          <P onClick={copyHandler} className="address">
            {artist.street_address}, {artist.city}
          </P>
          <A href="tel:0000000000">000.000.0000</A>
        </Div>
      </Div>
      {isDark ? <BrandLight /> : <BrandDark />}
    </Div>
  );
}
