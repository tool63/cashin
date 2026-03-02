import type { Metadata, Viewport } from 'next';
import { SEO_CONFIG } from './seoConfig';
import { PageType } from './pageTypes';

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
  formatDetection?: {
    telephone: boolean;
    date: boolean;
    address: boolean;
    email: boolean;
    url: boolean;
  };
  itunes?: {
    appId: string;
    appArgument?: string;
  };
  facebook?: {
    appId: string;
  };
}

export function buildMetadata(input: MetadataInput): MetadataOutput {
  const {
    pageType,
    route,
    locale = 'en_US',
    canonical,
    data = {},
    queryParams = {},
    noindex = false,
    nofollow = false,
    priority = 0.5,
    siteName = SEO_CONFIG.siteName,
  } = input;

  const baseUrl = SEO_CONFIG.siteUrl;
  const fullUrl = canonical || `${baseUrl}${route}`;
  
  // Build titles with SEO optimization
  const title = buildTitle(pageType, data, siteName);
  const description = buildDescription(pageType, data);
  const keywords = buildKeywords(pageType, data.keywords);
  const image = data.image || buildImageForType(pageType, data);
  const imageAlt = data.imageAlt || title;
  
  // Current date for freshness signals
  const now = new Date().toISOString();
  
  // Determine robots directives
  const robots = buildRobotsDirectives(pageType, noindex, nofollow, queryParams);
  
  // Generate alternate language URLs
  const alternates: Record<string, string> = {};
  SEO_CONFIG.supportedLocales.forEach(localeCode => {
    if (localeCode !== locale) {
      alternates[localeCode] = `${baseUrl}/${localeCode}${route}`;
    }
  });
  
  return {
    // Base metadata
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords,
    
    // Robots
    robots,
    
    // Canonical and alternates
    alternates: {
      canonical: fullUrl,
      languages: alternates,
    },
    
    // OpenGraph
    openGraph: buildOpenGraph({
      type: getOpenGraphType(pageType),
      title,
      description,
      url: fullUrl,
      siteName,
      locale,
      images: image ? [{
        url: image,
        width: 1200,
        height: 630,
        alt: imageAlt,
        type: 'image/jpeg',
      }] : undefined,
      videos: data.video ? [{
        url: data.video,
        width: 1280,
        height: 720,
        type: 'video/mp4',
      }] : undefined,
      audio: data.audio ? [{
        url: data.audio,
        type: 'audio/mpeg',
      }] : undefined,
      ...(pageType === 'blog_post' && {
        type: 'article',
        article: {
          publishedTime: data.publishedAt || now,
          modifiedTime: data.updatedAt || now,
          authors: data.author ? [data.author] : undefined,
          tags: data.tags,
          section: data.category,
        },
      }),
      ...(pageType.includes('offer') && {
        type: 'product',
        product: {
          price: data.price,
          currency: data.currency || 'USD',
          availability: data.availability,
          brand: data.brand,
          sku: data.sku,
          mpn: data.mpn,
        },
      }),
    }),
    
    // Twitter Card
    twitter: buildTwitterCard({
      card: 'summary_large_image',
      title,
      description,
      site: SEO_CONFIG.twitterHandle,
      images: image ? [image] : undefined,
      imageAlt,
    }),
    
    // Facebook
    facebook: SEO_CONFIG.facebookAppId ? {
      appId: SEO_CONFIG.facebookAppId,
    } : undefined,
    
    // Verification codes
    verification: SEO_CONFIG.verification,
    
    // Viewport
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 5,
      userScalable: true,
    },
    
    // Icons
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
        { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-icon-57x57.png', sizes: '57x57', type: 'image/png' },
        { url: '/apple-icon-60x60.png', sizes: '60x60', type: 'image/png' },
        { url: '/apple-icon-72x72.png', sizes: '72x72', type: 'image/png' },
        { url: '/apple-icon-76x76.png', sizes: '76x76', type: 'image/png' },
        { url: '/apple-icon-114x114.png', sizes: '114x114', type: 'image/png' },
        { url: '/apple-icon-120x120.png', sizes: '120x120', type: 'image/png' },
        { url: '/apple-icon-144x144.png', sizes: '144x144', type: 'image/png' },
        { url: '/apple-icon-152x152.png', sizes: '152x152', type: 'image/png' },
        { url: '/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
      ],
      other: [
        { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#FF6B00' },
      ],
    },
    
    // Manifest
    manifest: '/manifest.json',
    
    // Apple web app
    appleWebApp: {
      capable: true,
      title: siteName,
      statusBarStyle: 'black-translucent',
    },
    
    // Format detection
    formatDetection: {
      telephone: true,
      date: true,
      address: true,
      email: true,
      url: true,
    },
    
    // Itunes app
    itunes: process.env.ITUNES_APP_ID ? {
      appId: process.env.ITUNES_APP_ID,
      appArgument: fullUrl,
    } : undefined,
    
    // Other meta
    other: {
      'application-name': siteName,
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
      'msapplication-TileColor': SEO_CONFIG.themeColor,
      'msapplication-TileImage': '/ms-icon-144x144.png',
      'theme-color': SEO_CONFIG.themeColor,
    },
  };
}

// Helper functions
function buildTitle(pageType: PageType, data: any, siteName: string): string {
  const baseTitle = data.title || '';
  
  // SEO-optimized title patterns
  const titlePatterns: Record<PageType, string> = {
    home: SEO_CONFIG.defaultTitle,
    earn: baseTitle ? `${baseTitle} - Earn Money Online` : 'Earn Money Online - Complete Offers & Surveys',
    earn_category: baseTitle ? `${baseTitle} Offers - Earn Money` : 'Earn Money by Category',
    earn_offer: baseTitle ? `${baseTitle} - Earn $${data.payout || 'X'} Cash` : 'Earn Money Offer',
    guides: baseTitle ? `${baseTitle} Guide` : 'Earning Guides & Tutorials',
    guide_article: baseTitle ? `${baseTitle} - Step-by-Step Guide` : 'How to Earn Guide',
    rewards: baseTitle ? `${baseTitle} Rewards` : 'Cash Rewards & Gift Cards',
    reward_detail: baseTitle ? `${baseTitle} - Redeem Now` : 'Reward Details',
    cashback: baseTitle ? `${baseTitle} Cashback` : 'Cashback Shopping - Save & Earn',
    cashback_store: baseTitle ? `Shop at ${baseTitle} & Earn Cashback` : 'Store Cashback',
    affiliate: 'Affiliate Program - Earn Commission',
    affiliate_dashboard: 'Affiliate Dashboard',
    blog: baseTitle ? `${baseTitle} - Cashog Blog` : 'Cashog Blog - Earning Tips & News',
    blog_category: baseTitle ? `${baseTitle} - Blog Category` : 'Blog Category',
    blog_post: baseTitle || 'Blog Post',
    blog_author: `Posts by ${baseTitle || 'Author'} - Cashog Blog`,
    blog_tag: `${baseTitle || 'Tag'} - Cashog Blog`,
    static: baseTitle || siteName,
    static_policy: baseTitle || 'Legal Information',
    static_about: 'About Cashog - Our Story',
    static_contact: 'Contact Us - Get Support',
    static_help: 'Help Center - FAQ & Support',
    static_faq: 'Frequently Asked Questions',
    user_profile: baseTitle ? `${baseTitle}'s Profile` : 'User Profile',
    user_dashboard: 'Dashboard - My Account',
    user_settings: 'Account Settings',
    auth: 'Authentication',
    auth_login: 'Login to Cashog',
    auth_register: 'Create Account - Join Cashog',
    auth_reset: 'Reset Password',
    auth_verify: 'Verify Email',
    search: `${baseTitle || 'Search'} - Cashog`,
    search_results: `Search Results for "${baseTitle || ''}"`,
    search_category: `${baseTitle || 'Category'} Search`,
    pagination: `Page ${data.page || 1} - ${siteName}`,
    api: 'API',
    admin: 'Admin Dashboard',
    admin_dashboard: 'Admin - Dashboard',
    admin_users: 'Admin - User Management',
    admin_offers: 'Admin - Offer Management',
    admin_analytics: 'Admin - Analytics',
    error: 'Error',
    error_404: 'Page Not Found - 404 Error',
    error_500: 'Server Error - 500',
    unknown: siteName,
  };
  
  const title = titlePatterns[pageType] || siteName;
  
  // Apply title template unless it's the home page
  if (pageType !== 'home' && !title.includes('|')) {
    return SEO_CONFIG.titleTemplate.replace('%s', title);
  }
  
  return title;
}

function buildDescription(pageType: PageType, data: any): string {
  const baseDescription = data.description || '';
  
  const descriptionPatterns: Record<PageType, string> = {
    home: SEO_CONFIG.defaultDescription,
    earn: baseDescription || 'Complete offers, surveys, and tasks to earn real money, PayPal cash, and gift cards. Join 10M+ users earning with Cashog.',
    earn_category: baseDescription || `Browse ${data.category || 'top'} offers and start earning money today. High-paying tasks and surveys available.`,
    earn_offer: baseDescription || `Earn $${data.payout || 'cash'} with this offer. Complete simple tasks and get paid instantly.`,
    guides: baseDescription || 'Step-by-step guides and tutorials to maximize your earnings on Cashog. Learn pro tips and strategies.',
    guide_article: baseDescription || 'Learn how to earn more with Cashog. Expert tips and proven strategies for maximizing your rewards.',
    rewards: baseDescription || 'Redeem your earnings for PayPal cash, gift cards from top brands, and cryptocurrency rewards.',
    reward_detail: baseDescription || `Redeem ${data.title || 'this reward'} with your Cashog earnings. Instant delivery guaranteed.`,
    cashback: baseDescription || 'Shop at 1000+ stores and earn cashback on every purchase. Double your savings with Cashog.',
    cashback_store: baseDescription || `Earn cashback when you shop at ${data.store || 'this store'}. Best deals and offers available.`,
    affiliate: baseDescription || 'Join the Cashog affiliate program and earn 30% commission on referrals. Start promoting today.',
    affiliate_dashboard: 'Track your affiliate earnings, referrals, and commissions in real-time.',
    blog: baseDescription || 'Latest updates, earning tips, and success stories from the Cashog community.',
    blog_category: baseDescription || `Explore ${data.category || 'our'} blog category for expert insights and earning strategies.`,
    blog_post: baseDescription || 'Read our latest blog post about earning money online with Cashog.',
    blog_author: baseDescription || `Read articles by ${data.author || 'our expert'} about making money online.`,
    blog_tag: baseDescription || `Explore content tagged with ${data.tag || 'this topic'} on the Cashog blog.`,
    static: baseDescription || SEO_CONFIG.defaultDescription,
    static_policy: baseDescription || 'Legal terms, privacy policy, and cookie information for Cashog users.',
    static_about: 'Learn about Cashog\'s mission, team, and how we help users earn money online.',
    static_contact: 'Get in touch with Cashog support. We\'re here to help 24/7.',
    static_help: 'Find answers to common questions and get support for your Cashog account.',
    static_faq: 'Quick answers to frequently asked questions about earning with Cashog.',
    user_profile: baseDescription || `View ${data.username || 'user'}'s profile and earnings on Cashog.`,
    user_dashboard: 'Manage your Cashog account, track earnings, and redeem rewards.',
    user_settings: 'Update your account settings, preferences, and security options.',
    auth: 'Secure authentication for Cashog rewards platform.',
    auth_login: 'Login to your Cashog account to access your earnings and rewards.',
    auth_register: 'Create a free Cashog account and start earning money online today.',
    auth_reset: 'Reset your Cashog account password securely.',
    auth_verify: 'Verify your email address to activate your Cashog account.',
    search: baseDescription || 'Search for offers, guides, and rewards on Cashog.',
    search_results: baseDescription || `Browse search results for "${data.query || ''}" on Cashog.`,
    search_category: baseDescription || `Search for ${data.category || 'offers'} and earn money.`,
    pagination: `Page ${data.page || 1} of Cashog - ${SEO_CONFIG.defaultDescription}`,
    api: 'Cashog API documentation and endpoints.',
    admin: 'Administrative dashboard for Cashog platform management.',
    admin_dashboard: 'Monitor platform performance, users, and earnings.',
    admin_users: 'Manage Cashog users, accounts, and permissions.',
    admin_offers: 'Create and manage earning offers and campaigns.',
    admin_analytics: 'View detailed analytics and platform metrics.',
    error: 'An error occurred on Cashog.',
    error_404: 'The page you\'re looking for could not be found. Return to Cashog home.',
    error_500: 'Server error occurred. Our team has been notified.',
    unknown: SEO_CONFIG.defaultDescription,
  };
  
  // Truncate to optimal length (155-160 characters)
  const description = descriptionPatterns[pageType] || SEO_CONFIG.defaultDescription;
  return description.length > 160 ? description.substring(0, 157) + '...' : description;
}

function buildKeywords(pageType: PageType, customKeywords: string[] = []): string[] {
  const baseKeywords = [...SEO_CONFIG.defaultKeywords];
  
  const typeKeywords: Record<PageType, string[]> = {
    home: ['rewards platform', 'make money app', 'cash rewards'],
    earn: ['paid offers', 'online tasks', 'survey opportunities'],
    earn_category: ['category offers', 'task categories'],
    earn_offer: ['high paying offers', 'bonus tasks'],
    guides: ['earning tutorials', 'money making tips'],
    guide_article: ['step by step guide', 'tutorial'],
    rewards: ['paypal cash', 'gift cards', 'crypto rewards'],
    reward_detail: ['redeem rewards', 'cash out'],
    cashback: ['shopping cashback', 'online savings'],
    cashback_store: ['store deals', 'retail cashback'],
    affiliate: ['referral program', 'commission earnings'],
    affiliate_dashboard: ['affiliate stats', 'referral tracking'],
    blog: ['money blog', 'earning news'],
    blog_category: ['blog category', 'topic articles'],
    blog_post: ['article', 'blog post'],
    blog_author: ['author articles', 'contributor posts'],
    blog_tag: ['tagged content', 'topic'],
    static: ['information', 'about'],
    static_policy: ['terms', 'privacy', 'legal'],
    static_about: ['about us', 'company'],
    static_contact: ['contact', 'support'],
    static_help: ['help', 'support center'],
    static_faq: ['faq', 'questions'],
    user_profile: ['user profile', 'member'],
    user_dashboard: ['account dashboard', 'member area'],
    user_settings: ['account settings', 'preferences'],
    auth: ['login', 'sign in', 'register'],
    auth_login: ['login', 'sign in'],
    auth_register: ['sign up', 'create account'],
    auth_reset: ['password reset', 'forgot password'],
    auth_verify: ['email verification', 'confirm account'],
    search: ['search results', 'find offers'],
    search_results: ['search', 'results'],
    search_category: ['category search', 'filter'],
    pagination: ['page', 'more'],
    api: ['api', 'developer'],
    admin: ['admin', 'management'],
    admin_dashboard: ['admin panel', 'control'],
    admin_users: ['user management', 'members'],
    admin_offers: ['offer management', 'campaigns'],
    admin_analytics: ['analytics', 'reports'],
    error: ['error', 'problem'],
    error_404: ['404', 'not found'],
    error_500: ['500', 'server error'],
    unknown: [],
  };
  
  const merged = [...baseKeywords, ...typeKeywords[pageType], ...customKeywords];
  return Array.from(new Set(merged)).slice(0, 20); // Max 20 keywords
}

function buildImageForType(pageType: PageType, data: any): string {
  const baseUrl = SEO_CONFIG.siteUrl;
  
  const imageMap: Record<PageType, string> = {
    home: `${baseUrl}/images/home-og.jpg`,
    earn: `${baseUrl}/images/earn-og.jpg`,
    earn_category: data.image || `${baseUrl}/images/category-og.jpg`,
    earn_offer: data.image || `${baseUrl}/images/offer-og.jpg`,
    guides: `${baseUrl}/images/guides-og.jpg`,
    guide_article: data.image || `${baseUrl}/images/guide-og.jpg`,
    rewards: `${baseUrl}/images/rewards-og.jpg`,
    reward_detail: data.image || `${baseUrl}/images/reward-og.jpg`,
    cashback: `${baseUrl}/images/cashback-og.jpg`,
    cashback_store: data.image || `${baseUrl}/images/store-og.jpg`,
    affiliate: `${baseUrl}/images/affiliate-og.jpg`,
    affiliate_dashboard: `${baseUrl}/images/dashboard-og.jpg`,
    blog: `${baseUrl}/images/blog-og.jpg`,
    blog_category: `${baseUrl}/images/blog-category-og.jpg`,
    blog_post: data.image || `${baseUrl}/images/blog-post-og.jpg`,
    blog_author: `${baseUrl}/images/author-og.jpg`,
    blog_tag: `${baseUrl}/images/tag-og.jpg`,
    static: `${baseUrl}/images/default-og.jpg`,
    static_policy: `${baseUrl}/images/legal-og.jpg`,
    static_about: `${baseUrl}/images/about-og.jpg`,
    static_contact: `${baseUrl}/images/contact-og.jpg`,
    static_help: `${baseUrl}/images/help-og.jpg`,
    static_faq: `${baseUrl}/images/faq-og.jpg`,
    user_profile: `${baseUrl}/images/profile-og.jpg`,
    user_dashboard: `${baseUrl}/images/dashboard-og.jpg`,
    user_settings: `${baseUrl}/images/settings-og.jpg`,
    auth: `${baseUrl}/images/auth-og.jpg`,
    auth_login: `${baseUrl}/images/login-og.jpg`,
    auth_register: `${baseUrl}/images/register-og.jpg`,
    auth_reset: `${baseUrl}/images/reset-og.jpg`,
    auth_verify: `${baseUrl}/images/verify-og.jpg`,
    search: `${baseUrl}/images/search-og.jpg`,
    search_results: `${baseUrl}/images/search-og.jpg`,
    search_category: `${baseUrl}/images/search-og.jpg`,
    pagination: `${baseUrl}/images/default-og.jpg`,
    api: `${baseUrl}/images/api-og.jpg`,
    admin: `${baseUrl}/images/admin-og.jpg`,
    admin_dashboard: `${baseUrl}/images/admin-og.jpg`,
    admin_users: `${baseUrl}/images/admin-og.jpg`,
    admin_offers: `${baseUrl}/images/admin-og.jpg`,
    admin_analytics: `${baseUrl}/images/admin-og.jpg`,
    error: `${baseUrl}/images/error-og.jpg`,
    error_404: `${baseUrl}/images/404-og.jpg`,
    error_500: `${baseUrl}/images/500-og.jpg`,
    unknown: SEO_CONFIG.defaultOgImage,
  };
  
  return imageMap[pageType] || SEO_CONFIG.defaultOgImage;
}

function getOpenGraphType(pageType: PageType): string {
  const typeMap: Record<PageType, string> = {
    home: 'website',
    earn: 'website',
    earn_category: 'website',
    earn_offer: 'product',
    guides: 'website',
    guide_article: 'article',
    rewards: 'website',
    reward_detail: 'product',
    cashback: 'website',
    cashback_store: 'product',
    affiliate: 'website',
    affiliate_dashboard: 'website',
    blog: 'website',
    blog_category: 'website',
    blog_post: 'article',
    blog_author: 'profile',
    blog_tag: 'website',
    static: 'website',
    static_policy: 'website',
    static_about: 'website',
    static_contact: 'website',
    static_help: 'website',
    static_faq: 'website',
    user_profile: 'profile',
    user_dashboard: 'website',
    user_settings: 'website',
    auth: 'website',
    auth_login: 'website',
    auth_register: 'website',
    auth_reset: 'website',
    auth_verify: 'website',
    search: 'website',
    search_results: 'website',
    search_category: 'website',
    pagination: 'website',
    api: 'website',
    admin: 'website',
    admin_dashboard: 'website',
    admin_users: 'website',
    admin_offers: 'website',
    admin_analytics: 'website',
    error: 'website',
    error_404: 'website',
    error_500: 'website',
    unknown: 'website',
  };
  
  return typeMap[pageType] || 'website';
}

function buildRobotsDirectives(
  pageType: PageType,
  noindex: boolean,
  nofollow: boolean,
  queryParams: Record<string, string>
): Metadata['robots'] {
  const directives: string[] = [];
  
  // Index/Noindex
  if (noindex || queryParams.page || queryParams.sort || queryParams.filter) {
    directives.push('noindex');
  } else {
    directives.push('index');
  }
  
  // Follow/Nofollow
  if (nofollow) {
    directives.push('nofollow');
  } else {
    directives.push('follow');
  }
  
  // Additional directives
  directives.push('max-snippet:-1');
  directives.push('max-image-preview:large');
  directives.push('max-video-preview:-1');
  
  // Cache control
  if (pageType.includes('static')) {
    directives.push('max-image-preview:large');
  }
  
  // Google-specific directives
  const googleBot: string[] = [];
  if (noindex) googleBot.push('noindex');
  if (nofollow) googleBot.push('nofollow');
  googleBot.push('max-snippet:-1', 'max-image-preview:large', 'max-video-preview:-1');
  
  return {
    index: !noindex,
    follow: !nofollow,
    nocache: false,
    googleBot: {
      index: !noindex,
      follow: !nofollow,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  };
}

function buildOpenGraph(config: any): Metadata['openGraph'] {
  return {
    title: config.title,
    description: config.description,
    url: config.url,
    siteName: config.siteName,
    locale: config.locale,
    type: config.type,
    images: config.images,
    videos: config.videos,
    audio: config.audio,
    ...(config.type === 'article' && {
      article: config.article,
    }),
    ...(config.type === 'product' && {
      product: config.product,
    }),
  };
}

function buildTwitterCard(config: any): Metadata['twitter'] {
  return {
    card: config.card,
    title: config.title,
    description: config.description,
    site: config.site,
    images: config.images,
    imageAlt: config.imageAlt,
  };
}
