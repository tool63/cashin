// app/(auth)/AuthPageWrapper.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import AuthModal from "@/components/modals/AuthModal";

export default function AuthPageWrapper({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const asModal = searchParams.get('modal') === 'true';

  // If it should be a modal, render the modal with children
  if (asModal) {
    return <AuthModal />;
  }

  // Otherwise render as full page
  return <>{children}</>;
}
