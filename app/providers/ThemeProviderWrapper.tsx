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

  // ✅ Type assertion applied here, not in JSX
  const defaultTheme: "light" | "dark" | "system" = "system";

  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme={defaultTheme}
      enableSystem
      disableTransitionOnChange={false}
    >
      {children}
    </ThemeProvider>
  );
}
