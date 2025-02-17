import { IconType } from "react-icons";
import { HiOutlineHome } from "react-icons/hi";
import { BiNews } from "react-icons/bi";
import { MdOutlineWorkspaces } from "react-icons/md";
import { MdOutlineWebhook } from "react-icons/md";
import { MdGraphicEq } from "react-icons/md";
import { PiUserCircleDuotone } from "react-icons/pi";

interface HeaderDataProps {
  id: string;
  icon?: IconType;
  name: string;
  path: string;
}
export const headerData: HeaderDataProps[][] = [
  [
    { id: "Home", icon: HiOutlineHome, name: "Home", path: "/" },
    {
      id: "New",
      icon: MdOutlineWorkspaces,
      name: "New",
      path: "/profile_artist/Ole",
    },
    {
      id: "Upcoming",
      icon: MdOutlineWebhook,
      name: "Upcoming",
      path: "/profile_artist/Caz",
    },
  ],
  [
    {
      id: "Login",
      icon: PiUserCircleDuotone,
      name: "로그인",
      path: "/login",
    },
    {
      id: "Hot",
      icon: MdGraphicEq,
      name: "Hot",
      path: "/profile_artist/Karel",
    },
    {
      id: "For you",
      icon: BiNews,
      name: "For you",
      path: "/profile_artist/Valentine",
    },
  ],
];

export const extraItem: HeaderDataProps = {
  id: "Login",
  icon: PiUserCircleDuotone,
  name: "로그인",
  path: "/login",
};
