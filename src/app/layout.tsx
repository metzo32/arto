"use client"

import { Div, Main } from "../stores/App_style";
import { ReactNode } from "react";
import Providers from "../context/providers/Providers";
import ScrollToTopButton from "../components/ScrollToTopButton/ScrollToTopButton";
import Header from "../components/Header/Header";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="kr">
      <body>
        <Providers>
          <Div className="app-container">
            <Header />
            <Main>{children}</Main>
            <ScrollToTopButton />
          </Div>
        </Providers>
      </body>
    </html>
  );
}