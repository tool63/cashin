// app/core/i18n/config.ts

// ===============================
// 🌐 Supported Languages & Defaults
// ===============================
export const SUPPORTED_LANGUAGES = ["en", "fr", "de"] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

export const DEFAULT_LANGUAGE: SupportedLanguage = "en";

// ===============================
// 🔤 RTL Languages (for future support)
// ===============================
export const RTL_LANGUAGES: string[] = []; // Add "ar", "he", "ur", "fa" when supported

export function isRtlLanguage(lang: SupportedLanguage): boolean {
  return RTL_LANGUAGES.includes(lang);
}

// ===============================
// 🌍 Country → Language Map (Global)
// ===============================
export const COUNTRY_LANGUAGE_MAP: Record<string, SupportedLanguage> = {
  // English-speaking countries
  us: "en", gb: "en", ca: "en", au: "en", nz: "en", ie: "en",
  in: "en", ph: "en", pk: "en", bd: "en", lk: "en", my: "en",
  sg: "en", za: "en", ng: "en", ke: "en", gh: "en", ug: "en",
  tz: "en", zw: "en", jm: "en", tt: "en", bb: "en", gy: "en",
  mt: "en", bs: "en", bz: "en", bw: "en", fk: "en", fm: "en",
  gm: "en", gd: "en", gu: "en", il: "en", kh: "en", ki: "en",
  lr: "en", ls: "en", mh: "en", mm: "en", mn: "en", mw: "en",
  na: "en", nr: "en", pw: "en", pg: "en", sb: "en", sc: "en",
  sl: "en", ss: "en", sx: "en", sz: "en", to: "en", tv: "en",
  vc: "en", vg: "en", vi: "en", vu: "en", ws: "en",

  // French-speaking countries
  fr: "fr", be: "fr", ch: "fr", lu: "fr", mc: "fr",
  ci: "fr", cm: "fr", sn: "fr", ml: "fr", ma: "fr",
  dz: "fr", tn: "fr", ht: "fr", bf: "fr", bj: "fr",
  ne: "fr", tg: "fr", ga: "fr", cd: "fr", rw: "fr",
  bi: "fr", dj: "fr", gq: "fr", km: "fr", mg: "fr",
  mu: "fr", sc: "fr", td: "fr", cf: "fr", cg: "fr",

  // German-speaking countries
  de: "de", at: "de", li: "de", be: "de", lu: "de",
};

// ===============================
// 🇨🇭 Switzerland Special Handling
// ===============================
export const SWISS_CANTONS = {
  german: ["ZH","BE","LU","UR","SZ","OW","NW","GL","ZG","SO","BS","BL","SH","AR","AI","SG","AG","TG"],
  french: ["GE","VD","NE","JU"],
  bilingual: ["FR","VS","GR"],
  italian: ["TI"],
};

export function getSwissLanguage(canton?: string): SupportedLanguage {
  if (!canton) return "de"; // Default German
  const upper = canton.toUpperCase();
  if (SWISS_CANTONS.french.includes(upper)) return "fr";
  if (SWISS_CANTONS.bilingual.includes(upper)) return "fr"; // Prefer French
  if (SWISS_CANTONS.italian.includes(upper)) return "de"; // Italian not supported yet
  return "de"; // Default German
}

// ===============================
// 🌍 Public Routes
// ===============================
export const PUBLIC_ROUTES = [
  "about","contact","blog","faq","terms","privacy",
  "promo-codes","daily-deals","sitemap","robots.txt",
  "api","_next","favicon.ico",
];

// ===============================
// 🍪 Cookie Configuration
// ===============================
export const COOKIE_CONFIG = {
  LANGUAGE: "NEXT_LOCALE",
  COUNTRY: "USER_COUNTRY",
  AB_GROUP: "AB_GROUP",
  REWARD_CAMPAIGN: "REWARD_CAMPAIGN_ACTIVE",
} as const;

export const COOKIE_OPTIONS = {
  LANGUAGE: { path: "/", maxAge: 60*60*24*365, httpOnly: false },
  COUNTRY: { path: "/", maxAge: 60*60*24*30, httpOnly: false },
  AB_GROUP: { path: "/", maxAge: 60*60*24*90, httpOnly: false },
  REWARD_CAMPAIGN: { path: "/", maxAge: 60*60*24*7, httpOnly: false },
} as const;

// ===============================
// 💰 Currency & Formatting
// ===============================
export const CURRENCY_BY_LANGUAGE: Record<SupportedLanguage, string> = {
  en: "USD", fr: "EUR", de: "EUR",
};

export const CURRENCY_SYMBOL: Record<SupportedLanguage, string> = {
  en: "$", fr: "€", de: "€",
};

export const DATE_FORMAT_BY_LANGUAGE: Record<SupportedLanguage, Intl.DateTimeFormatOptions> = {
  en: { year:"numeric", month:"long", day:"numeric", weekday:"long" },
  fr: { year:"numeric", month:"long", day:"numeric", weekday:"long" },
  de: { year:"numeric", month:"long", day:"numeric", weekday:"long" },
};

export const TIME_FORMAT_BY_LANGUAGE: Record<SupportedLanguage, Intl.DateTimeFormatOptions> = {
  en: { hour:"numeric", minute:"numeric", hour12:true },
  fr: { hour:"numeric", minute:"numeric", hour12:false },
  de: { hour:"numeric", minute:"numeric", hour12:false },
};

// ===============================
// 🌍 Country Metadata
// ===============================
export const COUNTRY_METADATA: Record<string, {name:string, phoneCode:string, timezone:string[], currency:string}> = {
  us: { name:"United States", phoneCode:"+1", timezone:["America/New_York","America/Chicago","America/Denver","America/Los_Angeles"], currency:"USD" },
  gb: { name:"United Kingdom", phoneCode:"+44", timezone:["Europe/London"], currency:"GBP" },
  fr: { name:"France", phoneCode:"+33", timezone:["Europe/Paris"], currency:"EUR" },
  de: { name:"Germany", phoneCode:"+49", timezone:["Europe/Berlin"], currency:"EUR" },
  // Add more as needed for global SEO
};

// ===============================
// 🌐 Helper Functions
// ===============================
export function normalizeLanguageCode(lang: string): string {
  return lang.toLowerCase().split("-")[0];
}

export function isLanguageSupported(lang: string): boolean {
  return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
}

export function getLanguageForCountry(countryCode: string, canton?: string): SupportedLanguage {
  const code = countryCode.toLowerCase();
  if (code === "ch") return getSwissLanguage(canton);
  return COUNTRY_LANGUAGE_MAP[code] || DEFAULT_LANGUAGE;
}

export function detectLanguage(cookieLang: string|null, acceptLangHeader: string|null, country: string, canton?: string): SupportedLanguage {
  if (cookieLang) {
    const norm = normalizeLanguageCode(cookieLang);
    if (isLanguageSupported(norm)) return norm as SupportedLanguage;
  }
  if (acceptLangHeader) {
    const langs = acceptLangHeader.split(",").map(l=>l.split(";")[0].trim()).map(normalizeLanguageCode);
    for (const lang of langs) if (isLanguageSupported(lang)) return lang as SupportedLanguage;
  }
  return getLanguageForCountry(country, canton);
}

export function getSupportedLocales(): string[] {
  return SUPPORTED_LANGUAGES.map(lang => `${lang}-${lang.toUpperCase()}`);
}

export function getCountriesByLanguage(language: SupportedLanguage): string[] {
  return Object.entries(COUNTRY_LANGUAGE_MAP)
    .filter(([_, lang])=>lang===language)
    .map(([country])=>country.toUpperCase())
    .sort();
}

// ===============================
// 💰 Formatting Helpers
// ===============================
export function formatCurrency(amount: number, language: SupportedLanguage = DEFAULT_LANGUAGE): string {
  const currency = CURRENCY_BY_LANGUAGE[language];
  return new Intl.NumberFormat(language, { style:"currency", currency, minimumFractionDigits:2, maximumFractionDigits:2 }).format(amount);
}

export function formatDate(date: Date|number, language: SupportedLanguage = DEFAULT_LANGUAGE): string {
  return new Intl.DateTimeFormat(language, DATE_FORMAT_BY_LANGUAGE[language]).format(date);
}

export function formatTime(date: Date|number, language: SupportedLanguage = DEFAULT_LANGUAGE): string {
  return new Intl.DateTimeFormat(language, TIME_FORMAT_BY_LANGUAGE[language]).format(date);
}

export function formatNumber(number: number, language: SupportedLanguage = DEFAULT_LANGUAGE, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat(language, options).format(number);
}

// ===============================
// ✅ Validation
// ===============================
export function isValidCountryCode(code: string): boolean {
  return /^[a-z]{2}$/i.test(code);
}

export function isValidLanguageCode(code: string): boolean {
  return isLanguageSupported(normalizeLanguageCode(code));
}

// ===============================
// 📚 Translation Loading (Optional)
// ===============================
const translationCache: Partial<Record<string, Record<string,string>>> = {};

export async function loadTranslations(lang: SupportedLanguage, namespace: string="common"): Promise<Record<string,string>> {
  const key = `${lang}-${namespace}`;
  if (translationCache[key]) return translationCache[key]!;
  try {
    const translations = await import(`../../locales/${lang}/${namespace}.json`);
    translationCache[key] = translations.default;
    return translations.default;
  } catch (err) {
    console.warn(`Failed to load ${namespace} for ${lang}, falling back to ${DEFAULT_LANGUAGE}`);
    if (lang!==DEFAULT_LANGUAGE) return loadTranslations(DEFAULT_LANGUAGE, namespace);
    return {};
  }
}

// ===============================
// ⚙️ Environment Config
// ===============================
export const IS_DEVELOPMENT = process.env.NODE_ENV==="development";
export const IS_PRODUCTION = process.env.NODE_ENV==="production";
export const IS_TEST = process.env.NODE_ENV==="test";

export const SITE_URL = IS_PRODUCTION ? "https://cashog.com" : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const API_URL = IS_PRODUCTION ? "https://api.cashog.com" : "http://localhost:3001";
