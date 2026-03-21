// ===============================
// 🌍 DEFAULTS (GLOBAL-FIRST SYSTEM)
// ===============================
export const DEFAULT_COUNTRY = "global"; // ✅ No prefix for default users
export const DEFAULT_LANGUAGE = "en";

// ===============================
// 🌐 SUPPORTED LANGUAGES
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
