"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Lang } from "@/lang/types";
import translations from "@/lang/core/lang";

interface LanguageContextProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const t = (key: string) =>
    translations[lang]?.[key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLang must be used inside LanguageProvider");
  }
  return ctx;
}
