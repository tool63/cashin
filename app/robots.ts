// app/robots.ts
import { MetadataRoute } from "next";
import { BASE_URL, SEO_CONFIG } from "@/components/SEO/seoConfig";

/**
 * Configuration for robots
 */
const ALLOWED_PAGES = ["/", "/blog", "/faq", "/apps", "/games"];
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
 * Generates disallow rules dynamically for all crawlers
 */
function generateDisallowRules() {
  return DYNAMIC_DISALLOW_PREFIXES;
}

/**
 * Ultra-Premium Dynamic Robots.txt
 */
export default function robots(): MetadataRoute.Robots {
  const disallowRules = generateDisallowRules();

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
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
    comments: [
      `Generated dynamically by Cashog ultra-premium SEO system`,
      `Site: ${SEO_CONFIG.siteName}`,
      `Theme color: ${SEO_CONFIG.themeColor}`,
      `Default language: ${SEO_CONFIG.openGraph.locale}`,
      `Disallowed prefixes: ${DYNAMIC_DISALLOW_PREFIXES.join(", ")}`,
    ],
  };
}
