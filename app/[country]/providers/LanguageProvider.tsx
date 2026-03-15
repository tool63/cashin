"use client";

import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { usePathname, useRouter } from "next/navigation";

interface LanguageContextType {
  country: string;
  language: string;
  setCountry: (country: string) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  country: "us",
  language: "EN",
  setCountry: () => {},
});

interface Props {
  children: ReactNode;
  country?: string;
}

const COUNTRY_LANGUAGE_MAP: Record<string, string> = {
  us: "EN",
  uk: "EN",
  ca: "EN",
  au: "EN",
  in: "EN",
  fr: "FR",
  de: "DE",
};

export default function LanguageProvider({ children, country: initialCountry }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  /**
   * Detect country from URL
   */
  const detectedCountry = useMemo(() => {
    return (
      initialCountry ||
      pathname?.split("/")[1]?.toLowerCase() ||
      "us"
    );
  }, [pathname, initialCountry]);

  /**
   * State
   */
  const [country, setCountryState] = useState(detectedCountry);
  const [language, setLanguage] = useState(
    COUNTRY_LANGUAGE_MAP[detectedCountry] || "EN"
  );

  /**
   * Update state if URL country changes
   */
  useEffect(() => {
    if (detectedCountry !== country) {
      setCountryState(detectedCountry);
      setLanguage(COUNTRY_LANGUAGE_MAP[detectedCountry] || "EN");
    }
  }, [detectedCountry, country]);

  /**
   * Mark page ready (used for theme or UI hydration fixes)
   */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme-ready", "true");
  }, []);

  /**
   * Change country
   */
  const setCountry = useCallback(
    (newCountry: string) => {
      if (!COUNTRY_LANGUAGE_MAP[newCountry]) return;

      if (newCountry === country) return;

      setCountryState(newCountry);
      setLanguage(COUNTRY_LANGUAGE_MAP[newCountry]);

      router.push(`/${newCountry}`);
    },
    [country, router]
  );

  const value = useMemo(
    () => ({
      country,
      language,
      setCountry,
    }),
    [country, language, setCountry]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
