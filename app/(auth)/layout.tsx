"use client";

import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex items-center justify-center min-h-screen w-screen px-4 sm:px-6 py-12 bg-gray-50 dark:bg-[#070A14]">
      
      {/* Single Content Layer (Gradient Only) */}
      <div className="w-full max-w-xl sm:max-w-2xl 
                      bg-gradient-to-r from-yellow-400 via-green-400 to-green-500
                      rounded-3xl shadow-2xl 
                      p-6 sm:p-10 
                      flex flex-col items-center">
        
        {children}

      </div>
    </div>
  );
}
