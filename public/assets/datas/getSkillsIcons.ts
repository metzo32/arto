import { FC } from "react";
import { IconBaseProps } from "react-icons";
import {
  RiLayoutMasonryLine,
  RiCheckboxMultipleBlankFill,
  RiPaintFill,
} from "react-icons/ri";
import { IoApertureOutline, IoShareSocialOutline } from "react-icons/io5";
import { FaEnvira, FaCircleNotch, FaGripfire } from "react-icons/fa";
import { MdPieChart } from "react-icons/md";
import { LuTreePine } from "react-icons/lu";

export const iconMap = {
  RiLayoutMasonryLine,
  RiCheckboxMultipleBlankFill,
  IoApertureOutline,
  FaEnvira,
  IoShareSocialOutline,
  RiPaintFill,
  MdPieChart,
  FaCircleNotch,
  FaGripfire,
  LuTreePine,
};

export type IconName = keyof typeof iconMap;

// ✅ 강제 타입 캐스팅 사용
export const getSkillsIcons = (iconName: IconName): FC<IconBaseProps> => {
  return iconMap[iconName] as FC<IconBaseProps>;
};
