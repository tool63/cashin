import type { NextRequest } from "next/server";

// ===============================
// 🌍 DEFAULTS
// ===============================
export const DEFAULT_COUNTRY = "us";
export const DEFAULT_LANGUAGE = "en";

// ===============================
// 🌍 SUPPORTED LANGUAGES
// ===============================
export const SUPPORTED_LANGUAGES = ["en", "fr", "de", "es", "pt"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

// ===============================
// 🍪 COOKIE KEYS
// ===============================
export const COOKIE_KEYS = {
  COUNTRY: "USER_COUNTRY",
  LANGUAGE: "NEXT_LOCALE",
  FORCED_COUNTRY: "FORCED_COUNTRY",
} as const;

// ===============================
// 🌍 COUNTRY CODES
// ===============================
export const COUNTRY_CODES = [
  "us","gb","ca","au","de","fr","in","bd","pk","ng","mx","br",
  "es","pt","it","nl","ar","co","cl","pe","za"
] as const;

export type CountryCode = (typeof COUNTRY_CODES)[number];

// ===============================
// ⚡ VALIDATION
// ===============================
export const VALID_COUNTRY_CODES = new Set<string>(COUNTRY_CODES);

export function isValidCountryCode(code: string): code is CountryCode {
  return VALID_COUNTRY_CODES.has(code.toLowerCase());
}

// ===============================
// 🌍 SUPPORTED COUNTRIES
// ===============================
export const SUPPORTED_COUNTRIES = new Set<CountryCode>([
  "us","gb","ca","au","de","fr",
  "in","bd","pk","ng","mx","br",
  "es","pt","it","nl"
]);

export function isSupportedCountry(country: string): boolean {
  return SUPPORTED_COUNTRIES.has(country.toLowerCase() as CountryCode);
}

// ===============================
// 🌍 PREFIX RULE
// ===============================
export function shouldUsePrefix(country: string): boolean {
  return isSupportedCountry(country);
}

// ===============================
// 🌍 LANGUAGE MAP
// ===============================
export const COUNTRY_LANGUAGE_MAP: Partial<
  Record<CountryCode, SupportedLanguage>
> = {
  us: "en", gb: "en", ca: "en", au: "en",
  fr: "fr", de: "de",
  es: "es", pt: "pt",
  mx: "es", ar: "es", co: "es", cl: "es", pe: "es",
  bd: "en", in: "en", pk: "en", ng: "en", za: "en",
  br: "pt",
};

// ===============================
// 🌐 LANGUAGE RESOLUTION
// ===============================
export function getLanguageForCountry(
  country: string
): SupportedLanguage {
  const mapped =
    COUNTRY_LANGUAGE_MAP[country.toLowerCase() as CountryCode];

  return mapped && SUPPORTED_LANGUAGES.includes(mapped)
    ? mapped
    : DEFAULT_LANGUAGE;
}

// ===============================
// 🔤 NORMALIZE LANGUAGE
// ===============================
export function normalizeLanguage(lang: string): SupportedLanguage {
  const base = lang.toLowerCase().split("-")[0];

  if ((SUPPORTED_LANGUAGES as readonly string[]).includes(base)) {
    return base as SupportedLanguage;
  }

  return DEFAULT_LANGUAGE;
}

// ===============================
// 🌐 ACCEPT-LANGUAGE PARSER (FIXED)
// ===============================
function parseAcceptLanguage(header: string): SupportedLanguage {
  const langs = header.split(",").map((item) => {
    const [lang, qValue] = item.split(";q=");
    return {
      lang: lang.trim(),
      q: qValue ? parseFloat(qValue) : 1,
    };
  });

  const sorted = langs.sort((a, b) => b.q - a.q);

  for (const l of sorted) {
    const normalized = normalizeLanguage(l.lang);
    if (SUPPORTED_LANGUAGES.includes(normalized)) {
      return normalized;
    }
  }

  return DEFAULT_LANGUAGE;
}

// ===============================
// 🌍 PATH HELPERS
// ===============================
export function extractCountryFromPath(path: string): string | null {
  const first = path.split("/").filter(Boolean)[0]?.toLowerCase();
  return first && isValidCountryCode(first) ? first : null;
}

export function getPathWithoutCountry(path: string): string {
  const segments = path.split("/").filter(Boolean);

  if (segments.length && isValidCountryCode(segments[0])) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }

  return path;
}

export function buildUrl(path: string, country: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;

  if (!shouldUsePrefix(country)) return clean;

  return clean === "/" ? `/${country}` : `/${country}${clean}`;
}

// ===============================
// 🤖 BOT DETECTION
// ===============================
const BOT_PATTERNS = [
  "googlebot","bingbot","slurp","duckduckbot",
  "yandexbot","baiduspider","facebookexternalhit",
  "twitterbot","linkedinbot","crawler","spider","bot"
];

export function isBot(req: NextRequest): boolean {
  const ua = (req.headers.get("user-agent") || "").toLowerCase();
  return BOT_PATTERNS.some((b) => ua.includes(b));
}

// ===============================
// 🌍 GEO DETECTION
// ===============================
const GEO_HEADERS = [
  "x-vercel-ip-country",
  "cf-ipcountry",
  "x-country",
];

export function detectCountry(req: NextRequest): string {
  if (isBot(req)) return DEFAULT_COUNTRY;

  for (const h of GEO_HEADERS) {
    const val = req.headers.get(h);
    if (val && isValidCountryCode(val)) {
      return val.toLowerCase();
    }
  }

  return DEFAULT_COUNTRY;
}

// ===============================
// 🧠 RESOLVE COUNTRY
// ===============================
export function resolveCountry(
  req: NextRequest,
  urlCountry: string | null
): string {
  const query = req.nextUrl.searchParams.get("country");

  const forced = req.cookies.get(COOKIE_KEYS.FORCED_COUNTRY)?.value;
  if (forced && isValidCountryCode(forced)) return forced;

  if (query && isValidCountryCode(query)) return query;

  if (urlCountry && isValidCountryCode(urlCountry)) return urlCountry;

  const cookie = req.cookies.get(COOKIE_KEYS.COUNTRY)?.value;
  if (cookie && isValidCountryCode(cookie)) return cookie;

  return detectCountry(req);
}

// ===============================
// 🌐 FINAL LANGUAGE
// ===============================
export function getLanguage(
  req: NextRequest,
  country: string
): SupportedLanguage {
  const cookie = req.cookies.get(COOKIE_KEYS.LANGUAGE)?.value;
  if (cookie) return normalizeLanguage(cookie);

  const header = req.headers.get("accept-language");
  if (header) return parseAcceptLanguage(header);

  return getLanguageForCountry(country);
}

// ===============================
// 📦 GEO OBJECT
// ===============================
export interface GeoInfo {
  country: string;
  language: SupportedLanguage;
  cleanPath: string;
  shouldUsePrefix: boolean;
  isBot: boolean;
  isSupportedCountry: boolean;
}

export function getGeoInfo(req: NextRequest): GeoInfo {
  const { pathname } = req.nextUrl;

  const urlCountry = extractCountryFromPath(pathname);
  const country = resolveCountry(req, urlCountry);
  const language = getLanguage(req, country);

  return {
    country,
    language,
    cleanPath: getPathWithoutCountry(pathname),
    shouldUsePrefix: shouldUsePrefix(country),
    isBot: isBot(req),
    isSupportedCountry: isSupportedCountry(country),
  };
}
