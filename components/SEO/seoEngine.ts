// components/SEO/seoEngine.ts (ULTRA-PREMIUM VERSION - COMPLETE FIX)

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
  tags?: string[];
  author?: string;
  publishedAt?: string;
  updatedAt?: string;
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
  title?: string;
  importance?: 'high' | 'low' | 'auto';
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
  preload?: readonly string[];
  dnsPrefetch?: readonly string[];
  modulePreload?: readonly string[];
  metrics?: SEOAnalytics & { seoScore?: number };
  warnings?: string[];
  suggestions?: string[];
}

// ============================================================
// Smart Cache with LRU
// ============================================================
interface CachedSEO {
  output: SEOOutput;
  timestamp: number;
  hits: number;
}

const seoCache = new Map<string, CachedSEO>();
const CACHE_TTL = 3600000; // 1 hour
const MAX_CACHE_SIZE = 500;
const CACHE_CLEANUP_INTERVAL = 300000; // 5 minutes

// Automatic cache cleanup (only on server)
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of seoCache.entries()) {
      if (now - value.timestamp > CACHE_TTL) {
        seoCache.delete(key);
      }
    }
    cleanupCache();
  }, CACHE_CLEANUP_INTERVAL);
}

function cleanupCache() {
  if (seoCache.size <= MAX_CACHE_SIZE) return;

  // Sort by hits (least popular first) and timestamp (oldest first)
  const sorted = Array.from(seoCache.entries()).sort((a, b) => {
    if (a[1].hits !== b[1].hits) return a[1].hits - b[1].hits;
    return a[1].timestamp - b[1].timestamp;
  });

  while (seoCache.size > MAX_CACHE_SIZE * 0.8) {
    const [key] = sorted.shift()!;
    seoCache.delete(key);
  }
}

// ============================================================
// Ultra Premium SEO Engine
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
    cacheTTL = CACHE_TTL,
    tags = [],
    author,
    publishedAt,
    updatedAt,
  } = input;

  const cacheKey = `${route}:${locale}:${JSON.stringify(queryParams)}`;
  const cached = seoCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < cacheTTL) {
    cached.hits++;
    return cached.output;
  }

  try {
    // ========================================================
    // Page Detection with Enhanced Metadata
    // ========================================================
    const detected = detectPageType(route, queryParams);
    const pageType: PageTypeResult = detected
      ? detected
      : {
          type: 'unknown' as PageType,
          hierarchy: ['unknown'] as PageType[],
          metadata: { noindex: false, nofollow: false },
          matches: null,
        };

    const isProduction = process.env.NODE_ENV === 'production';

    // Advanced indexing rules
    const shouldIndex =
      !noindex &&
      !(pageType.metadata as any)?.noindex &&
      !isPaginated(route) &&
      isProduction &&
      !route.includes('preview') &&
      !route.includes('draft') &&
      !route.includes('test');

    const shouldFollow = !nofollow && !(pageType.metadata as any)?.nofollow;

    // Generate warnings for SEO issues
    if (!pageType.metadata && route !== '/') {
      warnings.push('Page type metadata missing');
    }

    if (route.length > 100) {
      warnings.push('URL path is too long (>100 characters)');
    }

    // ========================================================
    // Canonical with Advanced Options
    // ========================================================
    const canonicalOptions: CanonicalOptions = {
      includeQuery: false,
      trailingSlash: true,
      removeParams: ['utm_', 'ref', 'source', 'fbclid', 'gclid', 'msclkid', 'mc_', '_ga', '_gl'],
      lowercase: true,
      secure: true,
      normalizeSlashes: true,
    };

    const canonical = customCanonical || buildCanonical(route, canonicalOptions);

    // Validate canonical
    if (canonical.includes('undefined') || canonical.includes('null')) {
      warnings.push('Canonical URL contains invalid parts');
    }

    // ========================================================
    // Hreflang with Full Internationalization
    // ========================================================
    const hreflang = !skipHreflang
      ? buildHreflang(route, {
          includeDefault: true,
          includeXDefault: true,
          locales: [...SEO_CONFIG.supportedLocales],
          countrySpecific: true,
          allowQuery: false,
          trailingSlash: true,
        } as HreflangOptions)
      : {};

    // Validate hreflang
    if (Object.keys(hreflang).length === 0 && !skipHreflang) {
      warnings.push('No hreflang tags generated');
    }

    // ========================================================
    // Enhanced Metadata with All Fields
    // ========================================================
    const metadataInput: MetadataInput = {
      pageType: pageType.type,
      route,
      locale,
      canonical,
      data: {
        ...data,
        tags,
        author,
        publishedAt,
        updatedAt,
      },
      queryParams,
      noindex: !shouldIndex,
      nofollow: !shouldFollow,
      priority,
      siteName: SEO_CONFIG.siteName,
    };

    let metadata = buildMetadata(metadataInput);
    metadata = enhanceMetadata(metadata, route, data);

    // ========================================================
    // Generate SEO Suggestions - FIXED TYPE SAFETY
    // ========================================================
    // Convert metadata to string safely for length checks
    const titleStr = metadata.title ? String(metadata.title) : '';
    const descStr = metadata.description ? String(metadata.description) : '';

    if (!titleStr) {
      suggestions.push('Title is missing');
    } else if (titleStr.length < 30) {
      suggestions.push('Title is too short (minimum 30 characters recommended)');
    } else if (titleStr.length > 60) {
      suggestions.push('Title is too long (maximum 60 characters recommended)');
    }

    if (!descStr) {
      suggestions.push('Description is missing');
    } else if (descStr.length < 120) {
      suggestions.push('Description is too short (minimum 120 characters recommended)');
    } else if (descStr.length > 160) {
      suggestions.push('Description is too long (maximum 160 characters recommended)');
    }

    // ========================================================
    // Open Graph Image Check - FIXED TYPE SAFETY
    // ========================================================
    // Safely check if Open Graph images exist
    const hasOgImage = (() => {
      if (!metadata.openGraph) return false;
      
      const images = metadata.openGraph.images;
      if (!images) return false;
      
      // Check if it's an array with at least one item
      if (Array.isArray(images) && images.length > 0) return true;
      
      // Check if it's a single image object
      if (typeof images === 'object' && images !== null) return true;
      
      return false;
    })();

    if (!hasOgImage) {
      suggestions.push('Open Graph image is missing');
    }

    // ========================================================
    // Advanced Structured Data
    // ========================================================
    const structuredData = !skipSchema
      ? buildStructuredData({
          pageType: pageType.type,
          route,
          data: {
            ...data,
            tags,
            author,
            publishedAt,
            updatedAt,
          },
          canonical,
          metadata,
          pageTypeHierarchy: pageType.hierarchy,
        } as SchemaInput)
      : [];

    // ========================================================
    // Comprehensive Resource Hints
    // ========================================================
    const resourceHints = generateAllResourceHints(pageType, data, route);
    const { links, preconnect, dnsPrefetch, preload, prefetch, prerender, modulePreload } = resourceHints;

    // ========================================================
    // Advanced SEO Score Calculation - FIXED TYPE SAFETY
    // ========================================================
    const seoScore = calculateAdvancedSEOScore(metadata, structuredData, pageType, warnings, suggestions);

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
      warnings: warnings.length > 0 ? warnings : undefined,
      suggestions: suggestions.length > 0 ? suggestions : undefined,
    };

    // Cache the result
    seoCache.set(cacheKey, { output, timestamp: Date.now(), hits: 1 });

    return output;
  } catch (error) {
    console.error('🚨 SEO generation failed:', error);

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
// Advanced Helpers
// ============================================================
function enhanceMetadata(metadata: any, route: string, data: any) {
  const primary = SEO_CONFIG.primaryKeyword;

  // Smart title enhancement
  if (metadata.title) {
    const titleStr = String(metadata.title);
    if (!titleStr.toLowerCase().includes(primary)) {
      metadata.title = `${titleStr} | ${primary}`;
    }
    if (data.page && data.page > 1) {
      metadata.title = `Page ${data.page} - ${titleStr}`;
    }
  }

  // Smart description enhancement
  if (metadata.description) {
    const descStr = String(metadata.description);
    if (!descStr.includes('Start earning')) {
      metadata.description = descStr + ' Start earning today.';
    }
    if (data.query) {
      metadata.description = `Results for "${data.query}". ${descStr}`;
    }
  }

  // Keywords deduplication
  metadata.keywords = Array.from(new Set([
    ...(SEO_CONFIG.defaultKeywords || []),
    ...(SEO_CONFIG.secondaryKeywords || []),
    ...(data.keywords || []),
    ...(data.tags || []),
  ]));

  return metadata;
}

function calculateAdvancedSEOScore(
  metadata: any, 
  schema: object[], 
  pageType: PageTypeResult,
  warnings: string[],
  suggestions: string[]
): number {
  let score = 50; // Base score

  // Safe string conversion for metadata fields
  const titleStr = metadata.title ? String(metadata.title) : '';
  const descStr = metadata.description ? String(metadata.description) : '';

  // Title optimization (15 points)
  if (titleStr) {
    if (titleStr.length >= 40 && titleStr.length <= 60) score += 10;
    else if (titleStr.length > 60) score += 5;
    else score -= 5;
  }

  // Description optimization (15 points)
  if (descStr) {
    if (descStr.length >= 120 && descStr.length <= 160) score += 10;
    else if (descStr.length > 160) score += 5;
    else score -= 5;
  }

  // Keywords (10 points)
  if (metadata.keywords?.length >= 10) score += 10;
  else if (metadata.keywords?.length >= 5) score += 5;

  // Structured data (15 points)
  if (schema.length > 2) score += 15;
  else if (schema.length > 0) score += 10;

  // Open Graph (10 points)
  if (metadata.openGraph) {
    score += 5;
    
    // Safely check if Open Graph images exist
    const hasOgImage = (() => {
      const images = metadata.openGraph.images;
      if (!images) return false;
      if (Array.isArray(images) && images.length > 0) return true;
      if (typeof images === 'object' && images !== null) return true;
      return false;
    })();
    
    if (hasOgImage) score += 5;
  }

  // Twitter Cards (5 points)
  if (metadata.twitter) score += 5;

  // Canonical (5 points)
  if (metadata.canonical && !String(metadata.canonical).includes('undefined')) score += 5;

  // Hreflang (5 points)
  if (Object.keys(metadata.alternates?.languages || {}).length > 1) score += 5;

  // Page type specific bonuses
  if (pageType.type === 'home') score += 5;
  if (pageType.type === 'blog_post' && metadata.datePublished) score += 5;

  // Penalties for warnings/suggestions
  score -= warnings.length * 2;
  score -= suggestions.length;

  return Math.min(Math.max(score, 0), 100);
}

// ============================================================
// Comprehensive Resource Hints Generator
// ============================================================
interface ResourceHintsOutput {
  links: LinkHint[];
  preconnect: readonly string[];
  dnsPrefetch: readonly string[];
  preload: readonly string[];
  prefetch: readonly string[];
  prerender: readonly string[];
  modulePreload: readonly string[];
}

function generateAllResourceHints(
  pageType: PageTypeResult, 
  data: any,
  route: string
): ResourceHintsOutput {
  const links: LinkHint[] = [];
  const preload: string[] = [];
  const prefetch: string[] = [];
  const modulePreload: string[] = [];

  // ========================================================
  // Preconnect (Critical Origins)
  // ========================================================
  SEO_CONFIG.preconnect?.forEach((url) => {
    links.push({ rel: 'preconnect', href: url });
  });

  // ========================================================
  // DNS Prefetch
  // ========================================================
  SEO_CONFIG.dnsPrefetch?.forEach((url) => {
    links.push({ rel: 'dns-prefetch', href: url });
  });

  // ========================================================
  // Critical Image Preloads
  // ========================================================
  if (pageType.type === 'home') {
    preload.push('/images/hero.webp');
    links.push({ 
      rel: 'preload', 
      href: '/images/hero.webp', 
      as: 'image',
      type: 'image/webp',
      importance: 'high'
    });
  }

  if (data?.image) {
    preload.push(data.image);
    links.push({ 
      rel: 'preload', 
      href: data.image, 
      as: 'image',
      importance: 'high'
    });
  }

  if (data?.video) {
    preload.push(data.video);
    links.push({ 
      rel: 'preload', 
      href: data.video, 
      as: 'video',
      importance: 'high'
    });
  }

  // ========================================================
  // Font Preloading (Critical for LCP)
  // ========================================================
  if (shouldPreloadFonts(pageType.type)) {
    preload.push('/fonts/inter-var.woff2');
    links.push({
      rel: 'preload',
      href: '/fonts/inter-var.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
      importance: 'high'
    });
  }

  // ========================================================
  // Module Preload (Critical JS)
  // ========================================================
  if (pageType.type === 'home') {
    modulePreload.push('/_next/static/chunks/app/page.js');
    links.push({
      rel: 'modulepreload',
      href: '/_next/static/chunks/app/page.js',
      importance: 'high'
    });
  }

  // ========================================================
  // Prefetch (Next Page Predictions)
  // ========================================================
  const prefetchUrls = generatePrefetchUrls(pageType);
  prefetchUrls.forEach(url => {
    prefetch.push(url);
    links.push({ rel: 'prefetch', href: url, importance: 'low' });
  });

  // ========================================================
  // Prerender (Critical Next Pages)
  // ========================================================
  const prerenderUrls = generatePrerenderUrls(pageType, route);
  prerenderUrls.forEach(url => {
    links.push({ rel: 'prerender', href: url, importance: 'low' });
  });

  return {
    links,
    preconnect: SEO_CONFIG.preconnect,
    dnsPrefetch: SEO_CONFIG.dnsPrefetch,
    preload: preload as readonly string[],
    prefetch: prefetch as readonly string[],
    prerender: prerenderUrls as readonly string[],
    modulePreload: modulePreload as readonly string[],
  };
}

function shouldPreloadFonts(pageType: PageType): boolean {
  const fontCriticalPages: PageType[] = [
    'home', 'static', 'earn', 'blog', 
    'unknown', 'rewards', 'cashback'
  ];
  return fontCriticalPages.includes(pageType);
}

function generatePrefetchUrls(pageType: PageTypeResult): readonly string[] {
  switch (pageType.type) {
    case 'home':
      return ['/surveys', '/offerwall', '/earn-paypal-money', '/how-it-works'] as const;
    case 'earn_category':
      return ['/earn/surveys', '/earn/offers', '/earn/games'] as const;
    case 'blog':
      return ['/blog/popular', '/blog/latest', '/blog/categories'] as const;
    case 'rewards':
      return ['/rewards/paypal', '/rewards/giftcards', '/rewards/crypto'] as const;
    default:
      return [] as const;
  }
}

function generatePrerenderUrls(pageType: PageTypeResult, route: string): readonly string[] {
  if (pageType.type === 'earn_category') {
    return ['/earn-paypal-money'] as const;
  }
  
  if (pageType.type === 'home') {
    return ['/how-it-works', '/start-earning'] as const;
  }
  
  if (pageType.type === 'blog' && route === '/blog') {
    return ['/blog/latest'] as const;
  }
  
  return [] as const;
}

// ============================================================
// Cache Management API
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

export function getSEOCacheStats() {
  return {
    size: seoCache.size,
    maxSize: MAX_CACHE_SIZE,
    hits: Array.from(seoCache.values()).reduce((acc, curr) => acc + curr.hits, 0),
    keys: Array.from(seoCache.keys()),
    oldestTimestamp: seoCache.size > 0 
      ? Math.min(...Array.from(seoCache.values()).map(v => v.timestamp))
      : null,
    newestTimestamp: seoCache.size > 0
      ? Math.max(...Array.from(seoCache.values()).map(v => v.timestamp))
      : null,
    memoryUsage: JSON.stringify(Array.from(seoCache.entries())).length,
  };
}

// ============================================================
// Warm Cache (Pre-generate critical pages)
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
    routes,
  };
}

// ============================================================
// SEO Audit Tool
// ============================================================
export async function auditSEO(route: string) {
  const seo = await buildSEO({ route });
  
  // Safe string conversions for metadata
  const titleStr = seo.metadata.title ? String(seo.metadata.title) : '';
  const descStr = seo.metadata.description ? String(seo.metadata.description) : '';

  // Safely check if Open Graph images exist
  const hasOgImage = (() => {
    if (!seo.metadata.openGraph) return false;
    const images = seo.metadata.openGraph.images;
    if (!images) return false;
    if (Array.isArray(images) && images.length > 0) return true;
    if (typeof images === 'object' && images !== null) return true;
    return false;
  })();

  return {
    url: route,
    score: seo.metrics?.seoScore || 0,
    warnings: seo.warnings || [],
    suggestions: seo.suggestions || [],
    pageType: seo.pageType.type,
    metadata: {
      title: seo.metadata.title,
      description: seo.metadata.description,
      titleLength: titleStr.length,
      descriptionLength: descStr.length,
      hasOgImage,
      hasTwitterCard: !!seo.metadata.twitter,
      schemaCount: seo.structuredData.length,
    },
    performance: {
      generationTime: seo.metrics?.generationTime,
      cacheHit: seo.metrics?.cacheHit,
    },
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
    cacheEntry: seoCache.get(route),
    config: {
      siteUrl: SEO_CONFIG.siteUrl,
      defaultLocale: SEO_CONFIG.defaultLocale,
      supportedLocales: SEO_CONFIG.supportedLocales,
      preconnect: SEO_CONFIG.preconnect,
      dnsPrefetch: SEO_CONFIG.dnsPrefetch,
    },
  };
}

// ============================================================
// Exports
// ============================================================
export default buildSEO;
