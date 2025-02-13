"use client";

import "../styles/globals.css";
import { Div, Main } from "../stores/App_style";
import { ReactNode, useState, useEffect } from "react";
import { AuthProvider } from "../context/AuthContext";
import CustomThemeProvider from "../context/ThemeContext";
import { MobileProvider } from "../context/MobileProvider";
import { GlobalStyle } from "../stores/GlobalStyles";
import Header from "../components/Header/Header";
import ScrollToTopbutton from "../components/ScrollToTopButton/ScrollToTopButton";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <html lang="kr">
      <body>
        <AuthProvider>
          <CustomThemeProvider>
            <MobileProvider>
              <GlobalStyle />
              <Div className="app-container">
                <Header />
                <Main className={`${isMounted ? "" : "default"}`}>
                  {children}
                </Main>
                <ScrollToTopbutton />
              </Div>
            </MobileProvider>
          </CustomThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
