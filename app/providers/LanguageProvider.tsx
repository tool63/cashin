"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { LANG } from "../lang/core/lang"; // core lang file

type LangKeys = keyof typeof LANG; // "en" | "es" | "bn" etc.

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

  // Auto-detect browser language on mount
  useEffect(() => {
    const browserLang = navigator.language.split("-")[0] as LangKeys;
    if (LANG[browserLang]) setLang(browserLang);
  }, []);

  // Optional: Detect country via IP (free API) and set language
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const country = data.country_code;
        if (country === "BD") setLang("bn");
        else if (country === "ES" || country === "MX") setLang("es");
        else setLang("en");
      })
      .catch(() => {
        setLang("en"); // fallback
      });
  }, []);

  // Translation function
  function t(key: string) {
    const keys = key.split(".");
    let value: any = LANG[lang];
    for (const k of keys) {
      if (value[k] === undefined) return key;
      value = value[k];
    }
    return typeof value === "string" ? value : key;
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
