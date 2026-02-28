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

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://payup-pi.vercel.app";

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

// Route-specific SEO data
export const routeSeo: Record<string, Partial<SeoData>> = {
  "/": {
    title: "Cashog - Make Money Online | Earn Cash Fast",
    description: "Join 500K+ users earning real money daily. Complete offers, play games, answer surveys. Instant cashouts via PayPal, Venmo, Gift Cards.",
    keywords: ["earn money online", "cash rewards", "online income", "make money from home"],
    section: "home",
  },
  "/affiliate": {
    title: "Cashog Affiliate Program - Earn 30% Commission",
    description: "Join Cashog affiliate program. Earn 30% recurring commission for life. Promote legitimate money-making opportunities.",
    keywords: ["affiliate program", "earn commission", "referral program", "make money referrals"],
    section: "affiliate",
  },
  "/how-it-works": {
    title: "How Cashog Works - Simple Steps to Start Earning",
    description: "Learn how to make money with Cashog in 3 simple steps. Sign up, complete offers, get paid instantly. No hidden fees.",
    section: "information",
  },
  "/tasks": {
    title: "Available Tasks - Start Earning Money Today",
    description: "Browse hundreds of available tasks, offers, and surveys. New tasks added daily. Start earning real money now.",
    keywords: ["online tasks", "paid surveys", "micro tasks", "online jobs"],
    section: "tasks",
  },
  "/blog": {
    title: "Cashog Blog - Money Making Tips & Success Stories",
    description: "Read latest articles about online money making, side hustles, success stories, and tips to maximize your earnings.",
    section: "blog",
  },
  "/faq": {
    title: "Frequently Asked Questions - Cashog Help Center",
    description: "Get answers to common questions about Cashog, payments, tasks, and how to maximize your earnings.",
    section: "support",
  },
  "/contact": {
    title: "Contact Cashog Support - We're Here to Help",
    description: "Have questions? Contact our support team. We're available 24/7 to assist you with any issues.",
    section: "support",
  },
  "/terms": {
    title: "Terms of Service - Cashog User Agreement",
    description: "Read our terms of service and user agreement before using Cashog.",
    noIndex: true,
    section: "legal",
  },
  "/privacy": {
    title: "Privacy Policy - Cashog Data Protection",
    description: "Learn how Cashog protects your privacy and handles your personal data.",
    noIndex: true,
    section: "legal",
  },
};

export class SeoBuilder {
  private config: SeoConfig;
  private data: SeoData;

  constructor(data: SeoData = {}) {
    this.config = { ...defaultSeo };
    this.data = data;
  }

  // Build complete SEO metadata
  build() {
    const title = this.buildTitle();
    const description = this.buildDescription();
    const keywords = this.buildKeywords();
    const image = this.data.image || this.config.image;
    const canonical = this.buildCanonical();

    return {
      // Basic metadata
      title,
      description,
      keywords: Array.isArray(keywords) ? keywords.join(', ') : keywords,
      
      // Robots control
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
      
      // Canonical
      alternates: {
        canonical,
      },
      
      // Open Graph
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
      
      // Twitter
      twitter: {
        card: 'summary_large_image',
        site: this.config.twitterHandle,
        creator: this.config.twitterHandle,
        title,
        description,
        images: [image],
      },
      
      // Additional meta
      other: {
        ...(this.config.facebookAppId && { 'fb:app_id': this.config.facebookAppId }),
        'og:image:width': '1200',
        'og:image:height': '630',
        'twitter:image:alt': title,
      },
      
      // Icons
      icons: {
        icon: [
          { url: '/favicon.ico' },
          { url: '/icon.png', type: 'image/png' },
        ],
        apple: [
          { url: '/apple-icon.png' },
        ],
      },
      
      // Manifest
      manifest: '/manifest.json',
      
      // Viewport
      viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 5,
      },
      
      // Theme
      themeColor: '#4F46E5',
      colorScheme: 'light',
    };
  }

  // Build JSON-LD structured data
  buildStructuredData() {
    const structuredData = [];

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

    // Add custom structured data
    if (this.data.structuredData) {
      structuredData.push(...this.data.structuredData);
    }

    return structuredData;
  }

  // Build title with template
  private buildTitle(): string {
    if (!this.data.title) return this.config.title;
    
    if (this.data.title.includes('|')) {
      return this.data.title;
    }
    
    return `${this.data.title} | ${this.config.siteName}`;
  }

  // Build description
  private buildDescription(): string {
    return this.data.description || this.config.description;
  }

  // Build keywords
  private buildKeywords(): string[] {
    if (!this.data.keywords) return this.config.keywords;
    
    if (Array.isArray(this.data.keywords)) {
      return [...new Set([...this.config.keywords, ...this.data.keywords])];
    }
    
    return [...this.config.keywords, this.data.keywords];
  }

  // Build canonical URL
  private buildCanonical(): string {
    if (this.data.canonical) {
      return this.data.canonical.startsWith('http') 
        ? this.data.canonical 
        : `${this.config.baseUrl}${this.data.canonical}`;
    }
    
    return this.config.baseUrl;
  }
}

// Factory function
export function buildSeo(data: SeoData = {}) {
  const builder = new SeoBuilder(data);
  return builder.build();
}

// Get route SEO data
export function getRouteSeo(path: string, customData?: SeoData): SeoData {
  const routeData = routeSeo[path] || {};
  return { ...routeData, ...customData };
}
