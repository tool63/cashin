import { SEO_CONFIG } from "./seoConfig";
import { getCanonicalUrl } from "./canonical";
import { buildMetadata } from "./metadata";
import type { SeoInput } from "./pageTypes";

export function generateSeo(input: SeoInput) {
  const {
    title,
    description,
    keywords,
    path,
    country,
    noindex,
  } = input;

  const finalTitle =
    title || SEO_CONFIG.defaultTitle;

  const finalDescription =
    description || SEO_CONFIG.defaultDescription;

  const canonical = getCanonicalUrl(path, country);

  return buildMetadata({
    title: finalTitle,
    description: finalDescription,
    canonical,
    keywords: keywords || SEO_CONFIG.defaultKeywords,
    noindex,
  });
}
