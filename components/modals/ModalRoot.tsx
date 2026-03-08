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

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 backdrop-blur-lg bg-black/50"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>,
    document.body
  );
}
