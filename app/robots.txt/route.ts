import { NextRequest, NextResponse } from 'next/server';
import { SEO_CONFIG } from '@/components/SEO/seoConfig';

// Edge runtime for maximum performance
export const runtime = 'edge';
export const dynamic = 'force-static';

interface RobotsRule {
  userAgent: string;
  allow?: string[];
  disallow?: string[];
  crawlDelay?: number;
  cleanParam?: string[];
}

export async function GET(req: NextRequest) {
  const host = req.headers.get('host') || '';
  const isProduction = process.env.NODE_ENV === 'production';
  const isStaging = host.includes('staging.') || host.includes('preview.') || 
                   process.env.VERCEL_ENV === 'preview';
  
  // Dynamic environment-based rules
  const rules: RobotsRule[] = [];
  
  if (!isProduction || isStaging) {
    // Block all crawling in non-production
    rules.push({
      userAgent: '*',
      disallow: ['/'],
    });
  } else {
    // Production rules - Comprehensive blocking
    rules.push(
      // Main crawler rules
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
          '/sitemap.xml',
        ],
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/dashboard/',
          '/auth/',
          '/login/',
          '/register/',
          '/profile/',
          '/settings/',
          '/internal/',
          '/server/',
          '/track/',
          '/click/',
          '/redirect/',
          '/callback/',
          '/postback/',
          '/*/edit$',
          '/*/delete$',
          '/*/create$',
          '/private/',
          '/temp/',
          '/test/',
          '/debug/',
          '/*?*print=true',
          '/*?*debug=true',
        ],
        cleanParam: [
          'utm_source',
          'utm_medium',
          'utm_campaign',
          'utm_term',
          'utm_content',
          'ref',
          'source',
          'fbclid',
          'gclid',
          'msclkid',
          'mc_cid',
          'mc_eid',
          '_ga',
          '_gl',
        ],
      },
      
      // AI and bot restrictions
      {
        userAgent: 'GPTBot',
        disallow: ['/'],
      },
      {
        userAgent: 'Google-Extended',
        disallow: ['/'],
      },
      {
        userAgent: 'CCBot',
        disallow: ['/'],
      },
      {
        userAgent: 'anthropic-ai',
        disallow: ['/'],
      },
      {
        userAgent: 'ClaudeBot',
        disallow: ['/'],
      },
      {
        userAgent: 'PerplexityBot',
        disallow: ['/'],
      },
      
      // SEO tool rate limiting
      {
        userAgent: 'AhrefsBot',
        crawlDelay: 5,
        disallow: ['/api/', '/search/'],
      },
      {
        userAgent: 'SemrushBot',
        crawlDelay: 5,
        disallow: ['/api/', '/search/'],
      },
      {
        userAgent: 'MJ12bot',
        crawlDelay: 10,
        disallow: ['/api/'],
      },
      {
        userAgent: 'DotBot',
        crawlDelay: 10,
      },
      
      // Archive.org and mirrors
      {
        userAgent: 'ia_archiver',
        crawlDelay: 20,
      },
      
      // Aggressive crawlers
      {
        userAgent: 'BLEXBot',
        crawlDelay: 30,
      },
      {
        userAgent: 'PetalBot',
        disallow: ['/'],
      },
    );
  }

  // Generate robots.txt content
  const robotsTxt = generateRobotsTxt(rules, host);
  
  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      'CDN-Cache-Control': 'public, s-maxage=86400',
      'Vary': 'Accept-Encoding',
    },
  });
}

function generateRobotsTxt(rules: RobotsRule[], host: string): string {
  const lines: string[] = [
    '# ==================================================',
    '# 🌟 CASHOG - Enterprise Robots.txt',
    '# Generated: ' + new Date().toISOString(),
    '# Environment: ' + (process.env.NODE_ENV || 'development'),
    '# ==================================================',
    '',
  ];

  // Add rules
  rules.forEach((rule) => {
    lines.push(`User-agent: ${rule.userAgent}`);
    
    if (rule.allow?.length) {
      rule.allow.forEach(path => lines.push(`Allow: ${path}`));
    }
    
    if (rule.disallow?.length) {
      rule.disallow.forEach(path => lines.push(`Disallow: ${path}`));
    } else if (!rule.allow && rule.userAgent !== '*') {
      lines.push('Disallow: /');
    }
    
    if (rule.crawlDelay) {
      lines.push(`Crawl-delay: ${rule.crawlDelay}`);
    }
    
    if (rule.cleanParam?.length) {
      lines.push(`Clean-param: ${rule.cleanParam.join('&')}`);
    }
    
    lines.push('');
  });

  // Add sitemaps
  const baseUrl = SEO_CONFIG.siteUrl;
  const sitemaps = [
    `${baseUrl}/sitemap.xml`,
    `${baseUrl}/sitemap-pages.xml`,
    `${baseUrl}/sitemap-offers.xml`,
    `${baseUrl}/sitemap-blog.xml`,
    `${baseUrl}/sitemap-categories.xml`,
    `${baseUrl}/sitemap-images.xml`,
  ];

  sitemaps.forEach(sitemap => {
    lines.push(`Sitemap: ${sitemap}`);
  });

  // Add host
  lines.push(`Host: ${host}`);
  lines.push('');

  // Add additional directives
  lines.push('# ==================================================');
  lines.push('# 📊 Crawl Budget Optimization');
  lines.push('# ==================================================');
  lines.push('# Priority: Product pages > Category pages > Blog');
  lines.push('# Max URLs per crawl: 5000');
  lines.push('# Preferred crawl rate: 10 requests/second');

  return lines.join('\n');
}
