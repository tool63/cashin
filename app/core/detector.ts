// app/core/detector.ts
import { cookies, headers } from "next/headers";
import {
  countryLangMap,
  defaultLanguage,
  supportedLanguages,
  type SupportedLang,
} from "./i18n/config";

/**
 * Normalize language code
 * Accepts "en", "EN-US", "fr-FR", etc.
 */
function normalizeLanguage(lang?: string | null): SupportedLang | null {
  if (!lang) return null;
  const code = lang.toLowerCase().split("-")[0];
  return supportedLanguages.includes(code as SupportedLang) ? (code as SupportedLang) : null;
}

/**
 * Detect country from URL / headers / IP / CDN
 */
export function detectCountry(pathname?: string): string {
  const segments = pathname?.split("/").filter(Boolean) || [];
  const urlCountry = segments[0]?.toLowerCase();
  if (urlCountry && Object.keys(countryLangMap).map(k => k.toLowerCase()).includes(urlCountry)) {
    return urlCountry;
  }

  const geoCountry =
    headers().get("cf-ipcountry") ||
    headers().get("x-vercel-ip-country") ||
    headers().get("cloudfront-viewer-country");

  return geoCountry ? geoCountry.toLowerCase() : "us";
}

/**
 * Detect language for user
 * Priority:
 * 1. Cookie
 * 2. Accept-Language header
 * 3. Country → language map
 * 4. Default fallback
 */
export function detectLanguage(pathname?: string): SupportedLang {
  const cookieLang = normalizeLanguage(cookies().get("NEXT_LOCALE")?.value);
  if (cookieLang) return cookieLang;

  const acceptLangHeader = headers().get("accept-language");
  if (acceptLangHeader) {
    for (const lang of acceptLangHeader.split(",").map(l => l.split(";")[0].trim())) {
      const normalized = normalizeLanguage(lang);
      if (normalized) return normalized;
    }
  }

  const countryCode = detectCountry(pathname);
  const geoLang = countryLangMap[countryCode.toUpperCase()];
  if (geoLang && supportedLanguages.includes(geoLang.toLowerCase() as SupportedLang)) {
    return geoLang.toLowerCase() as SupportedLang;
  }

  return defaultLanguage;
}

/**
 * Detector utility class
 */
export class Detector {
  private _country: string | null = null;
  private _language: SupportedLang | null = null;
  private _pathname?: string;

  constructor(pathname?: string) {
    this._pathname = pathname;
  }

  get country(): string {
    if (!this._country) this._country = detectCountry(this._pathname);
    return this._country;
  }

  get language(): SupportedLang {
    if (!this._language) this._language = detectLanguage(this._pathname);
    return this._language;
  }
}

/**
 * Shortcut function
 */
export function detect(pathname?: string): { country: string; language: SupportedLang } {
  const detector = new Detector(pathname);
  return {
    country: detector.country,
    language: detector.language,
  };
}

/**
 * NEW: Detect both country and language in one call
 * For layout.tsx and metadata generation
 */
export function detectCountryAndLang(pathname?: string): { country: string; language: SupportedLang } {
  const detector = new Detector(pathname);
  return {
    country: detector.country,
    language: detector.language,
  };
}
