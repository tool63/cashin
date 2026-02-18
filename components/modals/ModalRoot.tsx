// components/modals/ModalRoot.tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AuthModal from "./AuthModal";

export default function ModalRoot() {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Check if we should show as modal (when there's a redirect query param)
    const urlParams = new URLSearchParams(window.location.search);
    const asModal = urlParams.get('modal') === 'true';
    
    // Or if we came from a client-side navigation that should show as modal
    const isAuthRoute = pathname?.startsWith('/login') || 
                        pathname?.startsWith('/signup') || 
                        pathname?.startsWith('/reset');
    
    // Only show as modal if we're on an auth route AND we want it as modal
    // (you can control this via navigation state or query param)
    setIsModalOpen(isAuthRoute && asModal);
  }, [pathname]);

  if (!isModalOpen) return null;

  return <AuthModal />;
}
