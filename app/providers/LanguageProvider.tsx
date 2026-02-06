"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { LANG } from "../lang";

const LanguageContext = createContext<any>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const browserLang = navigator.language.split("-")[0];
    if (LANG[browserLang]) {
      setLang(browserLang);
    }
  }, []);

  function t(key: string) {
    return LANG[lang]?.[key] || key;
  }

  return (
    <LanguageContext.Provider value={{ lang, t, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
