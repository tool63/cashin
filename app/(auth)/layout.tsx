// app/(auth)/layout.tsx
"use client";

import { ReactNode } from "react";

export default function AuthLayout({ 
  children 
}: { 
  children: ReactNode 
}) {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      // You might want to handle navigation here or use a different approach
      window.history.back();
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
