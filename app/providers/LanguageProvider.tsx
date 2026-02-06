"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { LANG } from "../lang/core/lang"; // core lang file

type LangKeys = keyof typeof LANG;
type Translations = typeof LANG.en;

interface LanguageContextType {
  lang: LangKeys;
  t: (key: keyof Translations) => string;
  setLang: (lang: LangKeys) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  t: (key: keyof Translations) => key,
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<LangKeys>("en");

  useEffect(() => {
    const browserLang = navigator.language.split("-")[0] as LangKeys;
    if (LANG[browserLang]) setLang(browserLang);
  }, []);

  // Translation function
  function t(key: keyof Translations) {
    return LANG[lang]?.[key] || key;
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
