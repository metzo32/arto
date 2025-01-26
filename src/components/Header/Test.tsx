import { Div } from "./Test.style";

export default function Test() {
  return (
    <>
      <Div className="parent">
        부모 요소
        <Div className="child">
          자식 요소
        </Div>
      </Div>
    </>
  );
}
