"use client";

import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative w-screen min-h-screen bg-[#0B0F1A] overflow-auto flex justify-center px-4 sm:px-6 py-12">

      {/* ============================
          Content Card Container
      ============================ */}
      <div className="relative w-full max-w-xl sm:max-w-2xl">

        {/* ============================
            Floating Blobs Around Card
        ============================ */}
        {/* Top Left */}
        <div className="absolute -top-20 -left-20 w-32 h-32 bg-yellow-400/30 rounded-full blur-3xl animate-float pointer-events-none z-0"></div>

        {/* Top Right */}
        <div className="absolute -top-20 right-[-80px] w-32 h-32 bg-green-400/30 rounded-full blur-3xl animate-float animation-delay-1000 pointer-events-none z-0"></div>

        {/* Bottom Left */}
        <div className="absolute bottom-[-80px] -left-20 w-32 h-32 bg-yellow-400/30 rounded-full blur-3xl animate-float animation-delay-2000 pointer-events-none z-0"></div>

        {/* Bottom Right */}
        <div className="absolute bottom-[-80px] right-[-80px] w-32 h-32 bg-green-400/30 rounded-full blur-3xl animate-float animation-delay-3000 pointer-events-none z-0"></div>

        {/* ============================
            Scrollable Content Card
        ============================ */}
        <div className="relative z-10 bg-gradient-to-br from-yellow-400/30 via-green-400/30 to-green-400/30 
                        dark:bg-gradient-to-br from-yellow-500/20 via-green-500/20 to-green-500/20
                        rounded-3xl shadow-2xl p-6 sm:p-10">
          {children}
        </div>

      </div>
    </div>
  );
}
