import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import DeleteIcon from "../../../public/assets/icons/icon_delete.svg";

export const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

export const Div = styled.div`
  display: flex;

  &.container {
    min-width: 250px;
    min-height: 1000px;
    background-color: ${(props) => props.theme.bg_primary};
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 767px) {
      width: 100%;
      padding: 80px 0px;
      gap: 80px;
    }

    @media (min-width: 768px) {
      width: 80%;
      padding: 80px 0px;
      margin: 0 auto;
      gap: 120px;
    }

    @media (min-width: 1024px) {
      width: 900px;
      padding: 100px 0px;
    }
  }

  &.name-container {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  &.like-container {
    width: 100%;
    padding: 0px 20px;
    display: grid;
    grid-template-columns: repeat(3, 2fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 30px;

    @media (min-width: 768px) {
      padding: 0px 40px;
    }

    @media (min-width: 1024px) {
      padding: 0px 80px;
    }
  }

  &.like-num-box {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin: 0 auto;
  }

  &.like-align-box {
    grid-column: 3 / 3;
    grid-row: 1 / 2;
    justify-content: flex-end;
    align-items: center;
  }

  &.like-fold-box {
    grid-column: 2 / 3;
    grid-row: 2 / 2;
    justify-content: center;
    align-items: center;
  }

  &.info-container {
    gap: 20px;

    @media (max-width: 767px) {
      flex-direction: column;
      align-items: center;
    }

    @media (min-width: 768px) {
      flex-direction: row;
    }

    @media (min-width: 1024px) {
    }
  }

  &.info-box {
    align-items: center;
    gap: 5px;
  }
`;

export const H2 = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.text};

  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

export const H3 = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.text_secondary};

  @media (min-width: 768px) {
    font-size: 24px;
  }
`;

export const H4 = styled.h4`
  font-size: 18px;

  @media (min-width: 768px) {
    font-size: 20px;
  }

  &.liked {
    font-size: 28px;
    font-weight: 600;
  }

  &.profile-like-name {
    font-size: 20px;
    font-weight: bold;

    @media (min-width: 768px) {
      font-size: 24px;
    }
  }
`;

export const H5 = styled.h5`
  color: ${(props) => props.theme.text};

  &.address {
    font-size: 18px;
    line-height: 24px;

    @media (min-width: 768px) {
      font-size: 20px;
    }
  }

  &.skills {
    font-size: 16px;
    white-space: nowrap;

    @media (min-width: 768px) {
      font-size: 18px;
    }
  }
`;

export const Links = styled(Link)`
  font-size: 20px;
  color: ${(props) => props.theme.text_secondary};
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.accent};
  }

  &.search {
    color: ${(props) => props.theme.white};
    border-radius: 5px;
    transition: all 0.1s ease;

    @media (max-width: 767px) {
      padding: 5px 10px;
      font-size: 14px;
    }

    @media (min-width: 768px) {
      padding: 10px 20px;
      font-size: 18px;
    }

    background-color: ${(props) => props.theme.main};
    border: 2px solid ${(props) => props.theme.main_vivid};

    &:hover {
      background-color: ${(props) => props.theme.main_vivid};
      border: 2px solid ${(props) => props.theme.main};
      box-shadow: 2px 2px 3px ${(props) => props.theme.shadow};
    }
  }
`;

export const Button = styled.button`
  &.delete-small {
    border-radius: 100%;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);

    display: flex;
    justify-content: center;
    align-items: center;

    position: static;

    @media (min-width: 768px) {
      position: absolute;
      top: -10px;
      right: -10px;
    }
  }
`;

export const Img = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;

  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
  cursor: pointer;
`;

export const SmallDiv = styled.div`
  display: flex;

  &.likes-container {
    min-width: 200px;
    max-width: 500px;
    width: 95%;
    padding: 0px 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 15px;

    @media (min-width: 768px) {
      width: 100%;
      padding: 0;
      flex-direction: row;
      justify-content: center;
      gap: 30px;
    }
  }

  &.likes-card {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;
    transition: all 0.3s ease;

    position: relative;

    &:hover {
      transform: translateY(-10px);
    }

    @media (min-width: 768px) {
      flex-direction: column;
      gap: 20px;
    }
  }

  &.likes-box {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

export const LargeDiv = styled.div`
  display: flex;

  &.likes-container {
    width: 100%;
    flex-direction: column;
    gap: 50px;
  }

  &.likes-card {
    background-color: ${(props) => props.theme.base};
    flex-direction: column;
    padding: 20px 30px 40px 30px;
    gap: 20px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
  }

  &.name-container {
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
      padding: 20px;
    }
  }

  &.name-box {
    align-items: center;
    gap: 10px;

    @media (min-width: 768px) {
      gap: 20px;
    }
  }

  &.skills-container {
    width: 100%;
    height: 70px;
    align-items: center;
    gap: 20px;
  }

  &.skill-item {
    width: 110px;
    height: 40px;
    background-color: ${(props) => props.theme.btnSecText};
    border-radius: 100px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const Span = styled.span`
  display: flex;
  transition: all 0.2s ease;

  &.profile-box {
    width: 60px;
    height: 60px;
    border-radius: 100%;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);

    &:hover {
      transform: scale(110%);
    }

    @media (min-width: 768px) {
      width: 80px;
      height: 80px;
    }
    @media (min-width: 1024px) {
      width: 80px;
      height: 80px;
    }
  }

  &.small-img-box {
    width: 80px;
    height: 80px;
    border-radius: 10px;

    @media (min-width: 768px) {
      width: 100px;
      height: 100px;
    }
    @media (min-width: 1024px) {
      width: 120px;
      height: 120px;
    }
  }

  &.large-img-box {
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 10px;
    min-height: 210px;

    &:hover {
      transform: scale(102%);
    }

    @media (min-width: 768px) {
      border-radius: 20px;
      width: 100%;
      height: 400px;
    }
    @media (min-width: 1024px) {
      width: 100%;
      height: 400px;
    }
  }
`;

export const RemoveIcon = styled(DeleteIcon)`
  fill: ${(props) => props.theme.deact};
  transition: all 0.3s ease;

  @media (max-width: 767px) {
    width: 30px;
    height: 30px;
  }

  @media (min-width: 768px) {
    width: 30px;
    height: 30px;
  }

  @media (min-width: 1024px) {
    width: 35px;
    height: 35px;
  }

  &:hover {
    fill: ${(props) => props.theme.accent};
  }
`;
