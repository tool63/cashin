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
} from "@/app/core/constants";

import type { SupportedLanguage } from "@/app/core/constants";

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
// 🔍 RESOLVE LANGUAGE
// ===============================
function resolveLanguage(lang?: string): SupportedLanguage {
  if (lang) {
    const normalized = lang.toLowerCase().split("-")[0];

    if (
      SUPPORTED_LANGUAGES.includes(normalized as SupportedLanguage)
    ) {
      return normalized as SupportedLanguage;
    }
  }

  return DEFAULT_LANGUAGE;
}

// ===============================
// 📦 PROVIDER
// ===============================
export function LanguageProvider({
  children,
  initialLanguage,
  translations: initialTranslations = {},
}: {
  children: ReactNode;
  initialLanguage?: string;
  translations?: Record<string, string>;
}) {
  const [language, setLanguageState] = useState<SupportedLanguage>(
    resolveLanguage(initialLanguage)
  );

  const [translations, setTranslations] = useState<Record<string, string>>(
    initialTranslations
  );

  // ===============================
  // 🔄 CHANGE LANGUAGE
  // ===============================
  const setLanguage = (lang: SupportedLanguage) => {
    const valid = resolveLanguage(lang);

    setLanguageState(valid);

    // sync cookie (middleware reads this)
    if (typeof document !== "undefined") {
      document.cookie = `NEXT_LOCALE=${valid}; path=/; max-age=31536000`;
    }
  };

  // ===============================
  // 🔄 SYNC WITH SERVER (OPTIONAL SAFETY)
  // ===============================
  useEffect(() => {
    const resolved = resolveLanguage(initialLanguage);

    if (resolved !== language) {
      setLanguageState(resolved);
    }
  }, [initialLanguage]);

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
