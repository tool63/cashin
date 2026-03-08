"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalRootProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalRoot({ children, isOpen, onClose }: ModalRootProps) {
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      onClick={onClose}
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/50 dark:bg-black/60
        backdrop-blur-md
        animate-in fade-in duration-200
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full max-w-md
          animate-in fade-in zoom-in-95 duration-200
        "
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
