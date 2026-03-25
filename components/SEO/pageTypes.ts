import { SEO_CONFIG } from "./seoConfig";

// ===============================
// 🧠 SEO INPUT TYPE (FIXED - REQUIRED)
// ===============================
export type SeoInput = {
  path: string;

  title?: string;
  description?: string;
  keywords?: string[];

  country?: string;
  language?: string;

  noindex?: boolean;
};

// ===============================
// 🧠 PAGE TYPES (STRICT ENUM)
// ===============================
export type PageType =
  | "money"
  | "earn"
  | "shopping"
  | "content"
  | "low";

// ===============================
// 🧠 NORMALIZE PATH (SAFE)
// ===============================
function normalizePath(path: string): string {
  if (!path) return "/";

  let clean = path;

  if (!clean.startsWith("/")) {
    clean = `/${clean}`;
  }

  // Remove query + hash
  clean = clean.split("?")[0].split("#")[0];

  // Remove trailing slash (except root)
  if (clean.length > 1 && clean.endsWith("/")) {
    clean = clean.slice(0, -1);
  }

  return clean;
}

// ===============================
// 🧠 MATCH HELPERS (TYPE SAFE)
// ===============================
function matchPath(list: string[], path: string): boolean {
  return list.some((p) => path === p || path.startsWith(`${p}/`));
}

// ===============================
// 🧠 PAGE TYPE DETECTOR (CORE)
// ===============================
function detectPageType(path: string): PageType {
  const cleanPath = normalizePath(path);

  // ===============================
  // 💰 MONEY PAGES
  // ===============================
  if (matchPath(SEO_CONFIG.moneyPages, cleanPath)) {
    return "money";
  }

  // ===============================
  // 🎯 EARN PAGES
  // ===============================
  if (matchPath(SEO_CONFIG.earnPages, cleanPath)) {
    return "earn";
  }

  // ===============================
  // 🛍 SHOPPING (SMART DETECTION)
  // ===============================
  if (
    cleanPath.includes("shop") ||
    cleanPath.includes("store") ||
    cleanPath.includes("product") ||
    cleanPath.includes("deal") ||
    cleanPath.includes("cashback")
  ) {
    return "shopping";
  }

  // ===============================
  // 📚 CONTENT (SEO BLOG / GUIDE)
  // ===============================
  if (
    cleanPath.includes("blog") ||
    cleanPath.includes("guide") ||
    cleanPath.includes("learn") ||
    cleanPath.includes("article") ||
    cleanPath.includes("tips")
  ) {
    return "content";
  }

  // ===============================
  // 🔽 DEFAULT FALLBACK
  // ===============================
  return "low";
}

// ===============================
// 🚀 PUBLIC API (PRIMARY)
// ===============================
export function getPageType(path: string): PageType {
  return detectPageType(path);
}

// ===============================
// 🚀 ENTERPRISE ALIASES
// ===============================
export const detectPageCategory = getPageType;
export const resolvePageType = getPageType;
export const classifyPage = getPageType;

// ===============================
// 🔥 PRIORITY HELPER (SAFE)
// ===============================
export function getPagePriority(path: string, country?: string): number {
  const type = getPageType(path);

  return (
    SEO_CONFIG.getPriority(path, country) ??
    SEO_CONFIG.priority[type] ??
    0.7
  );
}
