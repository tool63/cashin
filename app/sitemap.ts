import type { MetadataRoute } from "next";
import { unstable_cache } from "next/cache";
import { ISO_COUNTRIES, getTierNumber } from "@/app/core/countries";

// ===============================
// 🌐 GLOBAL CONFIG
// ===============================
const BASE_URL = "https://cashog.com";
const BUILD_TIME = new Date();
const MAX_URLS_PER_SITEMAP = 45000;

// ===============================
// 🧠 TIER SYSTEM
// ===============================
function getTier(country: string): number {
  return getTierNumber(country);
}

// ===============================
// 🎯 HREFLANG OPTIMIZATION (Top tiers only)
// ===============================
const HREFLANG_COUNTRIES = ISO_COUNTRIES.filter(c => getTier(c) <= 3);
const FULL_HREFLANG_COUNTRIES = ISO_COUNTRIES; // Keep full for reference

// ===============================
// 📦 STATIC PAGE STRUCTURE
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

const STATIC_PAGES = Array.from(
  new Set([...CORE_PAGES, ...EARN_PAGES, ...SHOPPING_PAGES, ...CONTENT_PAGES])
);

// ===============================
// 🚫 PAGE AVAILABILITY BY TIER
// ===============================
const RESTRICTED_PATHS: Record<number, string[]> = {
  6: ["/surveys", "/offerwall"],
  7: ["/surveys", "/offerwall", "/cashback", "/app-installs", "/surveywall"],
};

function isPageAvailable(country: string, path: string): boolean {
  const tier = getTier(country);
  const restricted = RESTRICTED_PATHS[tier] || [];
  return !restricted.includes(path);
}

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
// 🌍 OPTIMIZED HREFLANG (Top tiers only)
// ===============================
function buildAlternates(path: string, currentCountry?: string) {
  const languages: Record<string, string> = {};

  // Only add top-tier countries to prevent XML bloat
  for (const country of HREFLANG_COUNTRIES) {
    if (currentCountry && country === currentCountry) continue;
    languages[country] = buildUrl(path, country);
  }

  // Add x-default (neutral/fallback URL)
  languages["x-default"] = buildUrl(path);

  return { languages };
}

// ===============================
// 📊 DATA-DRIVEN PRIORITY (CTR, EPC, conversions)
// ===============================
// In production, fetch from your analytics DB
interface PageMetrics {
  ctr: number;      // Click-through rate (0-1)
  epc: number;      // Earnings per click ($)
  conversions: number; // Conversion rate (0-1)
}

// Example metrics store - replace with real data source
const PAGE_METRICS: Record<string, PageMetrics> = {
  "/earn": { ctr: 0.12, epc: 0.45, conversions: 0.08 },
  "/surveys": { ctr: 0.18, epc: 0.32, conversions: 0.12 },
  "/cashback": { ctr: 0.09, epc: 0.67, conversions: 0.06 },
  "/offerwall": { ctr: 0.14, epc: 0.28, conversions: 0.10 },
  "/play-games": { ctr: 0.22, epc: 0.15, conversions: 0.15 },
};

async function getRealTimeMetrics(path: string): Promise<PageMetrics | null> {
  // TODO: Replace with actual database/analytics call
  // Example: await db.query('SELECT ctr, epc, conversions FROM metrics WHERE path = $1', [path]);
  return PAGE_METRICS[path] || null;
}

function calculateDataDrivenPriority(metrics: PageMetrics | null, baseWeight: number): number {
  if (!metrics) return baseWeight;
  
  // Formula: weighted average of metrics
  // CTR (40%), EPC (35%), Conversions (25%)
  const dataScore = (metrics.ctr * 0.4) + (Math.min(metrics.epc, 1) * 0.35) + (metrics.conversions * 0.25);
  
  // Blend with base weight (70% data, 30% static)
  const finalPriority = (dataScore * 0.7) + (baseWeight * 0.3);
  
  return Math.max(0.3, Math.min(1, finalPriority));
}

async function getPageWeight(path: string): Promise<number> {
  const clean = normalizePath(path);
  
  // Static base weights
  let baseWeight = 0.5;
  if (clean === "/") baseWeight = 1.0;
  else if (["/earn", "/make-money", "/rewards", "/affiliate"].includes(clean)) baseWeight = 0.9;
  else if (EARN_PAGES.includes(clean)) baseWeight = 0.8;
  else if (clean.includes("shopping")) baseWeight = 0.7;
  else if (clean.includes("blog") || clean.includes("guides") || clean.includes("compare")) baseWeight = 0.6;
  
  // Enhance with real data
  const metrics = await getRealTimeMetrics(clean);
  return calculateDataDrivenPriority(metrics, baseWeight);
}

async function getPriority(path: string, country?: string): Promise<number> {
  const base = await getPageWeight(path);
  if (!country) return base;

  const tier = getTier(country);
  const tierBoost: Record<number, number> = {
    1: 0.05, 2: 0.04, 3: 0.03, 4: 0.02, 5: 0.01, 6: 0, 7: -0.05,
  };

  return Math.max(0.3, Math.min(1, base + (tierBoost[tier] ?? 0)));
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
// 🕒 REAL LAST MODIFIED
// ===============================
interface ContentDate {
  lastModified: Date;
  priority: number;
}

const CONTENT_DATES: Record<string, ContentDate> = {
  "/blog": { lastModified: new Date("2025-03-15"), priority: 0.85 },
  "/guides": { lastModified: new Date("2025-03-10"), priority: 0.8 },
  "/compare": { lastModified: new Date("2025-03-01"), priority: 0.75 },
};

async function getLastModified(path: string, country?: string): Promise<Date> {
  // Dynamic content from CMS
  if (CONTENT_DATES[path]) return CONTENT_DATES[path].lastModified;
  if (country && CONTENT_DATES[`${country}:${path}`]) {
    return CONTENT_DATES[`${country}:${path}`].lastModified;
  }
  return BUILD_TIME;
}

// ===============================
// 📄 DYNAMIC PAGES (Database-driven)
// ===============================
interface DynamicPage {
  path: string;
  lastModified: Date;
  availableCountries: string[]; // Empty array = all countries
  priority: number;
}

// Example - replace with actual DB queries
async function getDynamicPages(): Promise<DynamicPage[]> {
  // TODO: Replace with real database calls
  // const offers = await db.offer.findMany();
  // const surveys = await db.survey.findMany();
  // const blogPosts = await db.post.findMany();
  
  return [
    {
      path: "/offers/featured-iphone",
      lastModified: new Date("2025-03-20"),
      availableCountries: ["us", "uk", "ca", "au"],
      priority: 0.9,
    },
    {
      path: "/surveys/consumer-panel",
      lastModified: new Date("2025-03-18"),
      availableCountries: [], // All countries
      priority: 0.85,
    },
    {
      path: "/blog/earn-money-online",
      lastModified: new Date("2025-03-22"),
      availableCountries: [], // All countries
      priority: 0.7,
    },
  ];
}

// ===============================
// 💾 NEXT.JS CACHE (Serverless-safe)
// ===============================
const getCachedSitemap = unstable_cache(
  async () => {
    const sitemap: MetadataRoute.Sitemap = [];

    // 🌍 STATIC GLOBAL PAGES
    for (const path of STATIC_PAGES) {
      sitemap.push({
        url: buildUrl(path),
        lastModified: await getLastModified(path),
        changeFrequency: "daily",
        priority: await getPriority(path),
        alternates: buildAlternates(path),
      });
    }

    // 🌎 STATIC COUNTRY-SPECIFIC PAGES
    for (const country of ISO_COUNTRIES) {
      for (const path of STATIC_PAGES) {
        if (!isPageAvailable(country, path)) continue;
        sitemap.push({
          url: buildUrl(path, country),
          lastModified: await getLastModified(path, country),
          changeFrequency: getChangeFrequency(country),
          priority: await getPriority(path, country),
          alternates: buildAlternates(path, country),
        });
      }
    }

    // 📄 DYNAMIC PAGES (Database-driven)
    const dynamicPages = await getDynamicPages();
    for (const page of dynamicPages) {
      // Global version
      sitemap.push({
        url: buildUrl(page.path),
        lastModified: page.lastModified,
        changeFrequency: "weekly",
        priority: page.priority,
        alternates: buildAlternates(page.path),
      });

      // Country-specific versions
      const targetCountries = page.availableCountries.length > 0 
        ? page.availableCountries 
        : ISO_COUNTRIES;
      
      for (const country of targetCountries) {
        if (!isPageAvailable(country, page.path)) continue;
        sitemap.push({
          url: buildUrl(page.path, country),
          lastModified: page.lastModified,
          changeFrequency: getChangeFrequency(country),
          priority: await getPriority(page.path, country),
          alternates: buildAlternates(page.path, country),
        });
      }
    }

    return sitemap;
  },
  ["sitemap-cache"],
  {
    revalidate: 3600, // Revalidate every hour
    tags: ["sitemap"],
  }
);

// ===============================
// 🚀 MAIN SITEMAP GENERATOR (with cache)
// ===============================
export async function generateSitemap(): Promise<MetadataRoute.Sitemap> {
  return getCachedSitemap();
}

// ===============================
// 📂 SPLIT SITEMAPS (SCALABLE)
// ===============================
export async function generateSplitSitemaps(): Promise<MetadataRoute.Sitemap[]> {
  const full = await generateSitemap();
  const chunks: MetadataRoute.Sitemap[] = [];

  for (let i = 0; i < full.length; i += MAX_URLS_PER_SITEMAP) {
    chunks.push(full.slice(i, i + MAX_URLS_PER_SITEMAP));
  }

  return chunks;
}

// ===============================
// 📑 SITEMAP INDEX
// ===============================
export async function generateSitemapIndex(): Promise<MetadataRoute.Sitemap> {
  const chunks = await generateSplitSitemaps();

  return chunks.map((_, i) => ({
    url: `${BASE_URL}/sitemap-${i}.xml`,
    lastModified: BUILD_TIME,
  }));
}

// ===============================
// 📊 ACCURATE STATS (Fixed detection)
// ===============================
export async function getSitemapStats() {
  const sitemap = await generateSitemap();
  
  // ✅ Fixed: Proper regex for country URL detection
  const countryUrlRegex = /^https:\/\/cashog\.com\/[a-z]{2}\//;
  const globalCount = sitemap.filter(entry => !countryUrlRegex.test(entry.url)).length;
  const countryCount = sitemap.length - globalCount;
  
  return {
    totalUrls: sitemap.length,
    globalUrls: globalCount,
    countryUrls: countryCount,
    countryCount: ISO_COUNTRIES.length,
    hreflangCountriesCount: HREFLANG_COUNTRIES.length,
    dynamicPagesCount: (await getDynamicPages()).length,
    estimatedSitemapCount: Math.ceil(sitemap.length / MAX_URLS_PER_SITEMAP),
  };
}

// ===============================
// 🧹 CACHE REVALIDATION (Webhook ready)
// ===============================
export async function revalidateSitemap() {
  const { revalidateTag } = await import("next/cache");
  revalidateTag("sitemap");
}

// ===============================
// 🧪 VALIDATION
// ===============================
export function validateSitemapEntry(entry: MetadataRoute.Sitemap[number]): boolean {
  if (!entry.url || !entry.lastModified) return false;
  if (!/^https?:\/\//.test(entry.url)) return false;
  if (entry.url.length > 2000) return false;
  return true;
}

// ===============================
// 🔥 ENTERPRISE ALIASES
// ===============================
export const sitemapEngine = generateSitemap;
export const buildSitemap = generateSitemap;
export const getSitemap = generateSitemap;

// ===============================
// 📤 DEFAULT EXPORT
// ===============================
export default generateSitemap;
