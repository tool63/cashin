"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";

import { COOKIE_KEYS, DEFAULT_LANGUAGE } from "@/app/core/constants";
import type { SupportedLanguage } from "@/app/core/types";
import { loadAllTranslations } from "@/app/core/i18n/loader";

// ===============================
// 🌐 TYPES
// ===============================
export type TranslationsMap = {
  homepage: Record<string, string>;
  footer: Record<string, string>;
  header?: Record<string, string>;
  primarycta?: Record<string, string>;
  [key: string]: Record<string, string>;
};

type LanguageContextType = {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage, isUserOverride: boolean) => void;
  translations: TranslationsMap;
  getTranslation: (namespace: string, key: string, fallback: string) => string;
  isUserOverridden: boolean;
  isLoading: boolean;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

// ===============================
// 📦 PROVIDER
// ===============================
export function LanguageProvider({
  children,
  initialLanguage,
  translations: initialTranslations = { homepage: {}, footer: {} },
  isOverridden = false,
}: {
  children: ReactNode;
  initialLanguage: SupportedLanguage;
  translations?: TranslationsMap;
  isOverridden?: boolean;
}) {
  const [language, setLanguageState] = useState<SupportedLanguage>(initialLanguage);
  const [translations, setTranslations] = useState<TranslationsMap>(initialTranslations);
  const [isUserOverridden, setIsUserOverridden] = useState(isOverridden);
  const [isLoading, setIsLoading] = useState(false);

  // ===============================
  // ✅ FIXED TRANSLATION FUNCTION
  // ===============================
  const getTranslation = useCallback(
    (namespace: string, key: string, fallback: string): string => {
      const ns = translations[namespace];

      if (ns && typeof ns === "object") {
        const value = ns[key];
        if (typeof value === "string") {
          return value;
        }
      }

      // ❗ NO cross-namespace fallback (important fix)
      return fallback;
    },
    [translations]
  );

  // ===============================
  // 🔄 LOAD TRANSLATIONS
  // ===============================
  useEffect(() => {
    let mounted = true;

    const loadTranslations = async () => {
      if (
        !initialTranslations.homepage ||
        Object.keys(initialTranslations.homepage).length === 0
      ) {
        setIsLoading(true);
      }

      try {
        const newTranslations = await loadAllTranslations(language);

        if (mounted) {
          setTranslations(newTranslations);
        }
      } catch (error) {
        console.error(`Failed to load translations for ${language}:`, error);

        if (mounted && language !== DEFAULT_LANGUAGE) {
          try {
            const fallbackTranslations = await loadAllTranslations(DEFAULT_LANGUAGE);

            if (mounted) {
              setTranslations(fallbackTranslations);
            }
          } catch (fallbackError) {
            console.error("Failed to load fallback translations:", fallbackError);

            if (mounted) {
              setTranslations({
                homepage: {},
                footer: {},
                header: {},
                primarycta: {},
              });
            }
          }
        } else if (mounted) {
          setTranslations({
            homepage: {},
            footer: {},
            header: {},
            primarycta: {},
          });
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadTranslations();

    return () => {
      mounted = false;
    };
  }, [language]);

  // ===============================
  // 🔄 CHANGE LANGUAGE
  // ===============================
  const setLanguage = useCallback(
    (lang: SupportedLanguage, isUserOverride: boolean = true) => {
      setLanguageState(lang);
      setIsUserOverridden(isUserOverride);

      if (typeof document !== "undefined") {
        document.cookie = `${COOKIE_KEYS.LANGUAGE}=${lang}; path=/; max-age=31536000; SameSite=Lax`;

        if (isUserOverride) {
          document.cookie = `${COOKIE_KEYS.USER_LANGUAGE_OVERRIDE}=${lang}; path=/; max-age=31536000; SameSite=Lax`;
        } else {
          document.cookie = `${COOKIE_KEYS.USER_LANGUAGE_OVERRIDE}=; path=/; max-age=0; SameSite=Lax`;
        }
      }
    },
    []
  );

  // ===============================
  // 🔄 SYNC WITH SERVER
  // ===============================
  useEffect(() => {
    if (initialLanguage !== language && !isUserOverridden) {
      setLanguageState(initialLanguage);
    }
  }, [initialLanguage, language, isUserOverridden]);

  const value = {
    language,
    setLanguage,
    translations,
    getTranslation,
    isUserOverridden,
    isLoading,
  };

  return (
    <LanguageContext.Provider value={value}>
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
