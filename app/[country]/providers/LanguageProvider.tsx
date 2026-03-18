"use client";

import { createContext, ReactNode, useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "next/navigation";

import {
  getLanguageForCountry,
  SupportedLanguage,
  DEFAULT_LANGUAGE,
  DEFAULT_COUNTRY,
  COOKIE_KEYS,
  VALID_COUNTRY_CODES,
  SUPPORTED_LANGUAGES,
  isLanguageSupported,
} from "@/app/core/detector";

import { isRtlLanguage } from "@/app/core/i18n/config";

// ------------------------------
// Context
// ------------------------------
interface LanguageContextType {
  country: string;
  language: SupportedLanguage;
  isRtl: boolean;
  setLanguage: (lang: SupportedLanguage) => void;
  setCountry: (country: string) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  country: DEFAULT_COUNTRY,
  language: DEFAULT_LANGUAGE,
  isRtl: false,
  setLanguage: () => {},
  setCountry: () => {},
});

// ------------------------------
// Provider
// ------------------------------
interface Props {
  children: ReactNode;
}

export default function LanguageProvider({ children }: Props) {
  const params = useParams();

  // ------------------------------
  // Extract country from URL
  // ------------------------------
  const urlCountry =
    typeof params?.country === "string"
      ? params.country.toLowerCase()
      : DEFAULT_COUNTRY;

  const [uiCountry, setUiCountry] = useState<string>(urlCountry);
  const [uiLanguage, setUiLanguage] = useState<SupportedLanguage>(
    getLanguageForCountry(urlCountry)
  );

  const [isRtl, setIsRtl] = useState<boolean>(isRtlLanguage(uiLanguage));

  // ------------------------------
  // Sync with URL (on mount / param change)
  // ------------------------------
  useEffect(() => {
    if (urlCountry && VALID_COUNTRY_CODES.has(urlCountry)) {
      setUiCountry(urlCountry);

      // Only update language if not set by cookie
      const langFromCookie = document.cookie
        .split("; ")
        .find(row => row.startsWith(`${COOKIE_KEYS.LANGUAGE}=`))
        ?.split("=")[1] as SupportedLanguage | undefined;

      if (!langFromCookie) {
        const lang = getLanguageForCountry(urlCountry);
        setUiLanguage(lang);
        setIsRtl(isRtlLanguage(lang));
        document.cookie = `${COOKIE_KEYS.LANGUAGE}=${lang}; path=/; max-age=${60 * 60 * 24 * 365}`;
      }
    }
  }, [urlCountry]);

  // ------------------------------
  // Load language & country from cookie on mount
  // ------------------------------
  useEffect(() => {
    const cookieLang = document.cookie
      .split("; ")
      .find(row => row.startsWith(`${COOKIE_KEYS.LANGUAGE}=`))
      ?.split("=")[1] as SupportedLanguage | undefined;

    if (cookieLang && isLanguageSupported(cookieLang)) {
      setUiLanguage(cookieLang);
      setIsRtl(isRtlLanguage(cookieLang));
    }

    const cookieCountry = document.cookie
      .split("; ")
      .find(row => row.startsWith(`${COOKIE_KEYS.COUNTRY}=`))
      ?.split("=")[1];

    if (cookieCountry && VALID_COUNTRY_CODES.has(cookieCountry)) {
      setUiCountry(cookieCountry);
    }
  }, []);

  // ------------------------------
  // Update language
  // ------------------------------
  const setLanguage = useCallback((lang: SupportedLanguage) => {
    setUiLanguage(lang);
    setIsRtl(isRtlLanguage(lang));
    document.cookie = `${COOKIE_KEYS.LANGUAGE}=${lang}; path=/; max-age=${60 * 60 * 24 * 365}`;
    document.documentElement.lang = lang;
  }, []);

  // ------------------------------
  // Update country (UI only, does not change URL)
  // ------------------------------
  const setCountry = useCallback((country: string) => {
    if (!VALID_COUNTRY_CODES.has(country)) return;

    setUiCountry(country);

    // If language cookie is missing, update language to default for this country
    const cookieLang = document.cookie
      .split("; ")
      .find(row => row.startsWith(`${COOKIE_KEYS.LANGUAGE}=`))
      ?.split("=")[1];

    if (!cookieLang) {
      const lang = getLanguageForCountry(country);
      setUiLanguage(lang);
      setIsRtl(isRtlLanguage(lang));
      document.cookie = `${COOKIE_KEYS.LANGUAGE}=${lang}; path=/; max-age=${60 * 60 * 24 * 365}`;
    }
  }, []);

  // ------------------------------
  // Context value
  // ------------------------------
  const value = useMemo(
    () => ({
      country: uiCountry,
      language: uiLanguage,
      isRtl,
      setLanguage,
      setCountry,
    }),
    [uiCountry, uiLanguage, isRtl, setLanguage, setCountry]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
