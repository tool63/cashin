// app/[country]/providers/LanguageProvider.tsx
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
// Props with Server Initialization
// ------------------------------
interface Props {
  children: ReactNode;
  initialCountry?: string;        // From server
  initialLanguage?: SupportedLanguage; // From server
}

export default function LanguageProvider({ 
  children, 
  initialCountry = DEFAULT_COUNTRY,
  initialLanguage = DEFAULT_LANGUAGE 
}: Props) {
  const params = useParams();
  const urlCountry = typeof params?.country === "string" 
    ? params.country.toLowerCase() 
    : null;

  // ------------------------------
  // Initialize from server props first (prevents hydration mismatch)
  // ------------------------------
  const [uiCountry, setUiCountry] = useState<string>(() => {
    // Priority: URL > initialCountry > cookie > default
    if (urlCountry && VALID_COUNTRY_CODES.has(urlCountry)) return urlCountry;
    if (initialCountry && VALID_COUNTRY_CODES.has(initialCountry)) return initialCountry;
    
    // Check cookie on client only
    if (typeof window !== 'undefined') {
      const cookie = document.cookie
        .split("; ")
        .find(row => row.startsWith(`${COOKIE_KEYS.COUNTRY}=`))
        ?.split("=")[1];
      if (cookie && VALID_COUNTRY_CODES.has(cookie)) return cookie;
    }
    
    return DEFAULT_COUNTRY;
  });

  const [uiLanguage, setUiLanguage] = useState<SupportedLanguage>(() => {
    // Priority: Cookie > initialLanguage > country mapping > default
    if (typeof window !== 'undefined') {
      const cookie = document.cookie
        .split("; ")
        .find(row => row.startsWith(`${COOKIE_KEYS.LANGUAGE}=`))
        ?.split("=")[1] as SupportedLanguage;
      if (cookie && SUPPORTED_LANGUAGES.includes(cookie)) return cookie;
    }
    
    if (initialLanguage && SUPPORTED_LANGUAGES.includes(initialLanguage)) {
      return initialLanguage;
    }
    
    // Use country-based language as fallback
    const country = urlCountry || initialCountry || DEFAULT_COUNTRY;
    return getLanguageForCountry(country);
  });

  const [isRtl, setIsRtl] = useState<boolean>(() => isRtlLanguage(uiLanguage));

  // ------------------------------
  // Sync with URL when it changes
  // ------------------------------
  useEffect(() => {
    if (urlCountry && VALID_COUNTRY_CODES.has(urlCountry) && urlCountry !== uiCountry) {
      setUiCountry(urlCountry);
      
      // Check if language cookie exists before updating
      const hasLangCookie = document.cookie.includes(`${COOKIE_KEYS.LANGUAGE}=`);
      if (!hasLangCookie) {
        const lang = getLanguageForCountry(urlCountry);
        setUiLanguage(lang);
        setIsRtl(isRtlLanguage(lang));
      }
    }
  }, [urlCountry, uiCountry]);

  // ------------------------------
  // Set language with cookie sync
  // ------------------------------
  const setLanguage = useCallback((lang: SupportedLanguage) => {
    setUiLanguage(lang);
    setIsRtl(isRtlLanguage(lang));
    
    // Set cookie with same options as middleware
    document.cookie = `${COOKIE_KEYS.LANGUAGE}=${lang}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    document.documentElement.lang = lang;
    
    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent('languagechange', { detail: { language: lang } }));
  }, []);

  // ------------------------------
  // Set country (UI only)
  // ------------------------------
  const setCountry = useCallback((country: string) => {
    if (!VALID_COUNTRY_CODES.has(country)) return;
    setUiCountry(country);
    
    // Only update language if no cookie exists
    const hasLangCookie = document.cookie.includes(`${COOKIE_KEYS.LANGUAGE}=`);
    if (!hasLangCookie) {
      const lang = getLanguageForCountry(country);
      setUiLanguage(lang);
      setIsRtl(isRtlLanguage(lang));
    }
  }, []);

  // ------------------------------
  // Memoized context value
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
