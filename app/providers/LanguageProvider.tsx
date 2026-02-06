"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"
import { LANG } from "../lang/core/lang"

/* ================= TYPES ================= */

// Language codes like "en", "fr", etc.
type LangCode = keyof typeof LANG

// Translation keys (based on EN as source of truth)
type TranslationKey = keyof typeof LANG["en"]

interface LanguageContextType {
  lang: LangCode
  t: (key: TranslationKey) => string
  setLang: (lang: LangCode) => void
}

/* ================= CONTEXT ================= */

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  t: (key) => key,
  setLang: () => {},
})

/* ================= PROVIDER ================= */

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<LangCode>("en")

  useEffect(() => {
    // Browser language detection
    const browserLang = navigator.language.split("-")[0] as LangCode

    if (browserLang in LANG) {
      setLang(browserLang)
    }
  }, [])

  function t(key: TranslationKey): string {
    return LANG[lang]?.[key] ?? LANG.en[key] ?? key
  }

  return (
    <LanguageContext.Provider value={{ lang, t, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

/* ================= HOOK ================= */

export function useLang() {
  return useContext(LanguageContext)
}
