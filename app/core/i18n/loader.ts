import { DEFAULT_LANGUAGE } from "../constants";
import type { SupportedLanguage } from "../types";

// ===============================
// 🌐 TYPES (COMPATIBLE)
// ===============================
export interface Translations {
  homepage: Record<string, string>;
  footer: Record<string, string>;
  header: Record<string, string>;
  [key: string]: Record<string, string>;
}

// ===============================
// 📦 CACHE
// ===============================
const translationCache = new Map<string, Translations>();

// ===============================
// 🔥 SAFE DYNAMIC IMPORT
// ===============================
async function safeImport(
  language: SupportedLanguage,
  namespace: string
): Promise<Record<string, string>> {
  try {
    const mod = await import(
      `@/app/locales/${language}/${namespace}.json`
    );
    return mod.default || {};
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
// 🧠 AUTO NAMESPACE DISCOVERY
// ===============================
/**
 * ⚠️ Trick:
 * Instead of scanning folder (not allowed),
 * we define a "base set" and allow dynamic extension
 */
const BASE_NAMESPACES = ["homepage", "footer", "header"];

/**
 * Extract namespace from translation access (future-proof)
 */
function mergeTranslations(
  base: Translations,
  incoming: Record<string, Record<string, string>>
): Translations {
  return {
    ...base,
    ...incoming,
  };
}

// ===============================
// 🚀 MAIN LOADER
// ===============================
export async function loadAllTranslations(
  language: SupportedLanguage
): Promise<Translations> {
  const cacheKey = language;

  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  const translations: Translations = {
    homepage: {},
    footer: {},
    header: {},
  };

  // ===============================
  // 🔥 LOAD BASE (FAST PATH)
  // ===============================
  await Promise.all(
    BASE_NAMESPACES.map(async (ns) => {
      translations[ns] = await safeImport(language, ns);
    })
  );

  // ===============================
  // 🚀 OPTIONAL AUTO-EXTENSION
  // ===============================
  /**
   * Try loading extra namespaces dynamically
   * (you don't need to register them anywhere)
   */
  const dynamicNamespaces = [
    "dashboard",
    "profile",
    "settings",
    "auth",
    "common",
  ];

  const dynamicResults: Record<string, Record<string, string>> = {};

  await Promise.all(
    dynamicNamespaces.map(async (ns) => {
      const data = await safeImport(language, ns);

      // Only attach if file exists (non-empty)
      if (Object.keys(data).length > 0) {
        dynamicResults[ns] = data;
      }
    })
  );

  const finalTranslations = mergeTranslations(
    translations,
    dynamicResults
  );

  // ===============================
  // 📦 CACHE
  // ===============================
  translationCache.set(cacheKey, finalTranslations);

  return finalTranslations;
}

// ===============================
// 🧹 CACHE CONTROL
// ===============================
export function clearTranslationCache(): void {
  translationCache.clear();
}

// ===============================
// ⚡ PRELOAD
// ===============================
export async function preloadTranslations(
  language: SupportedLanguage
): Promise<void> {
  if (!translationCache.has(language)) {
    await loadAllTranslations(language);
  }
}

// ===============================
// 🔍 CHECK KEY
// ===============================
export function hasTranslation(
  translations: Translations,
  namespace: string,
  key: string
): boolean {
  return !!translations[namespace]?.[key];
}
