"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalRootProps {
  children: ReactNode;
}

export default function ModalRoot({ children }: ModalRootProps) {
  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-24 px-4 animate-fadeIn"
    >
      {children}
    </div>,
    document.body
  );
}
