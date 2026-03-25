import { SEO_CONFIG } from "./seoConfig";

export function getCanonicalUrl(path: string, country?: string) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  if (!country || country === "global") {
    return `${SEO_CONFIG.domain}${cleanPath}`;
  }

  return `${SEO_CONFIG.domain}/${country}${cleanPath}`;
}
