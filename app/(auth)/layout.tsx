"use client";

import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-screen min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br 
        from-[#f8fafc] via-[#eef2ff] to-[#f1f5f9]
        dark:from-[#050816] dark:via-[#070A14] dark:to-[#0B0E1A]" 
      />

      {/* Content Wrapper */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-4 sm:px-6">
        {children}
      </div>
    </div>
  );
}
