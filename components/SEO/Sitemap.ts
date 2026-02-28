import { routePatterns } from '@/lib/seo';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cashog.com';

interface SitemapRoute {
  path: string;
  priority?: number;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  lastmod?: string;
  noindex?: boolean;
}

// Static routes
const staticRoutes: SitemapRoute[] = [
  { path: '', priority: 1.0, changefreq: 'daily' },
  { path: 'affiliate', priority: 0.8, changefreq: 'weekly' },
  { path: 'how-it-works', priority: 0.7, changefreq: 'monthly' },
  { path: 'surveys', priority: 0.7, changefreq: 'daily' },
  { path: 'app-installs', priority: 0.7, changefreq: 'daily' },
  { path: 'play-games', priority: 0.7, changefreq: 'daily' },
  { path: 'watch-videos', priority: 0.7, changefreq: 'daily' },
  { path: 'complete-offers', priority: 0.7, changefreq: 'daily' },
  { path: 'earn-paypal-money', priority: 0.8, changefreq: 'weekly' },
  { path: 'earn-gift-cards-online', priority: 0.8, changefreq: 'weekly' },
  { path: 'earn-crypto-online', priority: 0.8, changefreq: 'weekly' },
  { path: 'make-money-online', priority: 0.6, changefreq: 'weekly' },
  { path: 'earn-money-from-home', priority: 0.6, changefreq: 'weekly' },
  { path: 'cashback-offers', priority: 0.7, changefreq: 'daily' },
  { path: 'shopping-rewards', priority: 0.7, changefreq: 'daily' },
  { path: 'blog', priority: 0.6, changefreq: 'daily' },
  { path: 'faq', priority: 0.5, changefreq: 'monthly' },
  { path: 'contact', priority: 0.5, changefreq: 'yearly' },
];

// Filter out noindex routes
const sitemapRoutes = staticRoutes.filter(route => {
  const pattern = routePatterns.find(p => 
    p.pattern === `/${route.path}` || 
    (p.pattern instanceof RegExp && p.pattern.test(`/${route.path}`))
  );
  return !pattern?.seo.noIndex;
});

export class SitemapGenerator {
  private baseUrl: string;
  private routes: SitemapRoute[];

  constructor() {
    this.baseUrl = baseUrl;
    this.routes = sitemapRoutes;
  }

  // Generate main sitemap
  generate(): string {
    const today = new Date().toISOString().split('T')[0];
    
    const urls = this.routes.map(route => ({
      loc: `${this.baseUrl}/${route.path}`,
      lastmod: route.lastmod || today,
      changefreq: route.changefreq || 'weekly',
      priority: route.priority || 0.5,
    }));

    return this.generateXml(urls);
  }

  // Generate sitemap for dynamic routes
  generateDynamicSitemap(routes: Array<{ path: string; lastmod?: string; priority?: number }>): string {
    const today = new Date().toISOString().split('T')[0];
    
    const urls = routes.map(route => ({
      loc: `${this.baseUrl}${route.path}`,
      lastmod: route.lastmod || today,
      changefreq: 'weekly',
      priority: route.priority || 0.6,
    }));

    return this.generateXml(urls);
  }

  // Generate sitemap index
  generateIndex(sitemaps: string[]): string {
    const today = new Date().toISOString().split('T')[0];
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemaps.map(name => `
  <sitemap>
    <loc>${this.baseUrl}/${name}</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  `).join('')}
</sitemapindex>`;
  }

  private generateXml(urls: Array<{ loc: string; lastmod: string; changefreq: string; priority: number }>): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>
  `).join('')}
</urlset>`;
  }
}

export const sitemapGenerator = new SitemapGenerator();

export function generateSitemap() {
  return sitemapGenerator.generate();
}
