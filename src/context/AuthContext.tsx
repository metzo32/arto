"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

interface AuthContextProps {
  currentlyLoggedIn: boolean | null;
  setCurrentlyLoggedIn: (value: boolean | null) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  currentlyLoggedIn: false,
  setCurrentlyLoggedIn: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentlyLoggedIn, setCurrentlyLoggedIn] = useState<boolean | null>(null);

  // Firebase 인증 상태 변화 감지
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const isLoggedIn = !!user;
      setCurrentlyLoggedIn(isLoggedIn);

      if (isLoggedIn) {
        sessionStorage.setItem("isLoggedIn", "true");
      } else {
        sessionStorage.removeItem("isLoggedIn");
      }
    });

    return () => unsubscribe();
  }, []);

  // 페이지 새로고침 시 세션 존재 여부 확인
  useEffect(() => {
    const saved = sessionStorage.getItem("isLoggedIn");

    if (!saved) {
      // 세션이 없으면 로그아웃 처리
      setCurrentlyLoggedIn(false);
      signOut(auth);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currentlyLoggedIn, setCurrentlyLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
