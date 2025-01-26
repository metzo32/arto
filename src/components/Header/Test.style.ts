import styled from "styled-components";

export const Div = styled.div`
  &.parent {
    width: 280px;
    height: 900px;
    position: relative;
    z-index: 2;
    opacity: 1;
  }

  &.parent::before {
    content: "";
    position: absolute;
    z-index: 6; /* 자식보다 위로 설정 */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: blue;
  }

  &.child {
    width: 200px;
    height: 200px;
    position: absolute;
    z-index: 5;
    background: pink;
    width: 100px;
    height: 100px;
    top: 0;
    right: -95px;
  }
`;
