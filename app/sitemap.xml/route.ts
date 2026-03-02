import { NextRequest, NextResponse } from 'next/server';
import { SEO_CONFIG } from '@/components/SEO/seoConfig';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  images?: Array<{
    loc: string;
    title?: string;
    caption?: string;
    geo_location?: string;
    license?: string;
  }>;
  videos?: Array<{
    thumbnail_loc: string;
    title: string;
    description: string;
    content_loc?: string;
    player_loc?: string;
    duration?: number;
    expiration_date?: string;
    rating?: number;
    view_count?: number;
    publication_date?: string;
    family_friendly?: boolean;
    tags?: string[];
    category?: string;
  }>;
  news?: {
    publication: {
      name: string;
      language: string;
    };
    publication_date: string;
    title: string;
    keywords?: string;
    stock_tickers?: string;
  };
  alternates?: Record<string, string>;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type') || 'main';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 45000; // Sitemap limit (under 50k)
  
  // Protect in non-production
  if (process.env.NODE_ENV !== 'production') {
    return new NextResponse('Sitemap unavailable in development', { status: 403 });
  }

  try {
    // Handle sitemap index
    if (type === 'index') {
      return generateSitemapIndex();
    }

    // Fetch URLs based on type
    const urls = await fetchUrlsForSitemap(type, page, limit);
    
    // Generate appropriate sitemap
    return generateSitemap(urls, type);
    
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}

async function fetchUrlsForSitemap(
  type: string, 
  page: number, 
  limit: number
): Promise<SitemapUrl[]> {
  const baseUrl = SEO_CONFIG.siteUrl;
  const now = new Date().toISOString();
  
  switch (type) {
    case 'pages': {
      // Static pages with priorities
      const staticPages: SitemapUrl[] = [
        {
          loc: baseUrl,
          lastmod: now,
          changefreq: 'daily',
          priority: 1.0,
        },
        {
          loc: `${baseUrl}/earn`,
          lastmod: now,
          changefreq: 'daily',
          priority: 0.9,
          images: [{
            loc: `${baseUrl}/images/earn-og.jpg`,
            title: 'Earn Money Online',
          }],
        },
        {
          loc: `${baseUrl}/guides`,
          lastmod: now,
          changefreq: 'weekly',
          priority: 0.8,
        },
        {
          loc: `${baseUrl}/rewards`,
          lastmod: now,
          changefreq: 'weekly',
          priority: 0.9,
        },
        {
          loc: `${baseUrl}/cashback`,
          lastmod: now,
          changefreq: 'weekly',
          priority: 0.8,
        },
        {
          loc: `${baseUrl}/affiliate`,
          lastmod: now,
          changefreq: 'monthly',
          priority: 0.7,
        },
        {
          loc: `${baseUrl}/about`,
          lastmod: now,
          changefreq: 'yearly',
          priority: 0.3,
        },
        {
          loc: `${baseUrl}/contact`,
          lastmod: now,
          changefreq: 'yearly',
          priority: 0.3,
        },
        {
          loc: `${baseUrl}/terms`,
          lastmod: now,
          changefreq: 'yearly',
          priority: 0.1,
        },
        {
          loc: `${baseUrl}/privacy`,
          lastmod: now,
          changefreq: 'yearly',
          priority: 0.1,
        },
      ];
      
      return paginateUrls(staticPages, page, limit);
    }
    
    case 'offers': {
      // Simulated DB fetch - replace with actual DB query
      // const offers = await db.offer.findMany({
      //   skip: (page - 1) * limit,
      //   take: limit,
      //   where: { status: 'active' },
      //   orderBy: { priority: 'desc' },
      //   select: {
      //     slug: true,
      //     updatedAt: true,
      //     title: true,
      //     image: true,
      //     payout: true,
      //     category: true,
      //   },
      // });
      
      // return offers.map(offer => ({
      //   loc: `${baseUrl}/offer/${offer.slug}`,
      //   lastmod: offer.updatedAt.toISOString(),
      //   changefreq: 'daily',
      //   priority: 0.9,
      //   images: offer.image ? [{
      //     loc: offer.image,
      //     title: offer.title,
      //     caption: `Earn $${offer.payout} with this offer`,
      //   }] : undefined,
      // }));
      
      return []; // Placeholder
    }
    
    case 'blog': {
      // Simulated blog posts fetch
      return [];
    }
    
    case 'categories': {
      // Simulated categories fetch
      return [];
    }
    
    case 'images': {
      // Image sitemap for better image SEO
      return [];
    }
    
    default:
      return [];
  }
}

function paginateUrls(urls: SitemapUrl[], page: number, limit: number): SitemapUrl[] {
  const start = (page - 1) * limit;
  return urls.slice(start, start + limit);
}

function generateSitemap(urls: SitemapUrl[], type: string): NextResponse {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="
    http://www.sitemaps.org/schemas/sitemap/0.9
    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
    http://www.google.com/schemas/sitemap-image/1.1
    http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd
    http://www.google.com/schemas/sitemap-video/1.1
    http://www.google.com/schemas/sitemap-video/1.1/sitemap-video.xsd"
>
  ${urls.map(url => generateUrlEntry(url)).join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      'CDN-Cache-Control': 'public, s-maxage=86400',
      'X-Sitemap-Type': type,
      'X-Generated-At': new Date().toISOString(),
    },
  });
}

function generateSitemapIndex(): NextResponse {
  const baseUrl = SEO_CONFIG.siteUrl;
  const now = new Date().toISOString();
  
  const sitemaps = [
    'pages',
    'offers',
    'blog',
    'categories',
    'images',
  ];
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemaps.map(type => `
  <sitemap>
    <loc>${baseUrl}/sitemap.xml?type=${type}</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`).join('')}
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

function generateUrlEntry(url: SitemapUrl): string {
  const parts = ['  <url>'];
  
  // Basic info
  parts.push(`    <loc>${escapeXml(url.loc)}</loc>`);
  if (url.lastmod) parts.push(`    <lastmod>${url.lastmod}</lastmod>`);
  if (url.changefreq) parts.push(`    <changefreq>${url.changefreq}</changefreq>`);
  if (url.priority) parts.push(`    <priority>${url.priority.toFixed(1)}</priority>`);
  
  // Images
  if (url.images?.length) {
    url.images.forEach(image => {
      parts.push('    <image:image>');
      parts.push(`      <image:loc>${escapeXml(image.loc)}</image:loc>`);
      if (image.title) parts.push(`      <image:title><![CDATA[${image.title}]]></image:title>`);
      if (image.caption) parts.push(`      <image:caption><![CDATA[${image.caption}]]></image:caption>`);
      parts.push('    </image:video>');
    });
  }
  
  // Videos
  if (url.videos?.length) {
    url.videos.forEach(video => {
      parts.push('    <video:video>');
      parts.push(`      <video:thumbnail_loc>${escapeXml(video.thumbnail_loc)}</video:thumbnail_loc>`);
      parts.push(`      <video:title><![CDATA[${video.title}]]></video:title>`);
      parts.push(`      <video:description><![CDATA[${video.description}]]></video:description>`);
      if (video.content_loc) parts.push(`      <video:content_loc>${escapeXml(video.content_loc)}</video:content_loc>`);
      if (video.duration) parts.push(`      <video:duration>${video.duration}</video:duration>`);
      if (video.rating) parts.push(`      <video:rating>${video.rating}</video:rating>`);
      if (video.view_count) parts.push(`      <video:view_count>${video.view_count}</video:view_count>`);
      if (video.publication_date) parts.push(`      <video:publication_date>${video.publication_date}</video:publication_date>`);
      if (video.tags?.length) parts.push(`      <video:tag>${video.tags.map(tag => `<![CDATA[${tag}]]>`).join('</video:tag><video:tag>')}</video:tag>`);
      parts.push('    </video:video>');
    });
  }
  
  // News
  if (url.news) {
    parts.push('    <news:news>');
    parts.push('      <news:publication>');
    parts.push(`        <news:name>${escapeXml(url.news.publication.name)}</news:name>`);
    parts.push(`        <news:language>${url.news.publication.language}</news:language>`);
    parts.push('      </news:publication>');
    parts.push(`      <news:publication_date>${url.news.publication_date}</news:publication_date>`);
    parts.push(`      <news:title><![CDATA[${url.news.title}]]></news:title>`);
    if (url.news.keywords) parts.push(`      <news:keywords>${url.news.keywords}</news:keywords>`);
    parts.push('    </news:news>');
  }
  
  // Hreflang alternates
  if (url.alternates) {
    Object.entries(url.alternates).forEach(([lang, href]) => {
      parts.push(`    <xhtml:link rel="alternate" hreflang="${lang}" href="${escapeXml(href)}" />`);
    });
  }
  
  parts.push('  </url>');
  return parts.join('\n');
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}
