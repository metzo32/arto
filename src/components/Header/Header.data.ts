import { IconType } from "react-icons";
import { BiNews } from "react-icons/bi";
import { MdOutlineWorkspaces } from "react-icons/md";
import { MdOutlineWebhook } from "react-icons/md";
import { MdGraphicEq } from "react-icons/md";
import { PiBellSimpleDuotone } from "react-icons/pi";
import { IoCaretUpCircleOutline } from "react-icons/io5";
import { IoCaretDownCircleOutline } from "react-icons/io5";
import { PiUserCircleDuotone } from "react-icons/pi";

interface HeaderDataProps {
  id: string;
  icon?: IconType;
  name: string;
  path: string;
}
export const headerData: HeaderDataProps[][] = [
  [
    { id: "Home", icon: BiNews, name: "Home", path: "/" },
    { id: "New", icon: MdOutlineWorkspaces, name: "New", path: "/" },
    { id: "Upcoming", icon: MdOutlineWebhook, name: "Upcoming", path: "/" },
  ],
  [
    {
      id: "Hot",
      icon: MdGraphicEq,
      name: "Hot",
      path: "/profile_artist_Lesly",
    },
    {
      id: "For you",
      icon: PiBellSimpleDuotone,
      name: "For you",
      path: "/profile_artist_Emalia",
    },
  ],
  [
    {
      id: "Login",
      icon: PiUserCircleDuotone,
      name: "Login",
      path: "/login",
    },
    {
      id: "Register",
      icon: PiUserCircleDuotone,
      name: "Register",
      path: "/register",
    },
    {
      id: "my",
      icon: PiUserCircleDuotone,
      name: "My page",
      path: "/my",
    },
  ],
];
