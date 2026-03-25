export type SEOConfigType = {
  siteName: string;
  baseUrl: string;
  defaultCountry: string;

  // 🌍 Tier system
  getTier: (country?: string) => number;

  moneyPages: string[];
  earnPages: string[];

  priority: Record<string, number>;

  buildUrl: (args: {
    path: string;
    country?: string;
  }) => string;

  getPageType: (path: string) => string;
  getPriority: (path: string, country?: string) => number;
  getChangeFrequency: (country?: string) => "daily" | "weekly" | "monthly";

  getHreflang: (country?: string) => string;
};

export const SEO_CONFIG: SEOConfigType = {
  siteName: "Cashog",
  baseUrl: "https://cashog.com",
  defaultCountry: "us",

  // ===============================
  // 🌍 7-TIER SYSTEM (GLOBAL STANDARD)
  // ===============================
  getTier(country) {
    if (!country) return 1;

    const c = country.toLowerCase();

    if (["us","gb","ca","au"].includes(c)) return 1;
    if (["de","fr","nl","se","ch","no","dk"].includes(c)) return 2;
    if (["it","es","fi","ie","at","be"].includes(c)) return 3;
    if (["br","mx","pl","pt","tr","ro"].includes(c)) return 4;
    if (["in","id","ph","vn","th","eg"].includes(c)) return 5;
    if (["pk","bd","ng","ke","za"].includes(c)) return 6;

    return 7;
  },

  // ===============================
  // 💰 PAGE GROUPS
  // ===============================
  moneyPages: [
    "/earn",
    "/make-money",
    "/rewards",
    "/affiliate",
    "/partners",
    "/advertise",
  ],

  earnPages: [
    "/surveys","/app-installs","/play-games","/watch-videos",
    "/mining-rewards","/complete-offers","/cashback","/offerwall",
    "/surveywall","/watch-ads","/micro-tasks","/complete-free-trials",
    "/test-products","/read-emails","/visit-websites",
    "/review-tasks","/spinning-wheel","/loyalty","/vouchers",
  ],

  // ===============================
  // 📊 BASE PRIORITY (PAGE VALUE)
  // ===============================
  priority: {
    money: 1.0,
    earn: 0.95,
    shopping: 0.9,
    content: 0.85,
    low: 0.75,
  },

  // ===============================
  // 🔗 URL BUILDER
  // ===============================
  buildUrl({ path, country }) {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;

    if (!country || country === this.defaultCountry) {
      return `${this.baseUrl}${cleanPath}`;
    }

    return `${this.baseUrl}/${country}${cleanPath}`;
  },

  // ===============================
  // 📄 PAGE TYPE DETECTION
  // ===============================
  getPageType(path) {
    if (this.moneyPages.includes(path)) return "money";
    if (this.earnPages.includes(path)) return "earn";

    if (
      path.includes("shop") ||
      path.includes("store") ||
      path.includes("cashback")
    ) return "shopping";

    if (
      path.includes("blog") ||
      path.includes("guide") ||
      path.includes("compare")
    ) return "content";

    return "low";
  },

  // ===============================
  // 🚀 TIER-BASED PRIORITY ENGINE
  // ===============================
  getPriority(path, country) {
    const type = this.getPageType(path);
    const base = this.priority[type] ?? 0.75;

    const tier = this.getTier(country);

    const tierBoost: Record<number, number> = {
      1: 0.05,
      2: 0.04,
      3: 0.03,
      4: 0.02,
      5: 0.01,
      6: 0,
      7: -0.02,
    };

    const boost = tierBoost[tier] ?? 0;

    return Math.max(0.3, Math.min(1, base + boost));
  },

  // ===============================
  // 🔄 CHANGE FREQUENCY (TIER BASED)
  // ===============================
  getChangeFrequency(country) {
    if (!country) return "daily";

    const tier = this.getTier(country);

    if (tier === 1) return "daily";
    if (tier <= 3) return "weekly";

    return "monthly";
  },

  // ===============================
  // 🌍 HREFLANG
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
      mx: "es-MX",

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

    return map[country] || "en-US";
  },
};

// ===============================
// 🚀 ENTERPRISE ALIASES
// ===============================
export const buildUrl = SEO_CONFIG.buildUrl;
export const getPageType = SEO_CONFIG.getPageType;
export const getPriority = SEO_CONFIG.getPriority;
export const getChangeFrequency = SEO_CONFIG.getChangeFrequency;
export const getHreflang = SEO_CONFIG.getHreflang;
