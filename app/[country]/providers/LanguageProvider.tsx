"use client";

import { createContext, ReactNode, useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "next/navigation";

import {
  getLanguageForCountry,
  COOKIE_KEYS,
  SupportedLanguage,
  DEFAULT_LANGUAGE,
  DEFAULT_COUNTRY,
  SUPPORTED_LANGUAGES,
} from "@/app/core/detector";

interface LanguageContextType {
  country: string;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  setCountry: (country: string) => void; // UI only, does not change URL
}

export const LanguageContext = createContext<LanguageContextType>({
  country: DEFAULT_COUNTRY,
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
  setCountry: () => {},
});

interface Props {
  children: ReactNode;
}

export default function LanguageProvider({ children }: Props) {
  const params = useParams();
  const urlCountry = params?.country || DEFAULT_COUNTRY;

  const [uiCountry, setUiCountry] = useState(urlCountry);
  const [uiLanguage, setUiLanguage] = useState<SupportedLanguage>(
    getLanguageForCountry(urlCountry)
  );

  // Sync state with URL
  useEffect(() => {
    setUiCountry(urlCountry);
    setUiLanguage(getLanguageForCountry(urlCountry));
  }, [urlCountry]);

  // Load language from cookie
  useEffect(() => {
    const cookieLang = document.cookie
      .split("; ")
      .find(row => row.startsWith(`${COOKIE_KEYS.LANGUAGE}=`))
      ?.split("=")[1];

    if (cookieLang && SUPPORTED_LANGUAGES.includes(cookieLang as SupportedLanguage)) {
      setUiLanguage(cookieLang as SupportedLanguage);
    }
  }, []);

  // Update language
  const setLanguage = useCallback((lang: SupportedLanguage) => {
    setUiLanguage(lang);
    document.cookie = `${COOKIE_KEYS.LANGUAGE}=${lang}; path=/; max-age=${60 * 60 * 24 * 365}`;
    document.documentElement.lang = lang;
  }, []);

  // Update UI country (does not change URL)
  const setCountry = useCallback((country: string) => {
    setUiCountry(country);

    // Auto-update language only if user hasn't explicitly selected one
    const cookieLang = document.cookie
      .split("; ")
      .find(row => row.startsWith(`${COOKIE_KEYS.LANGUAGE}=`))
      ?.split("=")[1];

    if (!cookieLang) {
      setUiLanguage(getLanguageForCountry(country));
    }
  }, []);

  const value = useMemo(() => ({
    country: uiCountry,
    language: uiLanguage,
    setLanguage,
    setCountry,
  }), [uiCountry, uiLanguage, setLanguage, setCountry]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
