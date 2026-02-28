import { MetadataRoute } from "next";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SEO_CONFIG.siteUrl}/sitemap.xml`,
  };
}
