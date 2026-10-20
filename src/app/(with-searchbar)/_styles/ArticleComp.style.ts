import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export const Div = styled.div`
  &.wrapper {
  padding-left: 250px;
    // min-width: 250px;
    // width: clac(100vw - 70px);
    // height: 100vh;
    // display: flex;
    // flex-direction: column;
    // position: relative;

    // overflow-x: hidden;
  }

  &.default {
    width: 1200px;
    height: 900px;
    display: flex;
    flex-direction: column;
  }

  &.title-container {
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    position: absolute;
    bottom: 0;
    right: 0;

    @media (min-width: 768px) {
      padding: 5px 15px;
    }
  }

  &.no-result {
    width: calc(100vw - 70px);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin-left: 70px;

    @media (max-width: 767px) {
      gap: 20px;
    }

    @media (min-width: 768px) {
      gap: 30px;
    }
  }
`;

export const Img = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const H3 = styled.h3`
  width: 100%;
  color: ${(props) => props.theme.white};
  opacity: 0.5;
  font-family: "Kay Pho Du", sans-serif;
  font-size: 120px;
  font-weight: bold;

  text-align: right;
  text-transform: uppercase;
  white-space: nowrap;

  @media (max-width: 767px) {
    display: none;
  }

  @media (min-width: 768px) {
    font-size: 90px;
  }

  @media (min-width: 1024px) {
    font-size: 120px;
    line-height: 110px;
  }
`;

export const H4 = styled.h4`
  @media (max-width: 767px) {
    font-size: 18px;
  }

  @media (min-width: 768px) {
    font-size: 24px;
  }
`;

export const Links = styled(Link)`
  display: flex;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  transition-property: transform;
  transition-duration: 500ms;
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);

  &:hover {
    cursor: pointer;
  }

  &.article-cards {
    cursor: pointer;

    &:hover .article-name {
      font-size: 100px;
      letter-spacing: -4px;
      opacity: 1;
      transition: 0.3s ease 0.3s;
    }
  }
`;
