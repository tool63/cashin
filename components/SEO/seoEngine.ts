import { cache } from "react";
import { PageTypeResult, detectPageType, isPaginated } from "./pageTypes";
import { buildMetadata, MetadataInput } from "./metadata";
import { buildStructuredData, SchemaInput } from "./schema";
import { buildCanonical, CanonicalOptions } from "./canonical";
import { buildHreflang, HreflangOptions } from "./hreflang";
import { SEO_CONFIG } from "./seoConfig";

// ============================================================
// Types
// ============================================================

export interface SEOInput {
  route: string;
  locale?: string;
  data?: Record<string, any>;
  queryParams?: Record<string, string>;

  noindex?: boolean;
  nofollow?: boolean;
  priority?: number;

  customCanonical?: string;
  skipHreflang?: boolean;
  skipSchema?: boolean;

  title?: string;
  description?: string;
  keywords?: string[];

  customTitle?: string;
  customDescription?: string;

  tags?: string[];

  author?: string;
  publishedAt?: string;
  updatedAt?: string;

  openGraph?: Record<string, any>;
  twitter?: Record<string, any>;
}

export interface SEOOutput {
  metadata: Record<string, any>;
  structuredData: object[];
  canonical: string;
  hreflang: Record<string, string>;
  pageType: PageTypeResult;

  links?: any[];
  preload?: string[];

  metrics?: Record<string, any>;
  warnings?: string[];
  suggestions?: string[];
}

// ============================================================
// Cache
// ============================================================

const seoCache = new Map<
  string,
  { output: SEOOutput; timestamp: number; hits: number }
>();

const CACHE_TTL = 1000 * 60 * 60;
const MAX_CACHE_SIZE = 500;

function cleanupCache() {
  if (seoCache.size <= MAX_CACHE_SIZE) return;

  const sorted = Array.from(seoCache.entries()).sort(
    (a, b) => a[1].timestamp - b[1].timestamp
  );

  while (seoCache.size > MAX_CACHE_SIZE * 0.8) {
    const item = sorted.shift();
    if (item) seoCache.delete(item[0]);
  }
}

// ============================================================
// Keyword Expansion
// ============================================================

function expandKeywords(base: string[], tags: string[]) {
  const set = new Set<string>();

  base.forEach((k) => set.add(k));
  tags.forEach((k) => set.add(k));

  tags.forEach((tag) => {
    set.add(`${tag} rewards`);
    set.add(`earn ${tag}`);
    set.add(`${tag} online`);
    set.add(`${tag} fast`);
  });

  return Array.from(set);
}

// ============================================================
// Intelligent Long-Tail SEO Generator
// ============================================================

function generateLongTailSEO(route: string, primary: string, tags: string[]) {
  const site = SEO_CONFIG.siteName || "Cashog";

  const map: Record<string, { title: string; description: string }> = {
    "/": {
      title: `Earn Money Online Fast | Complete Tasks, Surveys & Games | ${site}`,
      description: `${site} is a rewards platform where users earn real money online by completing surveys, playing games, testing apps, and finishing offers.`,
    },
    "/how-it-works": {
      title: `How ${site} Works | Earn Money Completing Tasks`,
      description: `Learn how ${site} works step-by-step. Complete surveys, tasks, and games to earn real money online.`,
    },
    "/play-games": {
      title: `Play Games & Earn Money Online | ${site}`,
      description: `Play mobile and PC games to earn money online. ${site} rewards players for completing levels and testing apps.`,
    },
    "/surveys": {
      title: `Paid Surveys Online | Earn Cash Completing Surveys | ${site}`,
      description: `Complete high-paying surveys and earn real money online on ${site}.`,
    },
    "/offers": {
      title: `High Paying Offers | Complete Tasks & Earn Rewards | ${site}`,
      description: `Discover high-paying offers. Install apps and complete tasks to earn rewards instantly.`,
    },
  };

  if (map[route]) return map[route];

  const keyword = route.replace(/\//g, " ").replace(/-/g, " ").trim();

  const formatted = keyword
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const title = `${formatted} | ${primary} & Earn Rewards | ${site}`;
  const description = `Complete ${keyword}, surveys, games, and tasks to earn money online on ${site}.`;

  return { title, description };
}

// ============================================================
// SEO Engine
// ============================================================

export const buildSEO = cache(async (input: SEOInput): Promise<SEOOutput> => {
  const startTime = Date.now();

  const warnings: string[] = [];
  const suggestions: string[] = [];

  const {
    route,
    locale = SEO_CONFIG.defaultLocale,
    data = {},
    queryParams = {},
    noindex = false,
    nofollow = false,
    customCanonical,
    skipHreflang = false,
    skipSchema = false,
    tags = [],
    author,
    publishedAt,
    updatedAt,
    title,
    description,
    keywords,
    customTitle,
    customDescription,
    openGraph,
    twitter,
  } = input;

  const cacheKey = `${route}:${locale}:${JSON.stringify(queryParams)}`;
  const cached = seoCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    cached.hits++;
    return cached.output;
  }

  try {
    const pageType =
      detectPageType(route, queryParams) ||
      ({
        type: "unknown",
        hierarchy: ["unknown"],
        metadata: {},
        matches: null,
      } as PageTypeResult);

    const isProduction = process.env.NODE_ENV === "production";

    const shouldIndex =
      !noindex && !isPaginated(route) && isProduction && !route.includes("preview");
    const shouldFollow = !nofollow;

    // ============================================================
    // Canonical
    // ============================================================

    const canonicalOptions: CanonicalOptions = {
      includeQuery: false,
      trailingSlash: true,
      removeParams: ["utm_", "ref", "source", "fbclid", "gclid"],
      lowercase: true,
      secure: true,
      normalizeSlashes: true,
    };

    const canonical = customCanonical || buildCanonical(route, canonicalOptions);

    // ============================================================
    // Hreflang
    // ============================================================

    const hreflang = !skipHreflang
      ? buildHreflang(route, {
          includeDefault: true,
          includeXDefault: true,
          locales: [...SEO_CONFIG.supportedLocales],
          trailingSlash: true,
        } as HreflangOptions)
      : {};

    // ============================================================
    // Metadata
    // ============================================================

    const metadataInput: MetadataInput = {
      pageType: pageType.type,
      route,
      locale,
      canonical,
      data: { ...data, tags, author, publishedAt, updatedAt },
      queryParams,
      noindex: !shouldIndex,
      nofollow: !shouldFollow,
      siteName: SEO_CONFIG.siteName,
    };

    let metadata = buildMetadata(metadataInput);

    // ============================================================
    // Automatic SEO
    // ============================================================

    const autoSEO = generateLongTailSEO(route, SEO_CONFIG.primaryKeyword, tags);

    metadata = enhanceMetadata(
      metadata,
      tags,
      title,
      description,
      keywords,
      customTitle || autoSEO.title,
      customDescription || autoSEO.description,
      openGraph,
      twitter
    );

    // ============================================================
    // Schema
    // ============================================================

    const structuredData = !skipSchema
      ? buildStructuredData({
          pageType: pageType.type,
          route,
          data: { ...data, tags, author, publishedAt, updatedAt },
          canonical,
          metadata,
          pageTypeHierarchy: pageType.hierarchy,
        } as SchemaInput)
      : [];

    // ============================================================
    // Resource Hints
    // ============================================================

    const { links, preload } = generateResourceHints(pageType, data);

    const seoScore = calculateSEOScore(
      metadata,
      structuredData,
      pageType,
      warnings,
      suggestions
    );

    // ============================================================
    // Metrics (client-side only)
    // ============================================================

    let metrics: any = {
      pageType: pageType.type,
      generationTime: Date.now() - startTime,
      metadataSize: JSON.stringify(metadata).length,
      schemaCount: structuredData.length,
      cacheHit: false,
      warnings: warnings.length,
      suggestions: suggestions.length,
    };

    // Only track SEO analytics on client-side
    if (typeof window !== "undefined") {
      import("./seoAnalytics").then((mod) => {
        if (mod.trackSEOGeneration) mod.trackSEOGeneration(metrics);
      });
    }

    const output: SEOOutput = {
      metadata,
      structuredData,
      canonical,
      hreflang,
      pageType,
      links,
      preload,
      metrics: { ...metrics, seoScore },
      warnings,
      suggestions,
    };

    seoCache.set(cacheKey, { output, timestamp: Date.now(), hits: 1 });
    cleanupCache();

    return output;
  } catch (err) {
    console.error("SEO generation failed:", err);
    return {
      metadata: {
        title: SEO_CONFIG.defaultTitle,
        description: SEO_CONFIG.defaultDescription,
      },
      structuredData: [],
      canonical: SEO_CONFIG.siteUrl,
      hreflang: { [SEO_CONFIG.defaultLocale]: SEO_CONFIG.siteUrl },
      pageType: {
        type: "unknown",
        hierarchy: ["unknown"],
        metadata: {},
        matches: null,
      },
      metrics: {},
      warnings: [],
      suggestions: [],
    };
  }
});

// ============================================================
// Metadata Enhancer
// ============================================================

function enhanceMetadata(
  metadata: any,
  tags: string[],
  title?: string,
  description?: string,
  keywords?: string[],
  customTitle?: string,
  customDescription?: string,
  openGraph?: Record<string, any>,
  twitter?: Record<string, any>
) {
  if (customTitle) metadata.title = customTitle;
  else if (title) metadata.title = title;

  if (customDescription) metadata.description = customDescription;
  else if (description) metadata.description = description;

  metadata.keywords = expandKeywords(
    [
      ...(keywords || []),
      ...(SEO_CONFIG.defaultKeywords || []),
      ...(SEO_CONFIG.secondaryKeywords || []),
    ],
    tags
  );

  if (openGraph) metadata.openGraph = openGraph;
  if (twitter) metadata.twitter = twitter;

  return metadata;
}

// ============================================================
// SEO Score
// ============================================================

function calculateSEOScore(
  metadata: any,
  schema: object[],
  pageType: PageTypeResult,
  warnings: string[],
  suggestions: string[]
) {
  let score = 50;

  const titleLen = metadata.title?.length || 0;
  const descLen = metadata.description?.length || 0;

  if (titleLen >= 40 && titleLen <= 60) score += 10;
  if (descLen >= 120 && descLen <= 160) score += 10;
  if (metadata.keywords?.length >= 10) score += 10;
  if (schema.length > 2) score += 15;

  if (metadata.openGraph) score += 10;
  if (metadata.twitter) score += 5;
  if (pageType.type === "home") score += 5;

  score -= warnings.length * 2;
  score -= suggestions.length;

  return Math.min(Math.max(score, 0), 100);
}

// ============================================================
// Resource Hints
// ============================================================

function generateResourceHints(pageType: PageTypeResult, data: any) {
  const links: any[] = [];
  const preload: string[] = [];

  SEO_CONFIG.preconnect?.forEach((url) =>
    links.push({ rel: "preconnect", href: url })
  );

  SEO_CONFIG.dnsPrefetch?.forEach((url) =>
    links.push({ rel: "dns-prefetch", href: url })
  );

  if (pageType.type === "home" && data?.image) {
    preload.push(data.image);
  }

  return { links, preload };
}

// ============================================================
// Cache Utilities
// ============================================================

export function clearSEOCache(pattern?: RegExp) {
  if (!pattern) return seoCache.clear();

  for (const key of seoCache.keys()) {
    if (pattern.test(key)) seoCache.delete(key);
  }
}

export function getSEOCacheStats() {
  return {
    size: seoCache.size,
    hits: Array.from(seoCache.values()).reduce((a, b) => a + b.hits, 0),
  };
}

export default buildSEO;
