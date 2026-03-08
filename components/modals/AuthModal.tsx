"use client";

import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";

interface AuthModalProps {
  children: ReactNode;
  onClose: () => void;
}

export default function AuthModal({ children, onClose }: AuthModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      className="
        relative w-full max-w-md
        bg-gradient-to-br
        from-yellow-400/20
        via-green-400/30
        to-green-500/20
        border
        rounded-2xl
        p-8
        shadow-2xl
        backdrop-blur-xl
        animate-in fade-in zoom-in-95 duration-200
      "
    >
      <button onClick={onClose} className="absolute top-4 right-4">
        <X size={20} />
      </button>

      {children}
    </div>
  );
}
