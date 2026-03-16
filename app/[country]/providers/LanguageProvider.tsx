"use client";

import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { usePathname } from "next/navigation";

interface LanguageContextType {
  country: string;
  language: string;
  setCountry: (country: string) => void;
  setLanguage: (lang: string) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  country: "us",
  language: "EN",
  setCountry: () => {},
  setLanguage: () => {},
});

interface Props {
  children: ReactNode;
  country?: string;
  language?: string; // ✅ Add optional initial language
}

// Country → Language mapping
const COUNTRY_LANGUAGE_MAP: Record<string, string> = {
  us: "EN",
  uk: "EN",
  ca: "EN",
  au: "EN",
  in: "EN",
  fr: "FR",
  de: "DE",
};

const DEFAULT_COUNTRY = "us";
const DEFAULT_LANGUAGE = "EN";

export default function LanguageProvider({ children, country: initialCountry, language: initialLanguage }: Props) {
  const pathname = usePathname();

  // Detect country from URL
  const detectedCountry = useMemo(() => {
    const urlCountry = pathname?.split("/")[1]?.toLowerCase();
    return initialCountry || urlCountry || DEFAULT_COUNTRY;
  }, [pathname, initialCountry]);

  // Load country from localStorage if exists
  const [country, setCountryState] = useState(() => {
    if (typeof window === "undefined") return detectedCountry;
    const stored = localStorage.getItem("country");
    return stored && COUNTRY_LANGUAGE_MAP[stored] ? stored : detectedCountry;
  });

  // Language state, uses initialLanguage if provided
  const [language, setLanguageState] = useState(() => {
    return initialLanguage || COUNTRY_LANGUAGE_MAP[country] || DEFAULT_LANGUAGE;
  });

  // Update state when URL country changes
  useEffect(() => {
    if (detectedCountry !== country && COUNTRY_LANGUAGE_MAP[detectedCountry]) {
      setCountryState(detectedCountry);
      setLanguageState(COUNTRY_LANGUAGE_MAP[detectedCountry]);
    }
  }, [detectedCountry, country]);

  // Persist selected country in localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("country", country);
    }
  }, [country]);

  // Mark page ready (hydration fixes)
  useEffect(() => {
    document.documentElement.setAttribute("data-theme-ready", "true");
  }, []);

  // Change country (in-memory only)
  const setCountry = useCallback(
    (newCountry: string) => {
      if (!COUNTRY_LANGUAGE_MAP[newCountry]) return;
      if (newCountry === country) return;

      setCountryState(newCountry);
      setLanguageState(COUNTRY_LANGUAGE_MAP[newCountry]);
    },
    [country]
  );

  const value = useMemo(
    () => ({
      country,
      language,
      setCountry,
      setLanguage: setLanguageState,
    }),
    [country, language, setCountry]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
