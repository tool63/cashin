export const DEFAULT_COUNTRY = "us";
export const DEFAULT_LANGUAGE = "en";

export const SUPPORTED_LANGUAGES = ["en", "fr", "de", "es", "pt"] as const;

export const COUNTRY_CODES = [
  "us","gb","ca","au","de","fr","in","bd","pk","ng","mx","br",
  "es","pt","it","nl","ar","co","cl","pe","za","jp","kr","cn",
  "ru","ua","tr","sa","ae","eg","ke","th","vn","ph"
] as const;

export const SUPPORTED_COUNTRIES = new Set(COUNTRY_CODES);

export const COOKIE_KEYS = {
  COUNTRY: "USER_COUNTRY",
  LANGUAGE: "NEXT_LOCALE",
  FORCED_COUNTRY: "FORCED_COUNTRY",
} as const;
