// app/core/geo/detector.ts
import type { NextRequest } from "next/server";

// ===============================
// 🌍 Constants & Configuration
// ===============================
export const DEFAULT_COUNTRY = "us";
export const DEFAULT_LANGUAGE = "en";

export const SUPPORTED_LANGUAGES = ["en", "fr", "de"] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

// ===============================
// ✅ ISO 3166-1 alpha-2 country codes
// ===============================
export const VALID_COUNTRY_CODES = new Set([
  "us","ca","mx","gb","fr","de","it","es","pt","au","nz","in","pk","bd","ch","be","lu","li",
  "za","ng","ke","gh","ph","sg","my","jp","cn","kr","ae","sa","eg","ma","tn","dz",
  // ... add all other valid countries needed
]);

// ===============================
// 🌍 Country → Default Language Mapping
// ===============================
export const COUNTRY_LANGUAGE_MAP: Record<string, SupportedLanguage> = {
  // English
  us:"en", gb:"en", ca:"en", au:"en", nz:"en", in:"en", pk:"en", bd:"en",
  ph:"en", sg:"en", my:"en", za:"en", ng:"en", ke:"en", gh:"en",
  // French
  fr:"fr", be:"fr", ch:"fr", lu:"fr", mc:"fr",
  ci:"fr", cm:"fr", sn:"fr", ml:"fr", ma:"fr", dz:"fr", tn:"fr",
  // German
  de:"de", at:"de", li:"de", be:"de", lu:"de",
};

// ===============================
// 🏳️‍🌈 Public Routes
// ===============================
export const PUBLIC_ROUTES = new Set([
  "about","contact","blog","faq","terms","privacy",
  "promo-codes","daily-deals","sitemap","robots.txt",
  "api","_next","favicon.ico",
]);

// ===============================
// 🍪 Cookie Keys
// ===============================
export const COOKIE_KEYS = {
  LANGUAGE: "NEXT_LOCALE",
  COUNTRY: "USER_COUNTRY",
  AB_GROUP: "AB_GROUP",
} as const;

// ===============================
// 🌐 Helpers
// ===============================
export function isCountryCode(segment: string): boolean {
  return /^[a-z]{2}$/i.test(segment) && VALID_COUNTRY_CODES.has(segment.toLowerCase());
}

export function isPublicRoute(path: string): boolean {
  const first = path.split("/").filter(Boolean)[0]?.toLowerCase();
  return first ? PUBLIC_ROUTES.has(first) : false;
}

export function extractCountryFromPath(pathname: string): string | null {
  const first = pathname.split("/").filter(Boolean)[0]?.toLowerCase();
  return first && isCountryCode(first) ? first : null;
}

export function getPathWithoutCountry(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length && isCountryCode(segments[0])) {
    return "/" + segments.slice(1).join("/");
  }
  return pathname;
}

export function buildUrl(path: string, country: string = DEFAULT_COUNTRY): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return clean === "/" ? `/${country}` : `/${country}${clean}`;
}

// ===============================
// 🌐 Country Detection
// ===============================
export function detectCountry(request: NextRequest): string {
  const geo =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    request.headers.get("cloudfront-viewer-country") ||
    request.headers.get("x-country"); // For dev/testing

  if (!geo) return DEFAULT_COUNTRY;

  const normalized = geo.toLowerCase();
  return VALID_COUNTRY_CODES.has(normalized) ? normalized : DEFAULT_COUNTRY;
}

// ===============================
// 🌐 Language Detection
// ===============================
export function normalizeLanguage(lang: string): string {
  return lang.toLowerCase().split("-")[0];
}

export function isLanguageSupported(lang: string): boolean {
  return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
}

export function getLanguageFromCookie(request: NextRequest): SupportedLanguage | null {
  const cookieLang = request.cookies.get(COOKIE_KEYS.LANGUAGE)?.value;
  if (!cookieLang) return null;
  const norm = normalizeLanguage(cookieLang);
  return isLanguageSupported(norm) ? (norm as SupportedLanguage) : null;
}

export function getLanguageFromHeader(request: NextRequest): SupportedLanguage | null {
  const acceptLang = request.headers.get("accept-language");
  if (!acceptLang) return null;

  const langs = acceptLang.split(",").map(l => l.split(";")[0].trim()).map(normalizeLanguage);
  for (const lang of langs) {
    if (isLanguageSupported(lang)) return lang as SupportedLanguage;
  }
  return null;
}

export function getLanguageForCountry(country: string): SupportedLanguage {
  return COUNTRY_LANGUAGE_MAP[country.toLowerCase()] || DEFAULT_LANGUAGE;
}

export function detectLanguage(request: NextRequest, country: string): SupportedLanguage {
  const cookieLang = getLanguageFromCookie(request);
  if (cookieLang) return cookieLang;

  const headerLang = getLanguageFromHeader(request);
  if (headerLang) return headerLang;

  return getLanguageForCountry(country);
}

// ===============================
// 🌐 Full Geo Info Object
// ===============================
export interface GeoInfo {
  country: string;
  language: SupportedLanguage;
  hasCountryInUrl: boolean;
  isPublicRoute: boolean;
  pathWithoutCountry: string;
  originalPath: string;
}

export function getGeoInfo(request: NextRequest): GeoInfo {
  const { pathname } = request.nextUrl;

  const publicRoute = isPublicRoute(pathname);
  const urlCountry = !publicRoute ? extractCountryFromPath(pathname) : null;

  const country = urlCountry || detectCountry(request);
  const language = detectLanguage(request, country);

  const pathWithoutCountry = urlCountry ? "/" + pathname.split("/").filter(Boolean).slice(1).join("/") : pathname;

  return {
    country,
    language,
    hasCountryInUrl: !!urlCountry,
    isPublicRoute: publicRoute,
    pathWithoutCountry: pathWithoutCountry || "/",
    originalPath: pathname,
  };
}
