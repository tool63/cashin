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
  
  // Add a check to ensure that `params.country` is a string
  const urlCountry = typeof params?.country === "string" ? params?.country.toLowerCase() : DEFAULT_COUNTRY;

  const [uiCountry, setUiCountry] = useState<string>(urlCountry);
  const [uiLanguage, setUiLanguage] = useState<SupportedLanguage>(
    urlCountry ? getLanguageForCountry(urlCountry) : DEFAULT_LANGUAGE
  );

  // Sync state with URL (from middleware)
  useEffect(() => {
    if (urlCountry && VALID_COUNTRY_CODES.has(urlCountry)) {
      setUiCountry(urlCountry);
      setUiLanguage(getLanguageForCountry(urlCountry));
    }
  }, [urlCountry]);

  // Load language/country from cookies (set by middleware)
  useEffect(() => {
    // Language cookie
    const cookieLang = document.cookie
      .split("; ")
      .find(row => row.startsWith(`${COOKIE_KEYS.LANGUAGE}=`))
      ?.split("=")[1] as SupportedLanguage | undefined;

    if (cookieLang && SUPPORTED_LANGUAGES.includes(cookieLang)) {
      setUiLanguage(cookieLang);
    }

    // Country cookie
    const cookieCountry = document.cookie
      .split("; ")
      .find(row => row.startsWith(`${COOKIE_KEYS.COUNTRY}=`))
      ?.split("=")[1];

    if (cookieCountry && VALID_COUNTRY_CODES.has(cookieCountry)) {
      setUiCountry(cookieCountry);
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

  return <LanguageContext.Provider value={value}>{children}</LanguageProvider>;
}
