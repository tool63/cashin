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
} from "@/app/core/detector";

// ===============================
// 🌐 CONTEXT TYPE
// ===============================
type LanguageContextType = {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  translations: Record<string, string>; // ✅ NEW
  setTranslations: (t: Record<string, string>) => void; // ✅ FUTURE USE
};

const LanguageContext = createContext<LanguageContextType | null>(null);

// ===============================
// 🔍 VALIDATE LANGUAGE
// ===============================
function resolveLanguage(lang?: string): SupportedLanguage {
  if (lang && SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)) {
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
  translations: initialTranslations = {}, // ✅ NEW
}: {
  children: ReactNode;
  initialLanguage?: string;
  translations?: Record<string, string>; // ✅ NEW
}) {
  const [language, setLanguageState] = useState<SupportedLanguage>(
    resolveLanguage(initialLanguage)
  );

  // ✅ STORE TRANSLATIONS (FROM LAYOUT)
  const [translations, setTranslations] = useState<Record<string, string>>(
    initialTranslations
  );

  // ===============================
  // 🔄 UPDATE LANGUAGE
  // ===============================
  const setLanguage = (lang: SupportedLanguage) => {
    const valid = resolveLanguage(lang);
    setLanguageState(valid);

    // sync cookie (middleware reads this)
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

// ===============================
// 📤 EXPORT CONTEXT (OPTIONAL)
// ===============================
export { LanguageContext };
