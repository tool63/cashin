"use client";

import React from "react";
import { DEFAULT_COUNTRY, SUPPORTED_LANGUAGES, COUNTRY_LANGUAGE_MAP, SupportedLanguage } from "@/app/core/detector";

interface CanonicalProps {
  currentPath: string;                // e.g., "/how-it-works"
  country?: string;                   // optional, default to DEFAULT_COUNTRY
  language?: SupportedLanguage;       // optional, defaults to country’s default language
  baseUrl?: string;                   // e.g., "https://payup-pi.vercel.app"
}

const Canonical: React.FC<CanonicalProps> = ({
  currentPath,
  country = DEFAULT_COUNTRY,
  language,
  baseUrl = "https://payup-pi.vercel.app",
}) => {
  const cleanPath = currentPath.startsWith("/") ? currentPath : `/${currentPath}`;
  const normalizedCountry = country.toLowerCase();

  // Determine language for canonical if not explicitly passed
  const langForCountry: SupportedLanguage = language
    ? language
    : (COUNTRY_LANGUAGE_MAP[normalizedCountry] || "en");

  // Build canonical URL
  const canonicalUrl = `${baseUrl}/${normalizedCountry}${cleanPath}`;

  return <link rel="canonical" href={canonicalUrl} />;
};

export default Canonical;
