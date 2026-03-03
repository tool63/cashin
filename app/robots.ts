import type { MetadataRoute } from 'next'
import { SEO_CONFIG } from '@/components/SEO/seoConfig'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const isProduction = process.env.NODE_ENV === 'production'
  const isPreview = process.env.VERCEL_ENV === 'preview'
  const isStaging = process.env.NEXT_PUBLIC_APP_ENV === 'staging'
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SEO_CONFIG.siteUrl

  // 🚫 Block in non-production (Original logic preserved)
  if (!isProduction || isPreview || isStaging) {
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
      sitemap: [],
    }
  }

  return {
    rules: [
      {
        userAgent: '*',

        // ==================================================
        // ORIGINAL ALLOW RULES (KEPT UNCHANGED)
        // ==================================================
        allow: [
          '/',
          '/blog/',
          '/guides/',
          '/offers/',
          '/rewards/',
          '/cashback/',
          '/affiliate/',
          '/earn/',
        ],

        // ==================================================
        // ORIGINAL DISALLOW RULES (KEPT UNCHANGED)
        // ==================================================
        disallow: [
          '/api/',
          '/_next/',
          '/internal/',
          '/server/',
          '/auth/',
          '/login/',
          '/register/',
          '/dashboard/',
          '/profile/',
          '/settings/',
          '/track/',
          '/redirect/',
          '/*?*utm_',
          '/*?*fbclid=',
          '/*?*gclid=',
        ],
      },

      // ==================================================
      // ORIGINAL BOT BLOCKS (KEPT UNCHANGED)
      // ==================================================
      { userAgent: 'GPTBot', disallow: '/' },
      { userAgent: 'Google-Extended', disallow: '/' },
      { userAgent: 'ClaudeBot', disallow: '/' },
      { userAgent: 'PerplexityBot', disallow: '/' },
      { userAgent: 'CCBot', disallow: '/' },

      // ==================================================
      // ORIGINAL CRAWL DELAYS (KEPT UNCHANGED)
      // ==================================================
      { userAgent: 'AhrefsBot', crawlDelay: 5 },
      { userAgent: 'SemrushBot', crawlDelay: 5 },
      { userAgent: 'MJ12bot', crawlDelay: 10 },

      // ==================================================
      // ULTRA PREMIUM ADDITIONS (WITHOUT REMOVING ANYTHING)
      // ==================================================

      // AI & Large Language Model Crawlers (Security)
      { userAgent: 'OpenAI-Bot', disallow: '/' },
      { userAgent: 'ChatGPT-User', disallow: '/' },
      { userAgent: 'CCBot', disallow: '/' },
      { userAgent: 'Bytespider', disallow: '/' },
      { userAgent: 'anthropic-ai', disallow: '/' },

      // International SEO Friendly Crawling
      { userAgent: '*', crawlDelay: 2 },

      // Query Parameter Protection (SEO Safe)
      { userAgent: '*', disallow: '/*?*session' },
      { userAgent: '*', disallow: '/*?*ref=' },

      // Reward & Offer Pages (Allowed)
      { userAgent: '*', allow: ['/offer/', '/reward/'] },
    ],

    // ======================================================
    // ORIGINAL SITEMAP SECTION (KEPT UNCHANGED)
    // ======================================================
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap.xml?type=pages`,
      `${baseUrl}/sitemap.xml?type=offers`,
      `${baseUrl}/sitemap.xml?type=blog`,
      `${baseUrl}/sitemap.xml?type=categories`,
    ],
  }
}
