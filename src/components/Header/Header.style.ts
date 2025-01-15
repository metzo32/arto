import styled from "styled-components";
import { newTheme } from "../../stores/colors";

export const HeaderTag = styled.header`
opacity: 0.3;
  height: 100vh;
  background-color: ${newTheme.base};
  border-radius: 0 5px 5px 0;
  position: fixed;
  top: 0;
  overflow: hidden;
  z-index: 10;
  transition: all 0.2s ease;

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
    background-color: ${newTheme.base};
    height: 100vh;
    overflow: hidden;
    transition: all 0.2s ease;

    &.fold {
      @media (min-width: 768px) {
        width: 70px;
        border-radius: 0 12px 12px 0;
      }

      @media (min-width: 1024px) {
        width: 70px;
        border-radius: 0 10px 10px 0;
      }
    }

    @media (max-width: 767px) {
      width: 70px;
      border-radius: 0 5px 5px 0;
    }

    @media (min-width: 768px) {
      width: 200px;
      border-radius: 0 12px 12px 0;
    }

    @media (min-width: 1024px) {
      width: 280px;
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
    border-bottom: 2px solid LightGrey;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

export const Button = styled.button`
  &.menu-button {
    font-size: 20px;
    color: ${newTheme.text};
    text-align: start;

    width: 100%;
    height: 48px;
    border: 2px solid transparent;
    border-radius: 10px;
    padding: 10px 20px;

    display: flex;
    align-items: center;
    gap: 5px;

    transition: all 0.2s ease;

    &:hover {
      border-color: ${newTheme.outline};
      background-color: ${newTheme.white};
      box-shadow: 2px 2px 3px ${newTheme.shadow};
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
    border-color: ${newTheme.outline};
    background-color: ${newTheme.white};
    box-shadow: 2px 2px 3px ${newTheme.shadow};
  }
`;

export const Span = styled.span`
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;
`;
