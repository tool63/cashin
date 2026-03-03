// ============================================================
// Enterprise-grade SEO configuration (Global Authority Ready)
// ============================================================

export const SEO_CONFIG = {
  // ==========================================================
  // Core Settings
  // ==========================================================
  siteName: 'Cashog',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://cashog.com',
  siteDomain: 'cashog.com',
  defaultLocale: 'en',
  supportedLocales: ['en', 'es', 'fr', 'de', 'it', 'pt', 'nl', 'pl', 'ru', 'ja', 'ko', 'zh'],

  // OpenGraph locale mapping
  localeMap: {
    en: 'en_US',
    es: 'es_ES',
    fr: 'fr_FR',
    de: 'de_DE',
    it: 'it_IT',
    pt: 'pt_PT',
    nl: 'nl_NL',
    pl: 'pl_PL',
    ru: 'ru_RU',
    ja: 'ja_JP',
    ko: 'ko_KR',
    zh: 'zh_CN',
  },

  // ==========================================================
  // Default Meta
  // ==========================================================
  defaultTitle: 'Cashog – #1 Rewards Platform: Earn Money, Gift Cards & Crypto',
  titleTemplate: '%s | Cashog - Earn Money Online',
  defaultDescription:
    'Join 10M+ users earning real money with Cashog. Complete offers, surveys, and tasks to earn PayPal cash, gift cards, and crypto rewards. Start earning today!',

  defaultKeywords: [
    'earn money online',
    'make money from home',
    'cash rewards',
    'paid surveys',
    'gift cards',
    'PayPal money',
    'crypto rewards',
    'online jobs',
    'side hustle',
    'passive income',
  ],

  defaultRobots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ==========================================================
  // Brand & Organization (Authority SEO)
  // ==========================================================
  organization: {
    name: 'Cashog',
    legalName: 'Cashog Inc.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://cashog.com',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://cashog.com'}/logo.png`,
    foundingDate: '2024',
    sameAs: [
      'https://facebook.com/cashog',
      'https://twitter.com/cashog',
      'https://instagram.com/cashog',
      'https://linkedin.com/company/cashog',
      'https://youtube.com/cashog',
      'https://tiktok.com/@cashog',
      'https://pinterest.com/cashog',
    ],
  },

  // ==========================================================
  // Social Media
  // ==========================================================
  twitterHandle: '@cashog',
  facebookAppId: process.env.FACEBOOK_APP_ID,

  // ==========================================================
  // Images
  // ==========================================================
  defaultOgImage: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://cashog.com'}/og-image.jpg`,
  defaultTwitterImage: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://cashog.com'}/twitter-image.jpg`,
  favicon: '/favicon.ico',
  appleTouchIcon: '/apple-touch-icon.png',

  // ==========================================================
  // Verification Codes
  // ==========================================================
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
    bing: process.env.BING_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    pinterest: process.env.PINTEREST_VERIFICATION,
    facebook: process.env.FACEBOOK_VERIFICATION,
  },

  // ==========================================================
  // Social Links
  // ==========================================================
  socialLinks: {
    facebook: 'https://facebook.com/cashog',
    twitter: 'https://twitter.com/cashog',
    instagram: 'https://instagram.com/cashog',
    linkedin: 'https://linkedin.com/company/cashog',
    youtube: 'https://youtube.com/cashog',
    tiktok: 'https://tiktok.com/@cashog',
    pinterest: 'https://pinterest.com/cashog',
  },

  // ==========================================================
  // Contact Info (Used in Schema)
  // ==========================================================
  contact: {
    email: 'support@cashog.com',
    phone: '+1-800-CASHOG',
    address: {
      street: '123 Rewards Street',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94105',
      country: 'US',
    },
  },

  // ==========================================================
  // Theme & Branding
  // ==========================================================
  themeColor: '#FF6B00',
  backgroundColor: '#FFFFFF',

  // ==========================================================
  // Analytics
  // ==========================================================
  googleAnalyticsId: process.env.GA_MEASUREMENT_ID,
  googleTagManagerId: process.env.GTM_ID,

  // ==========================================================
  // Performance Optimizations
  // ==========================================================
  preconnect: [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://images.cashog.com',
    'https://api.cashog.com',
  ],

  dnsPrefetch: [
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
  ],

  // ==========================================================
  // Security (Enterprise CSP)
  // ==========================================================
  csp: {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      "'unsafe-inline'",
      "'unsafe-eval'",
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
    ],
    'style-src': [
      "'self'",
      "'unsafe-inline'",
      'https://fonts.googleapis.com',
    ],
    'img-src': [
      "'self'",
      'data:',
      'https:',
      'https://images.cashog.com',
    ],
    'font-src': [
      "'self'",
      'https://fonts.gstatic.com',
    ],
    'connect-src': [
      "'self'",
      'https://api.cashog.com',
      'https://www.google-analytics.com',
    ],
    'frame-src': [
      "'self'",
      'https://www.youtube.com',
      'https://player.vimeo.com',
    ],
  },

  // ==========================================================
  // Sitemap & Feeds
  // ==========================================================
  sitemapUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://cashog.com'}/sitemap.xml`,
  rssUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://cashog.com'}/rss.xml`,

  // ==========================================================
  // Structured Data Defaults
  // ==========================================================
  structuredDataDefaults: {
    enableBreadcrumbs: true,
    enableOrganization: true,
    enableWebsiteSchema: true,
    enableSearchAction: true,
  },

  // ==========================================================
  // PWA Configuration
  // ==========================================================
  pwa: {
    name: 'Cashog Rewards',
    shortName: 'Cashog',
    description: 'Earn money with Cashog rewards platform',
    startUrl: '/',
    display: 'standalone',
    orientation: 'portrait',
    themeColor: '#FF6B00',
    backgroundColor: '#FFFFFF',
    icons: [
      { src: '/icons/icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { src: '/icons/icon-96x96.png', sizes: '96x96', type: 'image/png' },
      { src: '/icons/icon-128x128.png', sizes: '128x128', type: 'image/png' },
      { src: '/icons/icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { src: '/icons/icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-384x384.png', sizes: '384x384', type: 'image/png' },
      { src: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
} as const;

// ============================================================
// Type-safe config access
// ============================================================
export type SEOConfig = typeof SEO_CONFIG;
