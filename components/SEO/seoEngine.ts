// components/SEO/seoEngine.ts
export interface OpenGraphImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

export interface OpenGraph {
  type?: string;
  url?: string;
  title?: string;
  description?: string;
  siteName?: string;
  locale?: string;
  images?: OpenGraphImage[];
}

export interface Twitter {
  card?: string;
  site?: string;
  images?: string[];
  imageAlt?: string;
}

export interface PageType {
  type: string;
  hierarchy: string[];
  metadata: Record<string, any>;
  matches: any;
}

export interface Metrics {
  pageType: string;
  generationTime: number;
  metadataSize: number;
  schemaCount: number;
  cacheHit: boolean;
  warnings: number;
  suggestions: number;
  seoScore: number;
  timestamp: number;
}

export interface SEOOutput {
  metadata: {
    title: string;
    description?: string;
    keywords?: string[];
    robots?: string;
    openGraph?: OpenGraph;
    twitter?: Twitter;
    viewport?: string;
    other?: Record<string, string>;
  };
  canonical?: string;
  hreflang?: Record<string, string>;
  structuredData?: any[];
  pageType?: PageType;
  links?: string[];
  preconnect?: string[];   // ✅ added
  dnsPrefetch?: string[];  // ✅ added
  preload?: string[];      // ✅ added
  metrics?: Metrics;
}
