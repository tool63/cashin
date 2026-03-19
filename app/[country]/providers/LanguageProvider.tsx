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
} from "@/app/core/detector";

import { isRtlLanguage } from "@/app/core/i18n/config";

// ------------------------------
// Context Type
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
// Props
// ------------------------------
interface Props {
  children: ReactNode;
  initialCountry?: string;
  initialLanguage?: SupportedLanguage;
}

export default function LanguageProvider({
  children,
  initialCountry = DEFAULT_COUNTRY,
  initialLanguage = DEFAULT_LANGUAGE,
}: Props) {
  const params = useParams();

  const urlCountry =
    typeof params?.country === "string"
      ? params.country.toLowerCase()
      : null;

  // ------------------------------
  // Helper: Normalize language
  // ------------------------------
  const normalizeLang = (lang: string): SupportedLanguage | null => {
    const normalized = lang.toLowerCase().split("-")[0];
    return SUPPORTED_LANGUAGES.includes(normalized as SupportedLanguage)
      ? (normalized as SupportedLanguage)
      : null;
  };

  // ------------------------------
  // COUNTRY STATE
  // ------------------------------
  const [uiCountry, setUiCountry] = useState<string>(() => {
    if (urlCountry && VALID_COUNTRY_CODES.has(urlCountry)) return urlCountry;
    if (initialCountry && VALID_COUNTRY_CODES.has(initialCountry)) return initialCountry;

    if (typeof window !== "undefined") {
      const cookie = document.cookie
        .split("; ")
        .find(row => row.startsWith(`${COOKIE_KEYS.COUNTRY}=`))
        ?.split("=")[1];

      if (cookie && VALID_COUNTRY_CODES.has(cookie)) return cookie;
    }

    return DEFAULT_COUNTRY;
  });

  // ------------------------------
  // LANGUAGE STATE (FIXED 🔥)
  // ------------------------------
  const [uiLanguage, setUiLanguage] = useState<SupportedLanguage>(() => {
    if (typeof window !== "undefined") {
      const cookie = document.cookie
        .split("; ")
        .find(row => row.startsWith(`${COOKIE_KEYS.LANGUAGE}=`))
        ?.split("=")[1];

      if (cookie) {
        const normalized = normalizeLang(cookie);
        if (normalized) return normalized;
      }
    }

    if (initialLanguage && SUPPORTED_LANGUAGES.includes(initialLanguage)) {
      return initialLanguage;
    }

    const country = urlCountry || initialCountry || DEFAULT_COUNTRY;
    return getLanguageForCountry(country);
  });

  const [isRtl, setIsRtl] = useState<boolean>(() =>
    isRtlLanguage(uiLanguage)
  );

  // ------------------------------
  // Sync with URL
  // ------------------------------
  useEffect(() => {
    if (
      urlCountry &&
      VALID_COUNTRY_CODES.has(urlCountry) &&
      urlCountry !== uiCountry
    ) {
      setUiCountry(urlCountry);

      const hasLangCookie = document.cookie.includes(
        `${COOKIE_KEYS.LANGUAGE}=`
      );

      if (!hasLangCookie) {
        const lang = getLanguageForCountry(urlCountry);
        setUiLanguage(lang);
        setIsRtl(isRtlLanguage(lang));
      }
    }
  }, [urlCountry, uiCountry]);

  // ------------------------------
  // SET LANGUAGE (FIXED 🔥)
  // ------------------------------
  const setLanguage = useCallback((lang: SupportedLanguage) => {
    const normalized = normalizeLang(lang) || DEFAULT_LANGUAGE;

    setUiLanguage(normalized);
    setIsRtl(isRtlLanguage(normalized));

    document.cookie = `${COOKIE_KEYS.LANGUAGE}=${normalized}; path=/; max-age=${
      60 * 60 * 24 * 365
    }; samesite=lax`;

    document.documentElement.lang = normalized;

    window.dispatchEvent(
      new CustomEvent("languagechange", { detail: { language: normalized } })
    );
  }, []);

  // ------------------------------
  // SET COUNTRY
  // ------------------------------
  const setCountry = useCallback((country: string) => {
    if (!VALID_COUNTRY_CODES.has(country)) return;

    setUiCountry(country);

    const hasLangCookie = document.cookie.includes(
      `${COOKIE_KEYS.LANGUAGE}=`
    );

    if (!hasLangCookie) {
      const lang = getLanguageForCountry(country);
      setUiLanguage(lang);
      setIsRtl(isRtlLanguage(lang));
    }
  }, []);

  // ------------------------------
  // CONTEXT VALUE
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
