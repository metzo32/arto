// import { useState, ReactNode } from "react";
// import ReactDOM from "react-dom";
// import s from "../stores/styling";
// import HoverButton from "./HoverButton";

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   modalTitle: string;
//   text: ReactNode | undefined;
//   showCheckbox: boolean;
//   checkboxText?: string;
//   modalButtonClose: string;
//   addButton: boolean;
//   modalButtonOption?: string;
//   onOptionClick?: () => void;
//   isInvalid?: boolean;
//   onInvalid?: () => void;
//   onCheckboxChange?: () => void; // 추가된 콜백
// }

// const Modal: React.FC<ModalProps> = ({
//   isOpen,
//   onClose,
//   modalTitle,
//   text,
//   showCheckbox,
//   checkboxText,
//   modalButtonClose,
//   modalButtonOption,
//   addButton,
//   onOptionClick,
//   isInvalid = false,
//   onInvalid,
//   onCheckboxChange,
// }) => {
//   const [understand, setUnderstand] = useState(false);
//   const [animationClosing, setAnimationClosing] = useState(false);

//   if (!isOpen) return null;

//   const handleUnderstandChange = () => {
//     setUnderstand(!understand);
//     if (!understand && onCheckboxChange) {
//       onCheckboxChange(); // 체크박스가 체크되면 콜백 호출
//     }
//   };

//   const handleModalClose = () => {
//     if (showCheckbox && !understand) {
//       if (onInvalid) onInvalid();
//       return;
//     }

//     setAnimationClosing(true);
//     setTimeout(() => {
//       setAnimationClosing(false);
//       setUnderstand(false); // 체크박스 상태 초기화
//       onClose();
//     }, 200);
//   };

//   const portalElement = document.getElementById("portal");
//   if (!portalElement) return null;

//   return ReactDOM.createPortal(
//     <>
//       <s.Modal className={`modal-overlay ${animationClosing ? "closing" : ""}`}>
//         <s.Modal
//           className={`modal-wrapper ${animationClosing ? "closing" : ""}`}
//         >
//           <s.Modal className="circle">
//             <s.WarnIcon />
//           </s.Modal>
//           <s.Echo className="wrapper">
//             <s.Echo className="circle00" />
//             <s.Echo className="circle01" />
//             <s.Echo className="circle02" />
//             <s.Echo className="circle03" />
//           </s.Echo>
//           <s.Modal
//             className={`modal-container ${showCheckbox ? "with-checkbox" : ""}`}
//           >
//             <s.StyledH1 className="warning">{modalTitle}</s.StyledH1>
//             <s.ModalText>{text}</s.ModalText>
//             {showCheckbox && (
//               <s.Modal className="checkbox-container">
//                 <s.Input
//                   type="checkbox"
//                   id="understand"
//                   checked={understand}
//                   onChange={handleUnderstandChange}
//                   className="modal-check"
//                 />
//                 <s.Label
//                   htmlFor="understand"
//                   className={`modal-label ${isInvalid ? "invalid" : ""}`}
//                 >
//                   {understand ? (
//                     <s.CheckboxAfterIcon className="checkbox-icon-checked" />
//                   ) : (
//                     <s.CheckboxBeforeIcon className="checkbox-icon" />
//                   )}
//                   {checkboxText}
//                 </s.Label>
//               </s.Modal>
//             )}
//             <s.Modal
//               className={`modal-button-box ${addButton ? "two-buttons" : ""}`}
//             >
//               <HoverButton
//                 onClick={handleModalClose}
//                 circle={false}
//                 text={modalButtonClose}
//                 ignoreDark={true}
//               />

//               {addButton && (
//                 <HoverButton
//                   onClick={onOptionClick}
//                   circle={false}
//                   text={modalButtonOption}
//                   ignoreDark={true}
//                 />
//               )}
//             </s.Modal>
//           </s.Modal>
//         </s.Modal>
//       </s.Modal>
//     </>,
//     portalElement
//   );
// };

// export default Modal;
import React from 'react'

export default function Modal() {
  return (
    <div>
      예전 모달
    </div>
  )
}
