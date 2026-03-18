"use client";

import React from "react";
import { SUPPORTED_LANGUAGES, COUNTRY_LANGUAGE_MAP, DEFAULT_COUNTRY } from "@/app/core/detector";

interface HreflangProps {
  currentPath: string; // e.g., "/how-it-works"
  defaultCountry?: string; // fallback, usually "us"
  baseUrl?: string; // e.g., "https://payup-pi.vercel.app"
}

const Hreflang: React.FC<HreflangProps> = ({
  currentPath,
  defaultCountry = DEFAULT_COUNTRY,
  baseUrl = "https://payup-pi.vercel.app",
}) => {
  const path = currentPath.startsWith("/") ? currentPath : `/${currentPath}`;

  // Generate hreflang links for all countries in COUNTRY_LANGUAGE_MAP
  const hreflangLinks = Object.entries(COUNTRY_LANGUAGE_MAP).map(([country, lang]) => {
    return (
      <link
        key={`${country}-${lang}`}
        rel="alternate"
        hrefLang={`${lang}-${country.toUpperCase()}`}
        href={`${baseUrl}/${country}${path}`}
      />
    );
  });

  return (
    <>
      {hreflangLinks}
      {/* x-default fallback */}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${baseUrl}/${defaultCountry}${path}`}
      />
    </>
  );
};

export default Hreflang;
