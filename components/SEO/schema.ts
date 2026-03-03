import { SEO_CONFIG } from './seoConfig';

/* =========================================================
   Types
========================================================= */

export type PageType =
  | 'home'
  | 'blog'
  | 'article'
  | 'product'
  | 'faq'
  | 'guide'
  | 'profile'
  | 'search'
  | 'generic';

export interface SchemaInput {
  route: string;
  pageType?: PageType;
  title?: string;
  description?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  authorUrl?: string;
  price?: number;
  currency?: string;
  averageRating?: number;
  reviewCount?: number;
  faq?: { question: string; answer: string }[];
  steps?: { name: string; text: string; image?: string }[];
  username?: string;
  bio?: string;
  avatar?: string;
  query?: string;
  results?: Array<{ url: string; title: string }>;
  video?: {
    url: string;
    title?: string;
    thumbnail?: string;
    duration?: string;
  };
  images?: string[];
  tags?: string[];
  category?: string;
  brand?: string;
  sku?: string;
  mpn?: string;
}

/* =========================================================
   Utilities
========================================================= */

function absoluteUrl(path?: string) {
  if (!path) return undefined;
  if (path.startsWith('http')) return path;
  return `${SEO_CONFIG.siteUrl.replace(/\/$/, '')}${path}`;
}

function cleanRoute(route: string) {
  const base = route.split('?')[0].split('#')[0];
  return base.endsWith('/') && base !== '/' ? base.slice(0, -1) : base;
}

function dedupeSchemas(graph: any[]) {
  const seen = new Set<string>();
  return graph.filter((schema) => {
    const id = schema?.['@id'];
    if (!id) return true;
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

function formatBreadcrumbName(segment: string): string {
  return segment
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

/* =========================================================
   Development Validation
========================================================= */

function validateSchemas(graph: any[]) {
  if (process.env.NODE_ENV !== 'development') return;

  graph.forEach((schema, index) => {
    if (!schema['@type']) {
      console.warn(`[Schema] Schema ${index} missing @type:`, schema);
    }
    if (!schema['@id']) {
      console.warn(`[Schema] Schema ${index} missing @id:`, schema);
    }

    Object.entries(schema).forEach(([key, value]) => {
      if (value === '') {
        console.warn(
          `[Schema] ${schema['@type'] || 'Unknown'} has empty field: ${key}`
        );
      }
    });
  });
}

/* =========================================================
   Core Schemas (Always Included)
========================================================= */

function buildOrganization() {
  return {
    '@type': 'Organization',
    '@id': `${SEO_CONFIG.siteUrl}#organization`,
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/logo.png'),
      width: 512,
      height: 512,
    },
    sameAs: Object.values(SEO_CONFIG.socialLinks || {}).filter(Boolean),
    ...(SEO_CONFIG.contact?.email && {
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: SEO_CONFIG.contact.phone,
        contactType: 'customer service',
        email: SEO_CONFIG.contact.email,
        availableLanguage: SEO_CONFIG.supportedLocales,
      },
    }),
  };
}

function buildWebsite() {
  return {
    '@type': 'WebSite',
    '@id': `${SEO_CONFIG.siteUrl}#website`,
    url: SEO_CONFIG.siteUrl,
    name: SEO_CONFIG.siteName,
    description: SEO_CONFIG.defaultDescription,
    publisher: { '@id': `${SEO_CONFIG.siteUrl}#organization` },
    inLanguage: SEO_CONFIG.defaultLocale,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SEO_CONFIG.siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

function buildBreadcrumb(route: string) {
  const cleaned = cleanRoute(route);
  const url = absoluteUrl(cleaned);
  const segments = cleaned.split('/').filter(Boolean);

  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SEO_CONFIG.siteUrl,
    },
    ...segments.map((segment, index) => ({
      '@type': 'ListItem',
      position: index + 2,
      name: formatBreadcrumbName(segment),
      item: `${SEO_CONFIG.siteUrl}/${segments
        .slice(0, index + 1)
        .join('/')}`,
    })),
  ];

  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: items,
  };
}

function buildWebPage(
  data: Required<Pick<SchemaInput, 'route' | 'title' | 'description'>>
) {
  const url = absoluteUrl(cleanRoute(data.route));

  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: data.title,
    description: data.description,
    isPartOf: { '@id': `${SEO_CONFIG.siteUrl}#website` },
    about: { '@id': `${SEO_CONFIG.siteUrl}#organization` },
    breadcrumb: { '@id': `${url}#breadcrumb` },
  };
}

function buildHomePage(data: SchemaInput) {
  const url = absoluteUrl(cleanRoute(data.route));

  return {
    '@type': 'WebPage', // fixed (was AboutPage)
    '@id': `${url}#home`,
    url,
    name: data.title || SEO_CONFIG.siteName,
    description: data.description || SEO_CONFIG.defaultDescription,
    isPartOf: { '@id': `${SEO_CONFIG.siteUrl}#website` },
    about: { '@id': `${SEO_CONFIG.siteUrl}#organization` },
  };
}

/* =========================================================
   Page-Specific Schemas
========================================================= */

function buildArticle(data: SchemaInput) {
  if (!data.title || !data.description || !data.datePublished) return null;

  const url = absoluteUrl(cleanRoute(data.route));

  return {
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: data.title,
    description: data.description,
    image: data.image ? absoluteUrl(data.image) : undefined,
    datePublished: data.datePublished,
    dateModified: data.dateModified || data.datePublished,
    author: data.author
      ? {
          '@type': 'Person',
          name: data.author,
          url: data.authorUrl,
        }
      : { '@id': `${SEO_CONFIG.siteUrl}#organization` },
    publisher: { '@id': `${SEO_CONFIG.siteUrl}#organization` },
    mainEntityOfPage: { '@id': `${url}#webpage` },
    keywords: data.tags?.join(', '),
    articleSection: data.category,
  };
}

function buildBlogPosting(data: SchemaInput) {
  if (!data.title || !data.datePublished) return null;

  const url = absoluteUrl(cleanRoute(data.route));

  return {
    '@type': 'BlogPosting',
    '@id': `${url}#blogpost`,
    headline: data.title,
    description: data.description,
    image: data.image ? absoluteUrl(data.image) : undefined,
    datePublished: data.datePublished,
    dateModified: data.dateModified || data.datePublished,
    author: data.author
      ? { '@type': 'Person', name: data.author, url: data.authorUrl }
      : { '@id': `${SEO_CONFIG.siteUrl}#organization` },
    publisher: { '@id': `${SEO_CONFIG.siteUrl}#organization` },
    mainEntityOfPage: { '@id': `${url}#webpage` },
  };
}

function buildProduct(data: SchemaInput) {
  if (!data.title) return null;

  const url = absoluteUrl(cleanRoute(data.route));

  const product: any = {
    '@type': 'Product',
    '@id': `${url}#product`,
    name: data.title,
    description: data.description,
    image: data.image ? absoluteUrl(data.image) : undefined,
    url,
    brand: data.brand
      ? { '@type': 'Brand', name: data.brand }
      : { '@id': `${SEO_CONFIG.siteUrl}#organization` },
    sku: data.sku,
    mpn: data.mpn,
  };

  if (typeof data.price === 'number') {
    product.offers = {
      '@type': 'Offer',
      url,
      price: data.price,
      priceCurrency: data.currency || 'USD',
      availability: 'https://schema.org/InStock',
    };
  }

  if (typeof data.averageRating === 'number') {
    product.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: data.averageRating,
      reviewCount: data.reviewCount ?? 1,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return product;
}

function buildFAQ(data: SchemaInput) {
  if (!data.faq?.length) return null;

  const url = absoluteUrl(cleanRoute(data.route));

  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: data.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

function buildHowTo(data: SchemaInput) {
  if (!data.steps?.length || !data.title) return null;

  const url = absoluteUrl(cleanRoute(data.route));

  return {
    '@type': 'HowTo',
    '@id': `${url}#howto`,
    name: data.title,
    description: data.description,
    image: data.image ? absoluteUrl(data.image) : undefined,
    step: data.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image ? absoluteUrl(step.image) : undefined,
      url: `${url}#step${index + 1}`,
    })),
  };
}

function buildProfile(data: SchemaInput) {
  if (!data.username) return null;

  const url = absoluteUrl(cleanRoute(data.route));

  return {
    '@type': 'ProfilePage',
    '@id': `${url}#profile`,
    mainEntity: {
      '@type': 'Person',
      name: data.username,
      description: data.bio,
      image: data.avatar ? absoluteUrl(data.avatar) : undefined,
    },
  };
}

function buildSearch(data: SchemaInput) {
  if (!data.query) return null;

  const url = absoluteUrl(cleanRoute(data.route));

  const search: any = {
    '@type': 'SearchResultsPage',
    '@id': `${url}#search`,
    name: `Search results for "${data.query}"`,
  };

  if (data.results?.length) {
    search.mainEntity = {
      '@type': 'ItemList',
      itemListElement: data.results.map((result, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: result.url,
        name: result.title,
      })),
    };
  }

  return search;
}

function buildVideo(data: SchemaInput) {
  if (!data.video?.url) return null;

  const url = absoluteUrl(cleanRoute(data.route));

  const video: any = {
    '@type': 'VideoObject',
    '@id': `${url}#video`,
    name: data.video.title || data.title || 'Video',
    contentUrl: data.video.url,
  };

  if (data.description) video.description = data.description;
  if (data.video.thumbnail || data.image)
    video.thumbnailUrl = absoluteUrl(data.video.thumbnail || data.image);
  if (data.datePublished) video.uploadDate = data.datePublished;
  if (data.video.duration) video.duration = data.video.duration;

  return video;
}

function buildImageGallery(data: SchemaInput) {
  if (!data.images || data.images.length < 2) return null;

  const url = absoluteUrl(cleanRoute(data.route));

  return {
    '@type': 'ImageGallery',
    '@id': `${url}#gallery`,
    associatedMedia: data.images.map((image, index) => ({
      '@type': 'ImageObject',
      contentUrl: absoluteUrl(image),
      name: `Image ${index + 1}`,
    })),
  };
}

/* =========================================================
   Main Builder
========================================================= */

export function buildStructuredData(input: SchemaInput) {
  if (!input.route) {
    console.warn('[Schema] Missing route');
    return [];
  }

  const graph: any[] = [];

  // Core (kept as requested)
  graph.push(buildOrganization());
  graph.push(buildWebsite());
  graph.push(buildBreadcrumb(input.route));

  if (input.title && input.description) {
    graph.push(
      buildWebPage({
        route: input.route,
        title: input.title,
        description: input.description,
      })
    );
  }

  if (input.pageType === 'home') {
    graph.push(buildHomePage(input));
  }

  switch (input.pageType) {
    case 'blog':
      graph.push(buildBlogPosting(input));
      break;
    case 'article':
      graph.push(buildArticle(input));
      break;
    case 'product':
      graph.push(buildProduct(input));
      break;
    case 'faq':
      graph.push(buildFAQ(input));
      break;
    case 'guide':
      graph.push(buildHowTo(input));
      break;
    case 'profile':
      graph.push(buildProfile(input));
      break;
    case 'search':
      graph.push(buildSearch(input));
      break;
  }

  if (input.video) graph.push(buildVideo(input));
  if (input.images?.length && input.images.length > 1)
    graph.push(buildImageGallery(input));

  const finalGraph = dedupeSchemas(graph.filter(Boolean));

  validateSchemas(finalGraph);

  if (!finalGraph.length) return [];

  return [
    {
      '@context': 'https://schema.org',
      '@graph': finalGraph,
    },
  ];
}
