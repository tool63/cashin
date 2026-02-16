"use client";

import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex items-center justify-center w-screen min-h-screen px-4 sm:px-6 py-12 bg-gray-50 dark:bg-[#070A14]">
      
      {/* Front Layer: Gradient Card */}
      <div className="w-full max-w-md sm:max-w-lg bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 p-1 rounded-3xl shadow-2xl">
        <div className="bg-white dark:bg-[#070A14] rounded-2xl p-6 sm:p-8 flex flex-col gap-6">
          {children}
        </div>
      </div>
    </div>
  );
}
