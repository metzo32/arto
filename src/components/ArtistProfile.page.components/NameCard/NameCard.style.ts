import styled from "styled-components";
import { ReactComponent as LogoShadowDark } from "../../../assets/icons/logo/logo_shadow_dark.svg";
import { ReactComponent as LogoShadowLight } from "../../../assets/icons/logo/logo_shadow_light.svg";

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
      width: 280px;
      height: 504px;
      padding: 35px;
      display: flex;
      flex-direction: column-reverse;
      justify-content: space-between;
    }

    @media (min-width: 768px) {
      width: 630px;
      height: 350px;
      padding: 40px;
      flex-direction: row;
    }

    @media (min-width: 1024px) {
      width: 720px;
      height: 400px;
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
    line-height: 20px;
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

export const BrandDark = styled(LogoShadowDark)`
  width: 100px;
`;

export const BrandLight = styled(LogoShadowLight)`
  width: 100px;
`;
