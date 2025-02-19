import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export const Div = styled.div`
  &.wrapper {
    min-width: 250px;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;

    scroll-snap-type: y mandatory;
    overflow-x: hidden;
  }

  &.default {
    width: 1200px;
    height: 900px;
    display: flex;
    flex-direction: column;
  }

  &.article-cards {
    width: 100%;
    aspect-ratio: 1/1;
    min-height: 320px;

    position: relative;
    cursor: pointer;

    scroll-snap-align: center;

    @media (min-width: 768px) {
      width: calc(100vw - 70px);
      height: 100vh;
    }

    &:hover .article-name {
      font-size: 100px;
      letter-spacing: -4px;
      opacity: 1;
      transition: 0.3s ease 0.3s;
    }
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
    width: calc(100% - 70px);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin-left: 70px;

    @media (max-width: 767px) {
      margin-top: 80px;
      gap: 20px;
    }

    @media (min-width: 768px) {
      margin-top: 120px;
      gap: 30px;
    }

    @media (min-width: 1024px) {
      margin-top: 150px;
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
`;
