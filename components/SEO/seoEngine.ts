// components/SEO/seoEngine.ts

import { buildMetadata } from "./metadata";
import { detectPageType } from "./pageTypes";
import { buildOrganizationSchema, buildWebsiteSchema } from "./schema";
import { logSeoMetrics } from "./seoAnalytics";

import { countryLangMap } from "@/app/core/i18n/config";

interface BuildSEOParams {
  route: string;
  title: string;
  description?: string;
  countryCode?: string; // ISO country code like US, FR, DE
  keywords?: string[];
}

/**
 * Ultra-premium SEO engine for corporate SaaS
 */
export async function buildSEO({
  route,
  title,
  description,
  countryCode,
  keywords,
}: BuildSEOParams) {
  const start = Date.now();

  // -----------------------------
  // 1️⃣ Validate country
  // -----------------------------
  const countryKey =
    countryCode && countryLangMap[countryCode.toUpperCase()]
      ? countryCode.toUpperCase()
      : "US";

  // -----------------------------
  // 2️⃣ Build Metadata
  // -----------------------------
  const metadata = buildMetadata({
    title,
    description,
    path: route,
    countryCode: countryKey,
    keywords,
  });

  // -----------------------------
  // 3️⃣ Detect Page Type
  // -----------------------------
  const pageType = detectPageType(route);

  // -----------------------------
  // 4️⃣ Build Structured Data
  // -----------------------------
  const structuredData = [
    buildOrganizationSchema(),
    buildWebsiteSchema(),
  ];

  // -----------------------------
  // 5️⃣ Log SEO metrics
  // -----------------------------
  const generationTime = Date.now() - start;

  logSeoMetrics({
    page: route,
    generationTime,
  });

  return {
    metadata,
    structuredData,
    pageType,
    countryCode: countryKey,
  };
}
