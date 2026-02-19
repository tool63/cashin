// components/modals/AuthModal.tsx
"use client";

import { ReactNode, useEffect, useState } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface AuthModalProps {
  children: ReactNode;
}

export default function AuthModal({ children }: AuthModalProps) {
  const router = useRouter();
  const [previousPath, setPreviousPath] = useState("/");

  useEffect(() => {
    // Store the previous path when modal opens
    // This assumes the modal was opened from a page
    if (document.referrer) {
      setPreviousPath(document.referrer);
    }
  }, []);

  const handleClose = () => {
    // Close modal and go back to previous page, but replace history
    // so the modal route isn't in history
    router.replace(previousPath, { scroll: false });
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
