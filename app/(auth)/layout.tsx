"use client";

import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-6 py-12 bg-gray-50 dark:bg-[#070A14] transition-colors duration-300">

      {/* ============================
          Premium Gradient Frame
      ============================ */}
      <div className="relative w-full max-w-xl sm:max-w-2xl">

        {/* Outer Gradient Border */}
        <div className="p-[2px] rounded-3xl bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 shadow-[0_25px_80px_rgba(0,0,0,0.25)]">

          {/* Inner Card */}
          <div className="
            rounded-3xl
            bg-white dark:bg-[#0F172A]
            border border-gray-200 dark:border-gray-700
            p-6 sm:p-10
            flex flex-col items-center justify-center gap-6
            transition-colors duration-300
          ">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
}
