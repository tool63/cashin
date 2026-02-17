"use client";

import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-[#0B0F1A] flex flex-col items-center justify-center px-4 py-16">
      {children}
    </div>
  );
}
