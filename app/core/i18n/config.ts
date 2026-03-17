// app/core/i18n/config.ts

import { SupportedLanguage, DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "@/app/core/detector";

// ===============================
// 🔤 RTL Languages (for future support)
// ===============================
export const RTL_LANGUAGES: string[] = ["ar", "he", "ur", "fa"]; // add if needed

export function isRtlLanguage(lang: SupportedLanguage): boolean {
  return RTL_LANGUAGES.includes(lang);
}

// ===============================
// 💰 Currency & Formatting
// ===============================
export const CURRENCY_BY_LANGUAGE: Record<SupportedLanguage, string> = {
  en: "USD",
  fr: "EUR",
  de: "EUR",
};

export const CURRENCY_SYMBOL: Record<SupportedLanguage, string> = {
  en: "$",
  fr: "€",
  de: "€",
};

export const DATE_FORMAT_BY_LANGUAGE: Record<SupportedLanguage, Intl.DateTimeFormatOptions> = {
  en: { year: "numeric", month: "long", day: "numeric", weekday: "long" },
  fr: { year: "numeric", month: "long", day: "numeric", weekday: "long" },
  de: { year: "numeric", month: "long", day: "numeric", weekday: "long" },
};

export const TIME_FORMAT_BY_LANGUAGE: Record<SupportedLanguage, Intl.DateTimeFormatOptions> = {
  en: { hour: "numeric", minute: "numeric", hour12: true },
  fr: { hour: "numeric", minute: "numeric", hour12: false },
  de: { hour: "numeric", minute: "numeric", hour12: false },
};

// ===============================
// 🍪 Cookie Configuration (i18n-specific)
// ===============================
export const COOKIE_CONFIG = {
  LANGUAGE: "NEXT_LOCALE",
  AB_GROUP: "AB_GROUP",
  REWARD_CAMPAIGN: "REWARD_CAMPAIGN_ACTIVE",
} as const;

export const COOKIE_OPTIONS = {
  LANGUAGE: { path: "/", maxAge: 60 * 60 * 24 * 365, httpOnly: false },
  AB_GROUP: { path: "/", maxAge: 60 * 60 * 24 * 90, httpOnly: false },
  REWARD_CAMPAIGN: { path: "/", maxAge: 60 * 60 * 24 * 7, httpOnly: false },
} as const;

// ===============================
// 💱 Formatting Helpers
// ===============================
export function formatCurrency(amount: number, language: SupportedLanguage = DEFAULT_LANGUAGE): string {
  const currency = CURRENCY_BY_LANGUAGE[language];
  return new Intl.NumberFormat(language, { style: "currency", currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
}

export function formatDate(date: Date | number, language: SupportedLanguage = DEFAULT_LANGUAGE): string {
  return new Intl.DateTimeFormat(language, DATE_FORMAT_BY_LANGUAGE[language]).format(date);
}

export function formatTime(date: Date | number, language: SupportedLanguage = DEFAULT_LANGUAGE): string {
  return new Intl.DateTimeFormat(language, TIME_FORMAT_BY_LANGUAGE[language]).format(date);
}

export function formatNumber(number: number, language: SupportedLanguage = DEFAULT_LANGUAGE, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat(language, options).format(number);
}

// ===============================
// 📚 Translation Loading (Optional)
// ===============================
const translationCache: Partial<Record<string, Record<string, string>>> = {};

export async function loadTranslations(lang: SupportedLanguage, namespace: string = "common"): Promise<Record<string, string>> {
  const key = `${lang}-${namespace}`;
  if (translationCache[key]) return translationCache[key]!;

  try {
    const translations = await import(`../../locales/${lang}/${namespace}.json`);
    translationCache[key] = translations.default;
    return translations.default;
  } catch (err) {
    console.warn(`Failed to load ${namespace} for ${lang}, falling back to ${DEFAULT_LANGUAGE}`);
    if (lang !== DEFAULT_LANGUAGE) return loadTranslations(DEFAULT_LANGUAGE, namespace);
    return {};
  }
}

// ===============================
// ✅ Helpers
// ===============================
export function getSupportedLocales(): string[] {
  return SUPPORTED_LANGUAGES.map(lang => `${lang}-${lang.toUpperCase()}`);
}
