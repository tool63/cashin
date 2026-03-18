// components/SEO/seoConfig.ts
import {
  SupportedLanguage,
  SUPPORTED_LANGUAGES,
  COUNTRY_LANGUAGE_MAP,
  DEFAULT_COUNTRY,
  DEFAULT_LANGUAGE,
} from "@/app/core/detector";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://payup-pi.vercel.app";

export interface SEOProps {
  title?: string;
  description?: string;
  country?: string;       // ISO 2-letter, e.g., "us"
  path?: string;          // path after country, e.g., "/how-it-works"
  language?: SupportedLanguage;
  image?: string;         // Optional OG/Twitter image
}

// The return type for rendering SEO meta tags
export interface SEOData {
  canonical: string;
  hreflangs: { hrefLang: string; href: string }[];
  meta: { name?: string; property?: string; content: string }[];
  jsonLd: any;
}

/**
 * Generate all SEO-related data (canonical, hreflangs, meta tags, JSON-LD)
 */
export function generateSEOData({
  title,
  description,
  country = DEFAULT_COUNTRY,
  path = "/",
  language = DEFAULT_LANGUAGE,
  image,
}: SEOProps): SEOData {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const normalizedCountry = country.toLowerCase();

  const langForCountry = SUPPORTED_LANGUAGES.includes(language)
    ? language
    : COUNTRY_LANGUAGE_MAP[normalizedCountry] || DEFAULT_LANGUAGE;

  // Canonical URL
  const canonicalUrl = `${BASE_URL}/${normalizedCountry}${cleanPath}`;

  // Hreflang links
  const hreflangs = Object.entries(COUNTRY_LANGUAGE_MAP).map(([c, lang]) => ({
    hrefLang: `${lang}-${c.toUpperCase()}`,
    href: `${BASE_URL}/${c}${cleanPath}`,
  }));

  // Add x-default
  hreflangs.push({
    hrefLang: "x-default",
    href: `${BASE_URL}/${DEFAULT_COUNTRY}${cleanPath}`,
  });

  // Meta tags
  const meta: { name?: string; property?: string; content: string }[] = [];

  if (title) meta.push({ name: "title", content: title });
  if (description) meta.push({ name: "description", content: description });

  // Open Graph
  meta.push({ property: "og:type", content: "website" });
  meta.push({ property: "og:title", content: title || "PayUp - Earn Rewards" });
  if (description) meta.push({ property: "og:description", content: description });
  meta.push({ property: "og:url", content: canonicalUrl });
  if (image) meta.push({ property: "og:image", content: image });

  // Twitter
  meta.push({ name: "twitter:card", content: image ? "summary_large_image" : "summary" });
  meta.push({ name: "twitter:title", content: title || "PayUp - Earn Rewards" });
  if (description) meta.push({ name: "twitter:description", content: description });
  if (image) meta.push({ name: "twitter:image", content: image });

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: canonicalUrl,
    name: title || "PayUp - Earn Rewards",
    description:
      description || "Join PayUp to earn rewards by completing offers, surveys, and games.",
    publisher: {
      "@type": "Organization",
      name: "PayUp",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/{search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return { canonical: canonicalUrl, hreflangs, meta, jsonLd };
}
