"use client";

import { createContext, ReactNode } from "react";

export const LanguageContext = createContext("en");

export default function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <LanguageContext.Provider value="en">
      {children}
    </LanguageContext.Provider>
  );
}
