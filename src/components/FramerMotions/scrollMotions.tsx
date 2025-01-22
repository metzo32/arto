import { useState, useRef, useEffect } from "react";
import {
  useInView,
  useAnimation,
  motion,
  useScroll,
  stagger,
} from "framer-motion";
import styled from "styled-components";


interface Props {
  children?: JSX.Element;
  duration?: number;
  delay?: number | undefined;
  variants?: {
    hidden: { opacity?: number; x?: number; y?: number };
    visible: { opacity?: number; x?: number; y?: number };
  };
  text?: string;
}


export const GenImageCircle = styled(motion.div)`
  &.circle-wrapper {
    border: 1px solid white;

    border-radius: 50%;

    width: 80%;
    max-width: 512px;
    aspect-ratio: 1/1;
    margin: 0 auto;
    overflow: hidden;

    opacity: 1;

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
  }
`;


const AnimatedComponent = ({
  children,
  duration = 0.5,
  delay = 0,
  variants,
}: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 }); // 뷰포트 진입할 때마다 애니메이션 실행
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    } else {
      mainControls.start("hidden");
    }
  }, [isInView, mainControls]);

  return (
    <div ref={ref}>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: duration, delay: delay }}
        style={{display: "flex"}}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default AnimatedComponent;

export const PopUpBelow = ({ children, duration, delay }: Props) => {
  const variants = {
    hidden: { opacity: 0, y: 75 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <AnimatedComponent duration={duration} delay={delay} variants={variants}>
      {children}
    </AnimatedComponent>
  );
};

export const CloseDown = ({ children, duration, delay }: Props) => {
  const variants = {
    hidden: { opacity: 0, y: 0},
    visible: { opacity: 1, y: -75},
  };

  return (
    <AnimatedComponent duration={duration} delay={delay} variants={variants}>
      {children}
    </AnimatedComponent>
  );
};

//article페이지 스냅 스크롤링
export const ScrollEvent = ({ children }: Props) => {
  const [isSticky, setIsSticky] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.10 1"], // "뷰포트 최하단 타겟 최상단", "뷰포트 10% 진입 타겟 최상단" -> 애니메이션 트리거 정적 값
  });

  const controls = useAnimation(); //controls 객체를 통해 애니메이션 제어

  useEffect(() => {
    scrollYProgress.onChange((latest) => {
      // latest: scrollYProgress의 현재값
      if (latest > 0.1) {
        // 스크롤 진행도. 0 ~ 1 사이 값으로 표현
        controls.start("visible");
        setIsSticky(true);
      } else {
        controls.start("hidden");
        setIsSticky(false);
      }
    });
  }, [scrollYProgress, controls]);

  return (
    <div ref={ref}>
      <motion.div
        className={`scroll-motion ${isSticky ? "sticky" : ""}`}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 100 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const LinearDraw = ({
  children,
  duration = 0.8,
  delay = 0.3,
}: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    } else {
      mainControls.start("hidden");
    }
  }, [isInView, mainControls]);

  return (
    <motion.div
      ref={ref}
      className="title-container"
      style={{ position: "absolute", left: 0, top: 0 }}
      variants={{
        hidden: { opacity: 0, width: "0%" }, // hidden 상태에서 너비 0%
        visible: { opacity: 1, width: "100%" }, // visible 상태에서 너비 100%
      }}
      initial="hidden"
      animate={mainControls}
      transition={{ duration: duration, delay: delay }}
    >
      {children}
    </motion.div>
  );
};

const ScreenOnlySpan = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export const EachTextPopUp = ({ duration, delay, text }: Props) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5 });

  const variants = {
    hidden: { opacity: 0, y: 75 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <ScreenOnlySpan>{text}</ScreenOnlySpan>
      <motion.span
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ staggerChildren: 0.1 }} //각 애니메이션의 딜레이를 부모 요소의 transition에서 설정. 부모, 자식 모두 initial과 animate 있어야함
        aria-hidden
      >
        {text?.split("").map((char) => (
          <motion.span className="inline-block" variants={variants}>
            {char}
          </motion.span>
        ))}
      </motion.span>
    </>
  );
};

interface CircleAnimationProps {
  children: JSX.Element;
  look: boolean;
  scaleFrame: number;
  onClick: () => void;
}

export const CircleAnimation: React.FC<CircleAnimationProps> = ({children, look, scaleFrame, onClick}) => {


  return (
    <>
      <GenImageCircle
        className="circle-wrapper"
        initial={{ scale: 0.1 }} // 초기 scale 값을 설정
        animate={{
          scale: scaleFrame, // 프레임 크기 애니메이션 추가
          borderRadius: look ? "0%" : "50%", // look 상태에 따라 모양 변화
        }}
        transition={{
          duration: 0.3, // 애니메이션 시간 설정
          ease: [0.25, 0.1, 0.25, 1], // 부드러운 애니메이션
        }}
      >
        {children}
      </GenImageCircle>
    </>
  );
};
