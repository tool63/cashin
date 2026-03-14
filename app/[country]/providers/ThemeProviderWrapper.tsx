"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState, ReactNode } from "react";

interface ThemeProviderWrapperProps {
  children: ReactNode;
}

export default function ThemeProviderWrapper({ children }: ThemeProviderWrapperProps) {
  const [mounted, setMounted] = useState(false);

  // Only render after mount to avoid SSR theme mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <div className="bg-primary dark:bg-gray-950 min-h-screen" />
    ); // fully opaque fallback

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
