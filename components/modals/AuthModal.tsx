// components/modals/AuthModal.tsx
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AuthLayout from "@/app/(auth)/layout";
import SignupPage from "@/app/(auth)/signup/page";
import LoginPage from "@/app/(auth)/login/page";
import ResetPage from "@/app/(auth)/reset/page";

export default function AuthModal() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    // Remove the modal query param and go back
    const newUrl = window.location.pathname;
    router.push(newUrl);
  };

  if (!mounted) return null;

  const getContent = () => {
    if (pathname?.startsWith('/signup')) return <SignupPage />;
    if (pathname?.startsWith('/login')) return <LoginPage />;
    if (pathname?.startsWith('/reset')) return <ResetPage />;
    return null;
  };

  const content = getContent();
  if (!content) return null;

  // Pass handleClose to AuthLayout for backdrop click
  return <AuthLayout onClose={handleClose}>{content}</AuthLayout>;
}
