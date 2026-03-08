"use client";

import { useRouter } from "next/navigation";
import ModalRoot from "@/components/modals/ModalRoot";
import AuthModal from "@/components/modals/AuthModal";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  
  const handleClose = () => {
    router.back();
  };

  return (
    <ModalRoot isOpen={true} onClose={handleClose}>
      <AuthModal onClose={handleClose}>
        {children}
      </AuthModal>
    </ModalRoot>
  );
}
