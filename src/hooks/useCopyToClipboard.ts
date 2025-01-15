import { useRef } from "react";

const useCopyToClipboard = () => {
  const elementRef = useRef<HTMLDivElement>(null);

  const copyContent = () => {
    if (elementRef.current) {
      const content = elementRef.current.innerHTML;
      navigator.clipboard
        .writeText(content)
        .then(() => {
          alert("Copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy:", err);
        });
    }
  };

  return { elementRef, copyContent };
};

export default useCopyToClipboard;
