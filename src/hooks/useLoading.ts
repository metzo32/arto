import { useState } from "react";

export default function useLoading() {
  const [isLoading, setIsLoading] = useState(true);

  const loadingProgress = () => {
    setTimeout(() => {
      setIsLoading(false); // 로딩 종료
    }, 300);
  };
  return { isLoading, setIsLoading, loadingProgress};
}