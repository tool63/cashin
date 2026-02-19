"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface AuthModalProps {
  children: ReactNode;
}

export default function AuthModal({ children }: AuthModalProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Preserve query string if present
  const currentPath = searchParams?.toString()
    ? `${pathname}?${searchParams.toString()}`
    : pathname;

  // Close modal completely
  const handleClose = () => {
    router.replace(currentPath); // removes @auth slot, keeps page
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

      {/* Modal Content */}
      {children}
    </div>
  );
}
