"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface AuthModalProps {
  children: ReactNode;
}

export default function AuthModal({ children }: AuthModalProps) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

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
      "
    >
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-muted hover:text-primary transition"
      >
        <X size={20} />
      </button>

      {children}
    </div>
  );
}
