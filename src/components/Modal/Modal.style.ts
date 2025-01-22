import styled, { keyframes } from "styled-components";
import { TbExclamationMark } from "react-icons/tb";

export const pulse00 = keyframes` 
  0% {
    transform: scale(1.0);
  }
  10% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1.0);
  }
`;

export const pulse01 = keyframes` 
  0% {
    transform: scale(1.0);
  }
  20% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1.0);
  }
`;
export const pulse02 = keyframes` 
  0% {
    transform: scale(1.0);
  }
  30% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1.0);
  }
`;
export const pulse03 = keyframes` 
  0% {
    transform: scale(1.0);
  }
  40% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1.0);
  }
`;

export const Span = styled.span`
  position: fixed;
  top: 0;
  left: 0;
  min-width: 320px;
  min-height: 100%;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Div = styled.div`
  &.modal-wrapper {
    overflow: hidden;
    background: ${(props) => props.theme.bg_primary};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;

    @media (max-width: 767px) {
      width: 230px;
      height: 100px;
      padding: 20px;
      border-radius: 5px;
    }

    @media (min-width: 768px) {
      width: 440px;
      height: 150px;
      padding: 120px 0 30px 0;
      border-radius: 10px;
    }
  }

  &.icon-contianer {
    background-color: ${(props) => props.theme.accent};
    border-radius: 50%;
    border: 3px solid${(props) => props.theme.accent};

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
    z-index: 999;

    @media (max-width: 767px) {
      width: 30px;
      height: 30px;
    }

    @media (min-width: 768px) {
      width: 30px;
      height: 30px;
    }
`;

export const H3 = styled.h3`
  color: ${(props) => props.theme.accent};

  @media (max-width: 767px) {
    font-size: 24px;
  }

  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

export const P = styled.p`
  color: ${(props) => props.theme.text};

  @media (max-width: 767px) {
    font-size: 18px;
  }

  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

export const Circle = styled.span`
  &.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 0%;
    left: 50%;
    transform: translate(-50%, 100%);
  }

  &.circle {
    background-color: ${(props) => props.theme.accent};
    opacity: 0.2;
    border-radius: 50%;

    position: absolute;
  }

  &.circle00 {
    animation: ${pulse00} 1s infinite;

    @media (max-width: 767px) {
      width: 10px;
      height: 10px;
    }
    @media (min-width: 768px) {
      width: 30px;
      height: 30px;
    }
  }

  &.circle01 {
    width: 50px;
    height: 50px;
    animation: ${pulse01} 1s infinite;

    @media (max-width: 767px) {
      width: 30px;
      height: 30px;
    }
    @media (min-width: 768px) {
      width: 50px;
      height: 50px;
    }
  }

  &.circle02 {
    width: 70px;
    height: 67px;
    animation: ${pulse02} 1s infinite;

    @media (max-width: 767px) {
      width: 50px;
      height: 50px;
    }
    @media (min-width: 768px) {
      width: 70px;
      height: 70px;
    }
  }

  &.circle03 {
    width: 90px;
    height: 90px;
    animation: ${pulse03} 1s infinite;

    @media (max-width: 767px) {
      width: 50px;
      height: 50px;
    }
    @media (min-width: 768px) {
      width: 90px;
      height: 90px;
    }
  }
`;

export const ModalIcon = styled(TbExclamationMark)`
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, -0%);

  font-size: 30px;
  color: ${(props) => props.theme.white};
`;