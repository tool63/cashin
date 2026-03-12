// app/lang/core/detector.ts

import { cookies, headers } from "next/headers";

/**
 * Ultra-Premium Corporate Language Detector
 * ------------------------------------------------
 * Features:
 * - Detects user language via cookie, Accept-Language header, and Geo-IP fallback
 * - Normalizes language codes (e.g., en-US -> en)
 * - Type-safe supported languages
 * - Supports maxAge configuration for cookies
 * - Logging hook for analytics
 * - Easily extensible
 */

// --------------------- Supported Languages ---------------------
export const supportedLanguages = ["en", "es", "fr", "de", "pt"] as const;
export type SupportedLang = (typeof supportedLanguages)[number];
export const defaultLanguage: SupportedLang = "en";

// Optional: Map country codes to default languages
const countryLangMap: Record<string, SupportedLang> = {
  US: "en",
  GB: "en",
  CA: "en",
  AU: "en",
  ES: "es",
  MX: "es",
  BR: "pt",
  DE: "de",
  FR: "fr",
};

// --------------------- Utilities ---------------------
function normalizeLanguage(lang: string | undefined | null): SupportedLang | null {
  if (!lang) return null;
  const code = lang.toLowerCase().split("-")[0]; // en-US -> en
  return supportedLanguages.includes(code as SupportedLang) ? (code as SupportedLang) : null;
}

// --------------------- Detector Class ---------------------
export class LanguageDetector {
  private _detected: SupportedLang | null = null;

  constructor(private logDetection: ((lang: SupportedLang, source: string) => void) | null = null) {}

  /**
   * Detects the user's preferred language
   */
  detect(): SupportedLang {
    // 1️⃣ Cookie preference
    const cookieStore = cookies();
    const cookieLang = normalizeLanguage(cookieStore.get("lang")?.value);
    if (cookieLang) {
      this._log(cookieLang, "cookie");
      this._detected = cookieLang;
      return cookieLang;
    }

    // 2️⃣ Accept-Language header
    const acceptLangHeader = headers().get("accept-language");
    if (acceptLangHeader) {
      const langs = acceptLangHeader.split(",").map((l) => l.split(";")[0].trim());
      for (const lang of langs) {
        const normalized = normalizeLanguage(lang);
        if (normalized) {
          this._log(normalized, "accept-language");
          this._detected = normalized;
          return normalized;
        }
      }
    }

    // 3️⃣ Geo-IP / Country fallback (via headers from CDN/Proxy)
    const countryCode = headers().get("x-country-code");
    if (countryCode && countryLangMap[countryCode.toUpperCase()]) {
      const geoLang = countryLangMap[countryCode.toUpperCase()];
      this._log(geoLang, "geo-ip");
      this._detected = geoLang;
      return geoLang;
    }

    // 4️⃣ Fallback to default
    this._log(defaultLanguage, "default");
    this._detected = defaultLanguage;
    return defaultLanguage;
  }

  /**
   * Sets a language cookie for persistent preference
   */
  setCookie(lang: string | SupportedLang, maxAgeDays = 365) {
    const normalized = normalizeLanguage(lang);
    if (!normalized) return;
    cookies().set("lang", normalized, {
      path: "/",
      maxAge: 60 * 60 * 24 * maxAgeDays,
      httpOnly: false,
      sameSite: "lax",
    });
  }

  /**
   * Returns the last detected language
   */
  get detected(): SupportedLang {
    if (!this._detected) return this.detect();
    return this._detected;
  }

  /**
   * Internal logging helper
   */
  private _log(lang: SupportedLang, source: string) {
    if (this.logDetection) {
      this.logDetection(lang, source);
    } else {
      // Default console log for development
      console.log(`[LanguageDetector] Detected: ${lang} (source: ${source})`);
    }
  }
}

// --------------------- Simple Utility Functions ---------------------

/**
 * Quick function for one-off detection
 */
export function detectLanguage(): SupportedLang {
  return new LanguageDetector().detect();
}

/**
 * Quick function for setting language cookie
 */
export function setLanguageCookie(lang: string | SupportedLang, maxAgeDays?: number) {
  new LanguageDetector().setCookie(lang, maxAgeDays);
}
