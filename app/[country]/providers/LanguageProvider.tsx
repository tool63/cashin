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
  translations: Record<string, string>;
  setCountry: (country: string) => void;
  setLanguage: (lang: string) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  country: "us",
  language: "EN",
  translations: {},
  setCountry: () => {},
  setLanguage: () => {},
});

interface Props {
  children: ReactNode;
  country?: string;
  language?: string;
}

// Country → Language mapping
const COUNTRY_LANGUAGE_MAP: Record<string, string> = {
  us: "en",
  uk: "en",
  ca: "en",
  au: "en",
  in: "en",
  fr: "fr",
  de: "de",
};

const DEFAULT_COUNTRY = "us";
const DEFAULT_LANGUAGE = "en";

export default function LanguageProvider({
  children,
  country: initialCountry,
  language: initialLanguage,
}: Props) {
  const pathname = usePathname();

  // Detect country from URL
  const detectedCountry = useMemo(() => {
    const urlCountry = pathname?.split("/")[1]?.toLowerCase();
    return initialCountry || urlCountry || DEFAULT_COUNTRY;
  }, [pathname, initialCountry]);

  // Country state
  const [country, setCountryState] = useState(detectedCountry);

  // Language state
  const [language, setLanguageState] = useState(
    initialLanguage || COUNTRY_LANGUAGE_MAP[country] || DEFAULT_LANGUAGE
  );

  // Translations
  const [translations, setTranslations] = useState<Record<string, string>>({});

  // Load translations dynamically whenever language changes
  useEffect(() => {
    const lang = COUNTRY_LANGUAGE_MAP[country] || DEFAULT_LANGUAGE;
    setLanguageState(lang);

    import(`../../locales/${lang}/homepage.json`)
      .then((module) => setTranslations(module.default || module))
      .catch(() => setTranslations({}));
  }, [country]);

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

  // Change country (updates language automatically)
  const setCountry = useCallback(
    (newCountry: string) => {
      if (!COUNTRY_LANGUAGE_MAP[newCountry] || newCountry === country) return;
      setCountryState(newCountry);
    },
    [country]
  );

  // Change language manually
  const setLanguage = useCallback((lang: string) => {
    if (!Object.values(COUNTRY_LANGUAGE_MAP).includes(lang)) return;
    setLanguageState(lang);
  }, []);

  const value = useMemo(
    () => ({
      country,
      language,
      translations,
      setCountry,
      setLanguage,
    }),
    [country, language, translations, setCountry, setLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
