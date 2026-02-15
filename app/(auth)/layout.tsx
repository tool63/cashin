"use client";

import React, { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

interface AuthLayoutProps {
  children: ReactNode; // ⚡ must be ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <div className="min-h-screen flex flex-col bg-white dark:bg-[#070A14] text-gray-900 dark:text-white">
        {children}
      </div>
    </ThemeProvider>
  );
}
