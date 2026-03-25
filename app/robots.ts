import type { MetadataRoute } from "next";
import { DEFAULT_COUNTRY } from "@/app/core/constants";

// ===============================
// 🌐 BASE URL
// ===============================
const BASE_URL = "https://cashog.com";

// ===============================
// 🚀 ROBOTS CONFIG (ENTERPRISE)
// ===============================
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ===============================
      // 🌍 GLOBAL RULES (PRIMARY BOT ACCESS)
      // ===============================
      {
        userAgent: "*",
        allow: "/",

        // Protect sensitive / system paths
        disallow: [
          "/api/",
          "/admin/",
          "/dashboard/",
          "/private/",
          "/internal/",
          "/_next/",
          "/static/",
          "/tmp/",
          "/logs/",
        ],
      },

      // ===============================
      // 🤖 GOOGLEBOT (HIGH PRIORITY INDEXING)
      // ===============================
      {
        userAgent: "Googlebot",
        allow: "/",

        // Ensure faster crawling for revenue pages
        disallow: [
          "/api/",
          "/admin/",
          "/dashboard/",
        ],
      },

      // ===============================
      // 🧠 AI CRAWLERS / SCRAPERS (CONTROLLED ACCESS)
      // ===============================
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/dashboard/",
        ],
      },

      {
        userAgent: "CCBot",
        allow: "/",
      },

      // ===============================
      // 🚫 BAD BOTS / SCRAPERS
      // ===============================
      {
        userAgent: [
          "AhrefsBot",
          "SemrushBot",
          "MJ12bot",
          "DotBot",
        ],
        disallow: "/",
      },
    ],

    // ===============================
    // 🗺 SITEMAP INDEXING
    // ===============================
    sitemap: [
      `${BASE_URL}/sitemap.xml`,

      // Optional future scaling (recommended for large sites)
      // `${BASE_URL}/sitemap-1.xml`,
      // `${BASE_URL}/sitemap-2.xml`,
    ],

    // ===============================
    // 🌍 HOST DIRECTIVE (CANONICAL DOMAIN)
    // ===============================
    host: BASE_URL,
  };
}
