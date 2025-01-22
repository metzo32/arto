import styled from "styled-components";

import { RiCheckboxBlankLine } from "react-icons/ri";
import { RiCheckboxFill } from "react-icons/ri";

export const Div = styled.div`
  font-size: 18px;
  line-height: 18px;
  color: ${(props) => props.theme.text};

  &.page {
    background-color: ${(props) => props.theme.bg_secondary};
    min-width: 320px;
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  &.container {
    background-color: ${(props) => props.theme.bg_primary};
    width: 800px;
    height: 450px;
    border-radius: 5px;
    box-shadow: 3px 5px 8px rgba(0, 0, 0, 0.2);

    @media (max-width: 767px) {
      width: calc(70% - 40px);
      height: calc(480px - 40px);
      padding: 20px;
      margin-left: 70px;
    }

    @media (min-width: 768px) {
      width: calc(640px - 40px);
      height: calc(420px - 40px);
      padding: 20px;
    }

    @media (min-width: 1024px) {
      width: calc(800px - 40px);
      height: calc(450px - 40px);
      padding: 20px;
    }
  }

  &.register-box {
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  &.register-step02 {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
  }

  &.form-wrapper {
    background-color: ${(props) => props.theme.base};
    border-radius: 5px;
    box-shadow: 3px 5px 8px rgba(0, 0, 0, 0.2);

    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 767px) {
      height: calc(100% - 40px);
      padding: 20px;
      gap: 20px;
    }

    @media (min-width: 768px) {
      width: calc(300px - 40px);
      height: calc(100% - 40px);
      padding: 20px;
      gap: 10px;
    }

    @media (min-width: 1024px) {
      width: calc(370px - 40px);
      padding: 20px 20px;
      gap: 15px;
    }
  }

  &.form-wrapper.step02-left {
    @media (max-width: 767px) {
      gap: 20px;
    }

    @media (min-width: 768px) {
      gap: 20px;
    }

    @media (min-width: 1024px) {
      gap: 30px;
    }
  }

  &.form-wrapper.step02-right {
    height: calc(100% - 155px);
    padding: 135px 20px 20px 20px;
    justify-content: space-between;

    // @media (max-width: 767px) {
    //   gap: 20px;
    // }

    // @media (min-width: 768px) {
    //   gap: 20px;
    // }

    // @media (min-width: 1024px) {
    //   gap: 20px;
    // }
  }

  &.title-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 35px;
  }

  &.button-wrapper {
    display: flex;
    flex-direction: column;

    @media (max-width: 767px) {
      gap: 20px;
    }

    @media (min-width: 768px) {
      gap: 10px;
    }

    @media (min-width: 1024px) {
      gap: 15px;
    }
  }

  &.item-box {
    display: flex;
    flex-direction: row;
    gap: 15px;
    align-items: center;
  }

  &.gender-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &.number-box {
    display: flex;
    align-items: center;
    gap: 15px;
  }
`;

export const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 767px) {
    gap: 20px;
  }

  @media (min-width: 768px) {
    gap: 10px;
  }

  @media (min-width: 1024px) {
    gap: 15px;
  }
`;

export const Fieldset = styled.fieldset`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const Legend = styled.legend`
  font-weight: bold;
  user-select: none;
  margin-bottom: 5px;

  @media (max-width: 767px) {
    font-size: 14px;
  }

  @media (min-width: 768px) {
    font-size: 14px;
  }

  @media (min-width: 1024px) {
    font-size: 16px;
  }
`;

export const Label = styled.label`
  color: ${(props) => props.theme.text};
  font-weight: bold;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
  user-select: none;

  @media (max-width: 767px) {
    font-size: 14px;
  }

  @media (min-width: 768px) {
    font-size: 14px;
  }

  @media (min-width: 1024px) {
    font-size: 16px;
  }

  &.remember {
    color: ${(props) => props.theme.deact};
    font-weight: 500;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    transition: all 0.1s ease;

    &:hover {
      color: ${(props) => props.theme.text};
    }
  }

  &.check-label {
    font-weight: 500;
    width: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0;

    &:hover {
      color: ${(props) => props.theme.text_secondary};
    }
  }
`;

export const Input = styled.input`
  color: ${(props) => props.theme.text};
  border: none;
  background-color: ${(props) => props.theme.extraLight};
  outline: 2px solid ${(props) => props.theme.outline};
  border-radius: 5px;
  padding: 10px;
  transition: all 0.1s ease;

  &::placeholder {
    color: ${(props) => props.theme.deact};
  }

  &:hover {
    outline: 2px solid ${(props) => props.theme.outline_strong};
  }

  &:focus {
    outline: 2px solid ${(props) => props.theme.main};
  }

  &.number {
    width: 100%;
  }
`;

export const Radio = styled.input`
  border: none;

  &[type="radio"] {
    appearance: none;
    display: none;
  }

  [type="radio"]:checked {
    appearance: none;
  }
`;

export const H3 = styled.h3`
  font-size: 32px;
  font-weight: bold;

  @media (max-width: 767px) {
    font-size: 24px;
    margin-bottom: 10px;
  }

  @media (min-width: 768px) {
    font-size: 28px;
    margin-bottom: 10px;
  }

  @media (min-width: 1024px) {
    font-size: 32px;
    margin-bottom: 10px;
  }
`;

export const H4 = styled.h4`
  color: ${(props) => props.theme.deact};
  user-select: none;

  @media (max-width: 767px) {
    font-size: 12px;
  }

  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

export const Button = styled.button`
  color: ${(props) => props.theme.main};
  font-size: 16px;
  line-height: 16px;
  padding-bottom: 2px;
  transition: all 0.1s ease;

  &:hover {
    color: ${(props) => props.theme.main_vivid};
  }

  @media (max-width: 767px) {
    font-size: 12px;
  }

  @media (min-width: 768px) {
    font-size: 16px;
  }

  &.back {
    margin-bottom: 20px;
  }
`;

export const Select = styled.select`
  height: 38px;
  background-color: ${(props) => props.theme.extraLight};
  color: ${(props) => props.theme.text};
  outline: 0;
  border: 2px solid ${(props) => props.theme.outline};
  padding: 4px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    border: 2px solid ${(props) => props.theme.outline_strong};
  }

  &:focus {
    background-color: ${(props) => props.theme.extraLight};
    border: 2px solid ${(props) => props.theme.main_vivid};
  }

  @media (max-width: 767px) {
    width: 60px;
  }

  @media (min-width: 768px) {
    width: 80px;
  }

  @media (min-width: 1024px) {
    width: 100px;
  }
`;

export const IconBox = styled(RiCheckboxBlankLine)`
  width: 20px;
  height: 20px;
  margin-bottom: 3px;
  color: white;
`;

export const IconCheck = styled(RiCheckboxFill)`
  width: 20px;
  height: 20px;
  margin-bottom: 3px;
  fill: ${(props) => props.theme.main};
  color: white;
`;
