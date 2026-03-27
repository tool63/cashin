// ===============================
// 🌍 DEFAULTS (GLOBAL-FIRST SYSTEM)
// ===============================
export const DEFAULT_COUNTRY = "/"; // ✅ No prefix for default users
export const DEFAULT_LANGUAGE = "en";

// ===============================
// 🌐 SUPPORTED LANGUAGES
// ===============================
export const SUPPORTED_LANGUAGES = ["en", "fr", "de", "es", "pt"] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

// ===============================
// 🌍 COUNTRY → LANGUAGE MAPPING
// (FIX: Prevent country-language mismatch)
// ===============================
export const COUNTRY_LANGUAGE_MAP: Record<string, SupportedLanguage> = {
  global: "en",

  // English regions
  us: "en",
  gb: "en",
  ca: "en",
  au: "en",
  in: "en",
  bd: "en",

  // European languages
  fr: "fr",
  de: "de",
  es: "es",
  pt: "pt",

  // Add more as needed
};

// ===============================
// 🍪 COOKIE KEYS
// ===============================
export const COOKIE_KEYS = {
  COUNTRY: "USER_COUNTRY",
  LANGUAGE: "NEXT_LOCALE",
  FORCED_COUNTRY: "FORCED_COUNTRY",
  USER_LANGUAGE_OVERRIDE: "USER_LANGUAGE_OVERRIDE",  // Added this line
} as const;
