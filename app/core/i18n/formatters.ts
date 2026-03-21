import {
  SupportedLanguage,
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
} from "@/app/core/types";

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
// 🔒 SAFE LOCALE
// ===============================
function safeLocale(language: SupportedLanguage): string {
  return LOCALE_BY_LANGUAGE[language] || "en-US";
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
