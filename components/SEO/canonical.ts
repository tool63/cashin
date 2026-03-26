import { SEO_CONFIG } from "./seoConfig";

// ===============================
// 🧠 TYPES (STRICT + FUTURE SAFE)
// ===============================
type CanonicalInput = {
  path: string;
  country?: string;
  language?: string; // accepted but intentionally ignored
};

// ===============================
// 🧠 PATH NORMALIZER (ENTERPRISE SAFE)
// ===============================
function normalizePath(path: string): string {
  if (!path) return "/";

  let clean = path;

  // Ensure leading slash
  if (!clean.startsWith("/")) {
    clean = `/${clean}`;
  }

  // Remove query + hash
  clean = clean.split("?")[0].split("#")[0];

  // Remove duplicate slashes
  clean = clean.replace(/\/+/g, "/");

  // Remove trailing slash (except root)
  if (clean.length > 1 && clean.endsWith("/")) {
    clean = clean.slice(0, -1);
  }

  return clean;
}

// ===============================
// 🌐 COUNTRY NORMALIZER (STRICT ISO)
// ===============================
function normalizeCountry(country?: string): string | undefined {
  if (!country) return undefined;

  const clean = country.toLowerCase().trim();

  // Strict ISO-2 validation
  return /^[a-z]{2}$/.test(clean) ? clean : undefined;
}

// ===============================
// 🌍 CORE CANONICAL ENGINE
// ===============================
function buildCanonicalUrl({
  path,
  country,
}: CanonicalInput): string {
  const cleanPath = normalizePath(path);
  const cleanCountry = normalizeCountry(country);

  // ===============================
  // 🌐 GLOBAL (UNKNOWN USERS ONLY)
  // ===============================
  if (!cleanCountry) {
    return `${SEO_CONFIG.baseUrl}${cleanPath}`;
  }

  // ===============================
  // 🌎 COUNTRY (ALL COUNTRIES, NO EXCEPTION)
  // ===============================
  return `${SEO_CONFIG.baseUrl}/${cleanCountry}${cleanPath}`;
}

// ===============================
// 🚀 PUBLIC API (PRIMARY ENTRY)
// ===============================
export function generateCanonical(input: CanonicalInput): string {
  return buildCanonicalUrl(input);
}

// ===============================
// 🔥 ENTERPRISE ALIAS LAYER
// ===============================

// Standard naming
export const getCanonicalUrl = generateCanonical;

// Builder-style alias
export const buildCanonical = generateCanonical;

// Internal engine usage
export const resolveCanonical = buildCanonicalUrl;

// Ultra-short DX alias
export const canonical = generateCanonical;

// Optional explicit helpers
export const getGlobalCanonical = (path: string) =>
  buildCanonicalUrl({ path });

export const getCountryCanonical = (path: string, country: string) =>
  buildCanonicalUrl({ path, country });

// ===============================
// 🧪 DEBUG / VALIDATION (OPTIONAL)
// ===============================
export function validateCanonical(url: string): boolean {
  try {
    const parsed = new URL(url);

    // Ensure correct domain
    if (parsed.origin !== SEO_CONFIG.baseUrl) return false;

    // Prevent double country segments like /us/us/page
    const segments = parsed.pathname.split("/").filter(Boolean);

    if (segments.length >= 2 && segments[0] === segments[1]) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
