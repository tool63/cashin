// app/core/detector.ts
import type { NextRequest } from "next/server";

// ===============================
// 🌐 Constants & Configuration
// ===============================

export const DEFAULT_COUNTRY = "us";
export const DEFAULT_LANGUAGE = "en";
export const SUPPORTED_LANGUAGES = ["en", "fr", "de"] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

// Map country → language (only for translation-supported countries)
export const COUNTRY_LANGUAGE_MAP: Record<string, SupportedLanguage> = {
  // English
  us: "en", gb: "en", ca: "en", au: "en", nz: "en", ie: "en",
  in: "en", ph: "en", pk: "en", bd: "en", lk: "en", my: "en",
  sg: "en", za: "en", ng: "en", ke: "en",

  // French
  fr: "fr", be: "fr", ch: "fr", lu: "fr", mc: "fr",

  // German
  de: "de", at: "de", ch: "de", li: "de",
};

// Public routes that don't need country prefix
export const PUBLIC_ROUTES = [
  "about", "contact", "blog", "faq", "terms", "privacy",
  "promo-codes", "daily-deals", "sitemap", "robots.txt",
];

// ===============================
// 🌍 Country Detection
// ===============================

/**
 * Detect user's country from headers / IP
 * Falls back to DEFAULT_COUNTRY
 */
export function detectCountry(request: NextRequest): string {
  const geo =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    request.headers.get("cloudfront-viewer-country") ||
    request.headers.get("x-country"); // For testing / custom

  return geo ? geo.toLowerCase() : DEFAULT_COUNTRY;
}

// ===============================
// 🌐 Language Detection
// ===============================

export function normalizeLanguageCode(lang: string): string {
  return lang.toLowerCase().split("-")[0];
}

export function isLanguageSupported(lang: string): boolean {
  return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
}

export function getLanguageFromCookie(request: NextRequest): SupportedLanguage | null {
  const cookieLang = request.cookies.get("NEXT_LOCALE")?.value;
  if (!cookieLang) return null;

  const normalized = normalizeLanguageCode(cookieLang);
  return isLanguageSupported(normalized) ? (normalized as SupportedLanguage) : null;
}

export function getLanguageFromHeader(request: NextRequest): SupportedLanguage | null {
  const acceptLang = request.headers.get("accept-language");
  if (!acceptLang) return null;

  const langs = acceptLang
    .split(",")
    .map(l => l.split(";")[0].trim())
    .map(normalizeLanguageCode);

  for (const lang of langs) {
    if (isLanguageSupported(lang)) return lang as SupportedLanguage;
  }

  return null;
}

export function getLanguageFromCountry(country: string): SupportedLanguage | null {
  return COUNTRY_LANGUAGE_MAP[country.toLowerCase()] || null;
}

/**
 * Detect language with priority:
 * 1️⃣ Cookie → 2️⃣ Header → 3️⃣ Country map → 4️⃣ Default
 */
export function detectLanguage(
  request: NextRequest,
  country: string,
  preferCookie = true
): SupportedLanguage {
  if (preferCookie) {
    const cookieLang = getLanguageFromCookie(request);
    if (cookieLang) return cookieLang;
  }

  const headerLang = getLanguageFromHeader(request);
  if (headerLang) return headerLang;

  const countryLang = getLanguageFromCountry(country);
  if (countryLang) return countryLang;

  return DEFAULT_LANGUAGE;
}

// ===============================
// 🔍 Route Detection
// ===============================

export function isCountryCode(segment: string | undefined): boolean {
  if (!segment) return false;
  return /^[a-z]{2}$/i.test(segment);
}

export function isPublicRoute(segment: string | undefined): boolean {
  if (!segment) return false;
  return PUBLIC_ROUTES.includes(segment.toLowerCase());
}

export function extractCountryFromPath(pathname: string): string | null {
  const first = pathname.split("/").filter(Boolean)[0]?.toLowerCase();
  return first && isCountryCode(first) ? first : null;
}

export function extractPathWithoutCountry(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length && isCountryCode(segments[0])) {
    return "/" + segments.slice(1).join("/");
  }
  return pathname;
}

// ===============================
// 🏠 URL Building
// ===============================

export function buildUrlWithCountry(path: string, country: string = DEFAULT_COUNTRY): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (cleanPath === "/") return `/${country}`;
  return `/${country}${cleanPath}`;
}

export function getRedirectUrlForUnknownRoute(pathname: string, defaultCountry: string = DEFAULT_COUNTRY): string {
  const segments = pathname.split("/").filter(Boolean);
  const rest = segments.join("/");
  return rest ? `/${defaultCountry}/${rest}` : `/${defaultCountry}`;
}

// ===============================
// 📊 Info Object
// ===============================

export interface CountryLanguageInfo {
  country: string;
  language: SupportedLanguage;
  isPublicRoute: boolean;
  hasCountryInUrl: boolean;
  pathWithoutCountry: string;
}

export function getCountryLanguageInfo(request: NextRequest): CountryLanguageInfo {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0]?.toLowerCase();

  const publicRoute = isPublicRoute(first);
  const hasCountryInUrl = !publicRoute && isCountryCode(first);

  const country = hasCountryInUrl && first ? first : detectCountry(request);
  const language = detectLanguage(request, country, true);
  const pathWithoutCountry = hasCountryInUrl ? "/" + segments.slice(1).join("/") : pathname;

  return {
    country,
    language,
    isPublicRoute: publicRoute,
    hasCountryInUrl,
    pathWithoutCountry: pathWithoutCountry || "/",
  };
}

// ===============================
// 🌍 Country Name (Worldwide)
// ===============================

/**
 * Get country name dynamically (works for all countries)
 */
export function getCountryDisplayName(countryCode: string, locale: string = "en"): string {
  try {
    const regionNames = new Intl.DisplayNames([locale], { type: "region" });
    return regionNames.of(countryCode.toUpperCase()) || countryCode.toUpperCase();
  } catch {
    return countryCode.toUpperCase();
  }
}

// ===============================
// 📈 SEO Helpers
// ===============================

export function generateSeoTitle(baseTitle: string, countryCode?: string | null): string {
  if (!countryCode) return baseTitle;
  const countryName = getCountryDisplayName(countryCode);
  return `Earn Money Online in ${countryName} | Cashog`;
}

export function generateSeoDescription(countryCode?: string | null): string {
  const countryName = countryCode ? getCountryDisplayName(countryCode) : "your country";
  return `Earn real money online in ${countryName}. Complete surveys, install apps, play games, and watch videos. Get paid instantly with Cashog.`;
}
