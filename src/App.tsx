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
import Loading from "./components/Loading";
import artistdata from "./assets/datas/artitstData";
import { GlobalStyle } from "./stores/GlobalStyles";

const App = () => {
  // const [artistData, setArtistData] = useState<ArtistDataProps[]>(artistdata);

  const [currentlyLoggedIn, setCurrentlyLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 추가

  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보를 확인하여 로그인 상태 설정
    const savedLoggedIn = localStorage.getItem("currentlyLoggedIn");
    if (savedLoggedIn === "true") {
      setCurrentlyLoggedIn(true);
    }
    setIsLoading(false); // 로딩 완료 시 상태 변경
  }, []);

  // 로그인 상태 변경 시 로컬 스토리지에 반영
  useEffect(() => {
    localStorage.setItem("currentlyLoggedIn", currentlyLoggedIn.toString());
  }, [currentlyLoggedIn]);

  // 초기 로딩 중이면 로딩 표시
  if (isLoading) {
    return <Loading />; // 로딩 화면에 헤더와 푸터가 보이지 않도록 설정
  }

  return (
    <>
      <AuthContext.Provider value={{ currentlyLoggedIn, setCurrentlyLoggedIn }}>
        <CustomThemeProvider>
          <MobileProvider>
            <GlobalStyle/>
              <AppContainer>
                <Router>
                  <Header />
                  <Routes>
                    <Route path="/" element={<Article />} />
                    <Route path="/login" element={<Login />} />

                    <Route path="/loading" element={<Loading />} />

                    <Route
                      path="/my"
                      element={
                        // <ProtectedRouteHoc>
                        <Profile />
                        // </ProtectedRouteHoc>
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
                          element={<ArtistProfile artist={artist} />}
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
