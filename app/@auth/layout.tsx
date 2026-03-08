"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ModalRoot from "@/components/modals/ModalRoot";
import AuthModal from "@/components/modals/AuthModal";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Check if auth modal should be open
  const isOpen = searchParams?.get("auth") !== null;

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("auth");
    const query = params.toString();
    router.replace(query ? `?${query}` : window.location.pathname);
  };

  // Don't render anything if modal shouldn't be open
  if (!isOpen) return null;

  return (
    <ModalRoot isOpen={isOpen} onClose={handleClose}>
      <AuthModal onClose={handleClose}>
        {children}
      </AuthModal>
    </ModalRoot>
  );
}
