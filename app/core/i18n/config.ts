// app/core/i18n/config.ts

// =======================
// ✅ Supported Languages
// =======================
export const supportedLanguages = ["en", "fr", "de"] as const;
export type SupportedLang = (typeof supportedLanguages)[number];

// =======================
// ✅ Default & Fallback Language
// =======================
export const defaultLanguage: SupportedLang = "en";
export const fallbackLanguage: SupportedLang = defaultLanguage;

// =======================
// ✅ Country → Language Mapping
// =======================
export const countryLangMap: Record<string, SupportedLang> = {
  US: "en",
  GB: "en",
  CA: "en",
  AU: "en",
  IN: "en",
  FR: "fr",
  DE: "de",
  ES: "en",
  MX: "en",
  BR: "en",
};

// =======================
// ✅ Date & Currency Formatting
// =======================
export const formattingRules: Record<
  SupportedLang,
  { date: Intl.DateTimeFormatOptions; currency: string }
> = {
  en: { date: { year: "numeric", month: "long", day: "numeric" }, currency: "USD" },
  fr: { date: { year: "numeric", month: "long", day: "numeric" }, currency: "EUR" },
  de: { date: { year: "numeric", month: "long", day: "numeric" }, currency: "EUR" },
};

// =======================
// ✅ Pluralization Rules
// =======================
export const pluralRules: Record<SupportedLang, Intl.PluralRules> = {
  en: new Intl.PluralRules("en"),
  fr: new Intl.PluralRules("fr"),
  de: new Intl.PluralRules("de"),
};

// =======================
// ✅ RTL Languages
// =======================
export const rtlLanguages: SupportedLang[] = [];

// =======================
// ✅ Dynamic Translation Loader
// =======================
export async function loadTranslation(lang: SupportedLang) {
  try {
    const translations = await import(`../../locales/${lang}/homepage.json`);
    return translations.default;
  } catch (error) {
    console.warn(
      `Translation for '${lang}' not found. Falling back to '${fallbackLanguage}'`
    );
    const fallback = await import(`../../locales/${fallbackLanguage}/homepage.json`);
    return fallback.default;
  }
}

// =======================
// ✅ Translation Cache
// =======================
const translationCache: Record<SupportedLang, Record<string, string>> = {} as any;

export async function getTranslation(lang: SupportedLang) {
  if (translationCache[lang]) return translationCache[lang];

  const translations = await loadTranslation(lang);
  translationCache[lang] = translations;

  return translations;
}

// =======================
// ✅ Normalize Language Code
// =======================
export function normalizeLangCode(lang?: string | null): SupportedLang {
  if (!lang) return defaultLanguage;

  const code = lang.toLowerCase().split("-")[0];

  return supportedLanguages.includes(code as SupportedLang)
    ? (code as SupportedLang)
    : defaultLanguage;
}

// =======================
// ✅ Formatting Helpers
// =======================
export function formatDate(date: Date, lang: SupportedLang = defaultLanguage) {
  return new Intl.DateTimeFormat(lang, formattingRules[lang].date).format(date);
}

export function formatCurrency(amount: number, lang: SupportedLang = defaultLanguage) {
  return new Intl.NumberFormat(lang, {
    style: "currency",
    currency: formattingRules[lang].currency,
  }).format(amount);
}
