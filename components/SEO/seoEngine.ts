import { detectPageType } from "./pageTypes";
import { buildMetadata } from "./metadata";
import { buildStructuredData } from "./schema";
import { buildCanonical } from "./canonical";
import { buildHreflang } from "./hreflang";
import { SEO_CONFIG } from "./seoConfig";

export interface SEOInput {
  route: string;
  locale?: string;
  data?: any;
}

export interface SEOOutput {
  metadata: any;
  structuredData: object[];
  canonical: string;
  hreflang: Record<string, string>;
}

export function buildSEO(input: SEOInput): SEOOutput {
  const { route, locale = SEO_CONFIG.defaultLocale, data } = input;

  // 1️⃣ Detect page type
  const pageType = detectPageType(route);

  // 2️⃣ Build canonical URL
  const canonical = buildCanonical(route);

  // 3️⃣ Build hreflang map
  const hreflang = buildHreflang(route);

  // 4️⃣ Build metadata
  const metadata = buildMetadata({
    pageType,
    route,
    locale,
    canonical,
    data,
  });

  // 5️⃣ Build structured data (JSON-LD)
  const structuredData = buildStructuredData({
    pageType,
    route,
    data,
  });

  return {
    metadata,
    structuredData,
    canonical,
    hreflang,
  };
}
