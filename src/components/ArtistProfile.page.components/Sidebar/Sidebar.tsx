import { Div, A } from "../ArtistProfile.style";
import { BiLogoFacebook } from "react-icons/bi"; //페이스북
import { AiOutlineTikTok } from "react-icons/ai"; //틱톡
import { RiInstagramLine } from "react-icons/ri"; //인스타그램
import { FaYoutube } from "react-icons/fa6"; //유튜브

export default function Sidebar() {
  return (
    <Div className="contact-side">
      <A
        href="https://www.facebook.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <BiLogoFacebook />
      </A>
      <A
        href="https://www.tiktok.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <AiOutlineTikTok />
      </A>
      <A
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <RiInstagramLine />
      </A>
      <A
        href="https://www.youtube.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaYoutube />
      </A>
    </Div>
  );
}
