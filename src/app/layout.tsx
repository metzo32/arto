"use client";

import "../styles/globals.css";
import { ReactNode, useState, useEffect } from "react";
import { Div } from "../stores/App_style";
import { AuthContext } from "../context/AuthContext";
import CustomThemeProvider from "../context/ThemeContext";
import { MobileProvider } from "../context/MobileProvider";
import { GlobalStyle } from "../stores/GlobalStyles";
import Header from "../components/Header/Header";
import ScrollToTopbutton from "../components/ScrollToTopButton/ScrollToTopButton";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [currentlyLoggedIn, setCurrentlyLoggedIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("currentlyLoggedIn", currentlyLoggedIn.toString());
    }
  }, [currentlyLoggedIn]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <html lang="kr">
      <body>
        <AuthContext.Provider
          value={{ currentlyLoggedIn, setCurrentlyLoggedIn }}
        >
          <CustomThemeProvider>
            <MobileProvider>
              <GlobalStyle />
              <Div className="app-container">
                <Header />
                <Div className={`main ${isMounted ? "" : "default"}`}>{children}</Div>
                <ScrollToTopbutton />
              </Div>
            </MobileProvider>
          </CustomThemeProvider>
        </AuthContext.Provider>
      </body>
    </html>
  );
}
