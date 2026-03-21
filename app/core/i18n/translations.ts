import { DEFAULT_LANGUAGE } from "@/app/core/constants";
import type { SupportedLanguage } from "@/app/core/types";

// ===============================
// 🌐 LOAD TRANSLATIONS
// ===============================
export async function loadTranslations(
  language: SupportedLanguage,
  namespace: string = "homepage"
): Promise<Record<string, string>> {
  try {
    const messages = await import(
      `@/app/locales/${language}/${namespace}.json`
    );
    return messages.default || {};
  } catch {
    if (language !== DEFAULT_LANGUAGE) {
      try {
        const fallback = await import(
          `@/app/locales/${DEFAULT_LANGUAGE}/${namespace}.json`
        );
        return fallback.default || {};
      } catch {
        return {};
      }
    }
    return {};
  }
}

// ===============================
// 🚀 SERVER HELPER
// ===============================
export async function getTranslations(
  language: SupportedLanguage,
  namespace: string = "homepage"
) {
  return loadTranslations(language, namespace);
}

// ===============================
// 🏷️ TYPES
// ===============================
export type TranslationValue = string | Record<string, any>;
export type TranslationObject = Record<string, TranslationValue>;

// ===============================
// 🔧 NESTED HELPER
// ===============================
export function getNestedTranslation(
  translations: TranslationObject,
  key: string
): string | null {
  const parts = key.split(".");
  let current: any = translations;

  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = current[part];
    } else {
      return null;
    }
  }

  return typeof current === "string" ? current : null;
}
