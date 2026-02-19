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

  // Build the current path with query string
  const currentPath = searchParams?.toString()
    ? `${pathname}?${searchParams.toString()}`
    : pathname;

  // Close modal by navigating to the same page — clears @auth slot
  const handleClose = () => {
    router.replace(currentPath);
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
