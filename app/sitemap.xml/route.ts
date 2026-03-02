import { NextRequest } from "next/server";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://cashog.com";

const isProduction = process.env.NODE_ENV === "production";

// Example static pages (replace later with DB fetch)
const staticPages = [
  "",
  "/earn",
  "/guides",
  "/rewards",
  "/cashback",
  "/affiliate",
  "/blog",
];

export async function GET(req: NextRequest) {
  // 🚫 Prevent sitemap in non-production
  if (!isProduction) {
    return new Response("Not allowed", { status: 403 });
  }

  const now = new Date().toISOString();

  // 🔹 Static URLs
  const staticUrls = staticPages
    .map((path) => {
      return `
  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${path === "" ? "daily" : "weekly"}</changefreq>
    <priority>${path === "" ? "1.0" : "0.9"}</priority>
  </url>`;
    })
    .join("");

  /**
   * 🔹 Future: Replace with DB fetch
   * Example:
   * const offers = await db.offer.findMany()
   */

  const dynamicOfferUrls = `
  <!-- Example dynamic offer -->
  <url>
    <loc>${SITE_URL}/offers/sample-offer</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  `;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
  ${staticUrls}
  ${dynamicOfferUrls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
