import { ReactNode } from "react";
import { Button } from "./RoundButton.styled";

interface RoundButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export default function RoundButton({ children, onClick }: RoundButtonProps) {
  return <Button onClick={onClick}>{children}</Button>;
}
