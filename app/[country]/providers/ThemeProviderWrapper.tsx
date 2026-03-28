"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState, ReactNode } from "react";

interface ThemeProviderWrapperProps {
  children: ReactNode;
}

export default function ThemeProviderWrapper({
  children,
}: ThemeProviderWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // ✅ EXACT SAME GRADIENT AS HEADER / FOOTER
  const gradientClass = `
    min-h-screen
    bg-gradient-to-br from-yellow-400/20 via-green-400/30 to-green-500/20
    dark:from-yellow-500/10 dark:via-green-700/20 dark:to-green-800/20
  `;

  // BEFORE mount (prevents theme flash)
  if (!mounted) {
    return <div className={gradientClass} />;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className={gradientClass}>
        {children}
      </div>
    </ThemeProvider>
  );
}
