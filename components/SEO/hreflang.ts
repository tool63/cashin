// components/SEO/hreflang.tsx
"use client";

import React from "react";
import { VALID_COUNTRY_CODES, getLanguageForCountry } from "@/app/core/detector";

interface HreflangProps {
  currentPath: string; // e.g., "/how-it-works"
  defaultCountry?: string; // fallback, usually "us"
  baseUrl?: string; // e.g., "https://payup-pi.vercel.app"
}

const Hreflang: React.FC<HreflangProps> = ({
  currentPath,
  defaultCountry = "us",
  baseUrl = "https://payup-pi.vercel.app", // updated base URL
}) => {
  const path = currentPath.startsWith("/") ? currentPath : `/${currentPath}`;

  return (
    <>
      {Array.from(VALID_COUNTRY_CODES).map((country) => {
        const lang = getLanguageForCountry(country);
        const url = `${baseUrl}/${country}${path}`;

        return (
          <link
            key={`${country}-${lang}`}
            rel="alternate"
            hrefLang={`${lang}-${country.toUpperCase()}`}
            href={url}
          />
        );
      })}

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
