"use client";

import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative w-screen min-h-screen bg-[#0B0F1A] flex justify-center items-start px-4 sm:px-6 py-12 overflow-auto">

      {/* ============================
          Centered Card Wrapper
      ============================ */}
      <div className="relative w-full max-w-2xl flex justify-center items-center">

        {/* ============================
            Minimal Floating Blobs (Freecash style)
        ============================ */}
        <div className="absolute -top-32 -left-32 w-48 h-48 bg-yellow-400/20 rounded-full blur-3xl animate-float pointer-events-none z-0"></div>
        <div className="absolute -bottom-32 -right-32 w-56 h-56 bg-green-400/20 rounded-full blur-3xl animate-float animation-delay-2000 pointer-events-none z-0"></div>

        {/* ============================
            Scrollable Card Content
        ============================ */}
        <div className="relative z-10 w-full max-h-[90vh] overflow-auto
                        bg-gradient-to-br from-yellow-400/10 via-green-400/10 to-green-400/10
                        backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-10">
          {children}
        </div>

      </div>
    </div>
  );
}
