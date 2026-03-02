import { cache } from 'react';
import { PageTypeResult, detectPageType, isPaginated } from './pageTypes';
import { buildMetadata, MetadataInput } from './metadata';
import { buildStructuredData, SchemaInput } from './schema';
import { buildCanonical, CanonicalOptions } from './canonical';
import { buildHreflang, HreflangOptions } from './hreflang';
import { SEO_CONFIG } from './seoConfig';
import { SEOAnalytics, trackSEOGeneration } from './seoAnalytics';

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

// Cache SEO results
const seoCache = new Map<string, { output: SEOOutput; timestamp: number }>();
const CACHE_TTL = 3600000; // 1 hour

export const buildSEO = cache(async (input: SEOInput): Promise<SEOOutput> => {
  const startTime = Date.now();
  
  const {
    route,
    locale = SEO_CONFIG.defaultLocale,
    data = {},
    queryParams = {},
    parentRoute,
    noindex = false,
    nofollow = false,
    priority = 0.5,
    customCanonical,
    skipHreflang = false,
    skipSchema = false,
    cacheTTL = CACHE_TTL,
  } = input;

  // Check cache
  const cacheKey = `${route}:${locale}:${JSON.stringify(queryParams)}`;
  const cached = seoCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < cacheTTL) {
    return cached.output;
  }

  try {
    // 1️⃣ Detect page type with hierarchy
    const pageType = detectPageType(route, queryParams);
    
    // 2️⃣ Determine if page should be indexed
    const shouldIndex = !noindex && 
                       !pageType.metadata.noindex && 
                       !isPaginated(route) &&
                       process.env.NODE_ENV === 'production';
    
    const shouldFollow = !nofollow && !pageType.metadata.nofollow;
    
    // 3️⃣ Build canonical URL with options
    const canonicalOptions: CanonicalOptions = {
      includeQuery: !pageType.metadata.isPaginated,
      trailingSlash: true,
      removeParams: ['utm_', 'ref', 'source', 'fbclid', 'gclid'],
    };
    
    const canonical = customCanonical || buildCanonical(route, canonicalOptions);
    
    // 4️⃣ Build hreflang map
    const hreflang = !skipHreflang ? buildHreflang(route, {
      includeDefault: true,
      includeXDefault: true,
      locales: SEO_CONFIG.supportedLocales,
    }) : {};
    
    // 5️⃣ Build metadata with enhanced options
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
    
    // 6️⃣ Build structured data
    const structuredData = !skipSchema ? buildStructuredData({
      pageType: pageType.type,
      route,
      data,
      canonical,
      metadata,
      pageTypeHierarchy: pageType.hierarchy,
    } as SchemaInput) : [];
    
    // 7️⃣ Generate resource hints
    const links = generateResourceHints(pageType, data);
    const preconnect = SEO_CONFIG.preconnect;
    const prefetch = generatePrefetchUrls(pageType, route);
    const prerender = generatePrerenderUrls(pageType, route);
    
    // 8️⃣ Track metrics
    const metrics = trackSEOGeneration({
      pageType: pageType.type,
      duration: Date.now() - startTime,
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
    
    // Cache the result
    seoCache.set(cacheKey, { output, timestamp: Date.now() });
    
    return output;
    
  } catch (error) {
    console.error('SEO generation failed:', error);
    
    // Return graceful fallback
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
      pageType: { type: 'unknown', hierarchy: ['unknown'], metadata: {}, matches: null },
      links: [],
      preconnect: SEO_CONFIG.preconnect,
      metrics: trackSEOGeneration({
        pageType: 'unknown',
        duration: Date.now() - startTime,
        metadataSize: 0,
        schemaCount: 0,
        cacheHit: false,
        error: true,
      }),
    };
  }
});

// Resource hint generators
function generateResourceHints(pageType: PageTypeResult, data: any): Array<{ rel: string; href: string; hreflang?: string }> {
  const hints: Array<{ rel: string; href: string; hreflang?: string }> = [];
  
  // DNS prefetch for critical domains
  const dnsPrefetch = [
    'https://api.cashog.com',
    'https://images.cashog.com',
    'https://fonts.googleapis.com',
  ];
  
  dnsPrefetch.forEach(url => {
    hints.push({ rel: 'dns-prefetch', href: url });
  });
  
  // Preconnect for critical origins
  SEO_CONFIG.preconnect?.forEach(url => {
    hints.push({ rel: 'preconnect', href: url });
  });
  
  // Preload critical assets based on page type
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

function generatePrefetchUrls(pageType: PageTypeResult, route: string): string[] {
  const urls: string[] = [];
  
  // Prefetch likely next pages
  if (pageType.type === 'home') {
    urls.push('/earn', '/blog', '/rewards');
  } else if (pageType.type === 'blog') {
    urls.push('/blog/popular', '/blog/recent');
  }
  
  return urls;
}

function generatePrerenderUrls(pageType: PageTypeResult, route: string): string[] {
  const urls: string[] = [];
  
  // Prerender high-probability next pages
  if (pageType.type === 'earn_category' && route.includes('/earn/category/')) {
    urls.push(route.replace('/category/', '/'));
  }
  
  return urls;
}

// Utility to clear cache
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
