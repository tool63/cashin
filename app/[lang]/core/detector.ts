import { cookies, headers } from "next/headers";

/* ---------------- Supported Languages ---------------- */

export const supportedLanguages = ["en", "es", "fr", "de", "pt"] as const;
export type SupportedLang = (typeof supportedLanguages)[number];

export const defaultLanguage: SupportedLang = "en";

/* ---------------- Country → Language Map ---------------- */

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

/* ---------------- Utilities ---------------- */

function normalizeLanguage(
  lang: string | undefined | null
): SupportedLang | null {
  if (!lang) return null;

  const code = lang.toLowerCase().split("-")[0];

  return supportedLanguages.includes(code as SupportedLang)
    ? (code as SupportedLang)
    : null;
}

/* ---------------- Detector ---------------- */

export class LanguageDetector {
  private _detected: SupportedLang | null = null;

  constructor(
    private logDetection: ((lang: SupportedLang, source: string) => void) | null =
      null
  ) {}

  detect(): SupportedLang {
    const cookieStore = cookies();

    /* 1️⃣ Cookie */
    const cookieLang = normalizeLanguage(cookieStore.get("lang")?.value);

    if (cookieLang) {
      this._log(cookieLang, "cookie");
      this._detected = cookieLang;
      return cookieLang;
    }

    /* 2️⃣ Accept Language */
    const acceptLangHeader = headers().get("accept-language");

    if (acceptLangHeader) {
      const langs = acceptLangHeader
        .split(",")
        .map((l) => l.split(";")[0].trim());

      for (const lang of langs) {
        const normalized = normalizeLanguage(lang);

        if (normalized) {
          this._log(normalized, "accept-language");
          this._detected = normalized;
          return normalized;
        }
      }
    }

    /* 3️⃣ CDN / Geo Headers */

    const countryCode =
      headers().get("cf-ipcountry") ||
      headers().get("x-vercel-ip-country") ||
      headers().get("cloudfront-viewer-country") ||
      headers().get("x-country-code");

    if (countryCode && countryLangMap[countryCode.toUpperCase()]) {
      const geoLang = countryLangMap[countryCode.toUpperCase()];
      this._log(geoLang, "geo-ip");
      this._detected = geoLang;
      return geoLang;
    }

    /* 4️⃣ Default */

    this._log(defaultLanguage, "default");

    this._detected = defaultLanguage;

    return defaultLanguage;
  }

  setCookie(lang: string | SupportedLang, maxAgeDays = 365) {
    const normalized = normalizeLanguage(lang);

    if (!normalized) return;

    cookies().set("lang", normalized, {
      path: "/",
      maxAge: 60 * 60 * 24 * maxAgeDays,
      sameSite: "lax",
      httpOnly: false,
    });
  }

  get detected(): SupportedLang {
    if (!this._detected) return this.detect();

    return this._detected;
  }

  private _log(lang: SupportedLang, source: string) {
    if (this.logDetection) {
      this.logDetection(lang, source);
    } else {
      console.log(`[LanguageDetector] ${lang} (${source})`);
    }
  }
}

/* ---------------- Helpers ---------------- */

export function detectLanguage(): SupportedLang {
  return new LanguageDetector().detect();
}

export function setLanguageCookie(
  lang: string | SupportedLang,
  maxAgeDays?: number
) {
  new LanguageDetector().setCookie(lang, maxAgeDays);
}
