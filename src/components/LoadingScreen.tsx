import React, { useEffect } from "react";

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

const LoadingScreen = ({ onLoadComplete }: LoadingScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadComplete();
    }, 500); // 0.5초 후 로딩 완료

    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  return (
    <div className="loading-screen">
      <div className="loading-content">Loading...</div>
    </div>
  );
};

export default LoadingScreen;
