import { DEFAULT_LANGUAGE } from "../constants";
import type { SupportedLanguage } from "../types";

export interface Translations {
  homepage: Record<string, string>;
  footer: Record<string, string>;
  header: Record<string, string>;
  [key: string]: Record<string, string>;
}

// Cache translations to avoid reloading
const translationCache = new Map<string, Translations>();

/**
 * Load translations for a specific namespace
 */
export async function loadTranslationsByNamespace(
  language: SupportedLanguage,
  namespace: string
): Promise<Record<string, string>> {
  try {
    // Dynamic import based on language and namespace
    const module = await import(
      `@/app/locales/${language}/${namespace}.json`
    );
    return module.default || {};
  } catch (error) {
    // Namespace doesn't exist for this language
    console.warn(`Namespace "${namespace}" not found for language "${language}"`);
    
    // Fallback to default language if available and not already default
    if (language !== DEFAULT_LANGUAGE) {
      try {
        const fallbackModule = await import(
          `@/app/locales/${DEFAULT_LANGUAGE}/${namespace}.json`
        );
        return fallbackModule.default || {};
      } catch (fallbackError) {
        console.warn(`Fallback namespace "${namespace}" not found for default language`);
        return {};
      }
    }
    
    return {};
  }
}

/**
 * Load all translations for a language
 */
export async function loadAllTranslations(
  language: SupportedLanguage
): Promise<Translations> {
  const cacheKey = language;
  
  // Check cache first
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }
  
  // List of all namespaces to load
  const namespaces = ["homepage", "footer", "header"];
  
  try {
    // Load all namespaces in parallel
    const translationsArray = await Promise.all(
      namespaces.map(namespace => loadTranslationsByNamespace(language, namespace))
    );
    
    // Combine into single object
    const translations = namespaces.reduce((acc, namespace, index) => {
      acc[namespace] = translationsArray[index];
      return acc;
    }, {} as Translations);
    
    // Cache the result
    translationCache.set(cacheKey, translations);
    
    return translations;
  } catch (error) {
    console.error(`Failed to load translations for ${language}:`, error);
    
    // Return empty translations as fallback
    const emptyTranslations: Translations = {
      homepage: {},
      footer: {},
      header: {},
    };
    
    // Cache empty result to prevent repeated failing requests
    translationCache.set(cacheKey, emptyTranslations);
    
    return emptyTranslations;
  }
}

/**
 * Clear translation cache (useful for development)
 */
export function clearTranslationCache(): void {
  translationCache.clear();
}

/**
 * Preload translations for a language
 */
export async function preloadTranslations(
  language: SupportedLanguage
): Promise<void> {
  if (!translationCache.has(language)) {
    await loadAllTranslations(language);
  }
}

/**
 * Check if a translation key exists
 */
export function hasTranslation(
  translations: Translations,
  namespace: string,
  key: string
): boolean {
  const namespaceTranslations = translations[namespace];
  return !!(namespaceTranslations && key in namespaceTranslations);
}
