import styled from "styled-components";

export const Div = styled.div`
  &.wrapper {
    height: 100vh;
    display: flex;
    flex-direction: column;

    scroll-snap-type: y mandatory;
    overflow-x: hidden;

    position: relative;
  }

  &.article-cards {
    width: 100vw;
    height: 100vh;
    min-width: 320px;
    min-height: 320px;

    position: relative;
    cursor: pointer;

    scroll-snap-align: center;

    @media (max-width: 767px) {
      width: 100vw;
      height: 100vw;
    }

    &:hover .article-name {
      font-size: 100px;
      letter-spacing: -4px;
      opacity: 1;
      transition: 0.3s ease 0.3s;
    }
  }

  &.search-bar-container {
    padding: 20px;
    display: flex;

    position: fixed;
    top: 0;
    right: 0;
    z-index: 10;

    @media (max-width: 767px) {
      gap: 10px;
    }

    @media (min-width: 768px) {
      gap: 20px;
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
`;

export const Img = styled.img`
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

export const Input = styled.input`
  width: 300px;
  border: none;
  background: ${(props) => props.theme.white};
  outline: 2px solid ${(props) => props.theme.outline};
  border-radius: 5px;
  padding: 10px;
  transition: all 0.1s ease;

  &::placeholder {
    color: ${(props) => props.theme.deact};
  }

  &:hover {
    outline: 2px solid $ ${(props) => props.theme.outline_strong};
  }

  &:focus {
    outline: 2px solid ${(props) => props.theme.accent};
  }

  @media (max-width: 767px) {
    width: 150px;
  }

  @media (min-width: 768px) {
    width: 300px;
  }
`;

export const Span = styled.span`
  &.overlay {
    width: 100vw;
    height: 100vw;
    background-color: black;
    opacity: 0.5;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
  }
`;
