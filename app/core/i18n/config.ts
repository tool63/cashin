// app/core/i18n/config.ts

// =======================
// ✅ Default Language Configuration
// =======================
export const defaultLanguage: SupportedLang = "en";

// =======================
// ✅ Supported Languages List (only 3 translated languages)
// =======================
export const supportedLanguages = ["en", "fr", "de"] as const;
export type SupportedLang = (typeof supportedLanguages)[number];

// =======================
// ✅ Country → Language Mapping (ISO 3166-1 alpha-2)
// =======================
export const countryLangMap: Record<string, SupportedLang> = {
  US: "en",
  GB: "en",
  CA: "en",
  AU: "en",
  IN: "en",
  FR: "fr",
  DE: "de",
  ES: "en", // fallback to English
  MX: "en", // fallback to English
  BR: "en", // fallback to English
  // Add more countries in future; fallback to English if not translated
};

// =======================
// ✅ Fallback Language
// =======================
export const fallbackLanguage: SupportedLang = defaultLanguage;

// =======================
// ✅ Date, Number, Currency Formatting per Language
// =======================
export const formattingRules: Record<SupportedLang, Intl.DateTimeFormatOptions & { currency: string }> = {
  en: { year: "numeric", month: "long", day: "numeric", currency: "USD" },
  fr: { year: "numeric", month: "long", day: "numeric", currency: "EUR" },
  de: { year: "numeric", month: "long", day: "numeric", currency: "EUR" },
};

// =======================
// ✅ Pluralization & i18n Rules
// =======================
export const pluralRules: Record<SupportedLang, Intl.PluralRules> = {
  en: new Intl.PluralRules("en"),
  fr: new Intl.PluralRules("fr"),
  de: new Intl.PluralRules("de"),
};

// =======================
// ✅ Dynamic Translation File Loading
// =======================
export async function loadTranslation(lang: SupportedLang) {
  try {
    const translations = await import(`../../locales/${lang}.json`);
    return translations.default;
  } catch (error) {
    console.warn(`Translation file for ${lang} not found, falling back to ${fallbackLanguage}`);
    const fallback = await import(`../../locales/${fallbackLanguage}.json`);
    return fallback.default;
  }
}

// =======================
// ✅ RTL Support for Future Languages
// =======================
export const rtlLanguages: SupportedLang[] = []; // Example: ["ar", "he"]

// =======================
// ✅ Translation Caching (In-memory)
// =======================
const translationCache: Record<SupportedLang, Record<string, string>> = {} as any;
export async function getTranslation(lang: SupportedLang) {
  if (translationCache[lang]) return translationCache[lang];
  const translations = await loadTranslation(lang);
  translationCache[lang] = translations;
  return translations;
}

// =======================
// ✅ Utility: Normalize Language Code
// =======================
export function normalizeLangCode(lang?: string | null): SupportedLang {
  if (!lang) return defaultLanguage;
  const code = lang.toLowerCase().split("-")[0];
  return supportedLanguages.includes(code as SupportedLang) ? (code as SupportedLang) : defaultLanguage;
}

// =======================
// ✅ Formatting Helpers
// =======================
export function formatDate(date: Date, lang: SupportedLang = defaultLanguage) {
  return new Intl.DateTimeFormat(lang, formattingRules[lang]).format(date);
}

export function formatCurrency(amount: number, lang: SupportedLang = defaultLanguage) {
  return new Intl.NumberFormat(lang, {
    style: "currency",
    currency: formattingRules[lang].currency,
  }).format(amount);
}
