// app/sitemap.ts

import type { MetadataRoute } from "next";
import { supportedLanguages } from "@/app/core/i18n/config";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [""];

  const urls: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const lang of supportedLanguages) {
      urls.push({
        url: `${SEO_CONFIG.siteUrl}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: route === "" ? 1 : 0.7,
      });
    }
  }

  return urls;
}
