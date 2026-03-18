"use client";

import React from "react";
import { SupportedLanguage, SUPPORTED_LANGUAGES, COUNTRY_LANGUAGE_MAP, DEFAULT_COUNTRY, DEFAULT_LANGUAGE } from "@/app/core/detector";

// ------------------------------
// 🌐 Base URL
// ------------------------------
const BASE_URL = "https://payup-pi.vercel.app"; // Live base URL

// ------------------------------
// 🔗 Props
// ------------------------------
interface SEOProps {
  title?: string;
  description?: string;
  country?: string;       // ISO 2-letter, e.g., "us"
  path?: string;          // path after country, e.g., "/how-it-works"
  language?: SupportedLanguage;
  image?: string;         // Optional OG/Twitter image
}

// ------------------------------
// 🌟 Component
// ------------------------------
export default function SEO({
  title,
  description,
  country = DEFAULT_COUNTRY,
  path = "/",
  language = DEFAULT_LANGUAGE,
  image,
}: SEOProps) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const normalizedCountry = country.toLowerCase();

  // Determine language for this country if not explicitly set
  const langForCountry = SUPPORTED_LANGUAGES.includes(language) ? language : (COUNTRY_LANGUAGE_MAP[normalizedCountry] || DEFAULT_LANGUAGE);

  // Canonical URL
  const canonicalUrl = `${BASE_URL}/${normalizedCountry}${cleanPath}`;

  // Generate all hreflang URLs dynamically
  const hreflangLinks = Object.entries(COUNTRY_LANGUAGE_MAP).map(([c, lang]) => {
    return (
      <link
        key={`${c}-${lang}`}
        rel="alternate"
        hrefLang={`${lang}-${c.toUpperCase()}`}
        href={`${BASE_URL}/${c}${cleanPath}`}
      />
    );
  });

  // Add x-default fallback
  hreflangLinks.push(
    <link key="x-default" rel="alternate" hrefLang="x-default" href={`${BASE_URL}/${DEFAULT_COUNTRY}${cleanPath}`} />
  );

  return (
    <>
      {/* Primary SEO Tags */}
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang alternates */}
      {hreflangLinks}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title || "PayUp - Earn Rewards"} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={canonicalUrl} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content={image ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={title || "PayUp - Earn Rewards"} />
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}

      {/* Structured Data (JSON-LD for corporate/professional SEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": BASE_URL,
            "name": title || "PayUp - Earn Rewards",
            "description": description || "Join PayUp to earn rewards by completing offers, surveys, and games.",
            "publisher": {
              "@type": "Organization",
              "name": "PayUp",
              "url": BASE_URL,
              "logo": {
                "@type": "ImageObject",
                "url": `${BASE_URL}/logo.png`
              }
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": `${BASE_URL}/{search_term_string}`,
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
    </>
  );
}
