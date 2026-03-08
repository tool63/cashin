"use client";

import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";

interface AuthModalProps {
  children: ReactNode;
  onClose: () => void;  // Add this prop
}

export default function AuthModal({ children, onClose }: AuthModalProps) {
  // ESC key close
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
        dark:from-yellow-500/10
        dark:via-green-700/20
        dark:to-green-800/20
        border border-gray-200 dark:border-white/10
        rounded-2xl p-8 shadow-2xl
        text-primary
        backdrop-blur-xl
        animate-in fade-in zoom-in-95 duration-200
      "
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-muted hover:text-primary transition"
      >
        <X size={20} />
      </button>

      {children}
    </div>
  );
}
