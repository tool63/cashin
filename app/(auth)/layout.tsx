"use client";

import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-screen min-h-screen bg-gray-50 dark:bg-[#070A14] overflow-hidden">

      {/* ============================
          Subtle Animated Background
      ============================ */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-400 opacity-20 dark:opacity-10 pointer-events-none z-0 animate-gradient"></div>

      {/* Single subtle floating blobs */}
      <div className="absolute w-72 h-72 bg-green-400/20 rounded-full blur-3xl animate-float top-1/4 left-1/4 pointer-events-none z-0"></div>
      <div className="absolute w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl animate-float bottom-1/4 right-1/4 pointer-events-none z-0 animation-delay-2000"></div>

      {/* ============================
          Centered Popup Modal
      ============================ */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-6 sm:py-12">
        <div className="w-full max-w-md bg-white dark:bg-[#0B0F1A] border border-gray-300 dark:border-gray-700 rounded-3xl shadow-2xl p-6 sm:p-10">
          {children}
        </div>
      </div>
    </div>
  );
}
