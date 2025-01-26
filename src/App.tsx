import { useState, useEffect } from "react";
import "./App.css";
import { AppContainer } from "./stores/App_style";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { AuthContext } from "./context/AuthContext";
import ProtectedRouteHoc from "./components/ProtectedRouteHoc";
import CustomThemeProvider from "./context/ThemeContext";
import { MobileProvider } from "./context/MobileProvider";
import Header from "./components/Header/Header";
import Login from "./pages/Login";
import Article from "./pages/Article";
import Profile from "./pages/Profile";
import ArtistProfile from "./pages/ArtistProfile";
import RegisterTerms from "./pages/RegisterTerms";
import Register from "./pages/Register";
import ScrollToTopButton from "./components/ScrollToTopButton";
import artistdata from "./assets/datas/artitstData";
import { GlobalStyle } from "./stores/GlobalStyles";
import Test from "./components/Header/Test";

const App = () => {
  // const [artistData, setArtistData] = useState<ArtistDataProps[]>(artistdata);

  const [currentlyLoggedIn, setCurrentlyLoggedIn] = useState(false);
  const [isFolded, setIsFolded] = useState(() => {
    // localStorage에서 초기값 가져오기
    const savedValue = localStorage.getItem("isFolded");
    return savedValue === "true"; // 문자열을 불리언으로 변환
  });

  const handleFoldMenu = () => {
    setIsFolded(!isFolded);
  };

  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보를 확인하여 로그인 상태 설정
    const savedLoggedIn = localStorage.getItem("currentlyLoggedIn");
    if (savedLoggedIn === "true") {
      setCurrentlyLoggedIn(true);
    }
  }, []);

  // 로그인 상태 변경 시 로컬 스토리지에 반영
  useEffect(() => {
    localStorage.setItem("currentlyLoggedIn", currentlyLoggedIn.toString());
  }, [currentlyLoggedIn]);

  return (
    <>
      <AuthContext.Provider value={{ currentlyLoggedIn, setCurrentlyLoggedIn }}>
        <CustomThemeProvider>
          <MobileProvider>
            <GlobalStyle/>
              <AppContainer>
                <Router>
                  <Header isNarrow={isFolded} handleFold={handleFoldMenu}/>
                  <Routes>
                    <Route path="/" element={<Article isNarrow={isFolded}/>} />
                    <Route path="/login" element={<Login />} />
                    <Route
                      path="/my"
                      element={
                        <ProtectedRouteHoc>
                        <Profile />
                        </ProtectedRouteHoc>
                      }
                    />
                    <Route path="/registerterms" element={<RegisterTerms />} />
                    <Route path="/register" element={<Register />} />

                    {artistdata.map((artist) => {
                      if (!artist.nickname) return null; // nickname이 없는 경우 건너뜀
                      return (
                        <Route
                          key={artist.id}
                          path={`/profile_artist_${artist.nickname}`}
                          element={<ArtistProfile key={artist.id} artist={artist} />}
                        />
                      );
                    })}
                  </Routes>
                </Router>
              </AppContainer>
          </MobileProvider>
        </CustomThemeProvider>
      </AuthContext.Provider>
    </>
  );
};

export default App;
