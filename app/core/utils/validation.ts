import { COUNTRY_CODES, SUPPORTED_COUNTRIES } from "../constants";
import type { CountryCode } from "../types";

export function isValidCountryCode(code: string): code is CountryCode {
  return (COUNTRY_CODES as readonly string[]).includes(code.toLowerCase());
}

export function isSupportedCountry(country: string): boolean {
  return SUPPORTED_COUNTRIES.has(country.toLowerCase() as CountryCode);
}
