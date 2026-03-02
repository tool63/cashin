import type { MetadataRoute } from 'next'
import { SEO_CONFIG } from '@/components/SEO/seoConfig'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const isProduction = process.env.NODE_ENV === 'production'
  const isPreview = process.env.VERCEL_ENV === 'preview'
  const isStaging = process.env.NEXT_PUBLIC_APP_ENV === 'staging'
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SEO_CONFIG.siteUrl

  // 🚫 Block in non-production
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

      { userAgent: 'GPTBot', disallow: '/' },
      { userAgent: 'Google-Extended', disallow: '/' },
      { userAgent: 'ClaudeBot', disallow: '/' },
      { userAgent: 'PerplexityBot', disallow: '/' },
      { userAgent: 'CCBot', disallow: '/' },

      { userAgent: 'AhrefsBot', crawlDelay: 5 },
      { userAgent: 'SemrushBot', crawlDelay: 5 },
      { userAgent: 'MJ12bot', crawlDelay: 10 },
    ],

    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap.xml?type=pages`,
      `${baseUrl}/sitemap.xml?type=offers`,
      `${baseUrl}/sitemap.xml?type=blog`,
      `${baseUrl}/sitemap.xml?type=categories`,
    ],
  }
}
