import {
    RiLayoutMasonryLine,
    RiCheckboxMultipleBlankFill,
    RiPaintFill,
  } from "react-icons/ri";
  import { IoApertureOutline, IoShareSocialOutline } from "react-icons/io5";
  import { FaEnvira, FaCircleNotch, FaGripfire } from "react-icons/fa";
  import { MdPieChart } from "react-icons/md";
  import { LuTreePine } from "react-icons/lu";
  
  const iconMap: { [key: string]: React.ComponentType } = {
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
  
  export const getSkillsIcons = (iconName: string) => {
    return iconMap[iconName] || null;
  };
  