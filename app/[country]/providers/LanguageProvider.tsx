"use client";

import { createContext, ReactNode, useState, useEffect, useMemo, useCallback } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";

import {
  getLanguageForCountry,
  SupportedLanguage,
  DEFAULT_LANGUAGE,
  DEFAULT_COUNTRY,
  SUPPORTED_LANGUAGES,
  COOKIE_KEYS,
  VALID_COUNTRY_CODES,
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
  const pathname = usePathname();
  const router = useRouter();

  const urlCountry = params?.country;

  const [uiCountry, setUiCountry] = useState<string>(urlCountry || DEFAULT_COUNTRY);
  const [uiLanguage, setUiLanguage] = useState<SupportedLanguage>(
    urlCountry ? getLanguageForCountry(urlCountry) : DEFAULT_LANGUAGE
  );

  // Sync state with URL
  useEffect(() => {
    if (urlCountry && VALID_COUNTRY_CODES.has(urlCountry)) {
      setUiCountry(urlCountry);
      setUiLanguage(getLanguageForCountry(urlCountry));
    }
  }, [urlCountry]);

  // Load language/country from cookie or browser on mount
  useEffect(() => {
    // Language from cookie
    const cookieLang = document.cookie
      .split("; ")
      .find(row => row.startsWith(`${COOKIE_KEYS.LANGUAGE}=`))
      ?.split("=")[1];

    if (cookieLang && SUPPORTED_LANGUAGES.includes(cookieLang as SupportedLanguage)) {
      setUiLanguage(cookieLang as SupportedLanguage);
    } else {
      // Fallback: detect from browser
      const navLang = navigator.language.split("-")[0].toLowerCase();
      if (SUPPORTED_LANGUAGES.includes(navLang as SupportedLanguage)) {
        setUiLanguage(navLang as SupportedLanguage);
      } else {
        setUiLanguage(DEFAULT_LANGUAGE);
      }
    }

    // Country from cookie or browser
    const cookieCountry = document.cookie
      .split("; ")
      .find(row => row.startsWith(`${COOKIE_KEYS.COUNTRY}=`))
      ?.split("=")[1];

    const detectedCountry = cookieCountry && VALID_COUNTRY_CODES.has(cookieCountry)
      ? cookieCountry
      : (navigator.language.split("-")[1] || DEFAULT_COUNTRY).toLowerCase();

    setUiCountry(VALID_COUNTRY_CODES.has(detectedCountry) ? detectedCountry : DEFAULT_COUNTRY);
  }, []);

  // 🚨 Client-side redirect if URL has no country
  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0 || !VALID_COUNTRY_CODES.has(segments[0].toLowerCase())) {
      const redirectCountry = uiCountry || DEFAULT_COUNTRY;
      router.replace(`/${redirectCountry}${pathname === "/" ? "" : pathname}`);
    }
  }, [pathname, uiCountry, router]);

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

  const value = useMemo(
    () => ({
      country: uiCountry,
      language: uiLanguage,
      setLanguage,
      setCountry,
    }),
    [uiCountry, uiLanguage, setLanguage, setCountry]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
