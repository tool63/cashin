"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalRootProps {
  children: ReactNode;
}

export default function ModalRoot({ children }: ModalRootProps) {
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return createPortal(
    <div
      className="
        fixed inset-0 z-50
        flex items-start justify-center
        pt-24 px-4
        backdrop-blur-lg
        bg-black/50
      "
    >
      {children}
    </div>,
    document.body
  );
}
