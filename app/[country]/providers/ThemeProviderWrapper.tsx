"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState, ReactNode } from "react";

interface ThemeProviderWrapperProps {
  children: ReactNode;
}

export default function ThemeProviderWrapper({ children }: ThemeProviderWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <div
        className={`
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
        `}
      />
    );

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
