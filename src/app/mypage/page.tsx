"use client";

import { useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ProfileComp from "../../components/Profile.page.component/ProfileComp";
import { useRouter } from "next/navigation";
import useLoading from "../../hooks/useLoading";

export default function MyPage() {
  const { currentlyLoggedIn } = useContext(AuthContext);
  const router = useRouter();
  const { setIsLoading } = useLoading();

  useEffect(() => {
    if (!currentlyLoggedIn) {
      router.push("/login"); 
    } else {
      setIsLoading(false);
    }
  }, [currentlyLoggedIn, router, setIsLoading]);

  return <ProfileComp />;
}
