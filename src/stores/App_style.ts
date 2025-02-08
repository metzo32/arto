import styled from "styled-components";

export const Div = styled.div`
  &.app-container {
    display: flex;
    flex-direction: row;
    min-width: 320px;
    background-color: ${(props) => props.theme.bg_secondary};
    overflow: hidden;
  }

  &.main {
    height: auto;
    @media (max-width: 767px) {
      width: calc(100vw - 70px);
      margin-left: 70px;
    }

    @media (min-width: 768px) {
      width: calc(100vw - 70px);
      margin: 0;
    }

    @media (min-width: 1024px) {
      width: calc(100vw - 70px);
    }
  }

  &.main.default {
    height: 940px;
  }
`;
