// components/SEO/schema.ts

import { SEO_CONFIG } from "./seoConfig";

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    logo: `${SEO_CONFIG.siteUrl}/logo.png`,
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: SEO_CONFIG.siteUrl,
    name: SEO_CONFIG.siteName,
  };
}
