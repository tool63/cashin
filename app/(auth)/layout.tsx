// app/(auth)/layout.tsx
"use client";

import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  onClose?: () => void;
}

export default function AuthLayout({ children, onClose }: AuthLayoutProps) {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 py-10"
    >
      <div className="w-full max-w-md mx-auto my-auto">
        {children}
      </div>
    </div>
  );
}
