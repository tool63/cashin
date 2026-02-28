import { routePatterns } from '@/lib/seo';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cashog.com';

export class RobotsGenerator {
  private baseUrl: string;

  constructor() {
    this.baseUrl = baseUrl;
  }

  generate(): string {
    const disallowPaths = this.getDisallowPaths();

    return `# robots.txt for Cashog
# Generated: ${new Date().toISOString()}

User-agent: *
Allow: /
${disallowPaths.map(path => `Disallow: ${path}`).join('\n')}
Crawl-delay: 10

# Sitemaps
Sitemap: ${this.baseUrl}/sitemap.xml
Sitemap: ${this.baseUrl}/sitemaps/blog-sitemap.xml
Sitemap: ${this.baseUrl}/sitemaps/dynamic-sitemap.xml

# Host
Host: ${this.baseUrl}

# Clean parameters
Clean-param: utm_source&utm_medium&utm_campaign&utm_term&utm_content

# Crawl rules for specific bots
User-agent: Googlebot
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/

User-agent: Googlebot-Image
Allow: /images/
Disallow: /*

User-agent: Bingbot
Allow: /
Disallow: /api/
Disallow: /admin/
Crawl-delay: 5

User-agent: Twitterbot
Allow: /
Allow: /images/

User-agent: FacebookExternalHit
Allow: /
Allow: /images/
`;
  }

  private getDisallowPaths(): string[] {
    const disallowPaths = ['/api/', '/admin/', '/private/'];
    
    routePatterns.forEach(({ pattern, seo }) => {
      if (seo.noIndex) {
        if (typeof pattern === 'string') {
          disallowPaths.push(pattern);
        }
      }
    });

    return disallowPaths;
  }
}

export const robotsGenerator = new RobotsGenerator();

export function generateRobotsTxt() {
  return robotsGenerator.generate();
}
