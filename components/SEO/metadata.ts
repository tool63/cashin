import { Metadata } from "next";
import { SEO_CONFIG } from "./seoConfig";
import { buildCanonical } from "./canonical";
import { buildHreflang } from "./hreflang";
import { COUNTRY_LANGUAGE_MAP, DEFAULT_COUNTRY } from "@/app/core/detector";

interface BuildMetadataParams {
  title: string;
  description?: string;
  path?: string;                // e.g., "/how-it-works"
  countryCode?: string;         // optional, ISO country code like "us"
  keywords?: string[];
  ogImage?: string;             // optional OG/Twitter image override
}

export function buildMetadata({
  title,
  description,
  path = "/",
  countryCode,
  keywords,
  ogImage,
}: BuildMetadataParams): Metadata {
  const country = countryCode?.toLowerCase() || DEFAULT_COUNTRY;

  // Build canonical URL
  const canonical = buildCanonical(path, country);

  // Build hreflang URLs dynamically
  const hreflang = buildHreflang(path);

  // Open Graph image fallback
  const image = ogImage ?? SEO_CONFIG.defaultOgImage;

  return {
    title,
    description: description ?? SEO_CONFIG.defaultDescription,
    keywords: keywords ?? SEO_CONFIG.defaultKeywords,

    alternates: {
      canonical,
      languages: hreflang,
    },

    openGraph: {
      title,
      description: description ?? SEO_CONFIG.defaultDescription,
      url: canonical,
      siteName: SEO_CONFIG.siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      site: SEO_CONFIG.twitterHandle,
      images: [image],
      title,
      description: description ?? SEO_CONFIG.defaultDescription,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}
