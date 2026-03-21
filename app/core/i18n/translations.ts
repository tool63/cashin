import { DEFAULT_LANGUAGE } from "@/app/core/constants";
import type { SupportedLanguage } from "@/app/core/types";

const cache = new Map<string, Record<string, string>>();

export async function loadTranslations(
  language: SupportedLanguage,
  namespace: string = "homepage"
): Promise<Record<string, string>> {
  const key = `${language}:${namespace}`;

  if (cache.has(key)) return cache.get(key)!;

  try {
    const messages = await import(
      `@/app/locales/${language}/${namespace}.json`
    );

    const data = messages.default || {};
    cache.set(key, data);
    return data;
  } catch {
    if (language !== DEFAULT_LANGUAGE) {
      return loadTranslations(DEFAULT_LANGUAGE, namespace);
    }
    return {};
  }
}

export async function getTranslations(
  language: SupportedLanguage,
  namespace: string = "homepage"
) {
  return loadTranslations(language, namespace);
}

export type TranslationValue = string | Record<string, any>;
export type TranslationObject = Record<string, TranslationValue>;

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
