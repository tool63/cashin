import { DEFAULT_COUNTRY } from "@/app/core/constants";

const BASE_URL = "https://cashog.com";

// ===============================
// 🧠 CLEAN PATH NORMALIZER
// ===============================
function normalizePath(path: string) {
  let clean = path || "/";

  // Ensure leading slash
  if (!clean.startsWith("/")) {
    clean = `/${clean}`;
  }

  // Remove query params & hashes (CRITICAL FOR SEO)
  clean = clean.split("?")[0].split("#")[0];

  // Remove trailing slash (except root)
  if (clean.length > 1 && clean.endsWith("/")) {
    clean = clean.slice(0, -1);
  }

  return clean;
}

// ===============================
// 🌍 CANONICAL URL BUILDER
// ===============================
function buildCanonicalUrl({
  path,
  country,
  language,
}: {
  path: string;
  country?: string;
  language?: string;
}) {
  const cleanPath = normalizePath(path);

  // ===============================
  // 🌐 LANGUAGE RULE
  // Canonical ALWAYS strips language
  // (prevents duplicate indexing)
  // ===============================
  if (language) {
    return `${BASE_URL}${cleanPath}`;
  }

  // ===============================
  // 🌍 COUNTRY RULE
  // ===============================
  if (country) {
    // DEFAULT COUNTRY → GLOBAL CANONICAL
    if (country === DEFAULT_COUNTRY) {
      return `${BASE_URL}${cleanPath}`;
    }

    // OTHER COUNTRIES → COUNTRY URL
    return `${BASE_URL}/${country}${cleanPath}`;
  }

  // ===============================
  // 🌍 GLOBAL CANONICAL
  // ===============================
  return `${BASE_URL}${cleanPath}`;
}

// ===============================
// 🚀 PUBLIC API
// ===============================
export function generateCanonical({
  path,
  country,
  language,
}: {
  path: string;
  country?: string;
  language?: string;
}) {
  return buildCanonicalUrl({ path, country, language });
}
