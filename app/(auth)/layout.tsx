"use client";

import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B0F1A] via-[#111827] to-[#0B0F1A] px-4 sm:px-0">
      {/* Center content container */}
      <div className="w-full max-w-md sm:min-h-[auto] min-h-screen flex flex-col justify-center relative">
        {children}
      </div>
    </div>
  );
}
