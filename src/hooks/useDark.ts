import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const useDark = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useDark must be used within a CustomThemeProvider");
  }

  return context.isDark;
};
