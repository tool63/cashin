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
// 🌐 CONTEXT TYPE
// ===============================
type LanguageContextType = {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage, isUserOverride: boolean) => void;
  translations: Record<string, string>;
  setTranslations: (t: Record<string, string>) => void;
  isUserOverridden: boolean; // Track if user has manually changed language
};

const LanguageContext = createContext<LanguageContextType | null>(null);

// ===============================
// 📦 PROVIDER
// ===============================
export function LanguageProvider({
  children,
  initialLanguage,
  translations: initialTranslations = {},
  isOverridden = false, // Prop to track if the user has overridden the language
}: {
  children: ReactNode;
  initialLanguage: SupportedLanguage;
  translations?: Record<string, string>;
  isOverridden?: boolean;
}) {
  const [language, setLanguageState] = useState<SupportedLanguage>(initialLanguage);
  const [translations, setTranslations] = useState<Record<string, string>>(initialTranslations);
  const [isUserOverridden, setIsUserOverridden] = useState(isOverridden);

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
      document.cookie = `${COOKIE_KEYS.LANGUAGE}=${lang}; path=/; max-age=31536000`; // 1 year cookie

      // If it's a user override, track it separately
      if (isUserOverride) {
        document.cookie = `${COOKIE_KEYS.USER_LANGUAGE_OVERRIDE}=${lang}; path=/; max-age=31536000`;
      } else {
        // If it's country-based language, clear override
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
        setTranslations,
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
