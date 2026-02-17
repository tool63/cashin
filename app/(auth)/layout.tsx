"use client";

import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative w-full min-h-screen bg-[#0B0F1A] overflow-x-hidden overscroll-x-none">
      {/* Floating blobs container */}
      <div className="absolute inset-0 overflow-x-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-40 h-40 bg-green-500 opacity-30 rounded-full animate-float" />
        <div className="absolute top-40 right-1/4 w-60 h-60 bg-purple-500 opacity-20 rounded-full animate-float animation-delay-2000" />
      </div>

      {/* Main content */}
      <div className="relative w-full max-w-md mx-auto flex flex-col items-start pt-12 sm:pt-16 px-4">
        {children}
      </div>
    </div>
  );
}
