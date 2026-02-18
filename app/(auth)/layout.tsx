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
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0F1A] overflow-hidden"
    >
      {/* Animated gradient overlay - matching affiliate page */}
      <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-yellow-400/20 via-green-400/20 to-green-500/20"></div>
      
      {/* Floating blobs - matching affiliate page */}
      <div className="absolute w-72 h-72 bg-green-400/30 rounded-full blur-3xl animate-float top-20 left-10"></div>
      <div className="absolute w-96 h-96 bg-yellow-400/30 rounded-full blur-3xl animate-float animation-delay-2000 bottom-10 right-10"></div>
      
      {/* Card container */}
      <div className="relative z-10 w-full max-w-md mx-4">
        {children}
      </div>
    </div>
  );
}
