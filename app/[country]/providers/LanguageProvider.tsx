"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import {
  SupportedLanguage,
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
} from "@/app/core/constants";

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
  if (
    lang &&
    SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)
  ) {
    return lang as SupportedLanguage;
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

    if (typeof document !== "undefined") {
      document.cookie = `NEXT_LOCALE=${valid}; path=/; max-age=31536000`;
    }
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, translations, setTranslations }}
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

export { LanguageContext };
