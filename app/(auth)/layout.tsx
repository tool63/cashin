"use client";

import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative w-screen min-h-screen bg-[#0B0F1A] overflow-auto flex items-center justify-center px-4 sm:px-6 py-12">

      {/* ============================
          Affiliate Page Gradient Background
      ============================ */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 opacity-20 dark:opacity-10"></div>

        {/* Single floating blob */}
        <div className="absolute w-96 h-96 bg-green-400/30 rounded-full blur-3xl animate-float top-1/3 left-1/2 -translate-x-1/2"></div>
      </div>

      {/* ============================
          Centered Premium Card
      ============================ */}
      <div className="relative w-full max-w-xl sm:max-w-2xl">

        {/* Outer Gradient Border */}
        <div className="p-[2px] rounded-3xl bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 shadow-[0_25px_80px_rgba(0,0,0,0.25)]">

          {/* Inner Content Area */}
          <div
            className="
              rounded-3xl
              p-6 sm:p-10
              flex flex-col items-center justify-center gap-6
              border border-gray-200 dark:border-gray-700
              bg-gradient-to-br from-yellow-400/30 via-green-400/30 to-green-400/30
              dark:bg-gradient-to-br from-yellow-500/20 via-green-500/20 to-green-500/20
              transition-colors duration-300
            "
          >
            {children}
          </div>

        </div>
      </div>
    </div>
  );
}
