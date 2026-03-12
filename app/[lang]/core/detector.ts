// app/[lang]/core/detector.ts

import { cookies, headers } from "next/headers";

import {
  supportedLanguages,
  defaultLanguage,
  countryLangMap,
  SupportedLang,
} from "@/app/core/i18n/config";

function normalizeLanguage(
  lang: string | undefined | null
): SupportedLang | null {
  if (!lang) return null;

  const code = lang.toLowerCase().split("-")[0];

  return supportedLanguages.includes(code as SupportedLang)
    ? (code as SupportedLang)
    : null;
}

export class LanguageDetector {
  private _detected: SupportedLang | null = null;

  detect(): SupportedLang {
    const cookieStore = cookies();

    /* Cookie */
    const cookieLang = normalizeLanguage(cookieStore.get("lang")?.value);

    if (cookieLang) {
      this._detected = cookieLang;
      return cookieLang;
    }

    /* Accept-Language */
    const acceptLang = headers().get("accept-language");

    if (acceptLang) {
      const langs = acceptLang.split(",").map((l) => l.split(";")[0]);

      for (const lang of langs) {
        const normalized = normalizeLanguage(lang);

        if (normalized) {
          this._detected = normalized;
          return normalized;
        }
      }
    }

    /* Geo Country */
    const country =
      headers().get("cf-ipcountry") ||
      headers().get("x-vercel-ip-country");

    if (country && countryLangMap[country]) {
      const geoLang = countryLangMap[country];

      this._detected = geoLang;

      return geoLang;
    }

    this._detected = defaultLanguage;

    return defaultLanguage;
  }

  get detected(): SupportedLang {
    if (!this._detected) {
      return this.detect();
    }

    return this._detected;
  }
}

export function detectLanguage(): SupportedLang {
  return new LanguageDetector().detect();
}
