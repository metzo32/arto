import type { FC } from "react";
import type { IconBaseProps } from "react-icons";
import { HiOutlineHome } from "react-icons/hi";
import { BiNews } from "react-icons/bi";
import { MdOutlineWorkspaces, MdOutlineWebhook, MdGraphicEq } from "react-icons/md";
import { PiUserCircleDuotone } from "react-icons/pi";

// 아이콘 타입 명확히 지정
interface SidebarDataProps {
  id: string;
  icon?: FC<IconBaseProps>;
  name: string;
  path: string;
}

// 모든 아이콘을 FC<IconBaseProps>로 단언
export const SidebarData: SidebarDataProps[][] = [
  [
    { id: "Home", icon: HiOutlineHome as FC<IconBaseProps>, name: "Home", path: "/" },
    {
      id: "New",
      icon: MdOutlineWorkspaces as FC<IconBaseProps>,
      name: "New",
      path: "/detail/Ole",
    },
    {
      id: "Upcoming",
      icon: MdOutlineWebhook as FC<IconBaseProps>,
      name: "Upcoming",
      path: "/detail/Caz",
    },
  ],
];

export const extraItem: SidebarDataProps = {
  id: "Login",
  icon: PiUserCircleDuotone as FC<IconBaseProps>,
  name: "로그인",
  path: "/login",
};
