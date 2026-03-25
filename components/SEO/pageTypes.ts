import { SEO_CONFIG } from "./seoConfig";

// ===============================
// 🧠 PAGE TYPES
// ===============================
export type PageType =
  | "money"
  | "earn"
  | "shopping"
  | "content"
  | "low";

// ===============================
// 🧠 NORMALIZE PATH
// ===============================
function normalizePath(path: string): string {
  if (!path) return "/";
  if (!path.startsWith("/")) return `/${path}`;
  return path.split("?")[0].split("#")[0];
}

// ===============================
// 🧠 PAGE TYPE DETECTOR (CORE)
// ===============================
function detectPageType(path: string): PageType {
  const cleanPath = normalizePath(path);

  // ===============================
  // 💰 MONEY PAGES
  // ===============================
  if (
    SEO_CONFIG.moneyPages.some((p) => cleanPath.startsWith(p))
  ) {
    return "money";
  }

  // ===============================
  // 🎯 EARN PAGES
  // ===============================
  if (
    SEO_CONFIG.earnPages.some((p) => cleanPath.startsWith(p))
  ) {
    return "earn";
  }

  // ===============================
  // 🛍 SHOPPING (EXTENSIBLE)
  // ===============================
  if (
    cleanPath.includes("shop") ||
    cleanPath.includes("store") ||
    cleanPath.includes("product")
  ) {
    return "shopping";
  }

  // ===============================
  // 📚 CONTENT
  // ===============================
  if (
    cleanPath.includes("blog") ||
    cleanPath.includes("guide") ||
    cleanPath.includes("learn") ||
    cleanPath.includes("article")
  ) {
    return "content";
  }

  // ===============================
  // 🔽 DEFAULT FALLBACK
  // ===============================
  return "low";
}

// ===============================
// 🚀 PUBLIC API
// ===============================
export function getPageType(path: string): PageType {
  return detectPageType(path);
}

// ===============================
// 🚀 ALIASES (ENTERPRISE PATTERN)
// ===============================
export const detectPageCategory = getPageType;
export const resolvePageType = getPageType;
export const classifyPage = getPageType;
