"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import ModalRoot from "@/components/modals/ModalRoot";
import AuthModal from "@/components/modals/AuthModal";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(searchParams?.get("auth") !== null);
  }, [searchParams]);

  const handleClose = () => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.delete("auth");

    router.replace(params.toString() ? `?${params}` : "/", { scroll: false });
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <ModalRoot isOpen={isOpen} onClose={handleClose}>
      <AuthModal onClose={handleClose}>{children}</AuthModal>
    </ModalRoot>
  );
}
