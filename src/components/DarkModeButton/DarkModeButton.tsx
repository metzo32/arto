import { useContext, useEffect } from "react";
import { Button, Span } from "../Header/Header.style";
import { ThemeContext } from "../../context/ThemeContext";
import { FiSun } from "react-icons/fi";
import { FiMoon } from "react-icons/fi";

interface DarkModeButtonProps {
  isNarrow: boolean;
  isMobile: boolean;
}

const DarkModeButton = ({ isNarrow, isMobile }: DarkModeButtonProps) => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("DarkModeToggleButton must be used within a ThemeProvider");
  }
  const { isDark, setIsDark } = themeContext;

  useEffect(() => {
    const savedTheme = localStorage.getItem("isDark");
    if (savedTheme) {
      setIsDark(JSON.parse(savedTheme));
    }
  }, [setIsDark]);

  const toggleDark = () => {
    setIsDark((prevMode: boolean) => {
      const newMode = !prevMode;
      localStorage.setItem("isDark", JSON.stringify(newMode));
      return newMode;
    });
  };

  return (
    <Button
      onClick={toggleDark}
      className={`menu-button selected hovered ${isNarrow ? "fold-btn" : ""}`}
    >
      <Span>{isDark ? <FiSun /> : <FiMoon />}</Span>
      {!isNarrow &&
        !isMobile &&
        (isDark ? <Span>Light View</Span> : <Span>Dark View</Span>)}
    </Button>
  );
};

export default DarkModeButton;
