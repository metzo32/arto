import { useState } from "react";

export function useLoading() {
  const [isLoading, setIsLoading] = useState(true);

  const loadingProgress = () => {
    setTimeout(() => {
      setIsLoading(false); // 로딩 종료
    }, 300);
  };
  return { isLoading, setIsLoading, loadingProgress};
}