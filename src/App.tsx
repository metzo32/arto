import React, { useState, useEffect } from "react";
import "./App.css";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { AuthContext } from "./context/AuthContext";
import ProtectedRouteHoc from "./components/ProtectedRouteHoc";
import CustomThemeProvider from "./context/CustomThemeProvider";
import { MobileProvider } from "./context/MobileContext";

import Header from "./components/Header/Header";
import LoginPage from "./pages/LoginPage";
import Article from "./pages/Article";

import Profile from "./pages/Profile";
import ArtistProfile from "./pages/ArtistProfile";
import RegisterTerms from "./pages/RegisterTerms";
import RegisterPage from "./pages/RegisterPage";
import ArtistData from "./assets/datas/artitst_data";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Loading from "./components/Loading";
import { ArtistDataProps } from "./assets/datas/artitst_data";
import artistdata from "./assets/datas/artitst_data";

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

  const AppContainer = styled.div`
    display: flex;
    flex-direction: row;
    min-width: 320px;
    height: auto;
    background-color: ${(props) => props.theme.Light};
    position: relative;
    overflow: hidden;G
  `;

  return (
    <>
      <AuthContext.Provider value={{ currentlyLoggedIn, setCurrentlyLoggedIn }}>
        <CustomThemeProvider>
          <MobileProvider>
            <AppContainer>
              <Router>
                <Header />
                <Routes>
                  <Route path="/" element={<Article />} />
                  <Route path="/login" element={<LoginPage />} />

                  <Route path="/loading" element={<Loading />} />

                  <Route
                    path="/profile"
                    element={
                      <ProtectedRouteHoc>
                        <Profile />
                      </ProtectedRouteHoc>
                    }
                  />
                  <Route path="/registerterms" element={<RegisterTerms />} />
                  <Route path="/register" element={<RegisterPage />} />

                  {ArtistData.map(
                    (
                      artist // 아티스트 명에 따른 동적 경로 생성
                    ) => (
                      <Route
                        key={artist.id}
                        path={`/profile_artist_${artist.nickname.toLowerCase()}`}
                        element={<ArtistProfile artist={artist} />} //해당 아티스트 아이템으로 페이지 구성
                      />
                    )
                  )}
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
