import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "@/app/core/constants";
import type { SupportedLanguage } from "@/app/core/types";

export const RTL_LANGUAGES = new Set<string>(["ar", "he", "ur", "fa"]);

export function isRtlLanguage(lang: SupportedLanguage | string): boolean {
  return RTL_LANGUAGES.has(lang.toLowerCase());
}

export const LOCALE_BY_LANGUAGE: Record<SupportedLanguage, string> = {
  en: "en-US",
  fr: "fr-FR",
  de: "de-DE",
  es: "es-ES",
  pt: "pt-BR",
};

function safeLocale(language: SupportedLanguage): string {
  return LOCALE_BY_LANGUAGE[language] || "en-US";
}

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

export function formatDate(
  date: Date | number,
  language: SupportedLanguage = DEFAULT_LANGUAGE
): string {
  try {
    return new Intl.DateTimeFormat(safeLocale(language), {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch {
    return new Date(date).toLocaleDateString();
  }
}

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

export function getTextDirection(
  lang: SupportedLanguage | string
): "ltr" | "rtl" {
  return isRtlLanguage(lang) ? "rtl" : "ltr";
}

export function isLanguageSupported(lang: string): lang is SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
}

export function getSupportedLocales(): string[] {
  return SUPPORTED_LANGUAGES.map(
    (lang) => LOCALE_BY_LANGUAGE[lang] || lang
  );
}
