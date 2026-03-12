// components/SEO/hreflang.ts

import { supportedLanguages } from "@/app/core/i18n/config";
import { SEO_CONFIG } from "./seoConfig";

export function buildHreflang(path: string) {
  const map: Record<string, string> = {};

  for (const lang of supportedLanguages) {
    map[lang] = `${SEO_CONFIG.siteUrl}/${lang}${path}`;
  }

  return map;
}
