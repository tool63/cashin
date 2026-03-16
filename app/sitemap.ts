// app/sitemap.ts

import type { MetadataRoute } from "next";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";
import { COUNTRY_LANGUAGE_MAP } from "@/middleware"; // import your country map

/**
 * Get all country slugs dynamically from COUNTRY_LANGUAGE_MAP
 */
const COUNTRIES = Object.keys(COUNTRY_LANGUAGE_MAP);

/**
 * Static routes of the site
 */
const ROUTES = [
  "",
  "/offers",
  "/surveys",
  "/games",
  "/apps",
  "/blog",
  "/faq",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  for (const country of COUNTRIES) {
    for (const route of ROUTES) {
      urls.push({
        url: `${SEO_CONFIG.siteUrl}/${country}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "daily" : "weekly",
        priority: route === "" ? 1 : 0.7,
      });
    }
  }

  return urls;
}
