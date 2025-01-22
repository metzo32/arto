import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    font-family: "Nanum Gothic", sans-serif;
    background-color: ${(props) => props.theme.bg_secondary};
    color: ${(props) => props.theme.text};
  }

  ::selection {
    background-color: pink;
    color: white;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul, li {
    list-style: none;
  }
`;
