import { Span, Div, H3, P, Circle, ModalIcon } from "./Modal.style";
import {
  BaseButton,
  SecondaryButton,
} from "../../assets/design-assets/BaseButton/BaseButton";
import useWindowSize from "../../hooks/useWindowSize";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string | JSX.Element;
  isOptionOn?: boolean;
  primBtnText?: string;
  secBtnText?: string;
  onSecClose?: () => void;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  content,
  isOptionOn = false,
  primBtnText = "닫기",
  secBtnText = "닫기",
  onSecClose,
}: ModalProps) {
  
  const { isMobile } = useWindowSize();
  if (!isOpen) return null;

  return (
    <Span className="overlay">
      <Div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
        {!isMobile && (
          <Circle className="wrapper">
            <Span className="icon-contianer ">
              <ModalIcon />
            </Span>
            <Circle className="circle circle00" />
            <Circle className="circle circle01" />
            <Circle className="circle circle02" />
            <Circle className="circle circle03" />
          </Circle>
        )}
        <H3>{title}</H3>
        <P>{content}</P>
        <Div className="btn-container">
          <BaseButton onClick={onClose} text={primBtnText} />
          {isOptionOn && (
            <SecondaryButton onClick={onSecClose} text={secBtnText} />
          )}
        </Div>
      </Div>
    </Span>
  );
}
