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
// 🌍 SEO CONFIG (ENTERPRISE)
// ===============================
export const SEO_CONFIG: SEOConfigType = {
  // ===============================
  // 🏢 BRAND
  // ===============================
  siteName: "Cashog",

  // ===============================
  // 🌍 CORE DOMAIN
  // ===============================
  baseUrl: "https://cashog.com",

  defaultCountry: "us",
  defaultLanguage: "en",

  // ===============================
  // 🌐 LANGUAGES
  // ===============================
  languages: [
    "en",
    "fr",
    "de",
    "es",
    "pt",
    "it",
    "nl",
    "sv",
    "ar",
    "hi",
  ],

  // ===============================
  // 🌍 COUNTRY TIERS
  // ===============================
  highValueCountries: ["us", "gb", "ca", "au"],
  midValueCountries: ["de", "fr", "es", "it", "nl", "se", "ch", "br", "in"],
  lowValueCountries: ["bd", "pk", "ng", "za", "ke", "eg", "id", "ph", "sg"],

  // ===============================
  // 💰 MONEY PAGES
  // ===============================
  moneyPages: [
    "/earn",
    "/make-money",
    "/rewards",
    "/affiliate",
    "/partners",
    "/advertise",
  ],

  // ===============================
  // 💸 EARN PAGES (FULL LIST)
  // ===============================
  earnPages: [
    "/surveys",
    "/app-installs",
    "/play-games",
    "/watch-videos",
    "/mining-rewards",
    "/complete-offers",
    "/cashback",
    "/offerwall",
    "/surveywall",
    "/watch-ads",
    "/micro-tasks",
    "/complete-free-trials",
    "/test-products",
    "/read-emails",
    "/visit-websites",
    "/review-tasks",
    "/spinning-wheel",
    "/loyalty",
    "/vouchers",
  ],

  // ===============================
  // ⚡ PRIORITY SYSTEM
  // ===============================
  priority: {
    money: 1.0,
    earn: 0.98,
    shopping: 0.9,
    content: 0.85,
    low: 0.7,
  },

  // ===============================
  // 🔗 URL BUILDER (SEO PERFECT)
  // ===============================
  buildUrl({ path, country, language }) {
    const base = this.baseUrl;
    const cleanPath = path.startsWith("/") ? path : `/${path}`;

    // LANGUAGE FIRST (IMPORTANT FOR SEO)
    if (language) {
      return `${base}/${language}${cleanPath}`;
    }

    // COUNTRY LOGIC
    if (country && country !== this.defaultCountry) {
      return `${base}/${country}${cleanPath}`;
    }

    // DEFAULT (GLOBAL - NO PREFIX)
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
  // ⚡ PRIORITY CALCULATOR
  // ===============================
  getPriority(path, country) {
    const type = this.getPageType(path);

    let basePriority = this.priority[type] ?? 0.7;

    // BOOST FOR HIGH VALUE COUNTRIES
    if (country === this.defaultCountry) return basePriority;

    if (country && this.highValueCountries.includes(country)) {
      return Math.min(1, basePriority + 0.05);
    }

    if (country && this.midValueCountries.includes(country)) {
      return Math.min(1, basePriority + 0.02);
    }

    return basePriority;
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
  // 🌐 HREFLANG SYSTEM
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
