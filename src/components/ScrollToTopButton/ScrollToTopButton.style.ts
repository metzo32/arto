import styled from "styled-components";

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

  position: fixed;
  bottom: 15px;
  right: 15px;
  transform: translateY(0);
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.main};
    color: ${(props) => props.theme.base};
  }

  @media (min-width: 768px) {
    bottom: 30px;
    right: 30px;
  }

  &.invisible {
    transform: translateY(80px);
    opacity: 0;
    pointer-events: none;
  }
`;
