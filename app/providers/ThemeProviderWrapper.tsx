"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState, ReactNode } from "react";

interface ThemeProviderWrapperProps {
  children: ReactNode;
  enableSystem?: boolean;          // optional: allow system theme
  defaultTheme?: "light" | "dark"; // optional default
}

export default function ThemeProviderWrapper({
  children,
  enableSystem = true,
  defaultTheme = "system",
}: ThemeProviderWrapperProps) {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // avoid flicker on initial load

  return (
    <ThemeProvider
      attribute="data-theme"           // Use data-theme to control dark/light globally
      defaultTheme={defaultTheme}      // default theme
      enableSystem={enableSystem}      // allow system preference
      storageKey="cashog-theme"        // optional: store user preference
      disableTransitionOnChange={false} // smooth transitions on theme change
      forcedTheme={undefined}          // allow external override if needed
    >
      {children}
    </ThemeProvider>
  );
}
