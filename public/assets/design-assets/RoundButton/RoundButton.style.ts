import styled from "styled-components";

export const Button = styled.button`
  width: 40px;
  height: 40px;
  color: ${(props) => props.theme.text};
  border: 2px solid ${(props) => props.theme.outline};
  border-radius: 8px;
  padding: 0px;

  background-color: ${(props) => props.theme.extraLight};
  box-shadow: 2px 2px 3px ${(props) => props.theme.shadow};

  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${(props) => props.theme.outline_strong};
  }
`;
