"use client";

import React, { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

interface AuthLayoutProps {
  children: ReactNode;
  title?: string; // optional for page title
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <div className="min-h-screen flex flex-col justify-center items-center bg-white dark:bg-[#070A14] text-gray-900 dark:text-white px-4">
        {/* Optional hidden title for SEO / accessibility */}
        {title && <h1 className="sr-only">{title}</h1>}
        {children}
      </div>
    </ThemeProvider>
  );
}
