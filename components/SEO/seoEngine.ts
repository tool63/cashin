import { cache } from 'react';
import { PageTypeResult, detectPageType, isPaginated } from './pageTypes';
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

export interface SEOOutput {
  metadata: Record<string, any>;
  structuredData: object[];
  canonical: string;
  hreflang: Record<string, string>;
  pageType: PageTypeResult;
  links?: Array<{ rel: string; href: string; hreflang?: string }>;
  preconnect?: string[];
  prefetch?: string[];
  prerender?: string[];
  metrics?: SEOAnalytics;
}

// ============================================================
// Cache Layer (Memory Safe)
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

  const entries = Array.from(seoCache.entries());
  entries.sort((a, b) => a[1].timestamp - b[1].timestamp);

  while (seoCache.size > MAX_CACHE_SIZE * 0.8) {
    const [key] = entries.shift()!;
    seoCache.delete(key);
  }
}

// ============================================================
// SEO Engine (Cached)
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
    priority = 0.5,
    customCanonical,
    skipHreflang = false,
    skipSchema = false,
    cacheTTL = CACHE_TTL,
  } = input;

  const cacheKey = `${route}:${locale}:${JSON.stringify(queryParams)}`;

  const cached = seoCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < cacheTTL) {
    return {
      ...cached.output,
      metrics: trackSEOGeneration({
        pageType: cached.output.pageType.type,
        generationTime: 0,
        metadataSize: JSON.stringify(cached.output.metadata).length,
        schemaCount: cached.output.structuredData.length,
        cacheHit: true,
      }),
    };
  }

  try {
    // ========================================================
    // Page Type Detection (Safe)
    // ========================================================
    const pageType = detectPageType(route, queryParams) || {
      type: 'generic',
      hierarchy: ['generic'],
      metadata: {},
      matches: null,
    };

    // ========================================================
    // Indexing Rules
    // ========================================================
    const shouldIndex =
      !noindex &&
      !pageType.metadata.noindex &&
      !isPaginated(route) &&
      process.env.NODE_ENV === 'production';

    const shouldFollow = !nofollow && !pageType.metadata.nofollow;

    // ========================================================
    // Canonical URL
    // ========================================================
    const canonicalOptions: CanonicalOptions = {
      includeQuery: !pageType.metadata.isPaginated,
      trailingSlash: true,
      removeParams: ['utm_', 'ref', 'source', 'fbclid', 'gclid'],
    };

    const canonical = customCanonical || buildCanonical(route, canonicalOptions);

    // ========================================================
    // Hreflang (Optional)
    // ========================================================
    const hreflang = !skipHreflang
      ? buildHreflang(route, {
          includeDefault: true,
          includeXDefault: true,
          locales: SEO_CONFIG.supportedLocales,
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

    const metadata = buildMetadata(metadataInput);

    // ========================================================
    // Structured Data (Schema)
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
    // Resource Hints
    // ========================================================
    const links = generateResourceHints(pageType, data);
    const preconnect = SEO_CONFIG.preconnect;
    const prefetch = generatePrefetchUrls(pageType);
    const prerender = generatePrerenderUrls(pageType, route);

    // ========================================================
    // Analytics (SEO Performance)
    // ========================================================
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
      metrics,
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
        viewport: 'width=device-width, initial-scale=1',
      },
      structuredData: [],
      canonical: SEO_CONFIG.siteUrl,
      hreflang: { [SEO_CONFIG.defaultLocale]: SEO_CONFIG.siteUrl },
      pageType: {
        type: 'unknown',
        hierarchy: ['unknown'],
        metadata: {},
        matches: null,
      },
      links: [],
      preconnect: SEO_CONFIG.preconnect,
      metrics: trackSEOGeneration({
        pageType: 'unknown',
        generationTime: Date.now() - startTime,
        metadataSize: 0,
        schemaCount: 0,
        cacheHit: false,
        error: true,
      }),
    };
  }
});

// ============================================================
// Resource Hints
// ============================================================
function generateResourceHints(
  pageType: PageTypeResult,
  data: any
): Array<{ rel: string; href: string; hreflang?: string }> {
  const hints: Array<{ rel: string; href: string; hreflang?: string }> = [];

  const dnsPrefetch = [
    'https://api.cashog.com',
    'https://images.cashog.com',
    'https://fonts.googleapis.com',
  ];

  dnsPrefetch.forEach((url) => {
    hints.push({ rel: 'dns-prefetch', href: url });
  });

  SEO_CONFIG.preconnect?.forEach((url) => {
    hints.push({ rel: 'preconnect', href: url });
  });

  switch (pageType.type) {
    case 'home':
      hints.push({ rel: 'preload', href: '/images/hero.webp', as: 'image' });
      break;

    case 'earn_offer':
      if (data?.image) {
        hints.push({ rel: 'preload', href: data.image, as: 'image' });
      }
      break;
  }

  return hints;
}

// ============================================================
// Prefetch URLs
// ============================================================
function generatePrefetchUrls(pageType: PageTypeResult): string[] {
  switch (pageType.type) {
    case 'home':
      return ['/earn', '/blog', '/rewards'];

    case 'blog':
      return ['/blog/popular', '/blog/recent'];

    default:
      return [];
  }
}

// ============================================================
// Prerender URLs
// ============================================================
function generatePrerenderUrls(pageType: PageTypeResult, route: string): string[] {
  const urls: string[] = [];

  if (pageType.type === 'earn_category' && route.includes('/category/')) {
    urls.push(route.replace('/category/', '/'));
  }

  return urls;
}

// ============================================================
// Cache Utilities
// ============================================================
export function clearSEOCache(pattern?: RegExp) {
  if (pattern) {
    for (const key of seoCache.keys()) {
      if (pattern.test(key)) {
        seoCache.delete(key);
      }
    }
  } else {
    seoCache.clear();
  }
}
