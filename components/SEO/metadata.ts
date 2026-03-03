import type { Metadata, Viewport } from 'next';
import { SEO_CONFIG } from './seoConfig';
import { PageType } from './pageTypes';
import { buildCanonical } from './canonical';
import { buildHreflang } from './hreflang';

// ============================================================
// Types
// ============================================================
export interface MetadataInput {
  pageType: PageType;
  route: string;
  locale?: string;
  canonical?: string;
  data?: any;
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

// ============================================================
// Main Metadata Builder
// ============================================================
export function buildMetadata(input: MetadataInput): MetadataOutput {
  const {
    pageType,
    route = '/',
    locale = SEO_CONFIG.defaultLocale,
    canonical,
    data = {},
    queryParams = {},
    noindex = false,
    nofollow = false,
    siteName = SEO_CONFIG.siteName,
  } = input;

  const baseUrl = SEO_CONFIG.siteUrl;
  const primaryKeyword = SEO_CONFIG.primaryKeyword;

  // ========================================================
  // Canonical
  // ========================================================
  const fullUrl =
    canonical ||
    buildCanonical(route, {
      includeQuery: false,
      removeParams: ['utm_', 'ref', 'source', 'fbclid', 'gclid'],
    });

  // ========================================================
  // Smart Title Builder
  // ========================================================
  let title = data.title || SEO_CONFIG.defaultTitle;

  if (!title.toLowerCase().includes(primaryKeyword)) {
    title = `${title} | ${primaryKeyword}`;
  }

  if (data.page) {
    title += ` - Page ${data.page}`;
  }

  // Add high-CTR modifiers for key pages
  if (route.includes('earn') && !title.includes('Trusted')) {
    title += ' (Trusted & Legit)';
  }

  // ========================================================
  // Smart Description Builder
  // ========================================================
  let description =
    data.description || SEO_CONFIG.defaultDescription;

  if (!description.includes('Start earning')) {
    description += ' Start earning today.';
  }

  if (queryParams?.q) {
    description = `Results for "${queryParams.q}". ${description}`;
  }

  // ========================================================
  // Smart Keywords
  // ========================================================
  const keywords = Array.from(
    new Set([
      ...(SEO_CONFIG.defaultKeywords || []),
      ...(SEO_CONFIG.secondaryKeywords || []),
      ...(data.keywords || []),
    ])
  );

  // ========================================================
  // Robots
  // ========================================================
  const robots =
    noindex || process.env.NODE_ENV !== 'production'
      ? {
          index: false,
          follow: false,
          nocache: true,
        }
      : {
          index: true,
          follow: !nofollow,
        };

  // ========================================================
  // Hreflang
  // ========================================================
  const alternates = buildHreflang(route, {
    addLanguagePrefix: true,
    includeDefault: true,
  });

  const ogLocale = locale.replace('-', '_');

  const image =
    data.image || SEO_CONFIG.defaultOgImage;

  // ========================================================
  // Return Premium Metadata
  // ========================================================
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

    openGraph: {
      type: pageType === 'blog_post' ? 'article' : 'website',
      url: fullUrl,
      title,
      description,
      siteName,
      locale: ogLocale,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: data.imageAlt || title,
        },
      ],
      ...(pageType === 'blog_post' && {
        article: {
          publishedTime: data.publishedAt,
          modifiedTime: data.updatedAt,
          authors: data.author ? [data.author] : undefined,
          tags: data.tags,
          section: data.category,
        },
      }),
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: SEO_CONFIG.twitterHandle,
      images: [image],
    },

    verification: SEO_CONFIG.verification,

    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 5,
      userScalable: true,
    },

    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },

    manifest: '/manifest.json',

    appleWebApp: {
      capable: true,
      title: siteName,
      statusBarStyle: 'black-translucent',
    },

    formatDetection: {
      telephone: false,
    },

    other: {
      'theme-color': SEO_CONFIG.themeColor,
      'application-name': siteName,
      'apple-mobile-web-app-title': siteName,
      'og:updated_time': data.updatedAt || undefined,
    },
  };
}
