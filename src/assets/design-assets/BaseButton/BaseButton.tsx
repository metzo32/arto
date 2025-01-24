import { Button } from "./BaseButton.style";

interface BaseButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const BaseButton = ({ text, type, onClick }: BaseButtonProps) => {
  return (
    <Button onClick={onClick} type={type} className="primary">
      {text}
    </Button>
  );
};

const SecondaryButton = ({ text, type, onClick }: BaseButtonProps) => {
  return (
    <Button onClick={onClick} type={type} className="secondary">
      {text}
    </Button>
  );
};

export { BaseButton, SecondaryButton };
