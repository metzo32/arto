import s from "../stores/styling";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  value?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | (() => void);
  circle: boolean;
  text: React.ReactNode; 
  ignoreDark?: boolean;
}

const HoverButton = ({ type, value, className, onClick, circle, text, ignoreDark }: ButtonProps) => {
  return (
    <s.GreenButton
      onClick={onClick}
      type={type}
      value={value}
      className={`${circle ? "with-circle" : ""} ${ignoreDark ? "always-light" : ""} ${className}`}
    >
      {circle && (
        <s.GreenButtonCircle>
          <s.ButtonArrow/>
        </s.GreenButtonCircle>
      )}
      {text}
    </s.GreenButton>
  );
};

export default HoverButton;
