// components/SEO/canonical.ts

import { SEO_CONFIG } from "./seoConfig";

/**
 * Normalize path
 */
function normalizePath(path: string): string {
  if (!path || path === "/") return "";
  return path.startsWith("/") ? path : `/${path}`;
}

/**
 * Build canonical URL
 * Example output:
 * https://cashog.com/us/offers
 */
export function buildCanonical(
  path: string = "",
  country: string = "us"
): string {
  const countrySlug = country.toLowerCase();
  const normalizedPath = normalizePath(path);

  return `${SEO_CONFIG.siteUrl}/${countrySlug}${normalizedPath}`;
}
