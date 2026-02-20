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

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ThemeProvider
      attribute="data-theme"   // ✅ Use data-theme instead of class
      defaultTheme="system"    // ✅ Follows OS preference
      enableSystem             // ✅ Allows system detection
      disableTransitionOnChange={false} // allow smooth CSS transitions
    >
      {children}
    </ThemeProvider>
  );
}
