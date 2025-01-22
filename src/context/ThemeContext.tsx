import { useState, createContext, ReactNode, Dispatch, SetStateAction } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../stores/colors";

export interface ThemeContextType {
  isDark: boolean;
  setIsDark: Dispatch<SetStateAction<boolean>>;
}
export const ThemeContext = createContext<ThemeContextType | null>(null);

const CustomThemeProvider = ({ children }: {children: ReactNode;}) => {
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