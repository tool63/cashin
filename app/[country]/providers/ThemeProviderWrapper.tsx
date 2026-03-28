"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState, ReactNode } from "react";

interface ThemeProviderWrapperProps {
  children: ReactNode;
}

export default function ThemeProviderWrapper({ children }: ThemeProviderWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const gradientClass = `
    min-h-screen
    bg-[linear-gradient(to_bottom_right,
      rgba(250,204,21,0.2),
      rgba(74,222,128,0.3),
      rgba(34,197,94,0.2)
    )]
    dark:bg-[linear-gradient(to_bottom_right,
      rgba(250,204,21,0.1),
      rgba(74,222,128,0.15),
      rgba(34,197,94,0.1)
    )]
  `;

  // BEFORE mount (prevents flash)
  if (!mounted) {
    return <div className={gradientClass} />;
  }

  // AFTER mount (this is what you were missing)
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
