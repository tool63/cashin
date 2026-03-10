// app/robots.ts
import type { MetadataRoute } from 'next'
import { SEO_CONFIG } from '@/components/SEO/seoConfig'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const isProduction = process.env.NODE_ENV === 'production'
  const isPreview = process.env.VERCEL_ENV === 'preview'
  const isStaging = process.env.NEXT_PUBLIC_APP_ENV === 'staging'
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SEO_CONFIG.siteUrl

  // 🚫 Block all non-production environments
  if (!isProduction || isPreview || isStaging) {
    return { rules: [{ userAgent: '*', disallow: '/' }], sitemap: [] }
  }

  // ============================
  // Known Malicious / AI Bots
  // ============================
  const blockedBots = [
    'GPTBot', 'ClaudeBot', 'PerplexityBot', 'CCBot', 'Google-Extended',
    'OpenAI-Bot', 'ChatGPT-User', 'Bytespider', 'anthropic-ai'
  ]

  // ============================
  // Heavy Crawlers with Crawl Delays
  // ============================
  const heavyCrawlers = [
    { bot: 'AhrefsBot', delay: 5 },
    { bot: 'SemrushBot', delay: 5 },
    { bot: 'MJ12bot', delay: 10 },
  ]

  // ============================
  // High-Value Pages (Always Allowed)
  // ============================
  const premiumAllow = ['/offer/', '/reward/']

  // ============================
  // Regional Sitemaps
  // ============================
  const regions = ['us', 'eu', 'asia']
  const regionalSitemaps = regions.map(region => `${baseUrl}/sitemap.xml?region=${region}`)

  // ============================
  // Dynamic AI / LLM Bot Detection Patterns
  // ============================
  const dynamicAIBotPatterns = [
    '*ai*', '*gpt*', '*llm*', '*chatgpt*', '*anthropic*', '*bard*', '*falcon*'
  ]

  return {
    rules: [
      // ---------------------------
      // Standard Corporate Rules
      // ---------------------------
      {
        userAgent: '*',
        allow: [
          '/',
          '/blog/',
          '/guides/',
          '/offers/',
          '/rewards/',
          '/cashback/',
          '/affiliate/',
          '/earn/',
          ...premiumAllow,
        ],
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
          '/*?*session',
          '/*?*ref=',
        ],
        crawlDelay: 2,
      },

      // ---------------------------
      // Block Known Malicious / AI Bots
      // ---------------------------
      ...blockedBots.map(bot => ({ userAgent: bot, disallow: '/' })),

      // ---------------------------
      // Heavy Crawlers with Delays
      // ---------------------------
      ...heavyCrawlers.map(c => ({ userAgent: c.bot, crawlDelay: c.delay })),

      // ---------------------------
      // Dynamic Pattern-Based AI / LLM Bot Blocking
      // ---------------------------
      ...dynamicAIBotPatterns.map(pattern => ({ userAgent: pattern, disallow: '/' })),

      // ---------------------------
      // Catch-All Unknown Bots
      // ---------------------------
      { userAgent: '*bot*', disallow: '/', crawlDelay: 5 },
    ],

    // ============================
    // Sitemaps (Enterprise + Regional)
    // ============================
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap.xml?type=pages`,
      `${baseUrl}/sitemap.xml?type=offers`,
      `${baseUrl}/sitemap.xml?type=blog`,
      `${baseUrl}/sitemap.xml?type=categories`,
      ...regionalSitemaps,
    ],
  }
}
