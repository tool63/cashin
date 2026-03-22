"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { COOKIE_KEYS } from "@/app/core/constants";
import type { SupportedLanguage } from "@/app/core/types";
import { loadTranslations } from "@/app/core/i18n/translations";

// ===============================
// 🌐 TYPES
// ===============================
type NestedTranslations = {
  homepage?: Record<string, string>;
  footer?: Record<string, string>;
  [key: string]: Record<string, string> | undefined;
};

type LanguageContextType = {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage, isUserOverride: boolean) => void;
  translations: NestedTranslations;
  getTranslation: (namespace: string, key: string, fallback: string) => string;
  isUserOverridden: boolean;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

// ===============================
// 📦 PROVIDER
// ===============================
export function LanguageProvider({
  children,
  initialLanguage,
  translations: initialTranslations = {},
  isOverridden = false,
}: {
  children: ReactNode;
  initialLanguage: SupportedLanguage;
  translations?: NestedTranslations;
  isOverridden?: boolean;
}) {
  const [language, setLanguageState] = useState<SupportedLanguage>(initialLanguage);
  const [translations, setTranslations] = useState<NestedTranslations>(initialTranslations);
  const [isUserOverridden, setIsUserOverridden] = useState(isOverridden);

  // Helper function to get a translation from a specific namespace
  const getTranslation = (namespace: string, key: string, fallback: string): string => {
    const namespaceTranslations = translations[namespace];
    if (namespaceTranslations && typeof namespaceTranslations === 'object') {
      return (namespaceTranslations as Record<string, string>)[key] || fallback;
    }
    return fallback;
  };

  // Load translations when language changes
  useEffect(() => {
    let mounted = true;

    const loadLangTranslations = async () => {
      try {
        const newTranslations = await loadTranslations(language);
        if (mounted) {
          setTranslations(newTranslations);
        }
      } catch (error) {
        console.error("Failed to load translations:", error);
      }
    };

    loadLangTranslations();

    return () => {
      mounted = false;
    };
  }, [language]);

  // ===============================
  // 🔄 USER LANGUAGE CHANGE ONLY
  // ===============================
  const setLanguage = (lang: SupportedLanguage, isUserOverride: boolean = true) => {
    setLanguageState(lang);
    setIsUserOverridden(isUserOverride);

    if (typeof document !== "undefined") {
      document.cookie = `${COOKIE_KEYS.LANGUAGE}=${lang}; path=/; max-age=31536000`;

      if (isUserOverride) {
        document.cookie = `${COOKIE_KEYS.USER_LANGUAGE_OVERRIDE}=${lang}; path=/; max-age=31536000`;
      } else {
        document.cookie = `${COOKIE_KEYS.USER_LANGUAGE_OVERRIDE}=; path=/; max-age=0`;
      }
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        translations,
        getTranslation,
        isUserOverridden,
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
