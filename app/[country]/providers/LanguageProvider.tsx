"use client";

import { createContext, ReactNode, useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "next/navigation";

import {
  getGeoInfo,
  COOKIE_KEYS,
  SupportedLanguage,
  getLanguageForCountry,
  DEFAULT_LANGUAGE,
} from "@/app/core/geo";

interface LanguageContextType {
  country: string;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  setCountry: (country: string) => void; // UI only, does not change URL
}

export const LanguageContext = createContext<LanguageContextType>({
  country: "us",
  language: "en",
  setLanguage: () => {},
  setCountry: () => {},
});

interface Props {
  children: ReactNode;
}

export default function LanguageProvider({ children }: Props) {
  const params = useParams();
  const urlCountry = params?.country || "us";

  // UI state
  const [uiCountry, setUiCountry] = useState(urlCountry);
  const [uiLanguage, setUiLanguage] = useState<SupportedLanguage>(
    getLanguageForCountry(urlCountry)
  );

  // Sync state with URL
  useEffect(() => {
    setUiCountry(urlCountry);
    setUiLanguage(getLanguageForCountry(urlCountry));
  }, [urlCountry]);

  // Load language from cookie on mount
  useEffect(() => {
    const cookieLang = document.cookie
      .split("; ")
      .find(row => row.startsWith(`${COOKIE_KEYS.LANGUAGE}=`))
      ?.split("=")[1] as SupportedLanguage | undefined;

    if (cookieLang) setUiLanguage(cookieLang);
  }, []);

  // Update language
  const setLanguage = useCallback((lang: SupportedLanguage) => {
    setUiLanguage(lang);

    // Persist cookie
    document.cookie = `${COOKIE_KEYS.LANGUAGE}=${lang}; path=/; max-age=${60 * 60 * 24 * 365}`;

    // Update HTML lang attribute
    document.documentElement.lang = lang;
  }, []);

  // Update UI country (does not change URL)
  const setCountry = useCallback((country: string) => {
    setUiCountry(country);

    // Auto-update language only if user has not explicitly selected one
    const cookieLang = document.cookie
      .split("; ")
      .find(row => row.startsWith(`${COOKIE_KEYS.LANGUAGE}=`))
      ?.split("=")[1];

    if (!cookieLang) {
      const newLang = getLanguageForCountry(country);
      setUiLanguage(newLang);
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
