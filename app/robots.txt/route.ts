import { NextRequest } from "next/server";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://cashog.com";

const isProduction = process.env.NODE_ENV === "production";
const isPreview =
  process.env.VERCEL_ENV === "preview" ||
  process.env.NEXT_PUBLIC_APP_ENV === "staging";

export async function GET(req: NextRequest) {
  // 🚫 Block all crawling in non-production
  if (!isProduction || isPreview) {
    return new Response(
      `User-agent: *
Disallow: /`,
      {
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
  }

  const robots = `
# ======================================
# 🌍 Global Crawling Rules
# ======================================

User-agent: *
Allow: /
Allow: /blog/
Allow: /offers/
Allow: /categories/

# Core system
Disallow: /api/
Disallow: /_next/
Disallow: /internal/
Disallow: /server/

# Auth & User Area
Disallow: /auth/
Disallow: /login/
Disallow: /register/
Disallow: /dashboard/
Disallow: /settings/
Disallow: /profile/

# Admin
Disallow: /admin/
Disallow: /staff/
Disallow: /moderator/

# Tracking & Redirect
Disallow: /track/
Disallow: /click/
Disallow: /postback/
Disallow: /callback/
Disallow: /redirect/

# Parameter Crawl Budget Protection
Disallow: /*?*utm_
Disallow: /*?*ref=
Disallow: /*?*source=
Disallow: /*?*fbclid=
Disallow: /*?*gclid=
Disallow: /*?*sort=
Disallow: /*?*filter=

# ======================================
# 🤖 AI Crawlers
# ======================================

User-agent: GPTBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: CCBot
Disallow: /

# ======================================
# 🐌 SEO Tool Rate Limiting
# ======================================

User-agent: AhrefsBot
Crawl-delay: 10

User-agent: SemrushBot
Crawl-delay: 10

User-agent: MJ12bot
Crawl-delay: 10

# ======================================
# 🗺️ Sitemaps
# ======================================

Sitemap: ${SITE_URL}/sitemap.xml
Sitemap: ${SITE_URL}/sitemap-static.xml
Sitemap: ${SITE_URL}/sitemap-blog.xml
Sitemap: ${SITE_URL}/sitemap-categories.xml
Sitemap: ${SITE_URL}/sitemap-offers-1.xml
Sitemap: ${SITE_URL}/sitemap-offers-2.xml

Host: ${SITE_URL}
`;

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
