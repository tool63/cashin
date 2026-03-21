import { SUPPORTED_LANGUAGES } from "./constants";

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

// 🌍 Fully dynamic (no manual country list)
export type CountryCode = string;
