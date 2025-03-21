import styled, { keyframes } from "styled-components";
import Image from "next/image";
import { lightTheme } from "../../stores/colors";

const slideIn = keyframes`
  from {
    transform: translate(70px, 0px);
  }
  to {
    transform: translate(0px, 0px);
  }
`;

const slideOut = keyframes`
  from {
    transform: translate(0px, 0px);
  }
  to {
    transform: translate(100px, 0px);
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media (max-width: 767px) {
    padding: 80px 0;
  }

  @media (min-width: 768px) {
    padding: 150px 0;
  }

  @media (min-width: 1024px) {
    padding: 250px 0;
  }

  &.value {
    width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 767px) {
      min-width: 200px;
      width: 85%;
      gap: 30px;
      align-items: start;
    }

    @media (min-width: 768px) {
      width: 700px;
      gap: 50px;
      align-items: center;
    }

    @media (min-width: 1024px) {
      width: 900px;
    }
  }

  &.narrow {
  gap: 10px;
    @media (max-width: 767px) {
      padding-left: 30px;
      padding-right: 30px;
    }

    @media (min-width: 768px) {
      padding-left: 80px;
      padding-right: 80px;
    }

    @media (min-width: 1024px) {
      padding-left: 120px;
      padding-right: 120px;
    }
  }
`;

export const Div = styled.div`
  &.wrapper {
    min-width: 250px;
    width: 100%;
    overflow: hidden;
    background: ${(props) => props.theme.bg_secondary};
    position: relative;
  }

  &.image-container {
    height: 100vh;
    display: block;
    position: relative;
  }

  &.test {
    height: 500px;
  }

  &.main-img-container {
    width: 100vw;
    height: 180px;
    padding: 25px 40px;
    background-color: ${(props) => props.theme.deact};
    position: relative;

    @media (min-width: 768px) {
      height: 500px;
      padding: 60px 80px;
    }

    @media (min-width: 1024px) {
      height: 500px;
      padding: 60px 120px;
    }
  }

  &.text-container {
    position: relative;
    height: 100%;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &.text-box {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &.skills-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    justify-content: space-between;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
      gap: 20px;
    }

    @media (min-width: 1024px) {
    }
  }

  &.skills-box {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: default;
    transition: transform 0.2s ease;

    @media (max-width: 767px) {
      flex-direction: row;
      gap: 10px;
    }

    @media (min-width: 768px) {
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    &:hover {
      transform: scale(110%);
    }
  }

  &.skills-title {
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 767px) {
      width: 55px;
      gap: 10px;
    }

    @media (min-width: 768px) {
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    @media (min-width: 1024px) {
    }
  }

  &.card-wrapper {
    overflow-x: scroll;
  }

  &.card-container {
    min-width: 635px;
    width: 100%;
    padding: 20px 0px;
    display: flex;
    justify-content: space-between;

    @media (min-width: 768px) {
      min-width: 1280px;
    }

    @media (min-width: 1024px) {
      min-width: 1440px;
    }
  }

  &.skills-card {
    width: 150px;
    height: 200px;
    background-color: ${(props) => props.theme.bg_primary};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    overflow: hidden;
    box-shadow: 3px 5px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-5%);
    }

    @media (min-width: 768px) {
      width: 300px;
      height: 400px;
    }
  }

  &.icon-container {
    width: 40px;
    height: 40px;
    font-size: 18px;
    color: ${lightTheme.text};
    border-radius: 100px;
    box-shadow: 3px 5px 8px rgba(0, 0, 0, 0.2);
    background-color: ${(props) => props.theme.white};

    display: flex;
    justify-content: center;
    align-items: center;

    @media (min-width: 768px) {
      width: 50px;
      height: 50px;
      padding: 10px;
      font-size: 24px;
    }

    @media (min-width: 1024px) {
      width: 50px;
      height: 50px;
    }
  }

  &.history-box {
    padding: 5px 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media (min-width: 768px) {
      padding: 10px 20px;
    }
  }

  &.contact-side {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    position: fixed;
    bottom: 270px;
    right: 0;
    transform: translateX(0);
    transition: all 0.3s ease;

    @media (min-width: 768px) {
      right: 20px;
    }

    &.invisible {
      transform: translateX(100px);
      opacity: 0;
      pointer-events: none;
    }
  }
`;

export const Span = styled.span`
  color: ${(props) => props.theme.main};
`;

export const H1 = styled.h1`
  font-size: 42px;
  font-family: "Kay Pho Du", sans-serif;
  color: white;

  @media (min-width: 768px) {
    font-size: 80px;
  }

  @media (min-width: 1024px) {
    font-size: 128px;
  }
`;

export const H2 = styled.h2`
  font-weight: bold;
  color: ${(props) => props.theme.text};

  @media (max-width: 767px) {
    font-size: 32px;
    line-height: 42px;
  }

  @media (min-width: 768px) {
    font-size: 64px;
    line-height: 72px;
  }
`;

export const H3 = styled.h3`
  color: ${(props) => props.theme.text_secondary};

  @media (max-width: 767px) {
    font-size: 16px;
    line-height: 20px;
    text-align: left;
  }

  @media (min-width: 768px) {
    font-size: 24px;
    line-height: 30px;
    text-align: center;
  }
`;

export const H4 = styled.h4`
  color: ${(props) => props.theme.text};
  font-weight: bold;

  @media (max-width: 767px) {
    font-size: 14px;
    text-align: left;
  }

  @media (min-width: 768px) {
    font-size: 20px;
  }
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

export const BarImg = styled.img`
  width: 300px;
  height: 800px;
  object-fit: cover;
  position: absolute;

  &.left {
    animation: ${moveUp} 1s ease forwards;

    @media (max-width: 767px) {
      left: 70px;
    }

    @media (min-width: 768px) {
      left: 0;
    }

    @media (min-width: 1024px) {
      left: 0;
    }
  }

  &.right {
    right: 0;
    animation: ${moveDown} 1s ease forwards;
  }

  @media (max-width: 767px) {
    width: 120px;
    height: 600px;
  }

  @media (min-width: 768px) {
    width: 200px;
    height: 700px;
  }

  @media (min-width: 1024px) {
    width: 300px;
    height: 800px;
  }
`;

export const Img = styled(Image)`
  width: 100px;
  height: 100px;

  &.main-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    filter: brightness(0.7);
  }

  &.card-img {
    width: 100%;
    height: 60%;
    object-fit: cover;

    @media (min-width: 768px) {
      height: 300px;
    }
  }
`;

export const P = styled.p`
  color: ${(props) => props.theme.white};

  &.introduction {
    font-size: 28px;
    line-height: 40px;
  }

  &.skill {
    color: ${(props) => props.theme.text_secondary};
  }

  @media (max-width: 767px) {
    font-size: 14px;
    line-height: 20px;
  }

  @media (min-width: 768px) {
    font-size: 18px;
    line-height: 28px;
  }

  @media (min-width: 1024px) {
  }
`;

export const A = styled.a`
  color: ${(props) => props.theme.text};

  width: 40px;
  height: 40px;
  font-size: 20px;
  border-radius: 100px;
  border: 1px solid ${(props) => props.theme.text};
  padding: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: ${(props) => props.theme.white};
    border-color: ${(props) => props.theme.main};
    background-color: ${(props) => props.theme.main};
  }
`;
