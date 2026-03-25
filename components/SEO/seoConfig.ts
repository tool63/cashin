export type SEOConfigType = {
  siteName: string;
  baseUrl: string;
  defaultCountry: string;
  defaultLanguage: string;

  languages: string[];

  highValueCountries: string[];
  midValueCountries: string[];
  lowValueCountries: string[];

  moneyPages: string[];
  earnPages: string[];

  priority: Record<string, number>;

  buildUrl: (args: {
    path: string;
    country?: string;
    language?: string;
  }) => string;

  getPageType: (path: string) => string;
  getPriority: (path: string, country?: string) => number;
  getChangeFrequency: (country?: string) => "daily" | "weekly" | "monthly";
  getHreflang: (country?: string) => string;
};

// ===============================
// 🌍 SEO CONFIG (CORE)
// ===============================
export const SEO_CONFIG: SEOConfigType = {
  siteName: "Cashog",
  baseUrl: "https://cashog.com",

  defaultCountry: "us",
  defaultLanguage: "en",

  languages: [
    "en", "fr", "de", "es", "pt", "it", "nl", "sv", "ar", "hi",
  ],

  highValueCountries: ["us", "gb", "ca", "au"],
  midValueCountries: ["de", "fr", "es", "it", "nl", "se", "ch", "br", "in"],
  lowValueCountries: ["bd", "pk", "ng", "za", "ke", "eg", "id", "ph", "sg"],

  moneyPages: [
    "/earn", "/make-money", "/rewards", "/affiliate", "/partners", "/advertise",
  ],

  earnPages: [
    "/surveys", "/app-installs", "/play-games", "/watch-videos",
    "/mining-rewards", "/complete-offers", "/cashback", "/offerwall",
    "/surveywall", "/watch-ads", "/micro-tasks", "/complete-free-trials",
    "/test-products", "/read-emails", "/visit-websites",
    "/review-tasks", "/spinning-wheel", "/loyalty", "/vouchers",
  ],

  priority: {
    money: 1.0,
    earn: 0.98,
    shopping: 0.9,
    content: 0.85,
    low: 0.7,
  },

  // ===============================
  // 🔗 CORE URL BUILDER
  // ===============================
  buildUrl({ path, country, language }) {
    const base = this.baseUrl;
    const cleanPath = path.startsWith("/") ? path : `/${path}`;

    // LANGUAGE FIRST (STRICT SEO RULE)
    if (language) {
      return `${base}/${language}${cleanPath}`;
    }

    // COUNTRY (NON-DEFAULT ONLY)
    if (country && country !== this.defaultCountry) {
      return `${base}/${country}${cleanPath}`;
    }

    // DEFAULT → GLOBAL
    return `${base}${cleanPath}`;
  },

  // ===============================
  // 🧠 PAGE TYPE DETECTION
  // ===============================
  getPageType(path) {
    if (this.moneyPages.includes(path)) return "money";
    if (this.earnPages.includes(path)) return "earn";
    return "low";
  },

  // ===============================
  // ⚡ PRIORITY ENGINE
  // ===============================
  getPriority(path, country) {
    const type = this.getPageType(path);
    let base = this.priority[type] ?? 0.7;

    if (!country) return base;

    if (country === this.defaultCountry) return base;

    if (this.highValueCountries.includes(country)) {
      return Math.min(1, base + 0.05);
    }

    if (this.midValueCountries.includes(country)) {
      return Math.min(1, base + 0.02);
    }

    return base;
  },

  // ===============================
  // 🔁 CHANGE FREQUENCY
  // ===============================
  getChangeFrequency(country) {
    if (!country) return "daily";

    if (this.highValueCountries.includes(country)) return "daily";
    if (this.midValueCountries.includes(country)) return "weekly";

    return "monthly";
  },

  // ===============================
  // 🌐 HREFLANG
  // ===============================
  getHreflang(country) {
    if (!country) return "x-default";

    const map: Record<string, string> = {
      us: "en-US",
      gb: "en-GB",
      ca: "en-CA",
      au: "en-AU",
      de: "de-DE",
      fr: "fr-FR",
      es: "es-ES",
      it: "it-IT",
      nl: "nl-NL",
      se: "sv-SE",
      ch: "de-CH",
      br: "pt-BR",
      in: "en-IN",
      bd: "bn-BD",
      pk: "ur-PK",
      ng: "en-NG",
      za: "en-ZA",
      ke: "en-KE",
      eg: "ar-EG",
      id: "id-ID",
      ph: "en-PH",
      sg: "en-SG",
    };

    return map[country] || "en";
  },
};



// ======================================================
// 🚀 ELITE+ ALIAS LAYER (PUBLIC API - STABLE)
// ======================================================

// Alias for URL builder (SAFE)
export const buildUrl = SEO_CONFIG.buildUrl;
export const getBuildUrl = SEO_CONFIG.buildUrl;

// Alias for page type
export const getPageType = SEO_CONFIG.getPageType;
export const detectPageType = SEO_CONFIG.getPageType;

// Alias for priority
export const getPriority = SEO_CONFIG.getPriority;
export const calculatePriority = SEO_CONFIG.getPriority;

// Alias for change frequency
export const getChangeFrequency = SEO_CONFIG.getChangeFrequency;
export const getFrequency = SEO_CONFIG.getChangeFrequency;

// Alias for hreflang
export const getHreflang = SEO_CONFIG.getHreflang;
export const resolveHreflang = SEO_CONFIG.getHreflang;
