import styled, { keyframes } from "styled-components";
// import { ReactComponent as HeartLine } from "../../assets/icons/heart_outlined.svg";
// import { ReactComponent as HeartFull } from "../../assets/icons/heart_full.svg";
import HeartLine from "../../../public/assets/icons/heart_outlined.svg";
import HeartFull from "../../../public/assets/icons/heart_full.svg";
import { darkTheme, lightTheme } from "../../stores/colors";

export const ClickAnimation = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
`;

export const IconLine = styled(HeartLine)`
  width: 100%;
  height: 100%;
  fill: ${(props) => props.theme.white};
  opacity: 0.6;
`;

export const IconHover = styled(HeartFull)`
  width: 100%;
  height: 100%;
  fill: ${(props) => props.theme.white};
`;

export const IconClicked = styled(HeartFull)`
  width: 100%;
  height: 100%;
  fill: ${darkTheme.main};
  animation: ${ClickAnimation} 0.3s ease;
`;

export const Button = styled.button`
  width: 50px;
  height: 50px;
  touch-action: manipulation;

  @media (min-width: 768px) {
    width: 65px;
    height: 65px;
  }
`;
