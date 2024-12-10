import React, { useState, useEffect } from "react";
import "./App.css";
import s from "./stores/styling";
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

import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import Article from "./pages/Article";

import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import ArtistProfile from "./pages/ArtistProfile";
import RegisterTerms from "./pages/RegisterTerms";
import RegisterPage from "./pages/RegisterPage";
import ScrollTest from "./pages/ScrollTest";
import ArtistData from "./assets/datas/artitst_data";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Modal from "./components/Modal";
import GenerateImage from "./pages/GenerateImage";
import Loading from "./components/Loading";

const App = () => {
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
            <s.GlobalStyle />
            <s.App className="wrapper">
              <Router>
                <Header />
                <ScrollToTopButton />
                <Routes>
                  <Route path="/" element={<GenerateImage />} />
                  <Route path="/article" element={<Article />} />
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

                  <Route
                    path="/your_custom_tattoo"
                    element={<GenerateImage />}
                  />
                  <Route path="/scroll" element={<ScrollTest />} />
                  {ArtistData.map((artist) => (
                    <Route
                      key={artist.id}
                      path={`/profile_artist_${artist.nickname}`}
                      element={<ArtistProfile artist={artist} />}
                    />
                  ))}
                </Routes>

                <FooterRender />
              </Router>
            </s.App>
          </MobileProvider>
        </CustomThemeProvider>
      </AuthContext.Provider>
    </>
  );
};

const FooterRender = () => {
  const location = useLocation();

  const renderFooter = location.pathname !== "/article";
  const footerStyleException =
    location.pathname === "/your_custom_tattoo"
      ? "footer-wrapper-exception"
      : "footer-wrapper";

  return renderFooter ? (
    <Footer wrapperClassName={footerStyleException} />
  ) : null;
};

export default App;
