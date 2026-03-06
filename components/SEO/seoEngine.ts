// components/SEO/seoEngine.ts

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
  parentRoute?: string;
  noindex?: boolean;
  nofollow?: boolean;
  priority?: number;
  customCanonical?: string;
  skipHreflang?: boolean;
  skipSchema?: boolean;
  cacheTTL?: number;
}

export interface LinkHint {
  rel: string;
  href: string;
  hreflang?: string;
  as?: string;
  type?: string;
  crossOrigin?: string;
  media?: string;
  imagesrcset?: string;
  imagesizes?: string;
}

export interface SEOOutput {
  metadata: Record<string, any>;
  structuredData: object[];
  canonical: string;
  hreflang: Record<string, string>;
  pageType: PageTypeResult;
  links?: LinkHint[];
  preconnect?: readonly string[];
  prefetch?: readonly string[];
  prerender?: readonly string[];
  metrics?: SEOAnalytics & { seoScore?: number };
}

// ============================================================
// Smart Cache
// ============================================================
interface CachedSEO {
  output: SEOOutput;
  timestamp: number;
}

const seoCache = new Map<string, CachedSEO>();
const CACHE_TTL = 3600000; // 1 hour
const MAX_CACHE_SIZE = 500;

function cleanupCache() {
  if (seoCache.size <= MAX_CACHE_SIZE) return;

  const sorted = Array.from(seoCache.entries()).sort(
    (a, b) => a[1].timestamp - b[1].timestamp
  );

  while (seoCache.size > MAX_CACHE_SIZE * 0.8) {
    const [key] = sorted.shift()!;
    seoCache.delete(key);
  }
}

// ============================================================
// Ultra SEO Engine
// ============================================================
export const buildSEO = cache(async (input: SEOInput): Promise<SEOOutput> => {
  const startTime = Date.now();

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
    cacheTTL = CACHE_TTL,
  } = input;

  const cacheKey = `${route}:${locale}:${JSON.stringify(queryParams)}`;
  const cached = seoCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < cacheTTL) {
    return cached.output;
  }

  try {
    // ========================================================
    // Page Detection (Type Safe)
    // ========================================================
    const detected = detectPageType(route, queryParams);
    const pageType: PageTypeResult = detected
      ? detected
      : {
          type: 'unknown' as PageType,
          hierarchy: ['unknown'] as PageType[],
          metadata: {},
          matches: null,
        };

    const isProduction = process.env.NODE_ENV === 'production';

    const shouldIndex =
      !noindex &&
      !(pageType.metadata as any)?.noindex &&
      !isPaginated(route) &&
      isProduction;

    const shouldFollow = !nofollow && !(pageType.metadata as any)?.nofollow;

    // ========================================================
    // Canonical
    // ========================================================
    const canonicalOptions: CanonicalOptions = {
      includeQuery: false,
      trailingSlash: true,
      removeParams: ['utm_', 'ref', 'source', 'fbclid', 'gclid'],
    };

    const canonical =
      customCanonical || buildCanonical(route, canonicalOptions);

    // ========================================================
    // Hreflang
    // ========================================================
    const hreflang = !skipHreflang
      ? buildHreflang(route, {
          includeDefault: true,
          includeXDefault: true,
          locales: [...SEO_CONFIG.supportedLocales],
        } as HreflangOptions)
      : {};

    // ========================================================
    // Metadata
    // ========================================================
    const metadataInput: MetadataInput = {
      pageType: pageType.type,
      route,
      locale,
      canonical,
      data,
      queryParams,
      noindex: !shouldIndex,
      nofollow: !shouldFollow,
      priority,
      siteName: SEO_CONFIG.siteName,
    };

    let metadata = buildMetadata(metadataInput);

    metadata = enhanceMetadata(metadata, route);

    // ========================================================
    // Structured Data
    // ========================================================
    const structuredData = !skipSchema
      ? buildStructuredData({
          pageType: pageType.type,
          route,
          data,
          canonical,
          metadata,
          pageTypeHierarchy: pageType.hierarchy,
        } as SchemaInput)
      : [];

    // ========================================================
    // Resources
    // ========================================================
    const links = generateResourceHints(pageType, data);
    const preconnect = SEO_CONFIG.preconnect;
    const prefetch = generatePrefetchUrls(pageType);
    const prerender = generatePrerenderUrls(pageType, route);

    // ========================================================
    // SEO Score
    // ========================================================
    const seoScore = calculateSEOScore(metadata, structuredData);

    const metrics = trackSEOGeneration({
      pageType: pageType.type,
      generationTime: Date.now() - startTime,
      metadataSize: JSON.stringify(metadata).length,
      schemaCount: structuredData.length,
      cacheHit: false,
    });

    const output: SEOOutput = {
      metadata,
      structuredData,
      canonical,
      hreflang,
      pageType,
      links,
      preconnect,
      prefetch,
      prerender,
      metrics: { ...metrics, seoScore },
    };

    seoCache.set(cacheKey, { output, timestamp: Date.now() });
    cleanupCache();

    return output;
  } catch (error) {
    console.error('SEO generation failed:', error);

    return {
      metadata: {
        title: SEO_CONFIG.defaultTitle,
        description: SEO_CONFIG.defaultDescription,
        robots: 'index, follow',
      },
      structuredData: [],
      canonical: SEO_CONFIG.siteUrl,
      hreflang: { [SEO_CONFIG.defaultLocale]: SEO_CONFIG.siteUrl },
      pageType: {
        type: 'unknown' as PageType,
        hierarchy: ['unknown'] as PageType[],
        metadata: {},
        matches: null,
      },
      links: [],
      preconnect: SEO_CONFIG.preconnect,
      metrics: { seoScore: 50 } as any,
    };
  }
});

// ============================================================
// Helpers
// ============================================================
function enhanceMetadata(metadata: any, route: string) {
  const primary = SEO_CONFIG.primaryKeyword;

  if (metadata.title && !metadata.title.toLowerCase().includes(primary)) {
    metadata.title = `${metadata.title} | ${primary}`;
  }

  if (metadata.description && !metadata.description.includes('Start earning')) {
    metadata.description += ' Start earning today.';
  }

  metadata.keywords = [
    ...(SEO_CONFIG.defaultKeywords || []),
    ...(SEO_CONFIG.secondaryKeywords || []),
  ];

  return metadata;
}

function calculateSEOScore(metadata: any, schema: object[]): number {
  let score = 50;

  if (metadata.title?.length > 40) score += 10;
  if (metadata.description?.length > 120) score += 10;
  if (metadata.keywords?.length > 10) score += 10;
  if (schema.length > 0) score += 10;
  if (metadata.openGraph) score += 5;
  if (metadata.twitter) score += 5;

  return Math.min(score, 100);
}

// ============================================================
// Resource Hints
// ============================================================
function generateResourceHints(pageType: PageTypeResult, data: any): LinkHint[] {
  const hints: LinkHint[] = [];

  // Add preconnect hints from config
  SEO_CONFIG.preconnect?.forEach((url) => {
    hints.push({ rel: 'preconnect', href: url });
  });

  // Add DNS prefetch for external domains
  SEO_CONFIG.dnsPrefetch?.forEach((url) => {
    hints.push({ rel: 'dns-prefetch', href: url });
  });

  // Add page-specific preloads with proper 'as' attribute
  if (pageType.type === 'home') {
    hints.push({ 
      rel: 'preload', 
      href: '/images/hero.webp', 
      as: 'image',
      type: 'image/webp'
    });
  }

  if (data?.image) {
    hints.push({ 
      rel: 'preload', 
      href: data.image, 
      as: 'image' 
    });
  }

  if (data?.video) {
    hints.push({ 
      rel: 'preload', 
      href: data.video, 
      as: 'video' 
    });
  }

  // Add font preloading for better LCP
  if (pageType.type === 'home' || 
      pageType.type === 'static' || 
      pageType.type === 'earn' ||
      pageType.type === 'blog' ||
      pageType.type === 'unknown') {
    hints.push({
      rel: 'preload',
      href: '/fonts/inter-var.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous'
    });
  }

  // Add preconnect for critical third-party domains
  hints.push(
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' }
  );

  return hints;
}

function generatePrefetchUrls(pageType: PageTypeResult): readonly string[] {
  switch (pageType.type) {
    case 'home':
      return ['/surveys', '/offerwall', '/earn-paypal-money'] as const;
    case 'earn_category':
      return ['/earn/surveys', '/earn/offers'] as const;
    case 'blog':
      return ['/blog/popular', '/blog/latest'] as const;
    default:
      return [] as const;
  }
}

function generatePrerenderUrls(pageType: PageTypeResult, route: string): readonly string[] {
  if (pageType.type === 'earn_category') {
    return ['/earn-paypal-money'] as const;
  }
  
  if (pageType.type === 'home') {
    return ['/how-it-works'] as const;
  }
  
  return [] as const;
}

// ============================================================
// Cache Control
// ============================================================
export function clearSEOCache(pattern?: RegExp) {
  if (!pattern) {
    seoCache.clear();
    return;
  }

  for (const key of seoCache.keys()) {
    if (pattern.test(key)) {
      seoCache.delete(key);
    }
  }
}

// ============================================================
// Cache Stats (for monitoring)
// ============================================================
export function getSEOCacheStats() {
  return {
    size: seoCache.size,
    maxSize: MAX_CACHE_SIZE,
    keys: Array.from(seoCache.keys()),
    oldestTimestamp: seoCache.size > 0 
      ? Math.min(...Array.from(seoCache.values()).map(v => v.timestamp))
      : null,
    newestTimestamp: seoCache.size > 0
      ? Math.max(...Array.from(seoCache.values()).map(v => v.timestamp))
      : null,
  };
}

// ============================================================
// Warm Cache (for critical pages)
// ============================================================
export async function warmSEOCache(routes: string[]) {
  const results = await Promise.allSettled(
    routes.map(route => 
      buildSEO({ route }).catch(err => {
        console.error(`Failed to warm cache for ${route}:`, err);
        return null;
      })
    )
  );

  return {
    total: routes.length,
    succeeded: results.filter(r => r.status === 'fulfilled').length,
    failed: results.filter(r => r.status === 'rejected').length,
  };
}

// ============================================================
// Debug Helper
// ============================================================
export function debugSEO(route: string) {
  const cleanRoute = route.split('?')[0].split('#')[0];
  const detected = detectPageType(cleanRoute);
  
  return {
    route: cleanRoute,
    detected,
    cached: seoCache.has(route),
    config: {
      siteUrl: SEO_CONFIG.siteUrl,
      defaultLocale: SEO_CONFIG.defaultLocale,
      supportedLocales: SEO_CONFIG.supportedLocales,
    },
  };
}

// ============================================================
// Default Export
// ============================================================
export default buildSEO;
