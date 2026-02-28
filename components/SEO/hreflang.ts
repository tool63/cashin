import { SEO_CONFIG } from "./seoConfig";

export function buildHreflang(route: string): Record<string, string> {
  const hreflang: Record<string, string> = {};

  const cleanRoute = route.split("?")[0].split("#")[0];

  // Default language
  hreflang["en"] = `${SEO_CONFIG.siteUrl}${cleanRoute}`;

  // Future multi-language support (example)
  // hreflang["es"] = `${SEO_CONFIG.siteUrl}/es${cleanRoute}`;
  // hreflang["fr"] = `${SEO_CONFIG.siteUrl}/fr${cleanRoute}`;

  return hreflang;
}
