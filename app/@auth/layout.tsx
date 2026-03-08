"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ModalRoot from "@/components/modals/ModalRoot";
import AuthModal from "@/components/modals/AuthModal";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const authType = searchParams?.get("auth");
  const isOpen = authType !== null;

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("auth");
    const query = params.toString();
    router.replace(query ? `?${query}` : window.location.pathname);
  };

  // Optional: Validate authType to prevent invalid modal content
  const isValidAuthType = authType && ['login', 'signup', 'reset'].includes(authType);
  
  if (!isOpen || !isValidAuthType) return null;

  return (
    <ModalRoot isOpen={isOpen} onClose={handleClose}>
      <AuthModal onClose={handleClose}>
        {children}
      </AuthModal>
    </ModalRoot>
  );
}
