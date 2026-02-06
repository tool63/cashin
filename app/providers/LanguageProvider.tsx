"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { LANG } from "../lang/core/lang"; // Make sure this points to your core lang file

// Type for available languages
type LangKeys = keyof typeof LANG;

// Type for translation object (all keys of a language)
type Translations = typeof LANG.en;

// Context value type
interface LanguageContextType {
  lang: LangKeys;
  t: (key: keyof Translations) => string;
  setLang: (lang: LangKeys) => void;
}

// Create context with default value
const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  t: (key: keyof Translations) => key,
  setLang: () => {},
});

// Provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<LangKeys>("en");

  useEffect(() => {
    // Detect browser language
    const browserLang = navigator.language.split("-")[0] as LangKeys;
    if (LANG[browserLang]) {
      setLang(browserLang);
    }
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

// Custom hook to use language context
export function useLang() {
  return useContext(LanguageContext);
}
