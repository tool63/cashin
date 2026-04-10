// ===============================
// app/robots.ts (Next.js App Router)
// ===============================
import type { MetadataRoute } from "next";

// ===============================
// 🌐 BASE URL
// ===============================
const BASE_URL = "https://cashog.com";

// ===============================
// 🧠 7-TIER COUNTRY SYSTEM (For reference only)
// ===============================
const HIGH_PRIORITY_COUNTRIES = ["us", "gb", "ca", "au"];
const MID_PRIORITY_COUNTRIES = ["de", "fr", "nl", "se", "ch", "no", "dk"];
const LOW_PRIORITY_COUNTRIES = [
  "it", "es", "fi", "ie", "at", "be", "br", "mx", "pl", "pt", 
  "tr", "ro", "in", "id", "ph", "vn", "th", "eg", "pk", "bd", 
  "ng", "ke", "za"
];

// ===============================
// 📊 SITEMAP URLS BY PRIORITY
// ===============================
function getSitemapUrls(): string[] {
  const sitemaps: string[] = [`${BASE_URL}/sitemap.xml`];
  
  // Add country-specific sitemaps for high priority countries only
  for (const country of HIGH_PRIORITY_COUNTRIES) {
    sitemaps.push(`${BASE_URL}/${country}/sitemap.xml`);
  }
  
  return sitemaps;
}

// ===============================
// 🤖 ROBOTS.TXT CONFIG
// ===============================
export function generateRobots(): MetadataRoute.Robots {
  return {
    rules: [
      // ====================
      // 🌍 ALL BOTS (GLOBAL)
      // ====================
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
          "/*.json$",
          "/*.map$",
        ],
      },

      // ====================
      // 🤖 GOOGLE (Primary)
      // ====================
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

      // ====================
      // 🔵 BING (Secondary)
      // ====================
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

      // ====================
      // 🤖 AI / RESEARCH BOTS
      // ====================
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/dashboard/",
          "/private/",
          "/internal/",
        ],
      },
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: [
          "/admin/",
          "/private/",
          "/dashboard/",
        ],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/dashboard/",
          "/private/",
        ],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/dashboard/",
          "/private/",
        ],
      },

      // ====================
      // 🚫 BLOCK SCRAPER / MALICIOUS BOTS
      // ====================
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
          "Baiduspider",
          "SeznamBot",
          "PetalBot",
          "AspiegelBot",
          "MegaIndex",
          "ZoominfoBot",
          "Mail.RU_Bot",
        ],
        disallow: "/",
      },

      // ====================
      // ⚡ LEGACY / LESS IMPORTANT
      // ====================
      {
        userAgent: "DuckDuckBot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/dashboard/"],
        crawlDelay: 3,
      },
      {
        userAgent: "Applebot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
        crawlDelay: 2,
      },
    ],
    sitemap: getSitemapUrls(),
  };
}

// ===============================
// 📊 DEBUG / STATS (FIXED TYPE ERROR)
// ===============================
export function getRobotsStats() {
  const config = generateRobots();
  
  // ✅ Fix: Type guard to check if rules is an array
  const rulesArray = Array.isArray(config.rules) ? config.rules : [config.rules];
  
  return {
    totalRules: rulesArray.length,
    totalSitemaps: config.sitemap?.length || 0,
    blockedBots: rulesArray.some(r => 
      r.userAgent && (
        (Array.isArray(r.userAgent) && r.userAgent.includes("AhrefsBot")) ||
        r.userAgent === "AhrefsBot"
      )
    ),
    hasGlobalRule: rulesArray.some(r => r.userAgent === "*"),
    sitemapUrls: config.sitemap,
  };
}

// ===============================
// 🔥 ALIAS LAYER
// ===============================
export const getRobots = generateRobots;
export const buildRobots = generateRobots;
export const createRobots = generateRobots;
export const resolveRobots = generateRobots;
export const generateRobotsConfig = generateRobots;

// ===============================
// 📤 DEFAULT EXPORT
// ===============================
export default generateRobots;
