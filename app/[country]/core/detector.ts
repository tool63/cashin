import { cookies, headers } from "next/headers";
import { supportedLanguages, defaultLanguage, countryLangMap, type SupportedLang } from "@/app/core/i18n/config";

function normalizeLanguage(lang?: string | null): SupportedLang | null {
  if (!lang) return null;
  const code = lang.toLowerCase().split("-")[0];
  return supportedLanguages.includes(code as SupportedLang) ? (code as SupportedLang) : null;
}

export class LanguageDetector {
  private _detected: SupportedLang | null = null;

  detect(): SupportedLang {
    if (this._detected) return this._detected;

    // 1️⃣ Cookie
    const cookieLang = normalizeLanguage(cookies().get("lang")?.value);
    if (cookieLang) return (this._detected = cookieLang);

    // 2️⃣ Accept-Language
    const acceptLangHeader = headers().get("accept-language");
    if (acceptLangHeader) {
      const langs = acceptLangHeader.split(",").map((l) => l.split(";")[0].trim());
      for (const lang of langs) {
        const normalized = normalizeLanguage(lang);
        if (normalized) return (this._detected = normalized);
      }
    }

    // 3️⃣ Geo headers
    const geoCountry =
      headers().get("cf-ipcountry") ||
      headers().get("x-vercel-ip-country") ||
      headers().get("cloudfront-viewer-country");

    if (geoCountry) {
      const geoLang = countryLangMap[geoCountry.toUpperCase()];
      if (geoLang) return (this._detected = geoLang);
    }

    // 4️⃣ Fallback
    return (this._detected = defaultLanguage);
  }

  get detected(): SupportedLang {
    if (!this._detected) return this.detect();
    return this._detected;
  }
}

export function detectLanguage(): SupportedLang {
  return new LanguageDetector().detect();
}
