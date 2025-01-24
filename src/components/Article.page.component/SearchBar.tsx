import { useState } from "react";
import { Div, Input, Span } from "./ArticleCard.style";
import { BaseButton } from "../../assets/design-assets/BaseButton/BaseButton";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <>
      <Div className="search-bar-container">
        <Input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="검색어를 입력하세요"
          className="search-input"
        />
        <BaseButton onClick={handleSearch} text="찾기" />
      </Div>
      {isFocused && <Span className="overlay" />}
    </>
  );
}
