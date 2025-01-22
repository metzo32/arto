import styled from "styled-components";

export const Div = styled.div`
  display: flex;

  &.container {
    min-width: 212px;
    height: auto;
    background-color: ${(props) => props.theme.bg_primary};
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);

    @media (max-width: 767px) {
      width: 60%;
      padding: 10px;
    }

    @media (min-width: 768px) {
      width: 80%;
      padding: 20px;
    }

    @media (min-width: 1024px) {
      width: 60%;
      padding: 30px;
    }
  }
`;
