// components/SEO/hreflang.ts

import { countryLangMap, supportedLanguages } from "@/app/core/i18n/config";
import { SEO_CONFIG } from "./seoConfig";

/**
 * Normalize path
 */
function normalizePath(path: string): string {
  if (!path || path === "/") return "";
  return path.startsWith("/") ? path : `/${path}`;
}

/**
 * Build hreflang map for SEO
 * Example output:
 * {
 *  "en-us": "https://site.com/us/offers",
 *  "en-uk": "https://site.com/uk/offers",
 *  "fr-fr": "https://site.com/fr/offers",
 *  "x-default": "https://site.com/us/offers"
 * }
 */
export function buildHreflang(path: string = ""): Record<string, string> {
  const map: Record<string, string> = {};
  const normalizedPath = normalizePath(path);

  Object.entries(countryLangMap).forEach(([country, lang]) => {
    const countryCode = country.toLowerCase();
    const langCode = lang.toLowerCase();

    if (
      supportedLanguages.includes(
        langCode as (typeof supportedLanguages)[number]
      )
    ) {
      const hreflang = `${langCode}-${countryCode}`;

      map[hreflang] =
        `${SEO_CONFIG.siteUrl}/${countryCode}` + normalizedPath;
    }
  });

  /**
   * Add x-default for Google
   */
  const defaultCountry = Object.keys(countryLangMap)[0];

  if (defaultCountry) {
    map["x-default"] =
      `${SEO_CONFIG.siteUrl}/${defaultCountry.toLowerCase()}` +
      normalizedPath;
  }

  return map;
}
