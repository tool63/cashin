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
// 🌐 LANGUAGE → HREFLANG MAP
// ===============================
const LANGUAGE_HREFLANG_MAP: Record<string, string> = {
  en: "en",
  fr: "fr",
  de: "de",
  es: "es",
  pt: "pt",
};

// ===============================
// 🔗 URL BUILDER
// ===============================
function buildUrl(path: string, prefix?: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;

  if (!prefix) {
    return `${BASE_URL}${clean}`;
  }

  return `${BASE_URL}/${prefix}${clean}`;
}

// ===============================
// 🚀 MAIN HREFLANG GENERATOR
// ===============================
export function generateHreflang({
  path,
  country,
}: {
  path: string;
  country?: string;
}) {
  const links: {
    rel: string;
    hrefLang: string;
    href: string;
  }[] = [];

  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  // ===============================
  // 🌍 1. GLOBAL (x-default)
  // ===============================
  links.push({
    rel: "alternate",
    hrefLang: "x-default",
    href: buildUrl(cleanPath),
  });

  // ===============================
  // 🥇 2. COUNTRY VERSIONS
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

  // ===============================
  // 🌐 3. LANGUAGE VERSIONS
  // ===============================
  for (const lang of SUPPORTED_LANGUAGES) {
    if (lang === "en") continue; // avoid duplicate with global

    const hreflang = LANGUAGE_HREFLANG_MAP[lang];

    links.push({
      rel: "alternate",
      hrefLang: hreflang,
      href: buildUrl(cleanPath, lang),
    });
  }

  return links;
}
