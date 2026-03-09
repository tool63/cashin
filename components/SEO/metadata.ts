import type { Metadata, Viewport } from 'next';
import { SEO_CONFIG } from './seoConfig';
import { PageType } from './pageTypes';
import { buildCanonical } from './canonical';
import { buildHreflang } from './hreflang';

export interface MetadataInput {
  pageType: PageType | string;
  route: string;
  locale?: string;
  canonical?: string;
  data?: Record<string, any>;
  queryParams?: Record<string, string>;
  noindex?: boolean;
  nofollow?: boolean;
  siteName?: string;
}

export interface MetadataOutput extends Metadata {
  viewport?: Viewport;
  verification?: Record<string, string>;
  appleWebApp?: { capable: boolean; title: string; statusBarStyle: 'default' | 'black' | 'black-translucent'; };
}

export function buildMetadata(input: MetadataInput): MetadataOutput {
  const { pageType, route, locale = SEO_CONFIG.defaultLocale, canonical, data = {}, queryParams = {}, noindex = false, nofollow = false, siteName = SEO_CONFIG.siteName } = input;

  const fullUrl = canonical || buildCanonical(route, { includeQuery: false });
  let title = data.title || SEO_CONFIG.defaultTitle;
  const primaryKeyword = SEO_CONFIG.primaryKeyword || 'earn money online';

  if (!title.toLowerCase().includes(primaryKeyword)) title += ` | ${primaryKeyword}`;
  if (data.page) title += ` - Page ${data.page}`;
  if (route.includes('earn') && !title.includes('Trusted')) title += ' (Trusted & Legit)';

  let description = data.description || SEO_CONFIG.defaultDescription;
  if (!description.includes('Start earning')) description += ' Start earning today.';
  if (queryParams?.q) description = `Results for "${queryParams.q}". ${description}`;

  const robots = noindex || process.env.NODE_ENV !== 'production' ? { index: false, follow: false, nocache: true } : { index: true, follow: !nofollow };

  const alternates = buildHreflang(route, { addLanguagePrefix: true, includeDefault: true });
  const ogLocale = locale.replace('-', '_');

  const image = data.image || SEO_CONFIG.defaultOgImage;
  const imageAlt = data.imageAlt || title;

  return {
    metadataBase: new URL(SEO_CONFIG.siteUrl),
    title,
    description,
    keywords: Array.from(new Set([...(SEO_CONFIG.defaultKeywords || []), ...(SEO_CONFIG.secondaryKeywords || []), ...(data.keywords || [])])).join(', '),
    robots,
    alternates: { canonical: fullUrl, languages: alternates },
    openGraph: {
      type: pageType === 'blog_post' ? 'article' : 'website',
      url: fullUrl,
      title,
      description,
      siteName,
      locale: ogLocale,
      images: image ? [{ url: image, width: 1200, height: 630, alt: imageAlt }] : undefined,
      ...(typeof pageType === 'string' && pageType.includes('offer') ? { type: 'product', product: { price: data.price, priceCurrency: data.currency || 'USD', availability: data.availability ? `https://schema.org/${data.availability === 'instock' ? 'InStock' : 'OutOfStock'}` : undefined, brand: data.brand, sku: data.sku, mpn: data.mpn } } : {}),
      ...(pageType === 'blog_post' ? { article: { publishedTime: data.publishedAt, modifiedTime: data.updatedAt, authors: data.author ? [data.author] : undefined, tags: data.tags, section: data.category } } : {}),
    },
    twitter: { card: 'summary_large_image', title, description, site: SEO_CONFIG.twitterHandle, images: image ? [image] : undefined },
    verification: SEO_CONFIG.verification,
    viewport: { width: 'device-width', initialScale: 1, maximumScale: 5, userScalable: true },
    icons: { icon: [{ url: '/favicon.ico', sizes: 'any' }, { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' }, { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' }], apple: [{ url: '/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' }], other: [{ rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: SEO_CONFIG.themeColor }] },
    manifest: '/manifest.json',
    appleWebApp: { capable: true, title: siteName, statusBarStyle: 'black-translucent' },
    formatDetection: { telephone: true, date: true, address: true, email: true, url: true },
    itunes: process.env.ITUNES_APP_ID ? { appId: process.env.ITUNES_APP_ID, appArgument: fullUrl } : undefined,
    other: { 'application-name': siteName, 'msapplication-TileColor': SEO_CONFIG.themeColor, 'msapplication-TileImage': '/ms-icon-144x144.png', 'theme-color': SEO_CONFIG.themeColor },
  };
}
