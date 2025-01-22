import { useState, useEffect } from "react";

const ScrollToTbutton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <div className="scroll-top-box">
          <button onClick={handleScrollToTop} className="scroll-top-btn">
            {/* <s.TopArrowIcon /> */}
            위로 화살표 아이콘
          </button>
        </div>
      )}
    </>
  );
};

export default ScrollToTbutton;
