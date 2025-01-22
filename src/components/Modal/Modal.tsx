import { Span, Div, H3, P, Circle, ModalIcon } from "./Modal.style";
import BaseButton from "../../assets/design-assets/BaseButton/BaseButton";
import useWindowSize from "../../hooks/useWindowSize";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string | JSX.Element;
}

export default function Modal({ isOpen, onClose, title, content }: ModalProps) {
  const { isMobile } = useWindowSize();
  if (!isOpen) return null;

  return (
    <Span className="overlay">
      <Div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
        {!isMobile && (
          <Circle className="wrapper">
            <Div className="icon-contianer ">
              <ModalIcon />
            </Div>
            <Circle className="circle circle00" />
            <Circle className="circle circle01" />
            <Circle className="circle circle02" />
            <Circle className="circle circle03" />
          </Circle>
        )}
        <H3>{title}</H3>
        <P>{content}</P>
        <BaseButton onClick={onClose} text="닫기" />
      </Div>
    </Span>
  );
}
