import { DEFAULT_COUNTRY } from "@/app/core/constants";

const BASE_URL = "https://cashog.com";

// ===============================
// 🌍 URL BUILDER (CANONICAL SAFE)
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
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  // ===============================
  // 🌍 GLOBAL (DEFAULT CANONICAL)
  // ===============================
  if (!country && !language) {
    return `${BASE_URL}${cleanPath}`;
  }

  // ===============================
  // 🌐 LANGUAGE VERSION
  // Canonical → remove language (avoid duplication)
  // ===============================
  if (language) {
    return `${BASE_URL}${cleanPath}`;
  }

  // ===============================
  // 🌎 COUNTRY VERSION
  // Canonical:
  // - US → canonical = global
  // - Others → canonical = country version
  // ===============================
  if (country) {
    if (country === DEFAULT_COUNTRY) {
      return `${BASE_URL}${cleanPath}`;
    }

    return `${BASE_URL}/${country}${cleanPath}`;
  }

  return `${BASE_URL}${cleanPath}`;
}

// ===============================
// 🚀 MAIN CANONICAL GENERATOR
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
