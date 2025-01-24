import styled from "styled-components";

export const Button = styled.button`
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

  &.primary {
    background-color: ${(props) => props.theme.main};
    border: 2px solid ${(props) => props.theme.main_vivid};

    &:hover {
      background-color: ${(props) => props.theme.main_vivid};
      border: 2px solid $ ${(props) => props.theme.main};
      box-shadow: 2px 2px 3px ${(props) => props.theme.shadow};
    }
  }

  &.secondary {
    color: ${(props) => props.theme.btnSecText};
    background-color: ${(props) => props.theme.btnSecBg};
    border: 2px solid ${(props) => props.theme.btnSecBorder};

    &:hover {
      background-color: ${(props) => props.theme.btnSecBgHover};
      border: 2px solid $ ${(props) => props.theme.btnSecBorder};
      box-shadow: 2px 2px 3px ${(props) => props.theme.shadow};
    }
  }
`;
