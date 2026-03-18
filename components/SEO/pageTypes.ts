// ------------------------------
// 🌐 Page Types & Detection for SEO
// ------------------------------

export type PageType =
  | "homepage"
  | "article"
  | "product"
  | "landing"
  | "promo"
  | "faq"
  | "blog"
  | "generic";

export interface PageTypeInfo {
  type: PageType;
  priority: number; // 0.0 - 1.0 (used for sitemaps / SEO importance)
}

// ------------------------------
// 🔍 Detect page type based on path
// ------------------------------
export function detectPageType(path: string): PageTypeInfo {
  const cleanPath = path.toLowerCase().trim();

  // Homepage
  if (cleanPath === "/" || cleanPath === "") {
    return { type: "homepage", priority: 1 };
  }

  // Blog / Article pages
  if (cleanPath.startsWith("/blog") || cleanPath.startsWith("/news")) {
    return { type: "article", priority: 0.8 };
  }

  // Product / Offer pages
  if (cleanPath.startsWith("/product") || cleanPath.startsWith("/offer")) {
    return { type: "product", priority: 0.7 };
  }

  // Landing pages / promo pages
  if (cleanPath.startsWith("/landing") || cleanPath.startsWith("/promo")) {
    return { type: "landing", priority: 0.65 };
  }

  // FAQ / informational pages
  if (cleanPath.startsWith("/faq") || cleanPath.startsWith("/help") || cleanPath.startsWith("/support")) {
    return { type: "faq", priority: 0.6 };
  }

  // Generic fallback for all other pages
  return { type: "generic", priority: 0.5 };
}
