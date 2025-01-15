import styled from "styled-components";
import { newTheme } from "../../stores/colors";

export const Button = styled.button`
  width: 40px;
  height: 40px;
  border: 2px solid ${newTheme.outline};
  border-radius: 8px;
  padding: 0px;

  background-color: ${newTheme.white};
  box-shadow: 2px 2px 3px ${newTheme.shadow};

  display: flex;
  justify-content: center;
  align-items: center;
`;
