import styled from "styled-components";

export const Div = styled.div`
  &.hidden {
    display: hidden;
  }

  &.search-bar-container {
    padding: 20px;
    display: flex;

    position: fixed;
    top: 0;
    right: 0;
    z-index: 10;

    @media (max-width: 767px) {
      gap: 10px;
    }

    @media (min-width: 768px) {
      gap: 20px;
    }
  }
`;


export const Input = styled.input`
  width: 300px;
  border: none;
  background: ${(props) => props.theme.white};
  outline: 2px solid ${(props) => props.theme.outline};
  border-radius: 5px;
  padding: 10px;
  transition: all 0.1s ease;

  &::placeholder {
    color: ${(props) => props.theme.deact};
  }

  &:hover {
    outline: 2px solid $ ${(props) => props.theme.outline_strong};
  }

  &:focus {
    outline: 2px solid ${(props) => props.theme.accent};
  }

  @media (max-width: 767px) {
    width: 150px;
  }

  @media (min-width: 768px) {
    width: 300px;
  }
`;

export const Span = styled.span`
  &.overlay {
    width: 100vw;
    height: 100vw;
    background-color: black;
    opacity: 0.5;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
  }
`;