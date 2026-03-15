// app/core/i18n/config.ts

/**
 * ===============================
 * 🌐 Supported Languages
 * -------------------------------
 * Lowercase ISO 639-1 codes
 * ===============================
 */
export const supportedLanguages = ["en", "es", "fr", "de", "pt"] as const;

export type SupportedLang = (typeof supportedLanguages)[number];

/**
 * ===============================
 * 🌍 Default Language
 * ===============================
 */
export const defaultLanguage: SupportedLang = "en";

/**
 * ===============================
 * 🗺 Country → Language Mapping
 * -------------------------------
 * Uppercase ISO 3166-1 alpha-2 country codes
 * Maps each country to a primary language
 * ===============================
 */
export const countryLangMap: Record<string, SupportedLang> = {
  US: "en",
  GB: "en",
  CA: "en",
  AU: "en",
  IN: "en",
  FR: "fr",
  DE: "de",
  ES: "es",
  MX: "es",
  BR: "pt",
};

/**
 * ===============================
 * 🏷 Country → Hreflang Mapping
 * -------------------------------
 * Used for SEO <link rel="alternate" hreflang="">
 * Uppercase country codes → ISO language-region codes
 * ===============================
 */
export const countryHreflangMap: Record<string, string> = {
  US: "en-US",
  GB: "en-GB",
  CA: "en-CA",
  AU: "en-AU",
  IN: "en-IN",
  FR: "fr-FR",
  DE: "de-DE",
  ES: "es-ES",
  MX: "es-MX",
  BR: "pt-BR",
};

/**
 * ===============================
 * 📌 Utility: Validate Supported Language
 * -------------------------------
 * Ensures any string is a valid SupportedLang
 * ===============================
 */
export function isSupportedLanguage(lang?: string | null): lang is SupportedLang {
  if (!lang) return false;
  return supportedLanguages.includes(lang.toLowerCase() as SupportedLang);
}

/**
 * ===============================
 * 🔹 Utility: Normalize Language Code
 * -------------------------------
 * Converts "en-US" → "en", "FR-fr" → "fr"
 * Returns null if unsupported
 * ===============================
 */
export function normalizeLanguage(lang?: string | null): SupportedLang | null {
  if (!lang) return null;
  const code = lang.toLowerCase().split("-")[0];
  return isSupportedLanguage(code) ? (code as SupportedLang) : null;
}

/**
 * ===============================
 * 🔹 Utility: Get Hreflang by Country
 * -------------------------------
 * Returns ISO language-region code for SEO purposes
 * ===============================
 */
export function getHreflangByCountry(countryCode: string): string {
  const code = countryCode.toUpperCase();
  return countryHreflangMap[code] ?? `${defaultLanguage}-${defaultLanguage.toUpperCase()}`;
}
