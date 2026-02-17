"use client";

import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-6 overflow-hidden bg-gray-50 dark:bg-[#070A14] transition-colors duration-300">

      {/* ============================
          Background Layer
      ============================ */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">

        {/* Yellow-Green Gradient (400 / 30) */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-green-400 to-yellow-400 opacity-30"></div>

        {/* Single Floating Blob */}
        <div className="absolute w-96 h-96 bg-green-400/30 rounded-full blur-3xl top-1/3 left-1/2 -translate-x-1/2 animate-float"></div>

      </div>

      {/* ============================
          Auth Card
      ============================ */}
      <div className="relative z-10 w-full max-w-lg">

        <div
          className="
            bg-white dark:bg-[#0F172A]
            border border-gray-200 dark:border-gray-700
            rounded-3xl
            shadow-[0_25px_80px_rgba(0,0,0,0.25)]
            p-6 sm:p-10
            flex flex-col items-center
            transition-colors duration-300
          "
        >
          {children}
        </div>

      </div>
    </div>
  );
}
