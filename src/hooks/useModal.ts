import { useState, useCallback } from "react";

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalContent, setModalContent] = useState<string | JSX.Element>("");
  const [modalCloseCallback, setModalCloseCallback] = useState<
    (() => void) | null
  >(null);

  const openModal = useCallback(
    (
      title: string = "앗!",
      content: string | JSX.Element = "오류가 발생했습니다.",
      onClose?: () => void,
    ) => {
      setModalTitle(title);
      setModalContent(content);
      setIsModalOpen(true);
      if (onClose) {
        setModalCloseCallback(() => onClose); // 콜백 저장
      }
    },
    []
  );

  const closeModal = useCallback(() => {
    setIsModalOpen(false);

    if (modalCloseCallback) {
      modalCloseCallback(); // 모달이 닫힐 때 콜백 실행
      setModalCloseCallback(null);
    }
  }, [modalCloseCallback]);
  

  return { isModalOpen, modalTitle, modalContent, openModal, closeModal };
};
