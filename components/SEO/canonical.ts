import { DEFAULT_COUNTRY } from "@/app/core/constants";

const BASE_URL = "https://cashog.com";

// ===============================
// 🧠 STRICT PATH NORMALIZER
// ===============================
function normalizePath(path: string): string {
  if (!path) return "/";

  let clean = path;

  // Ensure leading slash
  if (!clean.startsWith("/")) {
    clean = `/${clean}`;
  }

  // Remove query params, hashes, and fragments
  clean = clean.split("?")[0].split("#")[0];

  // Remove multiple slashes (e.g. //page → /page)
  clean = clean.replace(/\/+/g, "/");

  // Remove trailing slash (except root)
  if (clean.length > 1 && clean.endsWith("/")) {
    clean = clean.slice(0, -1);
  }

  return clean;
}

// ===============================
// 🌐 VALIDATE COUNTRY CODE
// ===============================
function normalizeCountry(country?: string): string | undefined {
  if (!country) return undefined;

  const clean = country.toLowerCase().trim();

  // Accept only ISO-style 2-letter codes
  if (/^[a-z]{2}$/.test(clean)) {
    return clean;
  }

  return undefined;
}

// ===============================
// 🌍 CANONICAL URL BUILDER (CORE)
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
  // 🌐 LANGUAGE RULE (STRICT)
  // Canonical NEVER includes language
  // ===============================
  if (language) {
    return `${BASE_URL}${cleanPath}`;
  }

  // ===============================
  // 🌍 COUNTRY RULE
  // ===============================
  if (cleanCountry) {
    // DEFAULT COUNTRY → GLOBAL CANONICAL
    if (cleanCountry === DEFAULT_COUNTRY) {
      return `${BASE_URL}${cleanPath}`;
    }

    // NON-DEFAULT COUNTRY → COUNTRY URL
    return `${BASE_URL}/${cleanCountry}${cleanPath}`;
  }

  // ===============================
  // 🌍 GLOBAL FALLBACK
  // ===============================
  return `${BASE_URL}${cleanPath}`;
}

// ===============================
// 🚀 PUBLIC CANONICAL API
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
// 🔥 OPTIONAL: SEO CANONICAL HELPER
// (USED INTERNALLY BY SEO ENGINE)
// ===============================
export function getCanonicalUrl(
  path: string,
  country?: string,
  language?: string
): string {
  return generateCanonical({ path, country, language });
}
