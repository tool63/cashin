import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "../constants";
import type { SupportedLanguage } from "../types";

export function normalizeLanguage(lang: string): SupportedLanguage {
  const base = lang.toLowerCase().split("-")[0];

  if ((SUPPORTED_LANGUAGES as readonly string[]).includes(base)) {
    return base as SupportedLanguage;
  }

  return DEFAULT_LANGUAGE;
}
