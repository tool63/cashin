// app/core/i18n/loader.ts

import { DEFAULT_LANGUAGE } from "../constants";
import type { SupportedLanguage } from "../types";

export interface Translations {
  [key: string]: Record<string, string>;
}

// Cache translations
const translationCache = new Map<string, Translations>();

/**
 * Load all translations for a language
 * Auto-detect namespaces from EN folder
 */
export async function loadAllTranslations(
  language: SupportedLanguage
): Promise<Translations> {
  const cacheKey = language;

  // ✅ Cache check
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  const translations: Translations = {};

  try {
    // 🔥 Load ALL English namespace modules (source of truth)
    const enModules = import.meta.glob(
      "@/app/locales/en/*.json",
      { eager: true }
    ) as Record<string, { default: Record<string, string> }>;

    // ✅ Loop through all detected namespaces
    await Promise.all(
      Object.entries(enModules).map(async ([path, module]) => {
        const namespace = path.split("/").pop()?.replace(".json", "");

        if (!namespace) return;

        // ✅ If language is EN → use directly
        if (language === DEFAULT_LANGUAGE) {
          translations[namespace] = module.default || {};
          return;
        }

        try {
          // 👉 Try loading target language
          const langModule = await import(
            `@/app/locales/${language}/${namespace}.json`
          );

          translations[namespace] = langModule.default || {};
        } catch {
          // 👉 Fallback to EN (already loaded)
          translations[namespace] = module.default || {};
        }
      })
    );

    // ✅ Cache result
    translationCache.set(cacheKey, translations);

    return translations;
  } catch (error) {
    console.error(`Failed to load translations for ${language}:`, error);

    // 🔥 Safe fallback to English
    if (language !== DEFAULT_LANGUAGE) {
      return loadAllTranslations(DEFAULT_LANGUAGE);
    }

    const emptyTranslations: Translations = {};
    translationCache.set(cacheKey, emptyTranslations);

    return emptyTranslations;
  }
}

/**
 * Clear translation cache
 */
export function clearTranslationCache(): void {
  translationCache.clear();
}

/**
 * Preload translations
 */
export async function preloadTranslations(
  language: SupportedLanguage
): Promise<void> {
  if (!translationCache.has(language)) {
    await loadAllTranslations(language);
  }
}

/**
 * Check if translation exists
 */
export function hasTranslation(
  translations: Translations,
  namespace: string,
  key: string
): boolean {
  const namespaceTranslations = translations[namespace];
  return !!(namespaceTranslations && key in namespaceTranslations);
}
