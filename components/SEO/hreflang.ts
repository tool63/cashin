// components/SEO/hreflang.ts

import { countryLangMap, supportedLanguages } from "@/app/core/i18n/config";
import { SEO_CONFIG } from "./seoConfig";

/**
 * Build hreflang map for SEO
 * @param path Page path, e.g. "/offers"
 */
export function buildHreflang(path: string = ""): Record<string, string> {
  const map: Record<string, string> = {};

  Object.entries(countryLangMap).forEach(([country, lang]) => {
    const langCode = lang.toLowerCase();

    // Only include supported languages
    if (supportedLanguages.includes(langCode as typeof supportedLanguages[number])) {
      const hreflang = `${langCode}-${country}`;

      map[hreflang] =
        `${SEO_CONFIG.siteUrl}/${country.toLowerCase()}` +
        (path !== "/" ? path : "");
    }
  });

  return map;
}
