// app/sitemap.ts
import type { MetadataRoute } from 'next'
import { SEO_CONFIG } from '@/components/SEO/seoConfig'

const isProduction = process.env.NODE_ENV === 'production'
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SEO_CONFIG.siteUrl
export const revalidate = 3600

function dedupe(entries: MetadataRoute.Sitemap) {
  const seen = new Set<string>()
  return entries.filter(e => e.url && !seen.has(e.url) && seen.add(e.url))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!isProduction) return []

  const now = new Date()
  const entries: MetadataRoute.Sitemap = []

  const staticPages = [
    { path: '/', priority: 1.0, freq: 'daily' },
    { path: '/earn', priority: 0.9, freq: 'daily' },
    { path: '/offers', priority: 0.9, freq: 'daily' },
    { path: '/rewards', priority: 0.9, freq: 'daily' },
    { path: '/blog', priority: 0.8, freq: 'daily' },
    { path: '/guides', priority: 0.8, freq: 'weekly' },
    { path: '/cashback', priority: 0.8, freq: 'weekly' },
    { path: '/affiliate', priority: 0.7, freq: 'weekly' },
    { path: '/about', priority: 0.3, freq: 'monthly' },
    { path: '/contact', priority: 0.3, freq: 'monthly' },
    { path: '/terms', priority: 0.1, freq: 'yearly' },
    { path: '/privacy', priority: 0.1, freq: 'yearly' },
  ]

  const locales = SEO_CONFIG.supportedLocales || ['en']
  const regions = ['us','eu','asia']

  // Static + international + regional URLs
  locales.forEach(locale => {
    const prefix = locale === SEO_CONFIG.defaultLocale ? '' : `/${locale}`
    staticPages.forEach(page => {
      entries.push({ url: `${baseUrl}${prefix}${page.path}`, lastModified: now, changeFrequency: page.freq as MetadataRoute.Sitemap[number]['changeFrequency'], priority: page.priority })
      regions.forEach(region => {
        entries.push({ url: `${baseUrl}/${region}${prefix}${page.path}`, lastModified: now, changeFrequency: page.freq as MetadataRoute.Sitemap[number]['changeFrequency'], priority: Math.max(page.priority-0.05,0.1) })
      })
    })
  })

  // Dynamic content endpoints
  const dynamicEndpoints = [
    { api: '/api/sitemap/offers', prefix: '/offer/', freq: 'daily', priority: 0.8 },
    { api: '/api/sitemap/blog', prefix: '/blog/', freq: 'weekly', priority: 0.7 },
    { api: '/api/sitemap/categories', prefix: '/category/', freq: 'weekly', priority: 0.6 },
  ]

  await Promise.all(dynamicEndpoints.map(async ({ api, prefix, freq, priority }) => {
    try {
      const res = await fetch(`${baseUrl}${api}`)
      if (!res.ok) return
      const items = await res.json()
      items.forEach((item:any) => {
        entries.push({ url: `${baseUrl}${prefix}${item.slug}`, lastModified: item.updatedAt ? new Date(item.updatedAt) : now, changeFrequency: freq as MetadataRoute.Sitemap[number]['changeFrequency'], priority })
        regions.forEach(region => {
          entries.push({ url: `${baseUrl}/${region}${prefix}${item.slug}`, lastModified: item.updatedAt ? new Date(item.updatedAt) : now, changeFrequency: freq as MetadataRoute.Sitemap[number]['changeFrequency'], priority: Math.max(priority-0.05,0.1) })
        })
      })
    } catch (err) { console.error(`Failed fetch ${api}:`,err) }
  }))

  return dedupe(entries)
}
