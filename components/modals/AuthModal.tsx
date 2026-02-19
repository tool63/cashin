// components/modals/AuthModal.tsx
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
    // Use router.back() to go back to the previous page
    // This will close the modal while keeping the user on the same page they were on
    router.back();
  };

  return (
    <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl animate-slideUp">
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-neutral-400 hover:text-white transition"
      >
        <X size={20} />
      </button>

      {children}
    </div>
  );
}
