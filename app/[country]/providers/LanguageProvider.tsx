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

  // Helper function to get a translation from a specific namespace
  const getTranslation = useCallback((
    namespace: string,
    key: string,
    fallback: string
  ): string => {
    const namespaceTranslations = translations[namespace];
    
    if (namespaceTranslations && typeof namespaceTranslations === 'object') {
      const value = namespaceTranslations[key];
      if (value && typeof value === 'string') {
        return value;
      }
    }
    
    // Try to find in other namespaces if not found in requested one
    for (const ns of Object.keys(translations)) {
      const nsTranslations = translations[ns];
      if (nsTranslations && typeof nsTranslations === 'object' && nsTranslations[key]) {
        return nsTranslations[key];
      }
    }
    
    return fallback;
  }, [translations]);

  // Load translations when language changes
  useEffect(() => {
    let mounted = true;

    const loadTranslations = async () => {
      // Don't show loading for initial load if we already have translations
      if (!initialTranslations.homepage || Object.keys(initialTranslations.homepage).length === 0) {
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
          // Try fallback to default language
          try {
            const fallbackTranslations = await loadAllTranslations(DEFAULT_LANGUAGE);
            if (mounted) {
              setTranslations(fallbackTranslations);
            }
          } catch (fallbackError) {
            console.error("Failed to load fallback translations:", fallbackError);
            if (mounted) {
              setTranslations({ homepage: {}, footer: {} });
            }
          }
        } else if (mounted) {
          setTranslations({ homepage: {}, footer: {} });
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
  }, [language, DEFAULT_LANGUAGE]);

  // ===============================
  // 🔄 USER LANGUAGE CHANGE ONLY
  // ===============================
  const setLanguage = useCallback((lang: SupportedLanguage, isUserOverride: boolean = true) => {
    setLanguageState(lang);
    setIsUserOverridden(isUserOverride);

    if (typeof document !== "undefined") {
      // Set language cookie
      document.cookie = `${COOKIE_KEYS.LANGUAGE}=${lang}; path=/; max-age=31536000; SameSite=Lax`;

      // Set or clear user override cookie
      if (isUserOverride) {
        document.cookie = `${COOKIE_KEYS.USER_LANGUAGE_OVERRIDE}=${lang}; path=/; max-age=31536000; SameSite=Lax`;
      } else {
        document.cookie = `${COOKIE_KEYS.USER_LANGUAGE_OVERRIDE}=; path=/; max-age=0; SameSite=Lax`;
      }
    }
  }, []);

  // Sync with server-side language changes
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
