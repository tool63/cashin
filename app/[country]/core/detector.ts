// app/[country]/core/detector.ts
import { cookies, headers } from "next/headers";
import {
  countryLangMap,
  defaultLanguage,
  supportedLanguages,
  type SupportedLang,
} from "@/app/core/i18n/config";

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
  // 1️⃣ Check URL slug: example.com/[country]/...
  const segments = pathname?.split("/").filter(Boolean) || [];
  const urlCountry = segments[0]?.toLowerCase();
  if (urlCountry && Object.keys(countryLangMap).map(k => k.toLowerCase()).includes(urlCountry)) {
    return urlCountry;
  }

  // 2️⃣ Check geo headers
  const geoCountry =
    headers().get("cf-ipcountry") ||
    headers().get("x-vercel-ip-country") ||
    headers().get("cloudfront-viewer-country");

  if (geoCountry) return geoCountry.toLowerCase();

  // 3️⃣ Default fallback
  return "us";
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
  // 1️⃣ Cookie
  const cookieLang = normalizeLanguage(cookies().get("NEXT_LOCALE")?.value);
  if (cookieLang) return cookieLang;

  // 2️⃣ Accept-Language header
  const acceptLangHeader = headers().get("accept-language");
  if (acceptLangHeader) {
    const langs = acceptLangHeader
      .split(",")
      .map((l) => l.split(";")[0].trim());
    for (const lang of langs) {
      const normalized = normalizeLanguage(lang);
      if (normalized) return normalized;
    }
  }

  // 3️⃣ Geo country → language map
  const countryCode = detectCountry(pathname);
  const geoLang = countryLangMap[countryCode.toUpperCase()]; // countryLangMap uses uppercase keys
  if (geoLang && supportedLanguages.includes(geoLang.toLowerCase() as SupportedLang)) {
    return geoLang.toLowerCase() as SupportedLang;
  }

  // 4️⃣ Default fallback
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
