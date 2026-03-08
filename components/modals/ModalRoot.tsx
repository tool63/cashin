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
  const showAuth = searchParams.get("auth");

  const closeModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("auth");

    const query = params.toString();
    router.replace(query ? `?${query}` : "/");
  };

  useEffect(() => {
    if (!showAuth) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", handleEsc);
    };
  }, [showAuth]);

  if (!showAuth) return null;

  return createPortal(
    <div
      onClick={closeModal}
      className="
        fixed inset-0 z-50
        flex items-start justify-center
        pt-24 px-4
        backdrop-blur-lg
        bg-black/50
        animate-in fade-in duration-200
      "
    >
      {/* Prevent modal close when clicking inside */}
      <div onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
}
