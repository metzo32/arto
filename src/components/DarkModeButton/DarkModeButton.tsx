import { useContext, useEffect } from "react";
import { Button, Span } from "../Header/Header.style";
import { ThemeContext } from "../../context/ThemeContext";
import { FiSun } from "react-icons/fi";
import { FiMoon } from "react-icons/fi";

interface DarkModeButtonProps {
  isFolded: boolean;
}

const DarkModeButton = ({ isFolded }: DarkModeButtonProps) => {
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
  }, []);

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
      className={`menu-button selected ${isFolded ? "fold-btn" : ""}`}
    >
      <Span>{isDark ? <FiSun /> : <FiMoon />}</Span>
      {!isFolded && (isDark ? <Span>Light View</Span> : <Span>Dark View</Span>)}
    </Button>
  );
};

export default DarkModeButton;
