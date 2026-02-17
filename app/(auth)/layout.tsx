"use client";

import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div
      className="
        relative
        w-screen h-screen
        bg-[#0B0F1A]
        flex justify-center items-center
        px-4 sm:px-6
        overflow-x-hidden
      "
    >
      {/* ============================
          CONTENT BODY ONLY
      ============================ */}
      <div className="relative w-full max-w-md flex flex-col items-center">
        {children}
      </div>
    </div>
  );
}
