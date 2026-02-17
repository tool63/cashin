"use client";

import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div
      className="
        w-screen min-h-screen bg-[#0B0F1A]
        flex justify-center items-center px-4 sm:px-6
      "
    >
      {/* ============================
          Clean Content Card Only
      ============================ */}
      <div
        className="
          relative w-full max-w-md
          bg-gradient-to-br from-yellow-400/20 via-green-400/20 to-green-400/20
          dark:from-yellow-500/20 dark:via-green-500/20 dark:to-green-500/20
          backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-10
          flex flex-col items-center
        "
      >
        {children}
      </div>
    </div>
  );
}
