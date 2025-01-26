import { SyncLoader } from "react-spinners";
import { ThemeContext } from "../../context/ThemeContext";
import { Div } from "./LoadingSpinner.style";
import { useContext } from "react";

export default function LoadingSpinner() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return (
      <Div>
        <SyncLoader color="#cb0d3c" />
      </Div>
    );
  }

  const { isDark } = themeContext;
  return (
    <Div>
      {isDark ? <SyncLoader color="#FC1A4C" /> : <SyncLoader color="#cb0d3c" />}
    </Div>
  );
}
