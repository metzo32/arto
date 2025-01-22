import { Button } from "./BaseButton.style";

interface BaseButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  // onClick?: (() => void) | ((event: React.MouseEvent<HTMLButtonElement>) => void);
  onClick?: any;
}

export default function BaseButton({ text, type, onClick }: BaseButtonProps) {
  return (
    <Button onClick={onClick} type={type}>
      {text}
    </Button>
  );
}
