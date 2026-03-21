"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  COOKIE_KEYS,
  COUNTRY_LANGUAGE_MAP,
} from "@/app/core/constants";

import type { SupportedLanguage } from "@/app/core/types";

// ===============================
// 🌐 CONTEXT TYPE
// ===============================
type LanguageContextType = {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  translations: Record<string, string>;
  setTranslations: (t: Record<string, string>) => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

// ===============================
// 🔍 RESOLVE LANGUAGE (COUNTRY-FIRST)
// ===============================
function resolveLanguage(
  lang: string | undefined,
  country: string
): SupportedLanguage {
  // 1️⃣ Country → Language (HIGHEST PRIORITY)
  const mapped = COUNTRY_LANGUAGE_MAP[country];
  if (mapped) return mapped;

  // 2️⃣ User provided language (cookie or server)
  if (lang) {
    const normalized = lang.toLowerCase().split("-")[0];

    if (
      SUPPORTED_LANGUAGES.includes(
        normalized as SupportedLanguage
      )
    ) {
      return normalized as SupportedLanguage;
    }
  }

  // 3️⃣ Default fallback
  return DEFAULT_LANGUAGE;
}

// ===============================
// 📦 PROVIDER
// ===============================
export function LanguageProvider({
  children,
  initialLanguage,
  initialCountry,
  translations: initialTranslations = {},
}: {
  children: ReactNode;
  initialLanguage?: string;
  initialCountry?: string;
  translations?: Record<string, string>;
}) {
  const [country] = useState<string>(
    initialCountry?.toLowerCase() || "global"
  );

  const [language, setLanguageState] = useState<SupportedLanguage>(
    resolveLanguage(initialLanguage, country)
  );

  const [translations, setTranslations] = useState<
    Record<string, string>
  >(initialTranslations);

  // ===============================
  // 🔄 SET LANGUAGE (COOKIE + STATE)
  // ===============================
  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);

    if (typeof document !== "undefined") {
      document.cookie = `${COOKIE_KEYS.LANGUAGE}=${lang}; path=/; max-age=31536000`;
    }
  };

  // ===============================
  // 🔄 SYNC WITH SERVER / COUNTRY
  // ===============================
  useEffect(() => {
    const resolved = resolveLanguage(initialLanguage, country);

    if (resolved !== language) {
      setLanguageState(resolved);
    }
  }, [initialLanguage, country]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        translations,
        setTranslations,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

// ===============================
// 🪝 HOOK
// ===============================
export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}

// ===============================
// 📤 EXPORT CONTEXT (OPTIONAL)
// ===============================
export { LanguageContext };
