"use client";

import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative w-full min-h-screen bg-[#0B0F1A] overflow-x-hidden">
      <div className="relative w-full max-w-md mx-auto flex flex-col items-start pt-12 sm:pt-16">
        {children}
      </div>
    </div>
  );
}
