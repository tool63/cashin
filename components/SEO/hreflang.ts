// hreflang.ts
import { countryHreflangMap, defaultLanguage } from "@/app/core/i18n/config";
import { SEO_CONFIG } from "./seoConfig";

export function buildHreflang(path: string = ""): Record<string, string> {
  const map: Record<string, string> = {};
  Object.entries(countryHreflangMap).forEach(([country, hreflang]) => {
    map[hreflang] = `${SEO_CONFIG.siteUrl}/${country.toLowerCase()}${path}`;
  });

  // Ensure default language
  const defaultKey = `${defaultLanguage}-${defaultLanguage.toUpperCase()}`;
  if (!map[defaultKey]) map[defaultKey] = `${SEO_CONFIG.siteUrl}/${defaultLanguage}`;

  return map;
}

// canonical.ts
export function buildCanonical(path: string = "", country?: string): string {
  const countryPath = country?.toLowerCase() || defaultLanguage;
  return `${SEO_CONFIG.siteUrl}/${countryPath}${path}`;
}
