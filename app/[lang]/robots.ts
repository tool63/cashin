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
  // Configuration
  // ============================
  const blockedBots = [
    'GPTBot', 'ClaudeBot', 'PerplexityBot', 'CCBot', 'Google-Extended',
    'OpenAI-Bot', 'ChatGPT-User', 'Bytespider', 'anthropic-ai'
  ]

  const heavyCrawlers = [
    { bot: 'AhrefsBot', delay: 5 },
    { bot: 'SemrushBot', delay: 5 },
    { bot: 'MJ12bot', delay: 10 },
  ]

  const premiumAllow = ['/offer/', '/reward/']

  const dynamicAIBotPatterns = [
    '*ai*', '*gpt*', '*llm*', '*chatgpt*', '*anthropic*', '*bard*', '*falcon*'
  ]

  const regions = ['us', 'eu', 'asia']
  const regionalSitemaps = regions.map(region => `${baseUrl}/sitemap.xml?region=${region}`)

  // ============================
  // Rules
  // ============================
  const rules: MetadataRoute.Robots['rules'] = [
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

    // Block known malicious AI / bots
    ...blockedBots.map(bot => ({ userAgent: bot, disallow: '/' })),

    // Heavy crawlers with delays
    ...heavyCrawlers.map(c => ({ userAgent: c.bot, crawlDelay: c.delay })),

    // Dynamic AI/LLM bot pattern blocking
    ...dynamicAIBotPatterns.map(pattern => ({ userAgent: pattern, disallow: '/' })),

    // Catch-all for unknown bots
    { userAgent: '*bot*', disallow: '/', crawlDelay: 5 },
  ]

  // ============================
  // Sitemaps
  // ============================
  const sitemap = [
    `${baseUrl}/sitemap.xml`,
    `${baseUrl}/sitemap.xml?type=pages`,
    `${baseUrl}/sitemap.xml?type=offers`,
    `${baseUrl}/sitemap.xml?type=blog`,
    `${baseUrl}/sitemap.xml?type=categories`,
    ...regionalSitemaps,
  ]

  return { rules, sitemap }
}
