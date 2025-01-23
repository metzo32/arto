import { createContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

interface AuthContextProps {
  currentlyLoggedIn: boolean;
  setCurrentlyLoggedIn: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  currentlyLoggedIn: false,
  setCurrentlyLoggedIn: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentlyLoggedIn, setCurrentlyLoggedIn] = useState(false);

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
