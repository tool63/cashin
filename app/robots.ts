// app/robots.ts
import { MetadataRoute } from "next";
import { BASE_URL } from "@/components/SEO/seoConfig";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*", // Allow all crawlers
        allow: ["/"], // Allow root
        disallow: ["/api", "/_next"], // Disallow API and Next internals
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
