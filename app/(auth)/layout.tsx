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
          CONTENT BODY ONLY
          No floating blobs, no scrollable card
      ============================ */}
      <div className="relative w-full max-w-md flex flex-col items-center">
        {children}
      </div>
    </div>
  );
}
