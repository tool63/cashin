"use client";

import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">

      {/* Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-br
        from-[#f8fafc] via-[#eef2ff] to-[#f1f5f9]
        dark:from-[#050816] dark:via-[#070A14] dark:to-[#0B0E1A]"
      />

      {/* Centered Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-4">
        {children}
      </div>

    </div>
  );
}
