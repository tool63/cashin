import { SEO_CONFIG } from './seoConfig';
import { PageType } from './pageTypes';

export interface SchemaInput {
  pageType: PageType;
  route: string;
  data?: Record<string, any>;
  canonical?: string;
  metadata?: Record<string, any>;
  pageTypeHierarchy?: PageType[];
}

export function buildStructuredData(input: SchemaInput): Record<string, any>[] {
  const { pageType, route, data = {}, canonical, pageTypeHierarchy = [] } = input;
  
  const schemas: Record<string, any>[] = [];
  const fullUrl = canonical || `${SEO_CONFIG.siteUrl}${route}`;
  const baseContext = 'https://schema.org';
  
  // 1. Always include Organization schema
  schemas.push(buildOrganizationSchema());
  
  // 2. Always include Website schema
  schemas.push(buildWebsiteSchema());
  
  // 3. Always include WebPage schema
  schemas.push(buildWebPageSchema(pageType, data, fullUrl));
  
  // 4. BreadcrumbList (always include)
  schemas.push(buildBreadcrumbSchema(pageTypeHierarchy, data, fullUrl));
  
  // 5. Page-specific schemas
  switch (pageType) {
    case 'home':
      schemas.push(buildHomePageSchema(data));
      break;
      
    case 'earn':
    case 'earn_category':
      schemas.push(buildItemListSchema(data, 'earn'));
      break;
      
    case 'earn_offer':
      schemas.push(buildProductSchema(data, fullUrl));
      schemas.push(buildHowToSchema(data, fullUrl));
      break;
      
    case 'blog_post':
      schemas.push(buildArticleSchema(data, fullUrl));
      schemas.push(buildBlogPostingSchema(data, fullUrl));
      break;
      
    case 'blog_category':
    case 'blog_tag':
    case 'blog_author':
      schemas.push(buildCollectionPageSchema(data, fullUrl));
      break;
      
    case 'rewards':
    case 'reward_detail':
      schemas.push(buildProductSchema(data, fullUrl, 'Reward'));
      break;
      
    case 'cashback':
    case 'cashback_store':
      schemas.push(buildProductSchema(data, fullUrl, 'Cashback'));
      break;
      
    case 'guides':
    case 'guide_article':
      schemas.push(buildHowToSchema(data, fullUrl));
      schemas.push(buildGuideSchema(data, fullUrl));
      break;
      
    case 'affiliate':
      schemas.push(buildAffiliateProgramSchema(data, fullUrl));
      break;
      
    case 'static_faq':
      if (data.faqs && Array.isArray(data.faqs)) {
        schemas.push(buildFaqSchema(data.faqs));
      }
      break;
      
    case 'search_results':
      schemas.push(buildSearchResultsPageSchema(data, fullUrl));
      break;
      
    case 'user_profile':
      schemas.push(buildProfileSchema(data, fullUrl));
      break;
      
    case 'error_404':
      schemas.push(buildErrorPageSchema(404, fullUrl));
      break;
      
    case 'error_500':
      schemas.push(buildErrorPageSchema(500, fullUrl));
      break;
  }
  
  // 6. Add Review schema if applicable
  if (data.reviews && Array.isArray(data.reviews) && data.reviews.length > 0) {
    schemas.push(buildReviewSchema(data.reviews, data));
  }
  
  // 7. Add VideoObject schema if video exists
  if (data.video) {
    schemas.push(buildVideoSchema(data, fullUrl));
  }
  
  // 8. Add ImageGallery schema if multiple images
  if (data.images && Array.isArray(data.images) && data.images.length > 1) {
    schemas.push(buildImageGallerySchema(data.images));
  }
  
  // 9. Add LocalBusiness schema if applicable
  if (pageType.includes('contact') || pageType.includes('about')) {
    schemas.push(buildLocalBusinessSchema());
  }
  
  // Filter out null/undefined schemas and ensure unique @ids
  return schemas
    .filter(Boolean)
    .map((schema, index) => ({
      ...schema,
      '@id': schema['@id'] || `${fullUrl}#${schema['@type']}-${index}`,
    }));
}

/* ------------------ Core Schemas ------------------ */

function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SEO_CONFIG.siteUrl}#organization`,
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    logo: `${SEO_CONFIG.siteUrl}/logo.png`,
    sameAs: Object.values(SEO_CONFIG.socialLinks || {}),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SEO_CONFIG.contact?.phone,
      contactType: 'customer service',
      email: SEO_CONFIG.contact?.email,
      availableLanguage: SEO_CONFIG.supportedLocales,
    },
    address: SEO_CONFIG.contact?.address ? {
      '@type': 'PostalAddress',
      streetAddress: SEO_CONFIG.contact.address,
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
      postalCode: '94105',
      addressCountry: 'US',
    } : undefined,
    foundingDate: '2020-01-01',
    founders: [
      {
        '@type': 'Person',
        name: 'Cashog Team',
      },
    ],
    awards: [
      'Best Rewards Platform 2023',
      'Top Money Earning App 2024',
    ],
  };
}

function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SEO_CONFIG.siteUrl}#website`,
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    publisher: {
      '@id': `${SEO_CONFIG.siteUrl}#organization`,
    },
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SEO_CONFIG.siteUrl}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
      {
        '@type': 'ViewAction',
        target: `${SEO_CONFIG.siteUrl}/earn`,
      },
    ],
    inLanguage: SEO_CONFIG.supportedLocales,
    copyrightYear: new Date().getFullYear(),
    isFamilyFriendly: true,
  };
}

function buildWebPageSchema(pageType: PageType, data: any, url: string) {
  const pageTypeMap: Record<PageType, string> = {
    home: 'AboutPage',
    earn: 'CollectionPage',
    earn_category: 'CollectionPage',
    earn_offer: 'Product',
    guides: 'CollectionPage',
    guide_article: 'Article',
    rewards: 'CollectionPage',
    reward_detail: 'Product',
    cashback: 'CollectionPage',
    cashback_store: 'Product',
    affiliate: 'AboutPage',
    affiliate_dashboard: 'ProfilePage',
    blog: 'Blog',
    blog_category: 'CollectionPage',
    blog_post: 'BlogPosting',
    blog_author: 'ProfilePage',
    blog_tag: 'CollectionPage',
    static: 'WebPage',
    static_policy: 'WebPage',
    static_about: 'AboutPage',
    static_contact: 'ContactPage',
    static_help: 'FAQPage',
    static_faq: 'FAQPage',
    user_profile: 'ProfilePage',
    user_dashboard: 'WebPage',
    user_settings: 'WebPage',
    auth: 'WebPage',
    auth_login: 'WebPage',
    auth_register: 'WebPage',
    auth_reset: 'WebPage',
    auth_verify: 'WebPage',
    search: 'SearchResultsPage',
    search_results: 'SearchResultsPage',
    search_category: 'SearchResultsPage',
    pagination: 'WebPage',
    api: 'WebPage',
    admin: 'WebPage',
    admin_dashboard: 'WebPage',
    admin_users: 'WebPage',
    admin_offers: 'WebPage',
    admin_analytics: 'WebPage',
    error: 'WebPage',
    error_404: 'WebPage',
    error_500: 'WebPage',
    unknown: 'WebPage',
  };

  const schemaType = pageTypeMap[pageType] || 'WebPage';

  return {
    '@context': 'https://schema.org',
    '@type': schemaType,
    '@id': `${url}#webpage`,
    url: url,
    name: data.title || SEO_CONFIG.defaultTitle,
    description: data.description || SEO_CONFIG.defaultDescription,
    inLanguage: data.locale || SEO_CONFIG.defaultLocale,
    isPartOf: {
      '@id': `${SEO_CONFIG.siteUrl}#website`,
    },
    about: {
      '@id': `${SEO_CONFIG.siteUrl}#organization`,
    },
    keywords: data.keywords?.join(', ') || SEO_CONFIG.defaultKeywords.join(', '),
    datePublished: data.publishedAt || new Date().toISOString().split('T')[0],
    dateModified: data.updatedAt || new Date().toISOString().split('T')[0],
    breadcrumb: {
      '@id': `${url}#breadcrumb`,
    },
    primaryImageOfPage: data.image ? {
      '@type': 'ImageObject',
      url: data.image,
    } : undefined,
  };
}

function buildBreadcrumbSchema(hierarchy: string[], data: any, url: string) {
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SEO_CONFIG.siteUrl,
    },
    ...hierarchy.slice(1).map((type, index) => ({
      '@type': 'ListItem',
      position: index + 2,
      name: formatBreadcrumbName(type, data),
      item: `${SEO_CONFIG.siteUrl}/${type}`,
    })),
    {
      '@type': 'ListItem',
      position: hierarchy.length + 1,
      name: data.title || formatBreadcrumbName(hierarchy[hierarchy.length - 1], data),
      item: url,
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: items,
  };
}

/* ------------------ Page-Specific Schemas ------------------ */

function buildHomePageSchema(data: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${SEO_CONFIG.siteUrl}#homepage`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'Product',
            name: 'Earn Money',
            description: 'Complete offers and earn cash',
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'Product',
            name: 'Cashback Shopping',
            description: 'Save money while shopping',
          },
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@type': 'Product',
            name: 'Rewards',
            description: 'Redeem for PayPal and gift cards',
          },
        },
      ],
    },
    significantLinks: [
      `${SEO_CONFIG.siteUrl}/earn`,
      `${SEO_CONFIG.siteUrl}/rewards`,
      `${SEO_CONFIG.siteUrl}/cashback`,
    ],
  };
}

function buildProductSchema(data: any, url: string, productType: string = 'Offer') {
  const product = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${url}#product`,
    name: data.title || `${productType} Product`,
    description: data.description || `${productType} description`,
    image: data.image || `${SEO_CONFIG.siteUrl}/default-product.jpg`,
    sku: data.sku || `SKU-${Date.now()}`,
    mpn: data.mpn || `MPN-${Date.now()}`,
    brand: {
      '@type': 'Brand',
      name: SEO_CONFIG.siteName,
    },
    offers: {
      '@type': 'Offer',
      price: data.price || 0,
      priceCurrency: data.currency || 'USD',
      availability: data.availability === 'instock' 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
      url: url,
      priceValidUntil: data.priceValidUntil || new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'US',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: 0,
          currency: 'USD',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'US',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 3,
            unitCode': 'DAY',
          },
        },
      },
    },
    ...(data.reviews && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: data.averageRating || 4.5,
        reviewCount: data.reviewCount || 0,
      },
      review: data.reviews.map((review: any, index: number) => ({
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: review.author || 'Anonymous',
        },
        datePublished: review.date || new Date().toISOString(),
        reviewBody: review.content,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.rating || 5,
          bestRating: 5,
        },
      })),
    }),
  };

  return product;
}

function buildArticleSchema(data: any, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: data.title,
    description: data.description,
    image: data.image || `${SEO_CONFIG.siteUrl}/default-article.jpg`,
    author: {
      '@type': 'Person',
      name: data.author || SEO_CONFIG.siteName,
      url: data.authorUrl,
    },
    publisher: {
      '@id': `${SEO_CONFIG.siteUrl}#organization`,
    },
    datePublished: data.publishedAt || new Date().toISOString(),
    dateModified: data.updatedAt || new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    wordCount: data.wordCount,
    articleSection: data.category,
    keywords: data.tags?.join(', '),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['article-content'],
    },
  };
}

function buildBlogPostingSchema(data: any, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#blogpost`,
    headline: data.title,
    description: data.description,
    image: data.image || `${SEO_CONFIG.siteUrl}/default-blog.jpg`,
    author: {
      '@type': 'Person',
      name: data.author || SEO_CONFIG.siteName,
    },
    publisher: {
      '@id': `${SEO_CONFIG.siteUrl}#organization`,
    },
    datePublished: data.publishedAt || new Date().toISOString(),
    dateModified: data.updatedAt || new Date().toISOString(),
    mainEntityOfPage: url,
    commentCount: data.commentCount || 0,
    comment: data.comments?.map((comment: any) => ({
      '@type': 'Comment',
      author: {
        '@type': 'Person',
        name: comment.author,
      },
      datePublished: comment.date,
      text: comment.text,
    })),
  };
}

function buildHowToSchema(data: any, url: string) {
  const steps = data.steps || [
    {
      name: 'Sign Up',
      text: 'Create your free Cashog account',
      image: `${SEO_CONFIG.siteUrl}/images/step1.jpg`,
    },
    {
      name: 'Complete Offers',
      text: 'Choose and complete earning offers',
      image: `${SEO_CONFIG.siteUrl}/images/step2.jpg`,
    },
    {
      name: 'Earn Rewards',
      text: 'Redeem your earnings for cash or gift cards',
      image: `${SEO_CONFIG.siteUrl}/images/step3.jpg`,
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${url}#howto`,
    name: data.title || 'How to Earn Money Online with Cashog',
    description: data.description || 'Step-by-step guide to earning money with Cashog',
    image: data.image || steps[0]?.image,
    estimatedCost: {
      '@type': 'MonetaryAmount',
      value: '0',
      currency: 'USD',
    },
    totalTime: 'P1D',
    tool: [
      {
        '@type': 'HowToTool',
        name: 'Internet Connection',
      },
      {
        '@type': 'HowToTool',
        name: 'Computer or Mobile Device',
      },
    ],
    step: steps.map((step: any, index: number) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image,
      url: `${url}#step${index + 1}`,
    })),
  };
}

function buildFaqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SEO_CONFIG.siteUrl}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

function buildItemListSchema(data: any, listType: string) {
  const items = data.items || [];
  
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SEO_CONFIG.siteUrl}/${listType}#list`,
    name: data.title || `${listType} List`,
    description: data.description || `List of ${listType} items`,
    numberOfItems: items.length,
    itemListElement: items.map((item: any, index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: item.url,
      name: item.name,
      image: item.image,
    })),
  };
}

function buildCollectionPageSchema(data: any, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#collection`,
    name: data.title || 'Collection',
    description: data.description,
    hasPart: data.items?.map((item: any) => ({
      '@type': 'WebPage',
      url: item.url,
      name: item.name,
    })),
  };
}

function buildAffiliateProgramSchema(data: any, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProgramMembership',
    '@id': `${url}#affiliate`,
    name: data.title || 'Cashog Affiliate Program',
    description: data.description || 'Join our affiliate program and earn commissions',
    membershipPointsEarned: {
      '@type': 'QuantitativeValue',
      value: data.commission || '30%',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    hostingOrganization: {
      '@id': `${SEO_CONFIG.siteUrl}#organization`,
    },
  };
}

function buildGuideSchema(data: any, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Guide',
    '@id': `${url}#guide`,
    name: data.title || 'Earning Guide',
    description: data.description,
    image: data.image,
    author: {
      '@type': 'Person',
      name: data.author || SEO_CONFIG.siteName,
    },
    publisher: {
      '@id': `${SEO_CONFIG.siteUrl}#organization`,
    },
    datePublished: data.publishedAt,
    dateModified: data.updatedAt,
    hasPart: data.sections?.map((section: any) => ({
      '@type': 'WebPageElement',
      name: section.title,
      text: section.content,
    })),
  };
}

function buildSearchResultsPageSchema(data: any, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SearchResultsPage',
    '@id': `${url}#search`,
    name: `Search Results for "${data.query || ''}"`,
    description: data.description || 'Search results page',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: data.results?.map((result: any, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: result.url,
        name: result.title,
      })),
    },
  };
}

function buildProfileSchema(data: any, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${url}#profile`,
    mainEntity: {
      '@type': 'Person',
      name: data.username || 'User',
      description: data.bio,
      image: data.avatar,
      joinDate: data.joinDate,
      knowsAbout: data.interests,
    },
  };
}

function buildReviewSchema(reviews: any[], data: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    '@id': `${data.url || SEO_CONFIG.siteUrl}#review`,
    itemReviewed: {
      '@type': data.type || 'Product',
      name: data.title,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: data.averageRating || 4.5,
      bestRating: 5,
      worstRating: 1,
    },
    author: {
      '@type': 'Person',
      name: 'Cashog Users',
    },
    publisher: {
      '@id': `${SEO_CONFIG.siteUrl}#organization`,
    },
  };
}

function buildVideoSchema(data: any, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    '@id': `${url}#video`,
    name: data.videoTitle || data.title,
    description: data.videoDescription || data.description,
    thumbnailUrl: data.videoThumbnail || data.image,
    uploadDate: data.videoDate || data.publishedAt || new Date().toISOString(),
    duration: data.videoDuration,
    contentUrl: data.video,
    embedUrl: data.videoEmbed,
    interactionStatistic: {
      '@type': 'InteractionCounter',
      interactionType: 'https://schema.org/WatchAction',
      userInteractionCount: data.videoViews || 0,
    },
  };
}

function buildImageGallerySchema(images: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    '@id': `${SEO_CONFIG.siteUrl}#gallery`,
    associatedMedia: images.map((image, index) => ({
      '@type': 'ImageObject',
      contentUrl: image,
      name: `Image ${index + 1}`,
    })),
  };
}

function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SEO_CONFIG.siteUrl}#business`,
    name: SEO_CONFIG.siteName,
    description: SEO_CONFIG.defaultDescription,
    url: SEO_CONFIG.siteUrl,
    telephone: SEO_CONFIG.contact?.phone,
    email: SEO_CONFIG.contact?.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SEO_CONFIG.contact?.address,
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
      postalCode: '94105',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.7749,
      longitude: -122.4194,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    sameAs: Object.values(SEO_CONFIG.socialLinks || {}),
  };
}

function buildErrorPageSchema(errorCode: number, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#error`,
    mainEntity: {
      '@type': 'Error',
      code: errorCode,
      description: errorCode === 404 ? 'Page Not Found' : 'Server Error',
    },
  };
}

/* ------------------ Helper Functions ------------------ */

function formatBreadcrumbName(type: string, data: any): string {
  const typeMap: Record<string, string> = {
    home: 'Home',
    earn: 'Earn Money',
    guides: 'Guides',
    rewards: 'Rewards',
    cashback: 'Cashback',
    affiliate: 'Affiliate',
    blog: 'Blog',
    static: 'Info',
  };

  return typeMap[type] || type.charAt(0).toUpperCase() + type.slice(1);
}
