import { DEFAULT_LANGUAGE } from "../constants";
import type { SupportedLanguage } from "../types";

// ===============================
// 🌐 TYPES
// ===============================
export interface Translations {
  homepage: Record<string, string>;
  footer: Record<string, string>;
  header: Record<string, string>;
  primarycta: Record<string, string>; // ✅ NEW
  [key: string]: Record<string, string>;
}

// ===============================
// 📦 CACHE
// ===============================
const translationCache = new Map<string, Translations>();

// ===============================
// 🔥 SAFE IMPORT
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
    // fallback to default language
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
// 🚀 MAIN LOADER
// ===============================
export async function loadAllTranslations(
  language: SupportedLanguage
): Promise<Translations> {
  const cacheKey = language;

  // ✅ CACHE CHECK
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  // ===============================
  // 🌐 BASE NAMESPACES (IMPORTANT)
  // ===============================
  const namespaces = [
    "homepage",
    "footer",
    "header",
    "primarycta", // ✅ ADDED HERE
  ];

  const translations: Translations = {
    homepage: {},
    footer: {},
    header: {},
    primarycta: {}, // ✅ ADDED HERE
  };

  // ===============================
  // ⚡ LOAD ALL IN PARALLEL
  // ===============================
  await Promise.all(
    namespaces.map(async (ns) => {
      translations[ns] = await safeImport(language, ns);
    })
  );

  // ===============================
  // 📦 CACHE RESULT
  // ===============================
  translationCache.set(cacheKey, translations);

  return translations;
}

// ===============================
// 🧹 CLEAR CACHE
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
// 🔍 CHECK TRANSLATION KEY
// ===============================
export function hasTranslation(
  translations: Translations,
  namespace: string,
  key: string
): boolean {
  return !!translations[namespace]?.[key];
}
