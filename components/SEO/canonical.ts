// components/SEO/canonical.tsx
"use client";

import React from "react";
import { DEFAULT_COUNTRY } from "@/app/core/detector";

interface CanonicalProps {
  currentPath: string;      // e.g., "/how-it-works"
  country?: string;         // optional, default to DEFAULT_COUNTRY
  baseUrl?: string;         // e.g., "https://payup-pi.vercel.app"
}

const Canonical: React.FC<CanonicalProps> = ({
  currentPath,
  country = DEFAULT_COUNTRY,
  baseUrl = "https://payup-pi.vercel.app", // current staging URL
}) => {
  const path = currentPath.startsWith("/") ? currentPath : `/${currentPath}`;
  const canonicalUrl = `${baseUrl}/${country}${path}`;

  return <link rel="canonical" href={canonicalUrl} />;
};

export default Canonical;
