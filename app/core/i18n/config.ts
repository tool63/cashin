export const supportedLanguages = ["en", "es", "fr", "de", "pt"] as const;
export type SupportedLang = (typeof supportedLanguages)[number];
export const defaultLanguage: SupportedLang = "en";

// Country → Language Mapping (ISO 3166-1 alpha-2)
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

// Hreflang Mapping for URLs
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
