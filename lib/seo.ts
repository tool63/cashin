export interface SeoData {
  title?: string;
  description?: string;
  keywords?: string | string[];
  image?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  canonical?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  locale?: string;
  alternateLocales?: string[];
  siteName?: string;
  twitterHandle?: string;
  facebookAppId?: string;
  structuredData?: Record<string, any>[];
  slug?: string; // Dynamic slug support
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export interface SeoConfig {
  title: string;
  description: string;
  keywords: string[];
  image: string;
  siteName: string;
  twitterHandle: string;
  facebookAppId: string;
  locale: string;
  baseUrl: string;
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cashog.com";

const defaultSeo: SeoConfig = {
  title: "Cashog - Earn Real Money Online",
  description: "Complete offers, play games, answer surveys and cash out instantly. Join 500,000+ users earning real money daily.",
  keywords: [
    "make money online",
    "earn cash",
    "online surveys",
    "paid offers",
    "cash rewards",
    "online income",
    "side hustle",
    "work from home jobs"
  ],
  image: `${baseUrl}/og-image.png`,
  siteName: "Cashog",
  twitterHandle: "@cashog",
  facebookAppId: "123456789012345",
  locale: "en_US",
  baseUrl,
};

// Dynamic route pattern matching
export interface RoutePattern {
  pattern: RegExp | string;
  seo: Partial<SeoData>;
  priority?: number;
}

// Route-specific SEO data with patterns
export const routePatterns: RoutePattern[] = [
  // Static routes
  { pattern: '/', seo: {
    title: "Cashog - Make Money Online | Earn Cash Fast",
    description: "Join 500K+ users earning real money daily. Complete offers, play games, answer surveys. Instant cashouts via PayPal, Venmo, Gift Cards.",
    keywords: ["earn money online", "cash rewards", "online income", "make money from home"],
    section: "home",
  }},
  { pattern: '/affiliate', seo: {
    title: "Cashog Affiliate Program - Earn 30% Commission",
    description: "Join Cashog affiliate program. Earn 30% recurring commission for life. Promote legitimate money-making opportunities.",
    keywords: ["affiliate program", "earn commission", "referral program", "make money referrals"],
    section: "affiliate",
  }},
  { pattern: '/how-it-works', seo: {
    title: "How Cashog Works - Simple Steps to Start Earning",
    description: "Learn how to make money with Cashog in 3 simple steps. Sign up, complete offers, get paid instantly. No hidden fees.",
    section: "information",
  }},
  
  // Dynamic routes with patterns
  { pattern: /^\/surveys$/, seo: {
    title: "Paid Surveys - Earn Money for Your Opinions | Cashog",
    description: "Take paid surveys and earn cash. Share your opinions and get rewarded instantly. High-paying surveys available now.",
    keywords: ["paid surveys", "survey jobs", "market research", "paid opinions"],
    section: "earning-methods",
  }},
  { pattern: /^\/app-installs$/, seo: {
    title: "App Installs - Earn Money by Trying Apps | Cashog",
    description: "Get paid to install and try new apps. Earn cash rewards for testing mobile applications. Simple and fast.",
    section: "earning-methods",
  }},
  { pattern: /^\/play-games$/, seo: {
    title: "Play Games & Earn Money | Cashog",
    description: "Play fun games and earn real money. Top-rated gaming rewards platform. Cash out instantly.",
    keywords: ["play games earn money", "gaming rewards", "paid to play"],
    section: "earning-methods",
  }},
  { pattern: /^\/watch-videos$/, seo: {
    title: "Watch Videos & Earn Cash | Cashog",
    description: "Watch entertaining videos and earn money. Get paid for watching ads, trailers, and content.",
    section: "earning-methods",
  }},
  { pattern: /^\/complete-offers$/, seo: {
    title: "Complete Offers & Earn Money | Cashog",
    description: "Complete simple offers and get paid. High-paying offers updated daily. Start earning now.",
    section: "earning-methods",
  }},
  
  // Rewards routes
  { pattern: /^\/earn-paypal-money$/, seo: {
    title: "Earn PayPal Money Online | Cashog",
    description: "Make money and cash out directly to PayPal. Fast, secure, and reliable payments.",
    keywords: ["earn paypal money", "paypal cash", "online money transfer"],
    section: "rewards",
  }},
  { pattern: /^\/earn-gift-cards-online$/, seo: {
    title: "Earn Gift Cards Online | Cashog",
    description: "Get paid in gift cards from top brands. Amazon, Apple, Google Play and more.",
    section: "rewards",
  }},
  { pattern: /^\/earn-amazon-gift-card$/, seo: {
    title: "Earn Amazon Gift Cards | Cashog",
    description: "Get free Amazon gift cards by completing offers and tasks. Shop your favorite products.",
    section: "rewards",
  }},
  { pattern: /^\/earn-crypto-online$/, seo: {
    title: "Earn Cryptocurrency Online | Cashog",
    description: "Make money in Bitcoin, Ethereum, and more. Crypto rewards platform.",
    keywords: ["earn bitcoin", "crypto rewards", "bitcoin mining", "ethereum earnings"],
    section: "rewards",
  }},
  
  // Guides routes
  { pattern: /^\/make-money-online$/, seo: {
    title: "How to Make Money Online - Complete Guide | Cashog",
    description: "Ultimate guide to making money online. Legitimate methods, tips, and strategies.",
    section: "guides",
  }},
  { pattern: /^\/earn-money-from-home$/, seo: {
    title: "Earn Money from Home - Work From Home Guide | Cashog",
    description: "Learn how to earn money from home. Remote work opportunities and online jobs.",
    section: "guides",
  }},
  
  // Cashback routes
  { pattern: /^\/cashback-offers$/, seo: {
    title: "Cashback Offers - Get Money Back on Purchases | Cashog",
    description: "Earn cashback on your online shopping. Best cashback deals and offers.",
    section: "cashback",
  }},
  { pattern: /^\/shopping-rewards\/[^/]+$/, seo: {
    title: "Shopping Rewards - Earn Cashback on Shopping | Cashog",
    description: "Get rewarded for your online shopping. Cashback on electronics, fashion, and more.",
    section: "cashback",
  }},
  { pattern: /^\/shopping-rewards\/travel\/hotels$/, seo: {
    title: "Hotel Cashback - Earn Money on Hotel Bookings | Cashog",
    description: "Get cashback on hotel bookings worldwide. Best hotel deals with rewards.",
    section: "cashback",
  }},
  
  // Legal routes
  { pattern: /^\/terms-and-conditions$/, seo: {
    title: "Terms and Conditions | Cashog",
    description: "Cashog terms of service and user agreement.",
    noIndex: true,
    section: "legal",
  }},
  { pattern: /^\/privacy-policy$/, seo: {
    title: "Privacy Policy | Cashog",
    description: "Cashog privacy policy and data protection information.",
    noIndex: true,
    section: "legal",
  }},
];

// Generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens
    .trim();
}

// Find matching route SEO
export function findRouteSeo(path: string): Partial<SeoData> {
  // Remove trailing slash
  const cleanPath = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
  
  // Find matching pattern
  for (const { pattern, seo } of routePatterns) {
    if (pattern instanceof RegExp) {
      if (pattern.test(cleanPath)) {
        return seo;
      }
    } else if (pattern === cleanPath) {
      return seo;
    }
  }
  
  // Return default for 404
  return {
    title: "Page Not Found | Cashog",
    description: "The page you're looking for doesn't exist.",
    noIndex: true,
  };
}

export class SeoBuilder {
  private config: SeoConfig;
  private data: SeoData;
  private path: string;

  constructor(data: SeoData = {}, path: string = '/') {
    this.config = { ...defaultSeo };
    this.path = path;
    
    // Merge route data with custom data
    const routeData = findRouteSeo(path);
    this.data = { ...routeData, ...data };
  }

  // Build complete SEO metadata
  build() {
    const title = this.buildTitle();
    const description = this.buildDescription();
    const keywords = this.buildKeywords();
    const image = this.data.image || this.config.image;
    const canonical = this.buildCanonical();

    return {
      title,
      description,
      keywords: Array.isArray(keywords) ? keywords.join(', ') : keywords,
      
      robots: {
        index: !this.data.noIndex,
        follow: !(this.data.noFollow || this.data.noIndex),
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
        googleBot: {
          index: !this.data.noIndex,
          follow: !(this.data.noFollow || this.data.noIndex),
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      
      alternates: {
        canonical,
      },
      
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: this.config.siteName,
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: title,
            type: 'image/png',
          },
        ],
        locale: this.data.locale || this.config.locale,
        alternateLocale: this.data.alternateLocales,
        type: 'website',
        ...(this.data.publishedTime && { publishedTime: this.data.publishedTime }),
        ...(this.data.modifiedTime && { modifiedTime: this.data.modifiedTime }),
        ...(this.data.author && { author: this.data.author }),
        ...(this.data.section && { section: this.data.section }),
        ...(this.data.tags && { tags: this.data.tags }),
      },
      
      twitter: {
        card: 'summary_large_image',
        site: this.config.twitterHandle,
        creator: this.config.twitterHandle,
        title,
        description,
        images: [image],
      },
      
      other: {
        ...(this.config.facebookAppId && { 'fb:app_id': this.config.facebookAppId }),
        'og:image:width': '1200',
        'og:image:height': '630',
        'twitter:image:alt': title,
        ...(this.data.slug && { 'slug': this.data.slug }),
      },
      
      icons: {
        icon: [
          { url: '/favicon.ico' },
          { url: '/icon.png', type: 'image/png' },
        ],
        apple: [
          { url: '/apple-icon.png' },
        ],
      },
      
      manifest: '/manifest.json',
      
      viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 5,
      },
      
      themeColor: '#4F46E5',
      colorScheme: 'light',
    };
  }

  // Build JSON-LD structured data
  buildStructuredData() {
    const structuredData = [];
    const canonical = this.buildCanonical();

    // Website schema
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: this.config.siteName,
      url: this.config.baseUrl,
      description: this.config.description,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${this.config.baseUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    });

    // Organization schema
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: this.config.siteName,
      url: this.config.baseUrl,
      logo: `${this.config.baseUrl}/logo.png`,
      sameAs: [
        'https://facebook.com/cashog',
        'https://twitter.com/cashog',
        'https://instagram.com/cashog',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-800-123-4567',
        contactType: 'customer service',
        email: 'support@cashog.com',
        availableLanguage: ['English'],
      },
    });

    // Breadcrumb schema
    if (this.data.breadcrumbs && this.data.breadcrumbs.length > 0) {
      structuredData.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: this.data.breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `${this.config.baseUrl}${item.url}`,
        })),
      });
    }

    // WebPage schema
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: this.buildTitle(),
      description: this.buildDescription(),
      url: canonical,
      ...(this.data.publishedTime && { datePublished: this.data.publishedTime }),
      ...(this.data.modifiedTime && { dateModified: this.data.modifiedTime }),
    });

    // Add custom structured data
    if (this.data.structuredData) {
      structuredData.push(...this.data.structuredData);
    }

    return structuredData;
  }

  private buildTitle(): string {
    if (!this.data.title) return this.config.title;
    
    if (this.data.title.includes('|')) {
      return this.data.title;
    }
    
    return `${this.data.title} | ${this.config.siteName}`;
  }

  private buildDescription(): string {
    return this.data.description || this.config.description;
  }

  private buildKeywords(): string[] {
    if (!this.data.keywords) return this.config.keywords;
    
    if (Array.isArray(this.data.keywords)) {
      return [...new Set([...this.config.keywords, ...this.data.keywords])];
    }
    
    return [...this.config.keywords, this.data.keywords];
  }

  private buildCanonical(): string {
    if (this.data.canonical) {
      return this.data.canonical.startsWith('http') 
        ? this.data.canonical 
        : `${this.config.baseUrl}${this.data.canonical}`;
    }
    
    // Handle dynamic slugs
    if (this.data.slug) {
      return `${this.config.baseUrl}/${this.data.slug}`;
    }
    
    return `${this.config.baseUrl}${this.path}`;
  }
}

// Factory function
export function buildSeo(data: SeoData = {}, path: string = '/') {
  const builder = new SeoBuilder(data, path);
  return builder.build();
}

// Get structured data
export function buildStructuredData(data: SeoData = {}, path: string = '/') {
  const builder = new SeoBuilder(data, path);
  return builder.buildStructuredData();
}

// Generate slug from data
export function getSlugFromData(data: SeoData): string {
  if (data.slug) return data.slug;
  if (data.title) return generateSlug(data.title);
  return '';
}
