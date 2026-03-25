import { DEFAULT_COUNTRY } from "@/app/core/constants";
import { SEO_CONFIG } from "./seoConfig";

// ===============================
// 🧠 STRICT PATH NORMALIZER
// ===============================
function normalizePath(path: string): string {
  if (!path) return "/";

  let clean = path;

  if (!clean.startsWith("/")) {
    clean = `/${clean}`;
  }

  clean = clean.split("?")[0].split("#")[0];
  clean = clean.replace(/\/+/g, "/");

  if (clean.length > 1 && clean.endsWith("/")) {
    clean = clean.slice(0, -1);
  }

  return clean;
}

// ===============================
// 🌐 STRICT COUNTRY NORMALIZER
// ===============================
function normalizeCountry(country?: string): string | undefined {
  if (!country) return undefined;

  const clean = country.toLowerCase().trim();

  if (/^[a-z]{2}$/.test(clean)) return clean;

  return undefined;
}

// ===============================
// 🌍 CANONICAL ENGINE (CORE)
// ===============================
function buildCanonicalUrl({
  path,
  country,
  language,
}: {
  path: string;
  country?: string;
  language?: string;
}): string {
  const cleanPath = normalizePath(path);
  const cleanCountry = normalizeCountry(country);

  // ===============================
  // 🌐 LANGUAGE RULE (HIGHEST PRIORITY)
  // Canonical NEVER includes language
  // ===============================
  if (language) {
    return `${SEO_CONFIG.baseUrl}${cleanPath}`;
  }

  // ===============================
  // 🌍 COUNTRY LOGIC
  // ===============================
  if (cleanCountry) {
    // DEFAULT COUNTRY → GLOBAL CANONICAL (example.com style)
    if (cleanCountry === DEFAULT_COUNTRY) {
      return `${SEO_CONFIG.baseUrl}${cleanPath}`;
    }

    // NON-DEFAULT → COUNTRY PATH
    return `${SEO_CONFIG.baseUrl}/${cleanCountry}${cleanPath}`;
  }

  // ===============================
  // 🌍 GLOBAL DEFAULT
  // ===============================
  return `${SEO_CONFIG.baseUrl}${cleanPath}`;
}

// ===============================
// 🚀 PRIMARY API
// ===============================
export function generateCanonical({
  path,
  country,
  language,
}: {
  path: string;
  country?: string;
  language?: string;
}): string {
  return buildCanonicalUrl({ path, country, language });
}

// ===============================
// 🔥 ALIAS LAYER (ENTERPRISE STANDARD)
// ===============================

// Core alias
export const getCanonicalUrl = generateCanonical;

// Secondary alias (future-proof naming)
export const buildCanonical = generateCanonical;

// Internal alias (SEO engine usage)
export const resolveCanonical = buildCanonicalUrl;
