import styled, {keyframes} from "styled-components";
import { ReactComponent as HeartLine } from "../../assets/icons/heart_outlined.svg";
import { ReactComponent as HeartFull } from "../../assets/icons/heart_full.svg";
import { darkTheme, lightTheme } from "../../stores/colors";


export const bounce = keyframes`
    70% { 
      transform: translateY(0%); 
    }
    80% { 
      transform: translateY(-30%); 
    }
    90% { 
      transform: translateY(0%); 
    }
    95% { 
      transform: translateY(-14%); 
    }
    97% { 
      transform: translateY(0%); 
    }
    99% { 
      transform: translateY(-6%); 
    }
    100% { 
      transform: translateY(0); 
    }
`;

export const reverseBounce = keyframes`
  70% { 
      transform: translateY(0%); 
    }
    80% { 
      transform: translateY(30%); 
    }
    90% { 
      transform: translateY(0%); 
    }
    95% { 
      transform: translateY(14%); 
    }
    97% { 
      transform: translateY(0%); 
    }
    99% { 
      transform: translateY(6%); 
    }
    100% { 
      transform: translateY(0); 
    }
`;

export const IconLine = styled(HeartLine)`
  width: 100%;
  height: 100%;
  fill:${(props) => props.theme.white};
  opacity: 0.6;
`;

export const IconHover = styled(HeartFull)`
  width: 100%;
  height: 100%;
  fill: ${(props) => props.theme.white};
`;

export const IconClicked = styled(HeartFull)`
  width: 100%;
  height: 100%;
  fill: ${darkTheme.main};
`;

export const Span = styled.span`
  width: 50px;
  height: 50px;
  position: absolute;
  z-index: 10;
  touch-action: manipulation;

  @media (max-width: 767px) {
    right: 10px;
    bottom: 10px;
  }

  @media (min-width: 768px) {
    right: 80px;
    bottom: 95px;
  }

  @media (min-width: 1024px) {
    right: 85px;
    bottom: 110px;
  }
`;
