import { SUPPORTED_LANGUAGES } from "./constants";

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

// 🌍 Fully dynamic country
export type CountryCode = string;
