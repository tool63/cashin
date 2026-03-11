// components/SEO/seoEngine.ts
// ULTRA-PREMIUM CORPORATE SEO ENGINE WITH AUTOMATIC LONG-TAIL TITLES & DESCRIPTIONS

import { cache } from "react";
import { PageTypeResult, detectPageType, isPaginated } from "./pageTypes";
import { buildMetadata, MetadataInput } from "./metadata";
import { buildStructuredData, SchemaInput } from "./schema";
import { buildCanonical, CanonicalOptions } from "./canonical";
import { buildHreflang, HreflangOptions } from "./hreflang";
import { SEO_CONFIG } from "./seoConfig";
import { SEOAnalytics, trackSEOGeneration } from "./seoAnalytics";

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

  // Old-school SEO
  title?: string;
  description?: string;
  keywords?: string[];

  // Ultra-premium SEO
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
  preconnect?: readonly string[];
  dnsPrefetch?: readonly string[];
  preload?: readonly string[];
  prefetch?: readonly string[];
  prerender?: readonly string[];
  modulePreload?: readonly string[];

  metrics?: SEOAnalytics & { seoScore?: number };
  warnings?: string[];
  suggestions?: string[];
}

// ============================================================
// Cache
// ============================================================

const seoCache = new Map<string, { output: SEOOutput; timestamp: number; hits: number }>();
const CACHE_TTL = 3600000; // 1 hour
const MAX_CACHE_SIZE = 500;

function cleanupCache() {
  if (seoCache.size <= MAX_CACHE_SIZE) return;
  const sorted = Array.from(seoCache.entries()).sort((a, b) => a[1].timestamp - b[1].timestamp);
  while (seoCache.size > MAX_CACHE_SIZE * 0.8) seoCache.delete(sorted.shift()![0]);
}

// ============================================================
// Keyword Expansion
// ============================================================

function expandKeywords(base: string[], tags: string[]) {
  const set = new Set<string>();
  base.forEach(k => set.add(k));
  tags.forEach(k => set.add(k));
  tags.forEach(tag => {
    set.add(`${tag} rewards`);
    set.add(`earn ${tag}`);
    set.add(`${tag} online`);
    set.add(`${tag} fast`);
  });
  return Array.from(set);
}

// ============================================================
// Automatic Long-Tail Title & Description Generator
// ============================================================

function generateLongTailSEO(route: string, primary: string, tags: string[]) {
  const pageKeyword = route.replace(/\//g, " ").trim() || primary;
  const title = `${primary} | Complete ${pageKeyword} & Get Paid | Cashog`;
  const description = `Join Cashog to complete ${pageKeyword}, surveys, tasks, and offers to earn money online securely and quickly.`;
  return { title, description };
}

// ============================================================
// Ultra-Premium SEO Builder
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
    priority = 0.7,
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
    // ============================================================
    // Page Type Detection
    // ============================================================

    const pageType =
      detectPageType(route, queryParams) || {
        type: "unknown",
        hierarchy: ["unknown"],
        metadata: {},
        matches: null,
      } as PageTypeResult;

    const isProduction = process.env.NODE_ENV === "production";
    const shouldIndex =
      !noindex && !isPaginated(route) && isProduction && !route.includes("preview");
    const shouldFollow = !nofollow;

    // ============================================================
    // Canonical URL
    // ============================================================

    const canonicalOptions: CanonicalOptions = {
      includeQuery: false,
      trailingSlash: true,
      removeParams: [
        "utm_",
        "ref",
        "source",
        "fbclid",
        "gclid",
        "msclkid",
        "_ga",
        "_gl",
      ],
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
          countrySpecific: true,
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

    (metadataInput as any).priority = priority;

    let metadata = buildMetadata(metadataInput);

    // ============================================================
    // Enhance Metadata (automatic + custom)
    // ============================================================

    const { title: autoTitle, description: autoDescription } = generateLongTailSEO(route, SEO_CONFIG.primaryKeyword, tags);

    metadata = enhanceMetadata(
      metadata,
      route,
      data,
      tags,
      title,
      description,
      keywords,
      customTitle || autoTitle,
      customDescription || autoDescription,
      openGraph,
      twitter
    );

    // ============================================================
    // Structured Data
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

    const { links, preconnect, dnsPrefetch, preload, prefetch, prerender, modulePreload } =
      generateResourceHints(pageType, data, route);

    // ============================================================
    // SEO Score & Metrics
    // ============================================================

    const seoScore = calculateSEOScore(metadata, structuredData, pageType, warnings, suggestions);
    const metrics = trackSEOGeneration({
      pageType: pageType.type,
      generationTime: Date.now() - startTime,
      metadataSize: JSON.stringify(metadata).length,
      schemaCount: structuredData.length,
      cacheHit: false,
      warnings: warnings.length,
      suggestions: suggestions.length,
    });

    const output: SEOOutput = {
      metadata,
      structuredData,
      canonical,
      hreflang,
      pageType,
      links,
      preconnect,
      dnsPrefetch,
      preload,
      prefetch,
      prerender,
      modulePreload,
      metrics: { ...metrics, seoScore },
      warnings: warnings.length ? warnings : undefined,
      suggestions: suggestions.length ? suggestions : undefined,
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
        robots: "index, follow",
      },
      structuredData: [],
      canonical: SEO_CONFIG.siteUrl,
      hreflang: { [SEO_CONFIG.defaultLocale]: SEO_CONFIG.siteUrl },
      pageType: { type: "unknown", hierarchy: ["unknown"], metadata: {}, matches: null },
      metrics: { seoScore: 0 } as any,
      warnings: ["SEO generation failed"],
    };
  }
});

// ============================================================
// Metadata Enhancer (dual-mode + auto long-tail)
function enhanceMetadata(
  metadata: any,
  route: string,
  data: any,
  tags: string[],
  title?: string,
  description?: string,
  keywords?: string[],
  customTitle?: string,
  customDescription?: string,
  openGraph?: Record<string, any>,
  twitter?: Record<string, any>
) {
  const primary = SEO_CONFIG.primaryKeyword;

  // Title
  if (customTitle) metadata.title = customTitle;
  else if (title) metadata.title = title;
  else if (metadata.title && !metadata.title.toLowerCase().includes(primary))
    metadata.title = `${metadata.title} | ${primary}`;

  // Description
  if (customDescription) metadata.description = customDescription;
  else if (description) metadata.description = description;
  else if (metadata.description && !metadata.description.includes("earn"))
    metadata.description += " Start earning rewards today.";

  // Keywords
  metadata.keywords = expandKeywords(
    [...(keywords || []), ...(SEO_CONFIG.defaultKeywords || []), ...(SEO_CONFIG.secondaryKeywords || [])],
    tags
  );

  // Open Graph & Twitter Cards
  if (openGraph) metadata.openGraph = openGraph;
  if (twitter) metadata.twitter = twitter;

  return metadata;
}

// ============================================================
// SEO Scoring
function calculateSEOScore(metadata: any, schema: object[], pageType: PageTypeResult, warnings: string[], suggestions: string[]) {
  let score = 50;
  const titleLen = metadata.title ? String(metadata.title).length : 0;
  const descLen = metadata.description ? String(metadata.description).length : 0;

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
function generateResourceHints(pageType: PageTypeResult, data: any, route: string) {
  const links: any[] = [];
  const preload: string[] = [];
  const prefetch: string[] = [];
  const modulePreload: string[] = [];
  const prerender: string[] = [];

  SEO_CONFIG.preconnect?.forEach(url => links.push({ rel: "preconnect", href: url }));
  SEO_CONFIG.dnsPrefetch?.forEach(url => links.push({ rel: "dns-prefetch", href: url }));

  if (pageType.type === "home" && data.image) preload.push(data.image);

  return { links, preload, prefetch, modulePreload, prerender, preconnect: SEO_CONFIG.preconnect, dnsPrefetch: SEO_CONFIG.dnsPrefetch };
}

// ============================================================
// Cache Utilities
export function clearSEOCache(pattern?: RegExp) {
  if (!pattern) return seoCache.clear();
  for (const key of seoCache.keys()) if (pattern.test(key)) seoCache.delete(key);
}
export function getSEOCacheStats() {
  return { size: seoCache.size, hits: Array.from(seoCache.values()).reduce((a, b) => a + b.hits, 0) };
}

export default buildSEO;
