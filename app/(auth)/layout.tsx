"use client";

import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-screen min-h-screen bg-gray-50 dark:bg-[#070A14] flex items-center justify-center px-4 sm:px-6 overflow-hidden">
      
      {/* ============================
          Subtle Gradient Background
      ============================ */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-green-400 to-yellow-500 opacity-20 dark:opacity-10 pointer-events-none z-0"></div>

      {/* ============================
          Floating Accent Blobs (Optional)
      ============================ */}
      <div className="absolute w-64 h-64 bg-green-400/20 rounded-full blur-3xl top-1/3 left-1/4 animate-float pointer-events-none z-0"></div>
      <div className="absolute w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl bottom-1/3 right-1/4 animate-float pointer-events-none z-0 animation-delay-2000"></div>

      {/* ============================
          Centered Premium Popup Card
      ============================ */}
      <div className="relative z-10 flex justify-center items-center w-full min-h-screen">
        <div className="w-full max-w-lg bg-white dark:bg-[#0B0F1A] border border-gray-200 dark:border-gray-700 rounded-3xl shadow-[0_15px_60px_rgba(0,0,0,0.25)] p-6 sm:p-10">
          {children}
        </div>
      </div>
    </div>
  );
}
