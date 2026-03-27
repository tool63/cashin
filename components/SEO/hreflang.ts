// =======================================
// 🌐 hreflang.ts (FULL ENTERPRISE VERSION)
// =======================================

import { ISO_COUNTRIES } from "@/app/core/countries";

export type HreflangLink = {
  rel: "alternate";
  hrefLang: string;
  href: string;
};

// ===============================
// 🌐 BASE CONFIG
// ===============================
export const BASE_URL = "https://cashog.com";
export const GLOBAL_HREFLANG = "x-default";

// ===============================
// 🌍 COUNTRY → HREFLANG MAP (OVERRIDES)
// ===============================
export const COUNTRY_HREFLANG_MAP: Record<string, string> = {
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
  cn: "zh-CN",
  tw: "zh-TW",
  jp: "ja-JP",
  kr: "ko-KR",
  // Add more as needed
  ae: "ar-AE",
  sa: "ar-SA",
  th: "th-TH",
  vn: "vi-VN",
  id: "id-ID",
  tr: "tr-TR",
  pl: "pl-PL",
  ro: "ro-RO",
  il: "he-IL",
};

// ===============================
// 🧹 PATH NORMALIZER
// ===============================
function normalizePath(path: string): string {
  if (!path) return "/";
  let clean = path.startsWith("/") ? path : `/${path}`;
  clean = clean.split("?")[0].split("#")[0];
  clean = clean.replace(/\/+/g, "/");
  if (clean.length > 1 && clean.endsWith("/")) clean = clean.slice(0, -1);
  return clean;
}

// ===============================
// 🌍 COUNTRY NORMALIZER
// ===============================
function normalizeCountry(country?: string): string | undefined {
  if (!country) return undefined;
  const c = country.toLowerCase().trim();
  return /^[a-z]{2}$/.test(c) ? c : undefined;
}

// ===============================
// 🔗 URL BUILDER (Using imported ISO_COUNTRIES)
// ===============================
export function buildUrl(path: string, country?: string): string {
  const cleanPath = normalizePath(path);
  const cleanCountry = normalizeCountry(country);
  return cleanCountry && ISO_COUNTRIES.includes(cleanCountry as any)
    ? `${BASE_URL}/${cleanCountry}${cleanPath}`
    : `${BASE_URL}${cleanPath}`;
}

// ===============================
// 🌐 GET HREFLANG
// ===============================
export function getHreflang(country: string): string {
  const c = country.toLowerCase();
  return COUNTRY_HREFLANG_MAP[c] || `en-${c.toUpperCase()}`;
}

// ===============================
// 🌐 GENERATE HREFLANG LINKS (Using imported ISO_COUNTRIES)
// ===============================
export function generateHreflangLinks(path: string): HreflangLink[] {
  const cleanPath = normalizePath(path);
  const links: HreflangLink[] = [];

  // x-default
  links.push({ rel: "alternate", hrefLang: GLOBAL_HREFLANG, href: buildUrl(cleanPath) });

  // All countries from ISO_COUNTRIES
  for (const country of ISO_COUNTRIES) {
    links.push({ 
      rel: "alternate", 
      hrefLang: getHreflang(country), 
      href: buildUrl(cleanPath, country) 
    });
  }

  return links;
}

// ===============================
// 🌍 SINGLE COUNTRY URL HELPER
// ===============================
export function getCountryUrl(path: string, country?: string) {
  return buildUrl(path, country);
}

// ===============================
// 🌐 GLOBAL URL HELPER
// ===============================
export function getGlobalUrl(path: string) {
  return buildUrl(path);
}

// ===============================
// 🧭 SUPPORTED COUNTRIES (Using imported ISO_COUNTRIES)
// ===============================
export function getSupportedCountries() {
  return ISO_COUNTRIES;
}

// ===============================
// 🔥 EXPORT ALL_COUNTRIES FOR BACKWARD COMPATIBILITY
// ===============================
export const ALL_COUNTRIES = ISO_COUNTRIES;
