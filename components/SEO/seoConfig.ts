// components/SEO/seoConfig.ts
"use client";

import React from "react";
import { SupportedLanguage } from "@/app/core/detector";

// ------------------------------
// 🌐 Base URL
// ------------------------------
const baseUrl = "https://payup-pi.vercel.app"; // Current live base URL

// ------------------------------
// 🔗 Props
// ------------------------------
interface SEOProps {
  title?: string;
  description?: string;
  country: string;
  path?: string; // path after country, e.g., "/how-it-works"
  language: SupportedLanguage;
}

// ------------------------------
// 🌟 Component
// ------------------------------
export default function SEO({ title, description, country, path = "/", language }: SEOProps) {
  // Ensure leading slash for path
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  // Canonical URL
  const canonicalUrl = `${baseUrl}/${country}${cleanPath}`;

  return (
    <>
      {/* Primary SEO Tags */}
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang alternate URLs */}
      <link rel="alternate" hrefLang="en-us" href={`${baseUrl}/us${cleanPath}`} />
      <link rel="alternate" hrefLang="en-gb" href={`${baseUrl}/gb${cleanPath}`} />
      <link rel="alternate" hrefLang="fr-fr" href={`${baseUrl}/fr${cleanPath}`} />
      <link rel="alternate" hrefLang="de-de" href={`${baseUrl}/de${cleanPath}`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/us${cleanPath}`} />
    </>
  );
}
