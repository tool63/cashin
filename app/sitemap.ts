// app/sitemap.ts
import type { MetadataRoute } from "next";
import { BASE_URL } from "@/components/SEO/seoConfig";
import { VALID_COUNTRY_CODES } from "@/app/core/detector";

/**
 * Static site routes
 */
const STATIC_ROUTES = ["", "/surveys", "/games", "/apps", "/faq"];

/**
 * Dynamic data sources
 * Replace with real DB/API in production
 */
async function getOffers() {
  return [
    { slug: "install-tiktok" },
    { slug: "play-coin-master" },
    { slug: "survey-rewards" },
  ];
}

async function getBlogPosts() {
  return [
    { slug: "how-to-earn-money-online" },
    { slug: "best-survey-sites" },
  ];
}

/**
 * Sitemap generator
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls: MetadataRoute.Sitemap = [];

  const offers = await getOffers();
  const blogs = await getBlogPosts();

  // ✅ Iterate all supported countries
  const countries = Array.from(VALID_COUNTRY_CODES);

  for (const country of countries) {
    // -----------------------------
    // Static pages
    // -----------------------------
    for (const route of STATIC_ROUTES) {
      urls.push({
        url: `${BASE_URL}/${country}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "daily" : "weekly",
        priority: route === "" ? 1 : 0.7,
      });
    }

    // -----------------------------
    // Dynamic offer pages
    // -----------------------------
    for (const offer of offers) {
      urls.push({
        url: `${BASE_URL}/${country}/offers/${offer.slug}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.85,
      });
    }

    // -----------------------------
    // Dynamic blog pages
    // -----------------------------
    for (const post of blogs) {
      urls.push({
        url: `${BASE_URL}/${country}/blog/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.75,
      });
    }
  }

  return urls;
}
