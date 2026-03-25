import type { MetadataRoute } from "next";

const BASE_URL = "https://cashog.com";

export default function robots(): MetadataRoute.Robots {
  return {
    host: BASE_URL,
    sitemap: `${BASE_URL}/sitemap.xml`,
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/admin/",
          "/private/",
        ],
      },
    ],
  };
}
