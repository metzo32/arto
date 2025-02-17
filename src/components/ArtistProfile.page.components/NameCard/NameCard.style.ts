import styled from "styled-components";
import { HTMLAttributes } from "react";
import LogoShadowDark from "../../../../public/assets/icons/logo/logo_shadow_dark.svg";
import LogoShadowLight from "../../../../public/assets/icons/logo/logo_shadow_light.svg";

export const Div = styled.div`
  &.wrapper {
    // width: 900px;
    // height: 500px;
    background-color: ${(props) => props.theme.bg_primary};
    margin: 0 auto;
    box-shadow: 3px 5px 8px rgba(0, 0, 0, 0.2);

    display: flex;
    justify-content: space-between;

    @media (max-width: 767px) {
      width: 190px;
      height: 380px;
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
  font-size: 18px;
  line-height: 24px;
  font-weight: bold;
  color: ${(props) => props.theme.text};

  @media (min-width: 768px) {
    font-size: 24px;
    line-height: 36px;
  }
`;

export const P = styled.p`
  font-family: "Libre Baskerville", serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: ${(props) => props.theme.text_secondary};

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
  transform: rotate(90deg) translateX(20px) translateY(-155px);
`;

export const A = styled.a`
  min-width: 120px;
  font-family: "Libre Baskerville", serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  color: ${(props) => props.theme.text_secondary};
  text-decoration: none;

  word-break: break-word;
  overflow-wrap: break-word;

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

export const BrandDark = styled(LogoShadowDark).attrs<
  HTMLAttributes<SVGElement>
>({})`
  width: 100px;
`;

export const BrandLight = styled(LogoShadowLight).attrs<
  HTMLAttributes<SVGElement>
>({})`
  width: 100px;
`;
