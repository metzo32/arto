import styled from "styled-components";
import { ReactComponent as DeleteIcon } from "../../assets/icons/icon_delete.svg";

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

export const Div = styled.div`
  display: flex;

  &.container {
    min-width: 212px;
    height: auto;
    background-color: ${(props) => props.theme.bg_primary};
    display: flex;
    flex-direction: column;
    gap: 100px;
    align-items: center;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);

    @media (max-width: 767px) {
      width: 100%;
      padding: 30px 10px;
      margin-left: 70px;
    }

    @media (min-width: 768px) {
      width: 80%;
      padding: 50px 80px;
      margin: 0 auto;
    }

    @media (min-width: 1024px) {
      width: 900px;
      padding: 80px 100px;
    }
  }

  &.name-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  &.likes-container {
    border: 1px solid blue;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 20px;
  }

  &.likes-container-large {
    border: 1px solid blue;
    width: 800px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &.likes-card {
    cursor: pointer;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    position: relative;
  }

  &.likes-card-large {
  border: 1px solid green;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  &.like-num-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  &.info-container {
    display: flex;
    gap: 20px;

    @media (max-width: 767px) {
      flex-direction: column;
    }

    @media (min-width: 768px) {
      flex-direction: row;
    }

    @media (min-width: 1024px) {
    }
  }

  &.info-box {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

export const H2 = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: ${(props) => props.theme.text};
`;

export const H3 = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.text_secondary};
`;

export const H4 = styled.h4`
  font-size: 20px;

  &.liked {
    font-size: 28px;
    font-weight: 600;
  }
`;

export const H5 = styled.h5`
  font-size: 20px;
  color: ${(props) => props.theme.text_secondary};
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.accent};
  }
`;

export const Img = styled.img`
  object-fit: cover;
  border-radius: 100%;

  @media (max-width: 767px) {
    width: 80px;
    height: 80px;
  }

  @media (min-width: 768px) {
    width: 100px;
    height: 100px;
  }
  @media (min-width: 1024px) {
    width: 120px;
    height: 120px;
  }

  &.large {
    border-radius: 10px;

    @media (max-width: 767px) {
      width: 80px;
      height: 80px;
    }

    @media (min-width: 768px) {
      width: 100px;
      height: 100px;
    }
    @media (min-width: 1024px) {
      width: 100%;
      height: 300px;
    }
  }
`;

export const RemoveIcon = styled(DeleteIcon)`
  fill: ${(props) => props.theme.accent_secondary};

  position: absolute;
  top: 0;
  right: 0;

  &:hover {
    fill: ${(props) => props.theme.accent};
  }

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
`;
