import { ReactNode } from "react";
import { GlobalStyle } from "../../styles/GlobalStyles";
import { AuthProvider } from "../AuthContext";
import { MobileProvider } from "../MobileProvider";
import CustomThemeProvider from "../ThemeContext";


export default function Providers({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <CustomThemeProvider>
                <MobileProvider>
                    <GlobalStyle />
                    {children}
                </MobileProvider>
            </CustomThemeProvider>
        </AuthProvider>
    )
}
