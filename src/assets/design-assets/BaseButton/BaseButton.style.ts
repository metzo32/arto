import styled from "styled-components";

export const Button = styled.button`
  background-color: ${(props) => props.theme.main};
  color: ${(props) => props.theme.white};
  border: 2px solid ${(props) => props.theme.main_vivid};
  border-radius: 5px;
  transition: all 0.1s ease;

  &:hover {
    background-color: ${(props) => props.theme.main_vivid};
    border: 2px solid $ ${(props) => props.theme.main};
    box-shadow: 2px 2px 3px ${(props) => props.theme.shadow};
  }

  @media (max-width: 767px) {
    padding: 5px 10px;
        font-size: 14px;
  }

  @media (min-width: 768px) {
    padding: 10px 20px;
    font-size: 18px;
  }
`;
