import styled from "styled-components";

export const Div = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  background-color: ${(props) => props.theme.bg_secondary};

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
`;
