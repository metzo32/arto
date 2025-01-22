import styled from "styled-components";
import { ReactComponent as Logo } from "../../assets/icons/logo/logo.svg";

export const HeaderTag = styled.header`
  height: 100vh;
  background-color: ${(props) => props.theme.base};
  border-radius: 0 5px 5px 0;
  position: fixed;
  top: 0;
  overflow: hidden;
  z-index: 10;
  transition: all 0.2s ease;
  box-shadow: 3px 5px 8px rgba(0, 0, 0, 0.2);

  &.fold {
    @media (min-width: 768px) {
      width: 70px;
      border-radius: 0 5px 5px 0;
    }
  }

  @media (max-width: 767px) {
    width: 70px;
  }

  @media (min-width: 768px) {
    width: 200px;
  }

  @media (min-width: 1024px) {
    width: 280px;
  }
`;

export const Div = styled.div`
  &.header-area {
    background-color: ${(props) => props.theme.base};
    height: 100vh;
    overflow: hidden;
    transition: all 0.2s ease;

    @media (min-width: 768px) {
      width: 70px;
      border-radius: 0 12px 12px 0;
    }

    @media (min-width: 1024px) {
      width: 70px;
      border-radius: 0 10px 10px 0;
    }
  }

  &.brand-box {
    padding: 10px 20px;
    border-bottom: 2px solid LightGrey;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;

    &.fold {
      padding: 10px;
      justify-content: center;
    }

    @media (max-width: 767px) {
      padding: 10px;
      justify-content: center;
    }
  }

  &.line-box {
    padding: 10px;
    border-bottom: 2px solid ${(props) => props.theme.outline_strong};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

export const Button = styled.button`
  &.menu-button {
    font-size: 20px;
    color: ${(props) => props.theme.text};
    text-align: start;

    width: 100%;
    height: 48px;
    border: 2px solid transparent;
    border-radius: 10px;
    padding: 10px 20px;

    display: flex;
    // justify-content: center;
    align-items: center;
    gap: 5px;

    transition: all 0.2s ease;

    &:hover {
      border-color: ${(props) => props.theme.outline};
      background-color: ${(props) => props.theme.extraLight};
      box-shadow: 2px 2px 3px ${(props) => props.theme.shadow};
    }

    @media (max-width: 767px) {
      padding: 0px;
      justify-content: center;
      align-items: center;
    }
  }

  &.menu-button.fold-btn {
    padding: 0px;
    justify-content: center;
    align-items: center;
  }

  &.menu-button.selected {
    border-color: ${(props) => props.theme.outline};
    background-color: ${(props) => props.theme.extraLight};
    box-shadow: 2px 2px 3px ${(props) => props.theme.shadow};
  }
`;

export const Span = styled.span`
  color: ${(props) => props.theme.text};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;
`;


export const Brand = styled(Logo)`
width: 100px;
  fill: ${(props) => props.theme.brand};
`;