"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { LANG } from "../lang/core/lang"; // core lang file

type LangKeys = keyof typeof LANG;

interface LanguageContextType {
  lang: LangKeys;
  t: (key: string) => string;
  setLang: (lang: LangKeys) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  t: (key: string) => key,
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<LangKeys>("en");

  useEffect(() => {
    const browserLang = navigator.language.split("-")[0] as LangKeys;
    if (LANG[browserLang]) setLang(browserLang);
  }, []);

  // Translation function (supports nested keys using dot notation)
  function t(key: string) {
    const keys = key.split("."); // e.g., "footer.sections.getStarted"
    let value: any = LANG[lang];
    for (const k of keys) {
      if (value[k] === undefined) return key; // fallback
      value = value[k];
    }
    return typeof value === "string" ? value : key; // always return string
  }

  return (
    <LanguageContext.Provider value={{ lang, t, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook
export function useLang() {
  return useContext(LanguageContext);
}
