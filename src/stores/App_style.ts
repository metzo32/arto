import styled from "styled-components";

export const AppContainer = styled.div`
display: flex;
flex-direction: row;
min-width: 320px;
background-color: ${(props) => props.theme.bg_secondary};
overflow: hidden;
`;
