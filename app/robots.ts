import { MetadataRoute } from "next";
import { BASE_URL, SEO_CONFIG } from "@/components/SEO/seoConfig";
import { VALID_COUNTRY_CODES, DEFAULT_COUNTRY } from "@/app/core/detector";

/**
 * Allowed pages for crawlers
 */
const ALLOWED_PAGES = [
  "/", 
  "/blog", 
  "/faq", 
  "/apps", 
  "/games"
];

/**
 * Dynamic disallow rules for sensitive or user-specific pages
 */
const DYNAMIC_DISALLOW_PREFIXES = [
  "/offers",
  "/survey",
  "/reward-campaigns",
  "/user",
  "/account",
  "/login",
  "/register",
  "/checkout",
];

/**
 * Generates disallow rules dynamically (can be extended per country)
 */
function generateDisallowRules(): string[] {
  return DYNAMIC_DISALLOW_PREFIXES;
}

/**
 * Generate sitemap URLs for all supported countries
 */
function generateSitemapUrls(): string[] {
  return Array.from(VALID_COUNTRY_CODES).map(
    (country) => `${BASE_URL}/${country}/sitemap.xml`
  );
}

/**
 * Ultra-Premium Dynamic Robots.txt
 */
export default function robots(): MetadataRoute.Robots {
  const disallowRules = generateDisallowRules();
  const sitemapUrls = generateSitemapUrls();

  return {
    rules: [
      // Generic rule for all crawlers
      {
        userAgent: "*",
        allow: ALLOWED_PAGES,
        disallow: disallowRules,
      },

      // Googlebot-specific
      {
        userAgent: "Googlebot",
        allow: ALLOWED_PAGES,
        disallow: disallowRules,
      },

      // Bingbot-specific
      {
        userAgent: "Bingbot",
        allow: ALLOWED_PAGES,
        disallow: disallowRules,
      },
    ],

    // Multi-country sitemaps
    sitemap: sitemapUrls.length ? sitemapUrls : [`${BASE_URL}/sitemap.xml`],

    // Host (default country)
    host: `${BASE_URL}/${DEFAULT_COUNTRY}`,

    // ✅ Developer notes (not part of actual robots file)
    // Generated dynamically by Cashog ultra-premium SEO system
    // Theme color: ${SEO_CONFIG.themeColor}
    // Default language: ${SEO_CONFIG.openGraph.locale}
    // Disallowed prefixes: ${DYNAMIC_DISALLOW_PREFIXES.join(", ")}
  };
}
