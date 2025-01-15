import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useTransform, useScroll, useMotionValueEvent } from "framer-motion";
import useWindowSize from "../../hooks/useWindowSize";

interface SnapParentProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const StyledSnapParent = styled.div`
  scroll-snap-type: y mandatory;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 100vh;
  position: relative;
`;

const SnapParent = React.forwardRef<HTMLDivElement, SnapParentProps>(
  ({ children, ...props }, ref) => (
    <StyledSnapParent ref={ref} {...props}>
      {children}
    </StyledSnapParent>
  )
);

export const ScrollArticle = ({ children }: { children: React.ReactNode }) => {
  const windowSize = useWindowSize();
  const ref = useRef(null);

  const { scrollY, scrollYProgress } = useScroll({
    container: ref, // 여기서 container로 ref를 넘김
  });

  const pageRange = [0, 0.15, 0.3, 0.5, 0.7, 1];
  const lengthRange = ["75vh", "45vh", "50vh", "45vh", "50vh", "100vh"];
  const calcHeight = useTransform(scrollYProgress, pageRange, lengthRange);

  const [scrollYValue, setScrollYValue] = useState(0);
  const [scrollYProgressValue, setScrollYProgressValue] = useState(0);

  const refreshPage = () => {
    window.location.reload();
  };

  // scrollY 변화 감지
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrollYValue(latest);
  });

  // scrollYProgress 변화 감지
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollYProgressValue(latest);
  });

  useEffect(() => {}, [scrollY, scrollYProgress]);

  return <SnapParent ref={ref}>{children}</SnapParent>;
};
