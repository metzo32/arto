import { ReactNode } from "react";
import { Button } from "./RoundButton.style"

interface RoundButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export default function RoundButton({ children, onClick }: RoundButtonProps) {
  return <Button onClick={onClick}>{children}</Button>;
}
