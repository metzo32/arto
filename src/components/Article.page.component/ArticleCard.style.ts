import styled from "styled-components";
import { newTheme } from "../../stores/colors";

export const Div = styled.div`
  &.wrapper {
    height: 100vh;
    display: flex;
    flex-direction: column;

    scroll-snap-type: y mandatory;
    overflow-x: hidden;
    overflow-y: scroll;

    position: relative;
  }

  &.article-cards {
    width: 100vw;
    height: 100vh;
    min-width: 320px;
    min-height: 320px;

    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid green;
    position: relative;
    z-index: 1;
    overflow: hidden;
    cursor: pointer;

    scroll-snap-align: center;

    @media (max-width: 767px) {
      width: 100vw;
      height: 100vw;
    }

    // &:hover .article-name {
    //   font-size: 100px;
    //   letter-spacing: -4px;
    //   opacity: 1;
    //   transition: 0.5s ease 0.5s;
    // }
  }
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const H3 = styled.h3`
  width: 100%;
//   padding-right: 255px;
  display: flex;
  color: ${newTheme.white};
  opacity: 0.5;
  font-size: 120px;

  text-align: end;
  text-transform: uppercase;
  white-space: nowrap;

  border: 2px solid blue;

  position: absolute;
  right: 0;
  bottom: 0;

  //   @media (max-width: 767px) {
  //     display: none;
  //   }

  //   @media (min-width: 768px) {
  //     display: block;
  //     font-size: 90px;
  //   }

  //   @media (min-width: 1024px) {
  //     font-size: 120px;
  //   }

  //   :hover {
  //     @media (max-width: 767px) {
  //       font-size: 40px;
  //     }

  //     @media (min-width: 768px) {
  //       font-size: 60px;
  //     }

  //     @media (min-width: 1024px) {
  //       font-size: 90px;
  //     }
`;
