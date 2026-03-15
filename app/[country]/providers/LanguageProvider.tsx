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

export default function LanguageProvider({ children, country: initialCountry }: Props) {
  const pathname = usePathname();
  const router = useRouter();

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

  const [language, setLanguage] = useState(() => {
    return COUNTRY_LANGUAGE_MAP[country] || DEFAULT_LANGUAGE;
  });

  // Update state when URL country changes
  useEffect(() => {
    if (detectedCountry !== country && COUNTRY_LANGUAGE_MAP[detectedCountry]) {
      setCountryState(detectedCountry);
      setLanguage(COUNTRY_LANGUAGE_MAP[detectedCountry]);
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

  // Change country (in-memory only, URL does not change)
  const setCountry = useCallback(
    (newCountry: string) => {
      if (!COUNTRY_LANGUAGE_MAP[newCountry]) return;
      if (newCountry === country) return;

      setCountryState(newCountry);
      setLanguage(COUNTRY_LANGUAGE_MAP[newCountry]);
    },
    [country]
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
