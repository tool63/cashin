"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import { COOKIE_KEYS } from "@/app/core/constants";
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
// 📦 PROVIDER
// ===============================
export function LanguageProvider({
  children,
  initialLanguage,
  translations: initialTranslations = {},
}: {
  children: ReactNode;
  initialLanguage: SupportedLanguage;
  translations?: Record<string, string>;
}) {
  // ✅ TRUST SERVER VALUE (NO RESOLVING HERE)
  const [language, setLanguageState] = useState<SupportedLanguage>(
    initialLanguage
  );

  const [translations, setTranslations] = useState<
    Record<string, string>
  >(initialTranslations);

  // ===============================
  // 🔄 USER LANGUAGE CHANGE ONLY
  // ===============================
  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);

    if (typeof document !== "undefined") {
      document.cookie = `${COOKIE_KEYS.LANGUAGE}=${lang}; path=/; max-age=31536000`;
    }
  };

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
