import {
  SupportedLanguage,
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
} from "@/app/core/detector";

// ===============================
// 🔤 RTL LANGUAGES
// ===============================
export const RTL_LANGUAGES = new Set<string>(["ar", "he", "ur", "fa"]);

export function isRtlLanguage(lang: SupportedLanguage | string): boolean {
  return RTL_LANGUAGES.has(lang.toLowerCase());
}

// ===============================
// 🌍 LOCALE MAP
// ===============================
export const LOCALE_BY_LANGUAGE: Record<SupportedLanguage, string> = {
  en: "en-US",
  fr: "fr-FR",
  de: "de-DE",
  es: "es-ES",
  pt: "pt-BR",
};

// ===============================
// 💱 CURRENCY MAP
// ===============================
export const CURRENCY_BY_COUNTRY: Record<string, string> = {
  us: "USD", ca: "CAD", mx: "MXN", br: "BRL", ar: "ARS",
  co: "COP", cl: "CLP", pe: "PEN", ec: "USD",

  gb: "GBP", fr: "EUR", de: "EUR", es: "EUR", pt: "EUR",
  it: "EUR", nl: "EUR", ch: "CHF", at: "EUR",
  se: "SEK", no: "NOK", dk: "DKK", pl: "PLN",

  in: "INR", bd: "BDT", pk: "PKR", jp: "JPY", kr: "KRW",
  cn: "CNY", sg: "SGD", my: "MYR", ph: "PHP", id: "IDR",
  th: "THB", vn: "VND", ae: "AED", sa: "SAR", il: "ILS",
  tr: "TRY", hk: "HKD", tw: "TWD",

  au: "AUD", nz: "NZD",

  za: "ZAR", ng: "NGN", ke: "KES", eg: "EGP",
  ma: "MAD", dz: "DZD", tn: "TND",
};

// ===============================
// 🔒 SAFE HELPERS
// ===============================
function safeLocale(language: SupportedLanguage): string {
  return LOCALE_BY_LANGUAGE[language] || "en-US";
}

function safeCurrency(country: string): string {
  return CURRENCY_BY_COUNTRY[country.toLowerCase()] || "USD";
}

// ===============================
// 💰 FORMAT CURRENCY
// ===============================
export function formatCurrency(
  amount: number,
  country: string,
  language: SupportedLanguage = DEFAULT_LANGUAGE
): string {
  try {
    return new Intl.NumberFormat(safeLocale(language), {
      style: "currency",
      currency: safeCurrency(country),
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${safeCurrency(country)}`;
  }
}

// ===============================
// 🔢 FORMAT NUMBER
// ===============================
export function formatNumber(
  value: number,
  language: SupportedLanguage = DEFAULT_LANGUAGE,
  options?: Intl.NumberFormatOptions
): string {
  try {
    return new Intl.NumberFormat(safeLocale(language), options).format(value);
  } catch {
    return value.toString();
  }
}

// ===============================
// 📊 FORMAT PERCENTAGE
// ===============================
export function formatPercentage(
  value: number,
  language: SupportedLanguage = DEFAULT_LANGUAGE
): string {
  return formatNumber(value / 100, language, {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

// ===============================
// 📅 FORMAT DATE
// ===============================
export function formatDate(
  date: Date | number,
  language: SupportedLanguage = DEFAULT_LANGUAGE,
  options?: Intl.DateTimeFormatOptions
): string {
  try {
    return new Intl.DateTimeFormat(
      safeLocale(language),
      options || {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    ).format(date);
  } catch {
    return new Date(date).toLocaleDateString();
  }
}

// ===============================
// ⏰ FORMAT TIME
// ===============================
export function formatTime(
  date: Date | number,
  language: SupportedLanguage = DEFAULT_LANGUAGE
): string {
  try {
    return new Intl.DateTimeFormat(safeLocale(language), {
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  } catch {
    return new Date(date).toLocaleTimeString();
  }
}

// ===============================
// 🌐 TEXT DIRECTION
// ===============================
export function getTextDirection(
  lang: SupportedLanguage | string
): "ltr" | "rtl" {
  return isRtlLanguage(lang) ? "rtl" : "ltr";
}

// ===============================
// ✅ LANGUAGE VALIDATION
// ===============================
export function isLanguageSupported(lang: string): lang is SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
}

// ===============================
// 🌍 LOCALES LIST
// ===============================
export function getSupportedLocales(): string[] {
  return SUPPORTED_LANGUAGES.map(
    (lang) => LOCALE_BY_LANGUAGE[lang] || lang
  );
}

// ===============================
// 💱 GET CURRENCY
// ===============================
export function getCurrencyForCountry(country: string): string {
  return safeCurrency(country);
}

// ===============================
// 🌐 LOAD TRANSLATIONS (FIX)
// ===============================
export async function loadTranslations(
  language: SupportedLanguage,
  namespace: string
): Promise<Record<string, string>> {
  try {
    const messages = await import(
      `@/locales/${language}/${namespace}.json`
    );
    return messages.default || {};
  } catch {
    // fallback to English
    try {
      const fallback = await import(
        `@/locales/${DEFAULT_LANGUAGE}/${namespace}.json`
      );
      return fallback.default || {};
    } catch {
      return {};
    }
  }
}
