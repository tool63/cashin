// app/sitemap.ts
import type { MetadataRoute } from "next";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";

/**
 * Supported country routes
 */
const COUNTRIES = ["us", "uk", "ca", "au", "in", "fr", "de"];

/**
 * Static routes of the site
 */
const STATIC_ROUTES = ["", "/surveys", "/games", "/apps", "/faq"];

/**
 * Dynamic data sources (replace with DB/API in production)
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
 * Sitemap generation
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls: MetadataRoute.Sitemap = [];

  const offers = await getOffers();
  const blogs = await getBlogPosts();

  for (const country of COUNTRIES) {
    // Static pages
    for (const route of STATIC_ROUTES) {
      urls.push({
        url: `${SEO_CONFIG.siteUrl}/${country}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "daily" : "weekly",
        priority: route === "" ? 1 : 0.7,
      });
    }

    // Dynamic offers
    for (const offer of offers) {
      urls.push({
        url: `${SEO_CONFIG.siteUrl}/${country}/offers/${offer.slug}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      });
    }

    // Dynamic blog posts
    for (const post of blogs) {
      urls.push({
        url: `${SEO_CONFIG.siteUrl}/${country}/blog/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  return urls;
}
