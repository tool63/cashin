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

// ===============================
// 🧠 HELPERS (ENTERPRISE SAFE)
// ===============================
function normalizePath(path: string): string {
  if (!path) return "/";

  let clean = path;

  if (!clean.startsWith("/")) clean = `/${clean}`;

  clean = clean.split("?")[0].split("#")[0];
  clean = clean.replace(/\/+/g, "/");

  if (clean.length > 1 && clean.endsWith("/")) {
    clean = clean.slice(0, -1);
  }

  return clean;
}

function normalizeCountry(country?: string): string | undefined {
  if (!country) return undefined;

  const c = country.toLowerCase().trim();

  if (/^[a-z]{2}$/.test(c)) return c;

  return undefined;
}

// ===============================
// 🚀 MAIN CONFIG
// ===============================
export const SEO_CONFIG: SEOConfigType = {
  siteName: "Cashog",
  baseUrl: "https://cashog.com",
  defaultCountry: "us",

  // ===============================
  // 🌍 7-TIER SYSTEM
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
  // 📊 BASE PRIORITY
  // ===============================
  priority: {
    money: 1.0,
    earn: 0.95,
    shopping: 0.9,
    content: 0.85,
    low: 0.75,
  },

  // ===============================
  // 🔗 URL BUILDER (GLOBAL + COUNTRY)
  // ===============================
  buildUrl({ path, country }) {
    const cleanPath = normalizePath(path);
    const cleanCountry = normalizeCountry(country);

    // 🌐 GLOBAL
    if (!cleanCountry) {
      return `${this.baseUrl}${cleanPath}`;
    }

    // 🌎 COUNTRY (INCLUDING US)
    return `${this.baseUrl}/${cleanCountry}${cleanPath}`;
  },

  // ===============================
  // 📄 PAGE TYPE DETECTION
  // ===============================
  getPageType(path) {
    const clean = normalizePath(path);

    if (this.moneyPages.includes(clean)) return "money";
    if (this.earnPages.includes(clean)) return "earn";

    if (
      clean.includes("shop") ||
      clean.includes("store") ||
      clean.includes("cashback")
    ) return "shopping";

    if (
      clean.includes("blog") ||
      clean.includes("guide") ||
      clean.includes("compare")
    ) return "content";

    return "low";
  },

  // ===============================
  // 🚀 PRIORITY ENGINE
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
  // 🔄 CHANGE FREQUENCY
  // ===============================
  getChangeFrequency(country) {
    if (!country) return "daily";

    const tier = this.getTier(country);

    if (tier === 1) return "daily";
    if (tier <= 3) return "weekly";

    return "monthly";
  },

  // ===============================
  // 🌍 HREFLANG (UNIFIED SOURCE)
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
      bd: "en-BD",
      pk: "en-PK",

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
// 🚀 ELITE ENTERPRISE ALIASES
// ===============================
export const buildUrl = (args: Parameters<typeof SEO_CONFIG.buildUrl>[0]) =>
  SEO_CONFIG.buildUrl(args);

export const getPageType = (path: string) =>
  SEO_CONFIG.getPageType(path);

export const getPriority = (path: string, country?: string) =>
  SEO_CONFIG.getPriority(path, country);

export const getChangeFrequency = (country?: string) =>
  SEO_CONFIG.getChangeFrequency(country);

export const getHreflang = (country?: string) =>
  SEO_CONFIG.getHreflang(country);
