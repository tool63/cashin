// components/modals/ModalRoot.tsx
"use client";

import { usePathname } from "next/navigation";
import AuthModal from "./AuthModal";

export default function ModalRoot() {
  const pathname = usePathname();
  
  // Check if current path is an auth route
  const isAuthRoute = pathname?.startsWith('/login') || 
                      pathname?.startsWith('/signup') || 
                      pathname?.startsWith('/reset');

  if (!isAuthRoute) return null;

  return <AuthModal />;
}
