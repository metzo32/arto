import { useState } from "react";
import { Div, H4 } from "./ArticleComp.style";
import { useRouter } from "next/navigation";
import { BaseButton } from "../../../public/assets/design-assets/BaseButton/BaseButton";

export default function NoResult() {
  const [searchResult, setSearchResult] = useState<string>("");
  const router = useRouter();

  const handleReset = () => {
    setSearchResult("");
    router.push("/");
  };

  return (
    <Div className="no-result">
      <H4>결과가 없습니다.</H4>
      <BaseButton type="button" text="전체보기" onClick={handleReset} />
    </Div>
  );
}
