export const SEO_CONFIG = {
  // ===============================
  // 🌍 CORE DOMAIN (NO COUNTRY PREFIX)
  // ===============================
  baseUrl: "https://cashog.com",

  // This is your DEFAULT COUNTRY (NO PREFIX)
  defaultCountry: "us",

  defaultLanguage: "en",

  // ===============================
  // 🌐 SUPPORTED LANGUAGES
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
  // 💸 EARNING PAGES
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
  // 🧠 PAGE TYPE PRIORITY
  // ===============================
  priority: {
    money: 1.0,
    earn: 0.98,
    shopping: 0.9,
    content: 0.85,
    low: 0.7,
  },

  // ===============================
  // 🔗 URL BUILDER (CRITICAL FIX)
  // ===============================
  buildUrl({
    path,
    country,
    language,
  }: {
    path: string;
    country?: string;
    language?: string;
  }) {
    const base = this.baseUrl;
    const clean = path.startsWith("/") ? path : `/${path}`;

    // ===============================
    // 🌐 LANGUAGE PAGES
    // ===============================
    if (language) {
      return `${base}/${language}${clean}`;
    }

    // ===============================
    // 🌍 COUNTRY PAGES
    // ===============================
    // DEFAULT COUNTRY → NO PREFIX
    if (country && country !== this.defaultCountry) {
      return `${base}/${country}${clean}`;
    }

    // DEFAULT SITE (example.com)
    return `${base}${clean}`;
  },

  // ===============================
  // 🧠 PAGE TYPE DETECTION
  // ===============================
  getPageType(path: string) {
    if (this.moneyPages.includes(path)) return "money";
    if (this.earnPages.includes(path)) return "earn";
    return "low";
  },

  // ===============================
  // ⚡ PRIORITY CALCULATOR
  // ===============================
  getPriority(path: string, country?: string) {
    const type = this.getPageType(path);

    if (country === this.defaultCountry) {
      return this.priority[type];
    }

    if (this.highValueCountries.includes(country || "")) {
      return Math.min(1, (this.priority[type] || 0.8) + 0.05);
    }

    return (this.priority[type] || 0.7);
  },

  // ===============================
  // 🔁 CHANGE FREQUENCY
  // ===============================
  getChangeFrequency(country?: string) {
    if (!country) return "daily";

    if (this.highValueCountries.includes(country)) return "daily";
    if (this.midValueCountries.includes(country)) return "weekly";

    return "monthly";
  },

  // ===============================
  // 🌐 HREFLANG MAP
  // ===============================
  getHreflang(country?: string) {
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
    };

    return map[country] || "en";
  },
};
