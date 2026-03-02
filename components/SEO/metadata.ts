import type { Metadata, Viewport } from 'next';
import { SEO_CONFIG } from './seoConfig';
import { PageType } from './pageTypes';
import { buildCanonical } from './canonical';
import { buildHreflang } from './hreflang';

export interface MetadataInput {
  pageType: PageType;
  route: string;
  locale?: string;
  canonical?: string;
  data?: {
    title?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
    video?: string;
    audio?: string;
    keywords?: string[];
    author?: string;
    publishedAt?: string;
    updatedAt?: string;
    category?: string;
    tags?: string[];
    rating?: number;
    reviewCount?: number;
    price?: number;
    currency?: string;
    availability?: 'instock' | 'outofstock' | 'preorder';
    brand?: string;
    sku?: string;
    mpn?: string;
    page?: number;
    query?: string;
    username?: string;
  };
  queryParams?: Record<string, string>;
  noindex?: boolean;
  nofollow?: boolean;
  priority?: number;
  siteName?: string;
}

export interface MetadataOutput extends Metadata {
  viewport?: Viewport;
  verification?: Record<string, string>;
  appleWebApp?: {
    capable: boolean;
    title: string;
    statusBarStyle: 'default' | 'black' | 'black-translucent';
  };
}

/**
 * Builds full Next.js metadata with SEO optimizations
 */
export function buildMetadata(input: MetadataInput): MetadataOutput {
  if (!input.route) {
    console.warn('[SEO Metadata] Empty route -> "/"');
    input.route = '/';
  }

  const {
    pageType,
    route,
    locale = SEO_CONFIG.defaultLocale,
    canonical,
    data = {},
    queryParams = {},
    noindex = false,
    nofollow = false,
    siteName = SEO_CONFIG.siteName,
  } = input;

  const baseUrl = SEO_CONFIG.siteUrl;

  // Canonical (SEO best practice)
  const fullUrl = canonical || buildCanonical(route, {
    includeQuery: false,
    removeParams: ['utm_', 'ref', 'source', 'fbclid', 'gclid'],
  });

  // Titles & descriptions
  const title = buildTitle(pageType, data, siteName);
  const description = buildDescription(pageType, data);
  const keywords = buildKeywords(pageType, data.keywords);

  // Media
  const image = buildImageForType(pageType, data);
  const imageAlt = data.imageAlt || title;

  // Robots (indexing rules)
  const robots = buildRobotsDirectives(pageType, noindex, nofollow, queryParams, data);

  // Alternate languages (hreflang-ready)
  const alternates = buildHreflang(route, {
    addLanguagePrefix: true,
    includeDefault: true,
  });

  // OpenGraph locale format (en-US -> en_US)
  const ogLocale = locale.replace('-', '_');

  return {
    metadataBase: new URL(baseUrl),

    title,
    description,
    keywords: keywords.join(', '),

    robots,

    alternates: {
      canonical: fullUrl,
      languages: alternates,
    },

    openGraph: buildOpenGraph({
      type: getOpenGraphType(pageType),
      title,
      description,
      url: fullUrl,
      siteName,
      locale: ogLocale,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: imageAlt,
              type: 'image/jpeg',
            },
          ]
        : undefined,
      videos: data.video
        ? [
            {
              url: data.video,
              width: 1280,
              height: 720,
              type: 'video/mp4',
            },
          ]
        : undefined,
      audio: data.audio
        ? [
            {
              url: data.audio,
              type: 'audio/mpeg',
            },
          ]
        : undefined,

      ...(pageType === 'blog_post' && {
        type: 'article',
        article: {
          publishedTime: data.publishedAt,
          modifiedTime: data.updatedAt,
          authors: data.author ? [data.author] : undefined,
          tags: data.tags,
          section: data.category,
        },
      }),

      ...(pageType.includes('offer') && {
        type: 'product',
        product: {
          price: data.price,
          priceCurrency: data.currency || 'USD',
          availability: data.availability
            ? `https://schema.org/${data.availability === 'instock' ? 'InStock' : 'OutOfStock'}`
            : undefined,
          brand: data.brand,
          sku: data.sku,
          mpn: data.mpn,
        },
      }),
    }),

    twitter: buildTwitterCard({
      card: 'summary_large_image',
      title,
      description,
      site: SEO_CONFIG.twitterHandle,
      images: image ? [image] : undefined,
      imageAlt,
    }),

    verification: SEO_CONFIG.verification,

    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 5,
      userScalable: true,
    },

    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
        { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [{ url: '/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' }],
      other: [{ rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: SEO_CONFIG.themeColor }],
    },

    manifest: '/manifest.json',

    appleWebApp: {
      capable: true,
      title: siteName,
      statusBarStyle: 'black-translucent',
    },

    formatDetection: {
      telephone: true,
      date: true,
      address: true,
      email: true,
      url: true,
    },

    itunes: process.env.ITUNES_APP_ID
      ? {
          appId: process.env.ITUNES_APP_ID,
          appArgument: fullUrl,
        }
      : undefined,

    other: {
      'application-name': siteName,
      'msapplication-TileColor': SEO_CONFIG.themeColor,
      'msapplication-TileImage': '/ms-icon-144x144.png',
      'theme-color': SEO_CONFIG.themeColor,
    },
  };
}
