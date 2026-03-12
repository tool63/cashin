// components/SEO/metadata.ts

import { Metadata } from "next";
import { SEO_CONFIG } from "./seoConfig";
import { buildCanonical } from "./canonical";
import { buildHreflang } from "./hreflang";

interface BuildMetadataParams {
  title: string
  description?: string
  path?: string
  locale?: string
}

export function buildMetadata({
  title,
  description,
  path = "",
  locale,
}: BuildMetadataParams): Metadata {

  const canonical = buildCanonical(path, locale)
  const hreflang = buildHreflang(path)

  return {
    title,
    description: description ?? SEO_CONFIG.defaultDescription,

    alternates: {
      canonical,
      languages: hreflang,
    },

    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SEO_CONFIG.siteName,
      images: [
        {
          url: SEO_CONFIG.defaultOgImage,
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      site: SEO_CONFIG.twitterHandle,
      images: [SEO_CONFIG.defaultOgImage],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}
