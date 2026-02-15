"use client";

import React, { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <div className="min-h-screen flex flex-col justify-center items-center bg-white dark:bg-[#070A14] text-gray-900 dark:text-white px-4">
        {children}
      </div>
    </ThemeProvider>
  );
}
