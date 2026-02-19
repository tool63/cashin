"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface AuthModalProps {
  children: ReactNode;
}

/**
 * AuthModal wraps login/signup/reset forms in a modal
 * Works with parallel route @auth/(.)login, @auth/(.)signup, @auth/(.)reset
 * Cross icon closes modal safely by clearing the @auth slot
 */
export default function AuthModal({ children }: AuthModalProps) {
  const router = useRouter();

  // Close the modal by navigating to root page
  const handleClose = () => {
    router.push("/"); // safely removes @auth modal
  };

  return (
    <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl animate-slideUp">
      
      {/* Cross Icon Button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-neutral-400 hover:text-white transition"
      >
        <X size={20} />
      </button>

      {/* Modal Content (login/signup/reset forms go here) */}
      {children}
    </div>
  );
}
