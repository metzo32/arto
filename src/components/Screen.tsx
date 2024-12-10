import { ReactNode } from "react";
import s from "../stores/styling";

interface ScreenProps {
  children: ReactNode;
}

export default function Screen({ children }: ScreenProps) {
  return <s.App className="base-screen">{children}</s.App>;
}
