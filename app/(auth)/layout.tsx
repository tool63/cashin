"use client";

import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative w-screen min-h-screen bg-[#0B0F1A] overflow-auto flex justify-center px-4 sm:px-6 py-12">

      {/* ============================
          Animated Background
          Scrolls separately from content
      ============================ */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        {/* Animated gradient moving left-right */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-500 opacity-20 animate-gradient"></div>

        {/* Floating blob */}
        <div className="absolute w-96 h-96 bg-green-400/30 rounded-full blur-3xl animate-float top-1/3 left-1/2 -translate-x-1/2"></div>
      </div>

      {/* ============================
          Scrollable Content Card
      ============================ */}
      <div className="relative w-full max-w-xl sm:max-w-2xl">
        <div className="bg-gradient-to-br from-yellow-400/30 via-green-400/30 to-green-400/30 dark:bg-gradient-to-br from-yellow-500/20 via-green-500/20 to-green-500/20 rounded-3xl shadow-2xl p-6 sm:p-10">
          {children}
        </div>
      </div>
    </div>
  );
}
