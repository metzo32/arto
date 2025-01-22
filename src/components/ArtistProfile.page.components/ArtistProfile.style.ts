import styled, { keyframes } from "styled-components";

import { lightTheme } from "../../stores/colors";

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media (max-width: 767px) {
    padding-bottom: 100px;
  }

  @media (min-width: 768px) {
    padding-bottom: 150px;
  }

  @media (min-width: 1024px) {
    padding-bottom: 200px;
  }

  &.value {
    width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 767px) {
      min-width: 200px;
      width: 85%;
      gap: 30px;
    }

    @media (min-width: 768px) {
      width: 700px;
      gap: 50px;
    }

    @media (min-width: 1024px) {
      width: 900px;
    }
  }

  &.narrow {
    @media (max-width: 767px) {
      padding-left: 20px;
      padding-right: 20px;
    }

    @media (min-width: 768px) {
      padding-left: 30px;
      padding-right: 30px;
    }

    @media (min-width: 1024px) {
      padding-left: 40px;
      padding-right: 40px;
    }
  }
`;

export const Div = styled.div`
  &.wrapper {
    width: 100%;
    overflow-y: auto;
    background: ${(props) => props.theme.bg_secondary};

    @media (max-width: 767px) {
      padding-left: 70px;
    }

    @media (min-width: 768px) {
      padding: 0;
    }
  }

  &.image-container {
    display: block;
    position: relative;
  }

  &.test {
    height: 500px;
  }

  &.main-img-container {
    position: relative;

    @media (max-width: 767px) {
      width: calc(100% - 20px);
      height: 180px;
      padding: 20px 10px;
    }

    @media (min-width: 768px) {
      width: calc(100% - 80px);
      height: 500px;
      padding: 60px 40px;
    }

    @media (min-width: 1024px) {
      width: calc(100% - 80px);
      height: 500px;
      padding: 60px 40px;
    }
  }

  &.text-container {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &.skills-container {
    width: 100%;
    display: flex;
    justify-content: space-between;

    @media (max-width: 767px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
    }

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }

    @media (min-width: 1024px) {
    }
  }

  &.skills-box {
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 767px) {
      flex-direction: row;
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

  &.skills-title {
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 767px) {
      width: 65px;
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
    min-width: 1230px;
    padding: 20px 0px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  &.skills-card {
    width: 300px;
    height: 400px;
    background-color: ${(props) => props.theme.bg_primary};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    overflow: hidden;
    box-shadow: 3px 5px 8px rgba(0, 0, 0, 0.2);
  }

  &.icon-container {
    padding: 10px;
    font-size: 24px;
    color: ${lightTheme.text};
    border-radius: 100px;
    box-shadow: 3px 5px 8px rgba(0, 0, 0, 0.2);
    background-color: ${(props) => props.theme.white};

    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 767px) {
      width: 20px;
      height: 20px;
    }

    @media (min-width: 768px) {
      width: 50px;
      height: 50px;
    }

    @media (min-width: 1024px) {
      width: 50px;
      height: 50px;
    }
  }

  &.history-box {
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &.contact-side {
    padding: 20px;

    display: flex;
    flex-direction: column;
    gap: 20px;

    position: absolute;
    bottom: 0;
    right: 0;
  }
`;

export const H1 = styled.h1`
  color: white;

  @media (max-width: 767px) {
    font-size: 42px;
  }

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
    font-size: 40px;
  }

  @media (min-width: 768px) {
    font-size: 64px;
  }

  @media (min-width: 1024px) {
    font-size: 64px;
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
    font-size: 16px;
    text-align: left;
  }

  @media (min-width: 768px) {
    font-size: 24px;
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

export const Img = styled.img`
  &.main-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }

  &.card-img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
`;

export const Button = styled.button`
  width: 200px;
  background-color: ${(props) => props.theme.white};
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 100px;
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
    font-size: 16px;
    line-height: 20px;
  }

  @media (min-width: 768px) {
    font-size: 20px;
    line-height: 28px;
  }

  @media (min-width: 1024px) {
  }
`;

export const A = styled.a`
  color: ${(props) => props.theme.text_secondary};

  width: 40px;
  height: 40px;
  font-size: 20px;
  border-radius: 100px;
  border: 1px solid ${(props) => props.theme.Grey};
  padding: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: border 0.3s ease, fill 0.5s ease;

  &:hover {
    color: ${(props) => props.theme.accent};
  }
`;
