import styled from "styled-components";

export const Div = styled.div`
  display: flex;

  position: relative;

  z-index: 999;
`;

export const Button = styled.button`
  width: 60px;
  height: 60px;
  font-size: 36px;
  color: ${(props) => props.theme.main};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  border: 2px solid ${(props) => props.theme.main};
  transition: all 0.2s ease;

  position: absolute;
  bottom: 30px;
  right: 30px;

  &:hover {
    background-color: ${(props) => props.theme.main};
    color: ${(props) => props.theme.base};
  }
`;
