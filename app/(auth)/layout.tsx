"use client";

import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex items-center justify-center min-h-screen w-screen px-4 sm:px-6 py-12 bg-gray-50 dark:bg-[#070A14]">
      
      {/* Gradient Content Layer */}
      <div className="w-full max-w-xl sm:max-w-2xl rounded-3xl shadow-2xl
                      bg-gradient-to-r from-yellow-400 via-green-400 to-green-500
                      p-6 sm:p-10">

        {/* Inner Glass Layer (for readability) */}
        <div className="w-full h-full rounded-2xl bg-white/90 dark:bg-[#070A14]/90
                        backdrop-blur-md p-6 sm:p-8 flex flex-col items-center">
          
          {children}

        </div>
      </div>
    </div>
  );
}
