"use client";

import { useState, useEffect, useRef } from "react";
import { Div, Input, Span } from "./SearchBar.style"
import { BaseButton } from "../../../public/assets/design-assets/BaseButton/BaseButton";
import { useModal } from "../../hooks/useModal";
import Modal from "../../components/Modal/Modal";
import { useRouter } from "next/navigation";

export default function SearchBarComp() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [query, setQuery] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);
  const { isModalOpen, modalTitle, modalContent, openModal, closeModal } =
    useModal();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const navigateToSearch = () => {
    if (query.trim()) {
      router.push(`/search?nickname=${encodeURIComponent(query.trim())}`);
      inputRef.current?.blur();
    } else {
      openModal("앗!", "검색어를 입력해주세요.");
    }
  };
  
  const handleSearch = navigateToSearch;
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") navigateToSearch();
  };
  

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleCloseWithReset = () => {
    closeModal();
    inputRef.current?.focus();
  };

  return (
    <>
      <Div className={`${isMounted ? "search-bar-container" : "hidden"}`}>
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseWithReset}
          title={modalTitle}
          content={modalContent}
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
        <BaseButton onClick={handleSearch} text="찾기" type="button" />
      </Div>
      {isFocused && <Span className="overlay" />}
    </>
  );
}
