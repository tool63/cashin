// components/modals/AuthModal.tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AuthLayout from "@/app/(auth)/layout";
import SignupPage from "@/app/(auth)/signup/page";
import LoginPage from "@/app/(auth)/login/page";
import ResetPage from "@/app/(auth)/reset/page";

export default function AuthModal() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Prevent scrolling on body when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!mounted) return null;

  // Determine which content to show based on path
  const getContent = () => {
    if (pathname?.startsWith('/signup')) return <SignupPage />;
    if (pathname?.startsWith('/login')) return <LoginPage />;
    if (pathname?.startsWith('/reset')) return <ResetPage />;
    return null;
  };

  const content = getContent();
  if (!content) return null;

  // Wrap the content with AuthLayout
  return <AuthLayout>{content}</AuthLayout>;
}
