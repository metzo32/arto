import styled from "styled-components";

export const AppContainer = styled.div`
display: flex;
flex-direction: row;
min-width: 320px;
height: auto;
background-color: ${(props) => props.theme.bg_primary};
position: relative;
overflow: hidden;
`;
