// useModal.ts
import { useState, useCallback } from "react";

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalContent, setModalContent] = useState<string | JSX.Element>("");

  const openModal = useCallback(
    (
      title: string = "앗!",
      content: string | JSX.Element = "오류가 발생했습니다."
    ) => {
      setModalTitle(title);
      setModalContent(content);
      setIsModalOpen(true);
    },
    []
  );
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return { isModalOpen, modalTitle, modalContent, openModal, closeModal };
};
