"use client";

import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 py-12 bg-gray-50 dark:bg-[#070A14] transition-colors duration-300">

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
