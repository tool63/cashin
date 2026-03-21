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
// 🔍 RESOLVE LANGUAGE (SMART + USER-FRIENDLY)
// ===============================
function resolveLanguage(
  cookieLang: string | undefined,
  country: string
): SupportedLanguage {
  // 1️⃣ User preference (HIGHEST PRIORITY)
  if (cookieLang) {
    const normalized = cookieLang.toLowerCase().split("-")[0];

    if (
      SUPPORTED_LANGUAGES.includes(
        normalized as SupportedLanguage
      )
    ) {
      return normalized as SupportedLanguage;
    }
  }

  // 2️⃣ Country-based default (ONLY if no user preference)
  const mapped = COUNTRY_LANGUAGE_MAP[country];
  if (mapped) return mapped;

  // 3️⃣ Fallback
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
  const [language, setLanguageState] = useState<SupportedLanguage>(() =>
    resolveLanguage(initialLanguage, initialCountry || "global")
  );

  const [translations, setTranslations] = useState<
    Record<string, string>
  >(initialTranslations);

  // ===============================
  // 🔄 CHANGE LANGUAGE (USER ACTION)
  // ===============================
  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);

    if (typeof document !== "undefined") {
      document.cookie = `${COOKIE_KEYS.LANGUAGE}=${lang}; path=/; max-age=31536000`;
    }
  };

  // ===============================
  // 🔄 SYNC (DO NOT FORCE USER)
  // ===============================
  useEffect(() => {
    // Only update if NO cookie exists (first load scenario)
    if (!initialLanguage) {
      const resolved = resolveLanguage(
        undefined,
        initialCountry || "global"
      );

      if (resolved !== language) {
        setLanguageState(resolved);
      }
    }
  }, [initialCountry]);

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
// 📤 EXPORT CONTEXT
// ===============================
export { LanguageContext };
