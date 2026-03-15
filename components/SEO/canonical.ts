// components/SEO/canonical.ts

import { SEO_CONFIG } from "./seoConfig";

/**
 * Build canonical URL
 * @param path Page path (example: "/offers")
 * @param country Country slug (example: "us")
 */
export function buildCanonical(path: string = "", country: string = "us"): string {
  const countrySlug = country.toLowerCase();

  const normalizedPath =
    path && path !== "/" ? path : "";

  return `${SEO_CONFIG.siteUrl}/${countrySlug}${normalizedPath}`;
}
