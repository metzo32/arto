import styled, { keyframes } from "styled-components";

export const Div = styled.div`
  border: 1px solid red;

  &.wrapper {
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    flex: 1;
  }

  &.box {
    @media (max-width: 767px) {
      padding: 20px 30px;
    }

    @media (min-width: 768px) {
      padding: 20px 30px;
    }

    @media (min-width: 1024px) {
      padding: 20px 30px;
    }
  }

  &.image-container {
    display: block;
    position: relative;
  }

  &.test {
    height: 500px;
  }
`;

export const H1 = styled.h1`
  font-size: 48px;
  color: Green;
`;

const moveUp = keyframes`
  from {
    transform: translateX(50%) translateY(100%);
  }
  to {
    transform: translateX(50%) translateY(20%);
  }
`;

const moveDown = keyframes`
  from {
    transform: translateX(-50%) translateY(-100%);
  }
  to {
    transform: translateX(-50%) translateY(-20%);
  }
`;

export const Img = styled.img`
  width: 300px;
  height: 800px;
  object-fit: cover;
  position: absolute;

  &.left {
    left: 0;
    animation: ${moveUp} 1s ease forwards;
  }

  &.right {
    right: 0;
     animation: ${moveDown} 1s ease forwards;
`;
