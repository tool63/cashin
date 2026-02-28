import { MetadataRoute } from "next";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";

// Example dynamic pages (replace with real data later)
const dynamicPages = [
  "/earn",
  "/guides",
  "/rewards",
  "/cashback",
  "/affiliate",
  "/blog",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Home
    {
      url: SEO_CONFIG.siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },

    // Dynamic pages
    ...dynamicPages.map((path) => ({
      url: `${SEO_CONFIG.siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    })),
  ];
}
