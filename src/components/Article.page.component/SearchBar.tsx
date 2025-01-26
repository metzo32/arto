import { useState, useRef } from "react";
import { Div, Input, Span } from "./ArticleCard.style";
import { BaseButton } from "../../assets/design-assets/BaseButton/BaseButton";
import useModal from "../../hooks/ModalHook";
import Modal from "../Modal/Modal";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
    } else {
      handleOpenModal();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleCloseWithReset = () => {
    setQuery("");
    handleCloseModal();
    inputRef.current?.focus(); 
  };


  return (
    <>
      <Div className="search-bar-container">
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseWithReset}
          title="앗!"
          content="검색어를 입력해주세요."
        />
        <Input
          ref={inputRef}
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
