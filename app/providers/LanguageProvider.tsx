"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { LANG } from "../lang/core/lang"; // your translations file

// ✅ Include all supported languages here
export type LangKeys = keyof typeof LANG; // e.g., "en" | "bn" | "es"

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
  const [lang, setLangState] = useState<LangKeys>("en");

  // ✅ Wrapper to update state + localStorage safely
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
        if (country === "BD") setLangState("bn");
        else if (country === "ES" || country === "MX") setLangState("es");
        else setLangState("en");
      })
      .catch(() => setLangState("en"));
  }, []);

  // ✅ Translation function (supports nested keys like "footer.sections.getStarted")
  const t = (key: string) => {
    const keys = key.split(".");
    let value: any = LANG[lang];
    for (const k of keys) {
      if (value[k] === undefined) return key; // fallback
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

// ✅ Hook to use translations anywhere
export const useLang = () => useContext(LanguageContext);
