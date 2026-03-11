"use client";

import { ReactNode } from "react";
import ThemeProviderWrapper from "./ThemeProviderWrapper";
import LanguageProvider from "./LanguageProvider";

interface Props {
  children: ReactNode;
}

export default function RootProviders({ children }: Props) {
  return (
    <ThemeProviderWrapper>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </ThemeProviderWrapper>
  );
}
