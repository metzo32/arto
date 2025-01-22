import styled from "styled-components";

export const Div = styled.div`
  &.wrapper {
    width: 900px;
    height: 500px;
    background-color: ${(props) => props.theme.bg_primary};
    margin: 0 auto;
    box-shadow: 3px 5px 8px rgba(0, 0, 0, 0.2);

    display: flex;
    justify-content: space-between;

    @media (max-width: 767px) {
      width: calc(280px - 70px);
      height: calc(504px - 70px);
      padding: 35px;
      display: flex;
      flex-direction: column-reverse;
      justify-content: space-between;
    }

    @media (min-width: 768px) {
      width: calc(630px - 80px);
      height: calc(350px - 80px);
      padding: 40px;
      flex-direction: row;
    }

    @media (min-width: 1024px) {
      width: calc(720px - 100px);
      height: calc(400px - 100px);
      padding: 50px;
    }
  }

  &.contact-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media (max-width: 767px) {
      height: 250px;
    }

    @media (min-width: 768px) {
      height: auto;
    }

    @media (min-width: 1024px) {
    }
  }

  &.name-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export const H3 = styled.h3`
  font-family: "Libre Baskerville", serif;
  font-size: 24px;
  line-height: 36px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
`;

export const P = styled.p`
  font-family: "Libre Baskerville", serif;
  font-weight: 400;
  color: ${(props) => props.theme.text_secondary};

  @media (max-width: 767px) {
    font-size: 14px;
  }

  @media (min-width: 768px) {
    font-size: 20px;
    line-height: 24px;
  }

  @media (min-width: 1024px) {
    font-size: 20px;
  }

  &.address {
    cursor: pointer;

    &:hover {
      color: ${(props) => props.theme.text};
    }
  }
`;

export const Logo = styled.img`
  width: 100px;
  height: 50px;

  @media (max-width: 767px) {
    transform: rotate(90deg) translateX(20px) translateY(-155px);
  }

  @media (min-width: 768px) {
  }

  @media (min-width: 1024px) {
  }
`;

export const A = styled.a`
  min-width: 210px;
  font-family: "Libre Baskerville", serif;
  font-size: 20px;
  font-weight: 400;
  color: ${(props) => props.theme.text_secondary};
  text-decoration: none;

  @media (max-width: 767px) {
    font-size: 14px;
  }

  @media (min-width: 768px) {
    font-size: 20px;
  }

  @media (min-width: 1024px) {
    font-size: 20px;
  }

  &:hover {
    color: ${(props) => props.theme.text};
  }
`;
