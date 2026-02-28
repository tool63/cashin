import { SEO_CONFIG } from "./seoConfig";

export function buildCanonical(route: string): string {
  if (!route) {
    return SEO_CONFIG.siteUrl;
  }

  // Remove query params and hash
  const cleanRoute = route.split("?")[0].split("#")[0];

  // Home page canonical
  if (cleanRoute === "/") {
    return SEO_CONFIG.siteUrl;
  }

  return `${SEO_CONFIG.siteUrl}${cleanRoute}`;
}
