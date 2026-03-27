"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useRef,
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
  error: string | null;
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
  const [error, setError] = useState<string | null>(null);
  
  // Track if initial translations are already loaded
  const hasInitialTranslations = useRef(
    initialTranslations.homepage && Object.keys(initialTranslations.homepage).length > 0
  );
  
  // Track loading to prevent duplicate requests
  const loadingRef = useRef<Set<SupportedLanguage>>(new Set());

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

      // Check nested translations for dot notation (e.g., "hero.title")
      if (key.includes(".")) {
        const parts = key.split(".");
        let current: any = translations[namespace];
        
        for (const part of parts) {
          if (current && typeof current === "object" && part in current) {
            current = current[part];
          } else {
            return fallback;
          }
        }
        
        if (typeof current === "string") {
          return current;
        }
      }

      return fallback;
    },
    [translations]
  );

  // ===============================
  // 🔄 LOAD TRANSLATIONS (with deduplication)
  // ===============================
  const loadTranslationsForLanguage = useCallback(async (lang: SupportedLanguage) => {
    // Prevent duplicate loads for the same language
    if (loadingRef.current.has(lang)) {
      return;
    }
    
    loadingRef.current.add(lang);
    setIsLoading(true);
    setError(null);

    try {
      const newTranslations = await loadAllTranslations(lang);
      setTranslations(newTranslations);
    } catch (err) {
      console.error(`Failed to load translations for ${lang}:`, err);
      setError(`Failed to load ${lang} translations`);
      
      // Try fallback if not already using default language
      if (lang !== DEFAULT_LANGUAGE) {
        try {
          console.log(`Falling back to ${DEFAULT_LANGUAGE} translations`);
          const fallbackTranslations = await loadAllTranslations(DEFAULT_LANGUAGE);
          setTranslations(fallbackTranslations);
          setError(null); // Clear error since we have fallback
        } catch (fallbackError) {
          console.error("Failed to load fallback translations:", fallbackError);
          setError("Failed to load translations");
          setTranslations({
            homepage: {},
            footer: {},
            header: {},
            primarycta: {},
          });
        }
      } else {
        // Default language failed
        setTranslations({
          homepage: {},
          footer: {},
          header: {},
          primarycta: {},
        });
      }
    } finally {
      setIsLoading(false);
      loadingRef.current.delete(lang);
    }
  }, []);

  // ===============================
  // 🔄 LOAD TRANSLATIONS ON LANGUAGE CHANGE
  // ===============================
  useEffect(() => {
    // Skip if we already have initial translations and language matches initial
    if (hasInitialTranslations.current && language === initialLanguage) {
      return;
    }
    
    loadTranslationsForLanguage(language);
  }, [language, initialLanguage, loadTranslationsForLanguage]);

  // ===============================
  // 🔄 CHANGE LANGUAGE
  // ===============================
  const setLanguage = useCallback(
    (lang: SupportedLanguage, isUserOverride: boolean = true) => {
      if (lang === language) return; // Prevent unnecessary updates
      
      setLanguageState(lang);
      setIsUserOverridden(isUserOverride);

      if (typeof document !== "undefined") {
        // Set language cookie
        document.cookie = `${COOKIE_KEYS.LANGUAGE}=${lang}; path=/; max-age=31536000; SameSite=Lax`;

        if (isUserOverride) {
          // Set user override cookie
          document.cookie = `${COOKIE_KEYS.USER_LANGUAGE_OVERRIDE}=${lang}; path=/; max-age=31536000; SameSite=Lax`;
        } else {
          // Clear user override cookie
          document.cookie = `${COOKIE_KEYS.USER_LANGUAGE_OVERRIDE}=; path=/; max-age=0; SameSite=Lax`;
        }
      }
    },
    [language]
  );

  // ===============================
  // 🔄 SYNC WITH SERVER (only if not overridden)
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
    error,
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
