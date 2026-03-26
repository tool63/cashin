import type { MetadataRoute } from "next";

// ===============================
// 🌐 BASE URL (PRIMARY DOMAIN)
// ===============================
const BASE_URL = "https://cashog.com";

// ===============================
// 🧠 7-TIER COUNTRY SYSTEM
// ===============================
const HIGH_PRIORITY_COUNTRIES = ["us", "gb", "ca", "au"];
const MID_PRIORITY_COUNTRIES = ["de", "fr", "nl", "se", "ch", "no", "dk"];
const LOW_PRIORITY_COUNTRIES = [
  "it","es","fi","ie","at","be","br","mx","pl","pt","tr","ro","in","id","ph","vn","th","eg","pk","bd","ng","ke","za"
];

// ===============================
// 🌎 GET CRAWL DELAY BASED ON COUNTRY
// ===============================
function getCrawlDelay(country?: string): number {
  if (!country) return 1; // Default global daily
  const c = country.toLowerCase();
  if (HIGH_PRIORITY_COUNTRIES.includes(c)) return 1; // Daily
  if (MID_PRIORITY_COUNTRIES.includes(c)) return 3;  // Weekly
  return 7; // Monthly / low priority
}

// ===============================
// 🧠 ROBOTS.TXT CONFIG GENERATOR
// ===============================
export function generateRobots(): MetadataRoute.Robots {
  const rules: MetadataRoute.RobotsRule[] = [
    // ===============================
    // 🌍 GLOBAL ACCESS (ALL BOTS)
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
    // 🤖 GOOGLEBOT / BINGBOT
    // ===============================
    {
      userAgent: "Googlebot",
      allow: "/",
      disallow: ["/api/", "/admin/", "/dashboard/", "/private/"],
      crawlDelay: 1,
    },
    {
      userAgent: "Bingbot",
      allow: "/",
      disallow: ["/api/", "/admin/", "/dashboard/", "/private/"],
      crawlDelay: 2,
    },

    // ===============================
    // 🧠 AI / RESEARCH BOTS
    // ===============================
    {
      userAgent: "GPTBot",
      allow: "/",
      disallow: ["/api/", "/admin/", "/dashboard/", "/private/"],
    },
    {
      userAgent: "CCBot",
      allow: "/",
      disallow: ["/admin/", "/private/"],
    },

    // ===============================
    // 🚫 BLOCK SCRAPER / MALICIOUS BOTS
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
  ];

  // ===============================
  // 🌎 COUNTRY-SPECIFIC RULES
  // ===============================
  [...HIGH_PRIORITY_COUNTRIES, ...MID_PRIORITY_COUNTRIES, ...LOW_PRIORITY_COUNTRIES].forEach(
    (country) => {
      rules.push({
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/dashboard/", "/private/"],
        crawlDelay: getCrawlDelay(country),
      });
    }
  );

  return {
    rules,
    sitemap: [`${BASE_URL}/sitemap.xml`],
    host: BASE_URL,
  };
}

// ===============================
// 🔥 ALIAS LAYER (ENTERPRISE READY)
// ===============================
export const getRobots = generateRobots;
export const buildRobots = generateRobots;
export const createRobots = generateRobots;
export const resolveRobots = generateRobots;
export const generateRobotsConfig = generateRobots;

export default generateRobots;
