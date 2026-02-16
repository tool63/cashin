"use client";

import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative w-screen min-h-screen flex items-center justify-center overflow-auto px-4 sm:px-6 py-12">

      {/* ===== LAYER 1: Fullscreen Background ===== */}
      <div className="absolute inset-0 bg-gray-50 dark:bg-[#070A14]"></div>

      {/* ===== LAYER 2: Subtle Blurred Glow ===== */}
      <div className="absolute inset-0">
        <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-gradient-to-tr from-yellow-300 via-green-300 to-green-500 opacity-20 blur-3xl animate-pulse-slow"></div>
      </div>

      {/* ===== LAYER 3: Card Container ===== */}
      <div className="relative w-full max-w-xl p-1 sm:p-2 rounded-3xl shadow-2xl">

        {/* ===== LAYER 4: Inner Gradient Layer ===== */}
        <div className="w-full h-full rounded-3xl p-6 sm:p-10 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
          <div className="bg-white dark:bg-[#070A14] rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-inner">
            {children}
          </div>
        </div>

      </div>
    </div>
  );
}
