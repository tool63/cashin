// components/SEO/seoEngine.ts (STREAMLINED ULTRA-PREMIUM VERSION)

import { cache } from 'react';
import { PageTypeResult, detectPageType, isPaginated, PageType } from './pageTypes';
import { buildMetadata, MetadataInput } from './metadata';
import { buildStructuredData, SchemaInput } from './schema';
import { buildCanonical, CanonicalOptions } from './canonical';
import { buildHreflang, HreflangOptions } from './hreflang';
import { SEO_CONFIG } from './seoConfig';
import { SEOAnalytics, trackSEOGeneration } from './seoAnalytics';

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
  tags?: string[];
  author?: string;
  publishedAt?: string;
  updatedAt?: string;
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
// Simple Cache
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
// Main SEO Builder
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
  } = input;

  const cacheKey = `${route}:${locale}:${JSON.stringify(queryParams)}`;
  const cached = seoCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    cached.hits++;
    return cached.output;
  }

  try {
    // ------------------------------
    // Page Detection
    // ------------------------------
    const pageType = detectPageType(route, queryParams) || {
      type: 'unknown' as PageType,
      hierarchy: ['unknown'],
      metadata: {},
      matches: null,
    };

    const isProduction = process.env.NODE_ENV === 'production';
    const shouldIndex = !noindex && !isPaginated(route) && isProduction && !route.includes('preview');
    const shouldFollow = !nofollow;

    // ------------------------------
    // Canonical URL
    // ------------------------------
    const canonicalOptions: CanonicalOptions = {
      includeQuery: false,
      trailingSlash: true,
      removeParams: ['utm_', 'ref', 'source', 'fbclid', 'gclid', 'msclkid', '_ga', '_gl'],
      lowercase: true,
      secure: true,
      normalizeSlashes: true,
    };
    const canonical = customCanonical || buildCanonical(route, canonicalOptions);

    // ------------------------------
    // Hreflang
    // ------------------------------
    const hreflang = !skipHreflang
      ? buildHreflang(route, {
          includeDefault: true,
          includeXDefault: true,
          locales: [...SEO_CONFIG.supportedLocales],
          countrySpecific: true,
          trailingSlash: true,
        } as HreflangOptions)
      : {};

    // ------------------------------
    // Metadata
    // ------------------------------
    const metadataInput: MetadataInput = {
      pageType: pageType.type,
      route,
      locale,
      canonical,
      data: { ...data, tags, author, publishedAt, updatedAt },
      queryParams,
      noindex: !shouldIndex,
      nofollow: !shouldFollow,
      priority,
      siteName: SEO_CONFIG.siteName,
    };

    let metadata = buildMetadata(metadataInput);
    metadata = enhanceMetadata(metadata, route, data);

    // ------------------------------
    // Structured Data
    // ------------------------------
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

    // ------------------------------
    // Resource Hints
    // ------------------------------
    const { links, preconnect, dnsPrefetch, preload, prefetch, prerender, modulePreload } =
      generateResourceHints(pageType, data, route);

    // ------------------------------
    // SEO Score
    // ------------------------------
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

    // Cache result
    seoCache.set(cacheKey, { output, timestamp: Date.now(), hits: 1 });
    cleanupCache();

    return output;
  } catch (err) {
    console.error('SEO generation failed:', err);
    return {
      metadata: {
        title: SEO_CONFIG.defaultTitle,
        description: SEO_CONFIG.defaultDescription,
        robots: 'index, follow',
      },
      structuredData: [],
      canonical: SEO_CONFIG.siteUrl,
      hreflang: { [SEO_CONFIG.defaultLocale]: SEO_CONFIG.siteUrl },
      pageType: { type: 'unknown', hierarchy: ['unknown'], metadata: {}, matches: null },
      links: [],
      preconnect: SEO_CONFIG.preconnect,
      dnsPrefetch: SEO_CONFIG.dnsPrefetch,
      preload: [],
      prefetch: [],
      prerender: [],
      modulePreload: [],
      metrics: { seoScore: 0, error: true } as any,
      warnings: ['SEO generation failed'],
    };
  }
});

// ============================================================
// Metadata Enhancer
// ============================================================
function enhanceMetadata(metadata: any, route: string, data: any) {
  const primary = SEO_CONFIG.primaryKeyword;
  if (metadata.title && !String(metadata.title).toLowerCase().includes(primary)) {
    metadata.title = `${metadata.title} | ${primary}`;
  }
  if (metadata.description && !String(metadata.description).includes('Start earning')) {
    metadata.description += ' Start earning today.';
  }
  metadata.keywords = Array.from(
    new Set([...(SEO_CONFIG.defaultKeywords || []), ...(SEO_CONFIG.secondaryKeywords || []), ...(data.keywords || []), ...(data.tags || [])])
  );
  return metadata;
}

// ============================================================
// SEO Score
// ============================================================
function calculateSEOScore(metadata: any, schema: object[], pageType: PageTypeResult, warnings: string[], suggestions: string[]): number {
  let score = 50;
  const titleLen = metadata.title ? String(metadata.title).length : 0;
  const descLen = metadata.description ? String(metadata.description).length : 0;

  if (titleLen >= 40 && titleLen <= 60) score += 10;
  if (descLen >= 120 && descLen <= 160) score += 10;
  if (metadata.keywords?.length >= 10) score += 10;
  if (schema.length > 2) score += 15;
  if (metadata.openGraph) score += 10;
  if (metadata.twitter) score += 5;
  if (metadata.canonical && !String(metadata.canonical).includes('undefined')) score += 5;
  if (Object.keys(metadata.alternates?.languages || {}).length > 1) score += 5;

  if (pageType.type === 'home') score += 5;
  if (pageType.type === 'blog_post' && metadata.datePublished) score += 5;

  score -= warnings.length * 2;
  score -= suggestions.length;

  return Math.min(Math.max(score, 0), 100);
}

// ============================================================
// Resource Hints
// ============================================================
function generateResourceHints(pageType: PageTypeResult, data: any, route: string) {
  const links: any[] = [];
  const preload: string[] = [];
  const prefetch: string[] = [];
  const modulePreload: string[] = [];
  const prerender: string[] = [];

  SEO_CONFIG.preconnect?.forEach(url => links.push({ rel: 'preconnect', href: url }));
  SEO_CONFIG.dnsPrefetch?.forEach(url => links.push({ rel: 'dns-prefetch', href: url }));

  if (pageType.type === 'home' && data.image) {
    preload.push(data.image);
    links.push({ rel: 'preload', href: data.image, as: 'image', importance: 'high' });
  }

  return { links, preload, prefetch, modulePreload, prerender, preconnect: SEO_CONFIG.preconnect, dnsPrefetch: SEO_CONFIG.dnsPrefetch };
}

// ============================================================
// Cache Utilities
// ============================================================
export function clearSEOCache(pattern?: RegExp) {
  if (!pattern) return seoCache.clear();
  for (const key of seoCache.keys()) if (pattern.test(key)) seoCache.delete(key);
}

export function getSEOCacheStats() {
  return {
    size: seoCache.size,
    hits: Array.from(seoCache.values()).reduce((acc, c) => acc + c.hits, 0),
  };
}

export default buildSEO;
