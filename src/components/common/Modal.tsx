import React, { useEffect } from "react";
import { createPortal } from "react-dom";

export interface ModalProps {
  isOpen?: boolean;
  open?: boolean;
  onClose: () => void;
  children: React.ReactNode;
  containerClassName?: string;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
}

const DEFAULT_OVERLAY = "fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6 overflow-y-auto";
const DEFAULT_CONTAINER_BASE = "p-6 bg-white rounded-xl shadow-2xl relative w-full max-h-[85vh] flex flex-col overflow-y-auto";

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  open,
  onClose,
  children,
  containerClassName = "",
  closeOnOverlayClick = true,
  closeOnEsc = true,
  containerProps = {},
}) => {
  const show = isOpen ?? open ?? false;

  useEffect(() => {
    if (!show || !closeOnEsc) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [show, closeOnEsc, onClose]);

  useEffect(() => {
    if (show) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [show]);

  if (!show) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  const combinedContainerClass = `${DEFAULT_CONTAINER_BASE} ${containerClassName}`.trim();

  const modalContent = (
    <div className={DEFAULT_OVERLAY} onClick={handleOverlayClick}>
      <div
        {...containerProps}
        className={combinedContainerClass}
        onClick={(e) => {
          containerProps.onClick?.(e);
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default Modal;
