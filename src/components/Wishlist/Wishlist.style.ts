import styled from "styled-components";
import { ReactComponent as HeartLine } from "../../assets/icons/heart_outlined.svg";
import { ReactComponent as HeartFull } from "../../assets/icons/heart_full.svg";
import { newTheme } from "../../stores/colors";

export const IconLine = styled(HeartLine)`
  width: 100%;
  height: 100%;
  fill: ${newTheme.white};
  opacity: 0.6;
`;

export const IconHover = styled(HeartFull)`
  width: 100%;
  height: 100%;
  fill: ${newTheme.white};
`;

export const IconClicked = styled(HeartFull)`
  width: 100%;
  height: 100%;
  fill: ${newTheme.main};
  animation: ${newTheme.main} 0.3s ease-in-out;
`;

export const Span = styled.span`
  width: 50px;
  height: 50px;
  position: absolute;
  z-index: 10;
  touch-action: manipulation;

  @media (max-width: 767px) {
    right: 10px;
    bottom: 10px;
  }

  @media (min-width: 768px) {
    right: 80px;
    bottom: 95px;
  }

  @media (min-width: 1024px) {
    right: 85px;
    bottom: 110px;
  }
`;
