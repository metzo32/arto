"use client";

import { Div, A } from "../ArtistProfile.style";
import { BiLogoFacebook as BiFB } from "react-icons/bi";
import { AiOutlineTikTok as TikTok } from "react-icons/ai";
import { RiInstagramLine as Insta } from "react-icons/ri";
import { FaYoutube as YouTube } from "react-icons/fa6";
import type { IconBaseProps } from "react-icons";

const FacebookIcon = BiFB as React.FC<IconBaseProps>;
const TikTokIcon = TikTok as React.FC<IconBaseProps>;
const InstagramIcon = Insta as React.FC<IconBaseProps>;
const YouTubeIcon = YouTube as React.FC<IconBaseProps>;

export default function Sidebar({ isVisible }: { isVisible: boolean }) {
  return (
    <Div className={`contact-side ${isVisible ? "visible" : "invisible"}`}>
      <A
        href="https://www.facebook.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FacebookIcon size={20} />
      </A>
      <A
        href="https://www.tiktok.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <TikTokIcon size={20} />
      </A>
      <A
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <InstagramIcon size={20} />
      </A>
      <A
        href="https://www.youtube.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <YouTubeIcon size={20} />
      </A>
    </Div>
  );
}
