"use client";

import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-screen min-h-screen bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 overflow-hidden flex items-center justify-center px-4">
      
      {/* ============================
          Soft Floating Shapes
      ============================ */}
      <div className="absolute w-72 h-72 bg-green-400/30 rounded-full blur-3xl animate-float top-20 left-10"></div>
      <div className="absolute w-96 h-96 bg-yellow-400/30 rounded-full blur-3xl animate-float animation-delay-2000 bottom-10 right-10"></div>
      <div className="absolute w-80 h-80 bg-green-500/20 rounded-full blur-3xl animate-float animation-delay-4000 top-1/3 right-1/4"></div>

      {/* ============================
          Centered Auth Card
      ============================ */}
      <div className="relative z-10 w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
