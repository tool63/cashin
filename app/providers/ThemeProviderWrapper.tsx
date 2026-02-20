"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState, ReactNode } from "react";

interface ThemeProviderWrapperProps {
  children: ReactNode;
}

export default function ThemeProviderWrapper({ children }: ThemeProviderWrapperProps) {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <ThemeProvider
      attribute="data-theme"       // Use data-theme for Tailwind dark/light
      defaultTheme="system" as "system" // ✅ Type assertion fixes TypeScript
      enableSystem                  // Detect system theme
      disableTransitionOnChange={false} // Smooth transitions
    >
      {children}
    </ThemeProvider>
  );
}
