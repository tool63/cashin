import { SUPPORTED_LANGUAGES } from "@/app/core/constants";

const BASE_URL = "https://cashog.com";

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
// 🔗 URL BUILDER (COUNTRY ONLY)
// ===============================
function buildUrl(path: string, country?: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;

  // Global (no country)
  if (!country) {
    return `${BASE_URL}${clean}`;
  }

  return `${BASE_URL}/${country}${clean}`;
}

// ===============================
// 🚀 MAIN HREFLANG GENERATOR
// ===============================
export function generateHreflang({
  path,
}: {
  path: string;
}) {
  const links: {
    rel: string;
    hrefLang: string;
    href: string;
  }[] = [];

  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  // ===============================
  // 🌍 1. x-default (global)
  // ===============================
  links.push({
    rel: "alternate",
    hrefLang: "x-default",
    href: buildUrl(cleanPath),
  });

  // ===============================
  // 🥇 2. COUNTRY VERSIONS ONLY
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
