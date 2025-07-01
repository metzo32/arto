"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
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
  const [currentlyLoggedIn, setCurrentlyLoggedIn] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentlyLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentlyLoggedIn, setCurrentlyLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
