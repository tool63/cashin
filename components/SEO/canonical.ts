// canonical.ts
import { defaultLanguage, supportedLanguages } from "@/app/core/i18n/config";
import { SEO_CONFIG } from "./seoConfig";

/**
 * Build canonical URL
 * @param path Page path, e.g., "/offers"
 * @param country Country code, e.g., "US"
 */
export function buildCanonical(path: string = "", country?: string): string {
  // Normalize country to lowercase, fallback to default language if not supported
  const countryCode = country?.toUpperCase();
  const isSupported = countryCode && supportedLanguages.includes(countryCode.toLowerCase() as typeof supportedLanguages[number]);
  const countryPath = isSupported ? countryCode.toLowerCase() : defaultLanguage;

  return `${SEO_CONFIG.siteUrl}/${countryPath}${path}`;
}
