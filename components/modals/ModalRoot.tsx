"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter, useSearchParams } from "next/navigation";

interface ModalRootProps {
  children: ReactNode;
}

export default function ModalRoot({ children }: ModalRootProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const showAuth = searchParams.get('auth');

  useEffect(() => {
    if (!showAuth) return;
    
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, [showAuth]);

  if (!showAuth) return null;

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
