// components/modals/AuthModal.tsx
"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

interface AuthModalProps {
  children: ReactNode;
}

export default function AuthModal({ children }: AuthModalProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClose = () => {
    // Get the base path without the modal route
    // For example, if we're on /signup, we want to go to /
    // If we're on /some-page with a modal, we want to stay on /some-page
    const basePath = pathname === '/login' || pathname === '/signup' || pathname === '/reset' 
      ? '/' 
      : pathname;
    
    router.replace(basePath, { scroll: false });
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
