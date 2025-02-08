import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    transform: rotate(90deg) translate(50px, -70px);
  }
  to {
    transform: rotate(90deg) translate(50px, -100px);
  }
`;

const slideInSmall = keyframes`
  from {
    transform: rotate(90deg) translate(110px, -60px);
  }
  to {
    transform: rotate(90deg) translate(110px, -80px);
  }
`;

export const Area = styled.span`
  height: calc(100%);

  position: fixed;
  z-index: 999;
  top: 0;
  transition: all 0.2s ease;
  pointer-events: none;

  &.fold {
    width: 0px;
  }

  &.unfold {
    @media (max-width: 767px) {
      width: 70px;
    }

    @media (min-width: 768px) {
      width: 210px;
    }
  }
`;

export const Button = styled.button`
  color: ${(props) => props.theme.text};
  width: 120px;
  height: 50px;
  font-size: 16px;
  border-radius: 12px 12px 0 0;
  opacity: 0.9;
  background-color: ${(props) => props.theme.base};
  border: 2px solid ${(props) => props.theme.text_secondary};
  transition: box-shadow 0.2s ease, background-color 0.2s ease;

  &:hover {
    box-shadow: 2px 2px 3px ${(props) => props.theme.shadow};
    background-color: ${(props) => props.theme.extraLight};
  }

  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: auto;

  position: absolute;
  top: 0;
  right: 0px;
  z-index: 1;

  transform: rotate(90deg) translate(90px, -80px);
  transform-origin: center;
  animation: ${slideInSmall} 0.5s ease forwards;

  @media (min-width: 768px) {
    font-size: 18px;
    width: 140px;
    height: 70px;
    border-radius: 18px 18px 0 0;
    transform: rotate(90deg) translate(110px, -80px);
    animation: ${slideIn} 0.5s ease forwards;
  }
`;
