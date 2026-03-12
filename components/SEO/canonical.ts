// components/SEO/canonical.ts

import { SEO_CONFIG } from "./seoConfig";

export function buildCanonical(path: string, locale?: string) {
  const lang = locale ?? SEO_CONFIG.defaultLocale;

  return `${SEO_CONFIG.siteUrl}/${lang}${path}`;
}
