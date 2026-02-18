// app/(auth)/layout.tsx
"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      router.back();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-md mx-4">
        {children}
      </div>
    </div>
  );
}
