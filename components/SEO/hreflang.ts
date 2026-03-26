// ===============================
// 🌐 BASE CONFIG (ENTERPRISE CORE)
// ===============================
const BASE_URL = "https://cashog.com";

// Global = unknown users
const GLOBAL_HREFLANG = "x-default";

// ===============================
// 🌍 COUNTRY → HREFLANG MAP
// ===============================
const COUNTRY_HREFLANG_MAP: Record<string, string> = {
  us: "en-US",
  gb: "en-GB",
  ca: "en-CA",
  au: "en-AU",

  de: "de-DE",
  fr: "fr-FR",
  es: "es-ES",
  it: "it-IT",
  nl: "nl-NL",
  se: "sv-SE",
  ch: "de-CH",

  in: "en-IN",
  bd: "en-BD",
  pk: "en-PK",

  br: "pt-BR",
  mx: "es-MX",

  sg: "en-SG",
  ph: "en-PH",

  za: "en-ZA",
  ng: "en-NG",
  ke: "en-KE",
  eg: "ar-EG",
};

// ===============================
// 🧠 PATH NORMALIZER (STRICT)
// ===============================
function normalizePath(path: string): string {
  if (!path) return "/";

  let clean = path;

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
// 🌍 COUNTRY NORMALIZER (STRICT)
// ===============================
function normalizeCountry(country?: string): string | undefined {
  if (!country) return undefined;

  const c = country.toLowerCase().trim();

  if (/^[a-z]{2}$/.test(c)) return c;

  return undefined;
}

// ===============================
// 🔗 URL BUILDER (GLOBAL + COUNTRY)
// ===============================
function buildUrl(path: string, country?: string): string {
  const cleanPath = normalizePath(path);
  const cleanCountry = normalizeCountry(country);

  // 🌐 GLOBAL (UNKNOWN USERS)
  if (!cleanCountry) {
    return `${BASE_URL}${cleanPath}`;
  }

  // 🌎 COUNTRY-SPECIFIC
  return `${BASE_URL}/${cleanCountry}${cleanPath}`;
}

// ===============================
// 🚀 HREFLANG ENGINE (ENTERPRISE)
// ===============================
export function generateHreflang({
  path,
}: {
  path: string;
}) {
  const links: {
    rel: "alternate";
    hrefLang: string;
    href: string;
  }[] = [];

  const cleanPath = normalizePath(path);

  // ===============================
  // 🌍 1. GLOBAL (x-default)
  // ===============================
  links.push({
    rel: "alternate",
    hrefLang: GLOBAL_HREFLANG,
    href: buildUrl(cleanPath),
  });

  // ===============================
  // 🌎 2. ALL COUNTRY VARIANTS
  // ===============================
  for (const [countryCode, hreflang] of Object.entries(
    COUNTRY_HREFLANG_MAP
  )) {
    links.push({
      rel: "alternate",
      hrefLang: hreflang,
      href: buildUrl(cleanPath, countryCode),
    });
  }

  return links;
}

// ===============================
// 🚀 OPTIONAL: SINGLE COUNTRY HELPER
// ===============================
export function getCountryUrl(path: string, country?: string) {
  return buildUrl(path, country);
}

// ===============================
// 🚀 OPTIONAL: GLOBAL URL HELPER
// ===============================
export function getGlobalUrl(path: string) {
  return buildUrl(path);
}

// ===============================
// 🚀 OPTIONAL: SUPPORTED COUNTRIES
// ===============================
export function getSupportedCountries() {
  return Object.keys(COUNTRY_HREFLANG_MAP);
}
