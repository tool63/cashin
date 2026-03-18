import { SEO_CONFIG } from "./seoConfig";
import { DEFAULT_COUNTRY, COUNTRY_LANGUAGE_MAP, SupportedLanguage } from "@/app/core/detector";

interface SchemaOptions {
  country?: string;             // ISO 2-letter country code
  language?: SupportedLanguage; // Optional, defaults to country default language
}

/**
 * Build Organization schema (JSON-LD)
 */
export function buildOrganizationSchema({ country = DEFAULT_COUNTRY }: SchemaOptions = {}) {
  const url = `${SEO_CONFIG.siteUrl}/${country}`;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SEO_CONFIG.siteName,
    url,
    logo: `${SEO_CONFIG.siteUrl}/logo.png`,
    sameAs: SEO_CONFIG.socialLinks ?? [], // e.g., ["https://twitter.com/payup", "https://facebook.com/payup"]
  };
}

/**
 * Build Website schema (JSON-LD)
 */
export function buildWebsiteSchema({ country = DEFAULT_COUNTRY }: SchemaOptions = {}) {
  const url = `${SEO_CONFIG.siteUrl}/${country}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url,
    name: SEO_CONFIG.siteName,
    inLanguage: COUNTRY_LANGUAGE_MAP[country.toLowerCase()] ?? "en",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SEO_CONFIG.siteUrl}/{search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Optional: Add more schemas like BreadcrumbList, Product, Article, etc.
 */
