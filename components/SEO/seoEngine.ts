// components/SEO/seoEngine.ts

import { SEOOutput } from "./seoEngine"; // already defined

export function buildSEO(custom: Partial<SEOOutput> = {}): SEOOutput {
  const defaultSeo: SEOOutput = {
    metadata: {
      title: "Cashog",
      description: "",
      keywords: [],
      robots: "index, follow",
      openGraph: {
        type: "website",
        url: "https://www.cashog.com",
        title: "Cashog",
        description: "",
        siteName: "Cashog",
        locale: "en",
        images: [
          { url: "/images/default-og.png", width: 1200, height: 630, alt: "Cashog" },
        ],
      },
      twitter: {
        card: "summary_large_image",
        site: "@cashog_official",
        images: ["/images/default-og.png"],
        imageAlt: "Cashog",
      },
      viewport: "width=device-width, initial-scale=1",
      other: { "theme-color": "#1a73e8" },
    },
    canonical: "https://www.cashog.com",
    hreflang: {},
    structuredData: [],
    pageType: { type: "unknown", hierarchy: ["unknown"], metadata: {}, matches: null },
    links: [],
    preconnect: [],
    dnsPrefetch: [],
    preload: [],
    metrics: {
      pageType: "unknown",
      generationTime: 0,
      metadataSize: 0,
      schemaCount: 0,
      cacheHit: false,
      warnings: 0,
      suggestions: 0,
      seoScore: 0,
      timestamp: Date.now(),
    },
  };

  return { ...defaultSeo, ...custom };
}
