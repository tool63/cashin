"use client";

import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-[#0f1115] flex items-center justify-center px-4">
      
      {/* Background Subtle Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-yellow-500/10 blur-[120px] rounded-full" />
      </div>

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md bg-[#171a21] border border-white/5 rounded-2xl shadow-2xl p-8">
        
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <h1 className="text-2xl font-bold text-white tracking-wide">
            <span className="text-yellow-400">Cash</span>og
          </h1>
        </div>

        {children}

      </div>
    </div>
  );
}
