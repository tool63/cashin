import { SUPPORTED_LANGUAGES, COUNTRY_CODES } from "./constants";

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];
export type CountryCode = (typeof COUNTRY_CODES)[number];
