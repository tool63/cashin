"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { LANG } from "../lang/core/lang"; // your translations

// ✅ Include all supported languages here
export type LangKeys = keyof typeof LANG; // "en" | "bn" | "es"

interface LanguageContextType {
  lang: LangKeys;
  setLang: (lang: LangKeys) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key: string) => key,
});

interface Props {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: Props) => {
  // ✅ Make sure useState uses the full LangKeys type
  const [lang, setLangState] = useState<LangKeys>("en");

  // ✅ Central setLang wrapper
  const setLang = (l: LangKeys) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };

  useEffect(() => {
    // 1️⃣ Check localStorage
    const stored = localStorage.getItem("lang") as LangKeys | null;
    if (stored && LANG[stored]) {
      setLangState(stored);
      return;
    }

    // 2️⃣ Detect browser language
    const browserLang = navigator.language.split("-")[0] as LangKeys;
    if (LANG[browserLang]) {
      setLangState(browserLang);
      return;
    }

    // 3️⃣ Fallback using IP country code
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => {
        const country = data.country_code;

        // ✅ Use LangKeys explicitly
        if (country === "BD") setLangState("bn" as LangKeys);
        else if (country === "ES" || country === "MX") setLangState("es" as LangKeys);
        else setLangState("en" as LangKeys);
      })
      .catch(() => setLangState("en" as LangKeys));
  }, []);

  // ✅ Translation function with nested key support
  const t = (key: string) => {
    const keys = key.split(".");
    let value: any = LANG[lang];
    for (const k of keys) {
      if (value[k] === undefined) return key;
      value = value[k];
    }
    return typeof value === "string" ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// ✅ Hook for components
export const useLang = () => useContext(LanguageContext);
