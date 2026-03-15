// app/[country]/core/detector.ts
import { cookies, headers } from "next/headers";
import {
  supportedLanguages,
  defaultLanguage,
  countryLangMap,
  type SupportedLang,
} from "@/app/core/i18n/config";

/**
 * Normalize language codes
 * Converts "en-US" → "en", "FR-fr" → "fr"
 */
function normalizeLanguage(lang?: string | null): SupportedLang | null {
  if (!lang) return null;
  const code = lang.toLowerCase().split("-")[0];
  return supportedLanguages.includes(code as SupportedLang)
    ? (code as SupportedLang)
    : null;
}

/**
 * Corporate-grade LanguageDetector
 * Detects user language from cookie, headers, or geo-location
 */
export class LanguageDetector {
  private _detected: SupportedLang | null = null;

  /**
   * Main detection method
   */
  detect(): SupportedLang {
    if (this._detected) return this._detected;

    // ------------------------------
    // 1️⃣ Check Cookie
    // ------------------------------
    const cookieStore = cookies();
    const cookieLang = normalizeLanguage(cookieStore.get("lang")?.value);
    if (cookieLang) {
      this._detected = cookieLang;
      return cookieLang;
    }

    // ------------------------------
    // 2️⃣ Check Accept-Language header
    // ------------------------------
    const acceptLangHeader = headers().get("accept-language");
    if (acceptLangHeader) {
      const langs = acceptLangHeader.split(",").map((l) => l.split(";")[0].trim());
      for (const lang of langs) {
        const normalized = normalizeLanguage(lang);
        if (normalized) {
          this._detected = normalized;
          return normalized;
        }
      }
    }

    // ------------------------------
    // 3️⃣ Check Geo-location headers
    // ------------------------------
    const geoCountry =
      headers().get("cf-ipcountry") ||
      headers().get("x-vercel-ip-country") ||
      headers().get("cloudfront-viewer-country");

    if (geoCountry) {
      const countryCode = geoCountry.toUpperCase();
      const geoLang = countryLangMap[countryCode];
      if (geoLang) {
        this._detected = geoLang;
        return geoLang;
      }
    }

    // ------------------------------
    // 4️⃣ Default language fallback
    // ------------------------------
    this._detected = defaultLanguage;
    return defaultLanguage;
  }

  /**
   * Getter for detected language
   */
  get detected(): SupportedLang {
    if (!this._detected) {
      return this.detect();
    }
    return this._detected;
  }
}

/**
 * Helper function for one-line detection
 */
export function detectLanguage(): SupportedLang {
  return new LanguageDetector().detect();
}
