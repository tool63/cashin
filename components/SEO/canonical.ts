// components/SEO/canonical.ts
import { SEO_CONFIG } from "./seoConfig";
import { countryHreflangMap, defaultLanguage } from "@/app/core/i18n/config";

/**
 * Build canonical URL for a given path and optional country/language
 * If locale/country is not provided, uses defaultLanguage
 */
export function buildCanonical(path: string = "", countryCode?: string): string {
  let countryPath = countryCode?.toLowerCase() || defaultLanguage;

  // Validate country exists in config
  if (!countryCode || !countryHreflangMap[countryCode.toUpperCase()]) {
    countryPath = defaultLanguage;
  }

  return `${SEO_CONFIG.siteUrl}/${countryPath}${path}`;
}
