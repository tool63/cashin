"use client";

import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative w-screen min-h-screen bg-[#0B0F1A] overflow-auto flex justify-center items-start px-4 sm:px-6 py-12">
      
      {/* ============================
          Scrollable Content Card
      ============================ */}
      <div className="relative w-full max-w-2xl flex justify-center items-center overflow-visible">
        <div className="relative z-10 w-full max-h-[90vh] overflow-auto 
                        bg-gradient-to-br from-yellow-400/20 via-green-400/20 to-green-400/20
                        dark:from-yellow-500/20 dark:via-green-500/20 dark:to-green-500/20
                        backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-10">
          {children}
        </div>
      </div>
    </div>
  );
}
