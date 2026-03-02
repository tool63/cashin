import type { MetadataRoute } from 'next'
import { SEO_CONFIG } from '@/components/SEO/seoConfig'

// Environment
const isProduction = process.env.NODE_ENV === 'production'
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SEO_CONFIG.siteUrl

// Revalidate every hour (optional)
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // No sitemap in dev or staging
  if (!isProduction) {
    return []
  }

  const entries: MetadataRoute.Sitemap = []

  // ===========================
  // 1️⃣ STATIC PAGES (SEO PRIORITY)
  // ===========================
  const staticPages = [
    { path: '/', priority: 1.0, frequency: 'daily' },
    { path: '/earn', priority: 0.9, frequency: 'daily' },
    { path: '/offers', priority: 0.9, frequency: 'daily' },
    { path: '/rewards', priority: 0.9, frequency: 'daily' },
    { path: '/blog', priority: 0.8, frequency: 'daily' },
    { path: '/guides', priority: 0.8, frequency: 'weekly' },
    { path: '/cashback', priority: 0.8, frequency: 'weekly' },
    { path: '/affiliate', priority: 0.7, frequency: 'weekly' },
    { path: '/about', priority: 0.3, frequency: 'monthly' },
    { path: '/contact', priority: 0.3, frequency: 'monthly' },
    { path: '/terms', priority: 0.1, frequency: 'yearly' },
    { path: '/privacy', priority: 0.1, frequency: 'yearly' },
  ]

  staticPages.forEach(({ path, priority, frequency }) => {
    entries.push({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: frequency as MetadataRoute.Sitemap[number]['changeFrequency'],
      priority,
    })
  })

  // ===========================
  // 2️⃣ DYNAMIC CONTENT (API)
  // ===========================
  try {
    const [offersRes, blogRes, categoriesRes] = await Promise.allSettled([
      fetch(`${baseUrl}/api/sitemap/offers`),
      fetch(`${baseUrl}/api/sitemap/blog`),
      fetch(`${baseUrl}/api/sitemap/categories`),
    ])

    // Offers
    if (offersRes.status === 'fulfilled' && offersRes.value.ok) {
      const offers = await offersRes.value.json()
      offers?.forEach((offer: any) => {
        entries.push({
          url: `${baseUrl}/offer/${offer.slug}`,
          lastModified: offer.updatedAt ? new Date(offer.updatedAt) : new Date(),
          changeFrequency: 'daily',
          priority: 0.8,
        })
      })
    }

    // Blog posts
    if (blogRes.status === 'fulfilled' && blogRes.value.ok) {
      const posts = await blogRes.value.json()
      posts?.forEach((post: any) => {
        entries.push({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
        })
      })
    }

    // Categories
    if (categoriesRes.status === 'fulfilled' && categoriesRes.value.ok) {
      const categories = await categoriesRes.value.json()
      categories?.forEach((cat: any) => {
        entries.push({
          url: `${baseUrl}/category/${cat.slug}`,
          lastModified: cat.updatedAt ? new Date(cat.updatedAt) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.6,
        })
      })
    }
  } catch (error) {
    console.error('Sitemap dynamic fetch failed:', error)
  }

  return entries
}
