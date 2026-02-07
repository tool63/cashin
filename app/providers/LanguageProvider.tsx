"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Lang, CountryCode } from "@/lang/types";
import translations from "@/lang/core/lang";

interface LanguageContextProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps>({
  lang: "en",
  setLang: () => {},
  t: (key: string) => key,
});

export function useLang() {
  return useContext(LanguageContext);
}

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [lang, setLang] = useState<Lang>("en");

  // Example: auto-detect language based on country code
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data: { country_code: CountryCode }) => {
        const country = data.country_code;
        if (country === "BD") setLang("bn");
        else if (country === "ES" || country === "MX") setLang("es");
        else setLang("en");
      })
      .catch(() => setLang("en"));
  }, []);

  const t = (key: string) => {
    return translations[lang]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
