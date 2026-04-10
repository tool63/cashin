import type { MetadataRoute } from "next";
import { ISO_COUNTRIES, getTierNumber } from "@/app/core/countries";

// ===============================
// 🌐 GLOBAL CONFIG
// ===============================
const BASE_URL = "https://cashog.com";

// ===============================
// 🧠 TIER SYSTEM (Using core getTierNumber)
// ===============================
function getTier(country: string): number {
  return getTierNumber(country);
}

// ===============================
// 📦 PAGE STRUCTURE
// ===============================
const CORE_PAGES = [
  "",
  "/earn",
  "/make-money",
  "/rewards",
  "/shopping-rewards",
  "/affiliate",
  "/partners",
  "/advertise",
  "/how-it-works",
  "/start-earning",
  "/cashout",
];

const EARN_PAGES = [
  "/surveys",
  "/app-installs",
  "/play-games",
  "/watch-videos",
  "/mining-rewards",
  "/complete-offers",
  "/cashback",
  "/offerwall",
  "/surveywall",
  "/watch-ads",
  "/micro-tasks",
];

const SHOPPING_PAGES = [
  "/shopping-rewards/electronics",
  "/shopping-rewards/fashion",
  "/shopping-rewards/home-garden",
  "/shopping-rewards/grocery",
  "/shopping-rewards/beauty",
  "/shopping-rewards/mobile",
  "/shopping-rewards/travel",
  "/shopping-rewards/travel/hotels",
  "/shopping-rewards/travel/flights",
];

const CONTENT_PAGES = ["/blog", "/guides", "/compare"];

const ALL_PAGES = Array.from(
  new Set([...CORE_PAGES, ...EARN_PAGES, ...SHOPPING_PAGES, ...CONTENT_PAGES])
);

// ===============================
// 🔧 HELPERS
// ===============================
function normalizePath(path: string) {
  if (!path || path === "") return "/";
  let clean = path.startsWith("/") ? path : `/${path}`;
  clean = clean.split("?")[0].split("#")[0];
  clean = clean.replace(/\/+/g, "/");
  if (clean.length > 1 && clean.endsWith("/")) clean = clean.slice(0, -1);
  return clean;
}

function normalizeCountry(country?: string): string | undefined {
  if (!country) return undefined;
  const clean = country.toLowerCase().trim();
  return /^[a-z]{2}$/.test(clean) ? clean : undefined;
}

function buildUrl(path: string, country?: string) {
  const clean = normalizePath(path);
  const cleanCountry = normalizeCountry(country);

  if (cleanCountry) return `${BASE_URL}/${cleanCountry}${clean}`;
  return `${BASE_URL}${clean}`;
}

// ===============================
// 📊 PRIORITY ENGINE
// ===============================
function getPageWeight(path: string): number {
  const clean = normalizePath(path);
  if (clean === "/") return 1;
  if (["/earn","/make-money","/rewards","/affiliate"].includes(clean)) return 0.98;
  if (EARN_PAGES.includes(clean)) return 0.95;
  if (clean.includes("shopping")) return 0.9;
  if (clean.includes("blog") || clean.includes("guides") || clean.includes("compare")) return 0.85;
  return 0.75;
}

function getPriority(path: string, country?: string): number {
  const base = getPageWeight(path);
  if (!country) return base;

  const tier = getTier(country);
  const tierBoost: Record<number, number> = { 1: 0.05, 2: 0.04, 3: 0.03, 4: 0.02, 5: 0.01, 6: 0, 7: -0.02 };
  const boost = tierBoost[tier] ?? 0;
  return Math.max(0.3, Math.min(1, base + boost));
}

// ===============================
// 🔄 CHANGE FREQUENCY
// ===============================
function getChangeFrequency(country?: string): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (!country) return "daily";
  const tier = getTier(country);
  if (tier === 1) return "daily";
  if (tier <= 3) return "weekly";
  return "monthly";
}

// ===============================
// 🚀 SITEMAP GENERATOR (Using imported ISO_COUNTRIES)
// ===============================
export function generateSitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const sitemap: MetadataRoute.Sitemap = [];

  // 🌍 GLOBAL PAGES
  for (const path of ALL_PAGES) {
    sitemap.push({
      url: buildUrl(path),
      lastModified: now,
      changeFrequency: "daily",
      priority: getPriority(path),
    });
  }

  // 🌎 COUNTRY-SPECIFIC PAGES (Using ISO_COUNTRIES from core)
  for (const country of ISO_COUNTRIES) {
    for (const path of ALL_PAGES) {
      sitemap.push({
        url: buildUrl(path, country),
        lastModified: now,
        changeFrequency: getChangeFrequency(country),
        priority: getPriority(path, country),
      });
    }
  }

  return sitemap;
}

// ===============================
// 🔥 ENTERPRISE ALIAS LAYER
// ===============================
export const sitemapEngine = generateSitemap;
export const buildSitemap = generateSitemap;
export const getSitemap = generateSitemap;
export const resolveSitemap = generateSitemap;
export const createSitemap = generateSitemap;
export const generateFullSitemap = generateSitemap;

// ===============================
// 🧪 OPTIONAL VALIDATION
// ===============================
export function validateSitemapEntry(entry: MetadataRoute.Sitemap[number]): boolean {
  if (!entry.url || !entry.lastModified) return false;
  if (!/^https?:\/\//.test(entry.url)) return false;
  return true;
}

export default generateSitemap;
