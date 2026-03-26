import type { MetadataRoute } from "next";
import { DEFAULT_COUNTRY } from "@/app/core/constants";

// ===============================
// 🌐 BASE URL (PRIMARY DOMAIN)
// ===============================
const BASE_URL = "https://cashog.com";

// ===============================
// 🧠 ENTERPRISE ROBOTS CONFIG ENGINE
// ===============================
export function generateRobots(): MetadataRoute.Robots {
  return {
    rules: [
      // ===============================
      // 🌍 GLOBAL ACCESS (PRIMARY BOT CONTROL)
      // ===============================
      {
        userAgent: "*",
        allow: "/",
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
      // 🤖 GOOGLEBOT / BINGBOT (HIGH PRIORITY INDEXING)
      // ===============================
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/dashboard/",
          "/private/",
        ],
        crawlDelay: 1,
      },

      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/dashboard/",
          "/private/",
        ],
        crawlDelay: 2,
      },

      // ===============================
      // 🧠 AI CRAWLERS / RESEARCH BOTS
      // ===============================
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/dashboard/",
          "/private/",
        ],
      },

      {
        userAgent: "CCBot",
        allow: "/",
        disallow: ["/admin/", "/private/"],
      },

      // ===============================
      // 🚫 MALICIOUS / SCRAPER BOTS BLOCK
      // ===============================
      {
        userAgent: [
          "AhrefsBot",
          "SemrushBot",
          "MJ12bot",
          "DotBot",
          "BLEXBot",
          "Cliqzbot",
          "Sogou",
          "YandexBot",
          "ia_archiver",
        ],
        disallow: "/",
      },
    ],

    // ===============================
    // 🗺 SITEMAP INDEX (ELITE ENTERPRISE READY)
    // ===============================
    sitemap: [
      `${BASE_URL}/sitemap.xml`,

      // Optional future scaling for large networks
      // `${BASE_URL}/sitemap-1.xml`,
      // `${BASE_URL}/sitemap-2.xml`,
    ],

    // ===============================
    // 🌍 HOST / CANONICAL DOMAIN
    // ===============================
    host: BASE_URL,
  };
}

// ===============================
// 🔥 ALIAS LAYER (ENTERPRISE / FUTURE PROOF)
// ===============================
export const getRobots = generateRobots;
export const buildRobots = generateRobots;
export const createRobots = generateRobots;
export const resolveRobots = generateRobots;
export const generateRobotsConfig = generateRobots;

export default generateRobots;
