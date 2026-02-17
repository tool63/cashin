"use client";

import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative w-full min-h-screen bg-[#0B0F1A] overflow-x-hidden overscroll-x-none">
      
      {/* ============================
          Floating blobs container
          Scroll-safe
      ============================ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top-left blob */}
        <div className="absolute top-24 left-[5%] w-24 sm:w-32 h-24 sm:h-32 bg-green-500 opacity-30 rounded-full animate-float" />
        {/* Top-right blob */}
        <div className="absolute top-40 right-[5%] w-28 sm:w-40 h-28 sm:h-40 bg-purple-500 opacity-20 rounded-full animate-float animation-delay-2000" />
        {/* Bottom-left blob */}
        <div className="absolute bottom-32 left-[10%] w-32 sm:w-44 h-32 sm:h-44 bg-pink-500 opacity-25 rounded-full animate-float animation-delay-4000" />
      </div>

      {/* ============================
          Main content (form, signup, etc.)
      ============================ */}
      <div className="relative w-full max-w-md mx-auto flex flex-col items-start pt-12 sm:pt-16 px-4">
        {children}
      </div>
    </div>
  );
}
