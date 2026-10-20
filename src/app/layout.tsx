import { ReactNode } from "react";
import Providers from "../context/providers/Providers";
import ScrollToTopButton from "../components/ScrollToTopButton/ScrollToTopButton";
import Sidebar from "../components/Sidebar/Sidebar";
import StyledComponentsRegistry from "../lib/StyledComponentsRegistry";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="kr">
      <body>
        <StyledComponentsRegistry>
          <Providers>
       <main>
       <Sidebar />
       {children}
       </main>
              {/* <ScrollToTopButton /> */}
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}