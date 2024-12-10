import { useState, ReactNode } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeContext } from "./ThemeContext";
import { lightTheme, darkTheme } from "../stores/colors";

interface CustomThemeProviderProps {
  children: ReactNode;
}

const CustomThemeProvider = ({ children }: CustomThemeProviderProps) => {
  const [isDark, setIsDark] = useState<boolean>(false);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <StyledThemeProvider theme={isDark ? darkTheme : lightTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export default CustomThemeProvider;
