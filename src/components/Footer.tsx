import { useNavigate } from "react-router-dom";
import s from "../stores/styling";

interface FooterProps {
  wrapperClassName?: string;
}

const Footer: React.FC<FooterProps> = ({ wrapperClassName }) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <s.Footer className={wrapperClassName}>
      <s.Footer className="footer-container">
        <s.Footer className="brand-wrapper">
          <s.BrandLogo />
          <s.StyledH4 className="brand-text">Tapttoo</s.StyledH4>
        </s.Footer>
  
        <s.Footer className="footer-icon-box">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <s.FaceBookIcon className="outlined" />
          </a>
          <a
            href="https://www.tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <s.TiktokIcon className="outlined" />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <s.InstagramIcon className="outlined" />
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <s.YoutubeIcon className="outlined" />
          </a>
        </s.Footer>
      </s.Footer>

      <s.Footer className="copyright">
        <s.Footer className="footer-box-left">
          <s.StyledP className="footer-copyright">
            {"\u00A9"} 2024 Tapttoo All Rights Reserved
          </s.StyledP>
        </s.Footer>

        <s.Line className="horizontal footer" />

        <s.Footer className="footer-box-right">
          <s.StyledP className="footer-copyright">Terms of Use</s.StyledP>
          <s.StyledP className="footer-copyright">Privacy Policy</s.StyledP>
        </s.Footer>
      </s.Footer>
    </s.Footer>
  );
};
export default Footer;
