"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalRootProps {
  children: ReactNode;
}

export default function ModalRoot({ children }: ModalRootProps) {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return createPortal(
    <div
      className="
        fixed inset-0 z-50
        bg-black/60
        backdrop-blur-md
        flex items-start justify-center
        pt-24 px-4
      "
    >
      {children}
    </div>,
    document.body
  );
}
