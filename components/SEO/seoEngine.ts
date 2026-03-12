// components/SEO/seoEngine.ts
import { cache } from "react";
import { SEO_CONFIG } from "./seoConfig";
import { buildMetadata, MetadataInput } from "./metadata";
import { buildStructuredData, SchemaInput } from "./schema";
import { buildCanonical } from "./canonical";
import { buildHreflang, HreflangOptions } from "./hreflang";
import { PageTypeResult, detectPageType, isPaginated } from "./pageTypes";
import { SEOAnalytics, trackSEOGeneration } from "./seoAnalytics";

// -------------------- Types --------------------
export interface SEOInput {
  route: string;
  locale?: string;
  data?: Record<string, any>;
  queryParams?: Record<string, string>;
  noindex?: boolean;
  nofollow?: boolean;
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
  metrics?: SEOAnalytics & { seoScore?: number };
  warnings?: string[];
  suggestions?: string[];
}

// -------------------- Cache --------------------
const seoCache = new Map<string, { output: SEOOutput; timestamp: number; hits: number }>();
const CACHE_TTL = 1000 * 60 * 60;
const MAX_CACHE_SIZE = 500;

function cleanupCache() {
  if (seoCache.size <= MAX_CACHE_SIZE) return;
  const sorted = Array.from(seoCache.entries()).sort((a, b) => a[1].timestamp - b[1].timestamp);
  while (seoCache.size > MAX_CACHE_SIZE * 0.8) {
    const item = sorted.shift();
    if (item) seoCache.delete(item[0]);
  }
}

// -------------------- SEO Engine --------------------
export const buildSEO = cache(async (input: SEOInput): Promise<SEOOutput> => {
  const startTime = Date.now();
  const warnings: string[] = [];
  const suggestions: string[] = [];

  const { route, locale = SEO_CONFIG.defaultLocale, data = {}, queryParams = {}, noindex = false, nofollow = false, customCanonical, skipHreflang = false, skipSchema = false, tags = [], title, description, keywords, customTitle, customDescription, openGraph, twitter } = input;

  const cacheKey = `${route}:${locale}:${JSON.stringify(queryParams)}`;
  const cached = seoCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    cached.hits++;
    return cached.output;
  }

  try {
    const pageType: PageTypeResult = detectPageType(route, queryParams) || { type: "unknown", hierarchy: ["unknown"], metadata: {}, matches: null };
    const shouldIndex = !noindex && !isPaginated(route) && process.env.NODE_ENV === "production";
    const shouldFollow = !nofollow;

    const canonical = customCanonical || buildCanonical(route, { includeQuery: false, trailingSlash: true, removeParams: ["utm_", "ref", "source", "fbclid", "gclid"], lowercase: true, secure: true, normalizeSlashes: true });
    const hreflang = !skipHreflang ? buildHreflang(route, { includeDefault: true, includeXDefault: true, locales: [...SEO_CONFIG.supportedLocales], trailingSlash: true } as HreflangOptions) : {};

    let metadata = buildMetadata({ pageType: pageType.type, route, locale, canonical, data: { ...data, tags }, queryParams, noindex: !shouldIndex, nofollow: !shouldFollow, siteName: SEO_CONFIG.siteName } as MetadataInput);

    // Apply custom or auto metadata
    if (customTitle) metadata.title = customTitle;
    else if (title) metadata.title = title;

    if (customDescription) metadata.description = customDescription;
    else if (description) metadata.description = description;

    metadata.keywords = [...(keywords || []), ...(SEO_CONFIG.defaultKeywords || [])];
    if (openGraph) metadata.openGraph = openGraph;
    if (twitter) metadata.twitter = twitter;

    const structuredData = !skipSchema ? buildStructuredData({ pageType: pageType.type, route, data, canonical, metadata, pageTypeHierarchy: pageType.hierarchy } as SchemaInput) : [];

    const { links = [], preload = [] } = { links: [], preload: [] }; // placeholder for resource hints

    const seoScore = 70;
    const metrics = trackSEOGeneration({ pageType: pageType.type, generationTime: Date.now() - startTime, metadataSize: JSON.stringify(metadata).length, schemaCount: structuredData.length, cacheHit: false, warnings: warnings.length, suggestions: suggestions.length });

    const output: SEOOutput = { metadata, structuredData, canonical, hreflang, pageType, links, preload, metrics: { ...metrics, seoScore }, warnings, suggestions };

    seoCache.set(cacheKey, { output, timestamp: Date.now(), hits: 1 });
    cleanupCache();
    return output;
  } catch (err) {
    console.error("SEO generation failed:", err);
    return { metadata: { title: SEO_CONFIG.siteName, description: SEO_CONFIG.defaultDescription }, structuredData: [], canonical: SEO_CONFIG.siteUrl, hreflang: {}, pageType: { type: "unknown", hierarchy: ["unknown"], metadata: {}, matches: null } };
  }
});

// -------------------- Utilities --------------------
export function clearSEOCache(pattern?: RegExp) {
  if (!pattern) return seoCache.clear();
  for (const key of seoCache.keys()) if (pattern.test(key)) seoCache.delete(key);
}
export function getSEOCacheStats() {
  return { size: seoCache.size, hits: Array.from(seoCache.values()).reduce((a, b) => a + b.hits, 0) };
}

export default buildSEO;
