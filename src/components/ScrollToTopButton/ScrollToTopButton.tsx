import { useState, useEffect } from "react";
import { Div, Button } from "./ScrollToTopButton.style";
import { RiArrowUpDoubleFill } from "react-icons/ri";


const ScrollToTopbutton = () => {
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
    <Div>
      <Button onClick={handleScrollToTop}>
        <RiArrowUpDoubleFill/>
      </Button>
    </Div>
  );
};

export default ScrollToTopbutton;
