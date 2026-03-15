// hreflang.ts
import { countryHreflangMap, defaultLanguage, supportedLanguages } from "@/app/core/i18n/config";
import { SEO_CONFIG } from "./seoConfig";

/**
 * Build hreflang map for SEO
 * @param path Page path, e.g., "/offers"
 */
export function buildHreflang(path: string = ""): Record<string, string> {
  const map: Record<string, string> = {};

  Object.entries(countryHreflangMap).forEach(([country, hreflang]) => {
    const langCode = hreflang.split("-")[0].toLowerCase();
    // Only include supported 3 languages
    if (supportedLanguages.includes(langCode as typeof supportedLanguages[number])) {
      map[hreflang] = `${SEO_CONFIG.siteUrl}/${country.toLowerCase()}${path}`;
    }
  });

  // Ensure default language exists
  const defaultHreflang = `${defaultLanguage}-${defaultLanguage.toUpperCase()}`;
  if (!map[defaultHreflang]) {
    map[defaultHreflang] = `${SEO_CONFIG.siteUrl}/${defaultLanguage}`;
  }

  return map;
}
