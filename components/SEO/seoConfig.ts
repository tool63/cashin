// components/SEO/seoConfig.ts
"use client";

import React from "react";
import { VALID_COUNTRY_CODES, getLanguageForCountry, DEFAULT_COUNTRY } from "@/app/core/detector";

// Props for SEO config
interface SEOConfigProps {
  title?: string;
  description?: string;
  currentPath: string;           // e.g., "/how-it-works"
  country?: string;              // optional, defaults to DEFAULT_COUNTRY
  baseUrl?: string;              // e.g., "https://payup-pi.vercel.app"
}

// Main SEO Config Component
const SEOConfig: React.FC<SEOConfigProps> = ({
  title,
  description,
  currentPath,
  country = DEFAULT_COUNTRY,
  baseUrl = "https://payup-pi.vercel.app",
}) => {
  const path = currentPath.startsWith("/") ? currentPath : `/${currentPath}`;
  const lang = getLanguageForCountry(country);
  const canonicalUrl = `${baseUrl}/${country}${path}`;

  return (
    <>
      {/* Primary SEO Tags */}
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang Tags for all countries */}
      {Array.from(VALID_COUNTRY_CODES).map((c) => {
        const l = getLanguageForCountry(c);
        const url = `${baseUrl}/${c}${path}`;
        return <link key={`${c}-${l}`} rel="alternate" hrefLang={`${l}-${c.toUpperCase()}`} href={url} />;
      })}

      {/* x-default fallback */}
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/${DEFAULT_COUNTRY}${path}`} />

      {/* Open Graph */}
      <meta property="og:title" content={title || ""} />
      <meta property="og:description" content={description || ""} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content={`${lang}-${country.toUpperCase()}`} />
      <meta property="og:type" content="website" />
    </>
  );
};

export default SEOConfig;
