"use client";

import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative w-screen min-h-screen bg-[#0B0F1A] overflow-auto flex justify-center items-center px-4 sm:px-6 py-12">
      {/* ============================
          Card + Blob Wrapper
      ============================ */}
      <div className="relative w-full max-w-md flex justify-center items-center overflow-visible">

        {/* ============================
            Floating Blobs Around Card
        ============================ */}
        <div className="absolute -top-24 -left-24 w-40 h-40 bg-yellow-400/30 rounded-full blur-3xl animate-float pointer-events-none z-0"></div>
        <div className="absolute -top-24 -right-24 w-40 h-40 bg-green-400/30 rounded-full blur-3xl animate-float animation-delay-1000 pointer-events-none z-0"></div>
        <div className="absolute -bottom-24 -left-24 w-40 h-40 bg-yellow-400/30 rounded-full blur-3xl animate-float animation-delay-2000 pointer-events-none z-0"></div>
        <div className="absolute -bottom-24 -right-24 w-40 h-40 bg-green-400/30 rounded-full blur-3xl animate-float animation-delay-3000 pointer-events-none z-0"></div>

        {/* ============================
            Scrollable Content Card
        ============================ */}
        <div className="relative z-10 w-full max-h-[90vh] overflow-auto 
                        bg-gradient-to-br from-yellow-400/20 via-green-400/20 to-green-400/20
                        dark:from-yellow-500/20 dark:via-green-500/20 dark:to-green-500/20
                        backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-10">
          {children}
        </div>
      </div>
    </div>
  );
}
