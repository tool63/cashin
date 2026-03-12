// app/core/i18n/config.ts

export const supportedLanguages = ["en", "es", "fr", "de", "pt"] as const;

export type SupportedLang = (typeof supportedLanguages)[number];

export const defaultLanguage: SupportedLang = "en";

export const countryLangMap: Record<string, SupportedLang> = {
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
