"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "./LanguageProvider";

interface RootProvidersProps {
  children: ReactNode;
}

export default function RootProviders({ children }: RootProvidersProps) {
  return (
    <LanguageProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </LanguageProvider>
  );
}
