"use client";

import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-6 overflow-hidden bg-gray-50 dark:bg-[#070A14] transition-colors duration-300">

      {/* ============================
          Animated Gradient Background
      ============================ */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">

        {/* Yellow-Green Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-green-400 to-yellow-400 opacity-30"></div>

        {/* Soft Radial Overlay (adds depth) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.4),transparent_70%)]"></div>

        {/* Floating Blob 1 */}
        <div className="absolute w-72 h-72 bg-green-400/30 rounded-full blur-3xl top-1/4 left-1/4 animate-float"></div>

        {/* Floating Blob 2 */}
        <div className="absolute w-96 h-96 bg-yellow-400/30 rounded-full blur-3xl bottom-1/4 right-1/4 animate-float animation-delay-2000"></div>

      </div>

      {/* ============================
          Premium Auth Card
      ============================ */}
      <div className="relative z-10 w-full max-w-lg">

        <div className="
          bg-white/80 dark:bg-[#0B0F1A]/90
          backdrop-blur-xl
          border border-white/40 dark:border-gray-700
          rounded-3xl
          shadow-[0_20px_80px_rgba(0,0,0,0.25)]
          p-6 sm:p-10
          flex flex-col items-center
        ">
          {children}
        </div>

      </div>
    </div>
  );
}
