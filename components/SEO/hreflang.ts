// components/SEO/hreflang.ts
import { supportedLanguages, countryHreflangMap, defaultLanguage } from "@/app/core/i18n/config";
import { SEO_CONFIG } from "./seoConfig";

/**
 * Build hreflang mapping for a given path
 * Returns object suitable for Next.js Metadata alternates.languages
 *
 * Example output:
 * {
 *   "en-US": "https://cashog.com/us",
 *   "fr-FR": "https://cashog.com/fr",
 * }
 */
export function buildHreflang(path: string = ""): Record<string, string> {
  const hreflangMap: Record<string, string> = {};

  // Loop through all supported countries/languages
  Object.entries(countryHreflangMap).forEach(([countryCode, hreflang]) => {
    const urlPath = `/${countryCode.toLowerCase()}${path}`;
    hreflangMap[hreflang] = `${SEO_CONFIG.siteUrl}${urlPath}`;
  });

  // Fallback: ensure default language is present
  if (!hreflangMap[`${defaultLanguage}-${defaultLanguage.toUpperCase()}`]) {
    hreflangMap[`${defaultLanguage}-${defaultLanguage.toUpperCase()}`] = `${SEO_CONFIG.siteUrl}/${defaultLanguage}`;
  }

  return hreflangMap;
}
