import styled from "styled-components";

export const Button = styled.button`
  background-color: ${(props) => props.theme.main};
  color: ${(props) => props.theme.white};
  padding: 10px;
  border: 2px solid ${(props) => props.theme.main_vivid};
  border-radius: 5px;
  transition: all 0.1s ease;

  &:hover {
    background-color: ${(props) => props.theme.main_vivid};
    border: 2px solid $ ${(props) => props.theme.main};
    box-shadow: 2px 2px 3px ${(props) => props.theme.shadow};
  }
`;
