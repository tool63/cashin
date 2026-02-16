"use client";

import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-screen min-h-screen bg-gray-50 dark:bg-[#070A14] overflow-hidden flex items-center justify-center px-4 sm:px-6">

      {/* ============================
          Animated Gradient Background
      ============================ */}
      <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-400 opacity-20 dark:opacity-10 pointer-events-none z-0"></div>
      <div className="absolute w-72 h-72 bg-green-400/30 rounded-full blur-3xl animate-float top-20 left-10 pointer-events-none z-0"></div>
      <div className="absolute w-96 h-96 bg-yellow-400/30 rounded-full blur-3xl animate-float animation-delay-2000 bottom-10 right-10 pointer-events-none z-0"></div>
      <div className="absolute w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-float animation-delay-4000 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"></div>

      {/* ============================
          Centered Auth Card
      ============================ */}
      <div className="relative z-10 w-full max-w-md flex justify-center items-center">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
