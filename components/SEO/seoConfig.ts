import { getCountry, CountryCode } from "./countries";

// =======================================
// 🌐 SEO CONFIG TYPE
// =======================================
export type SEOConfigType = {
  siteName: string;
  baseUrl: string;
  defaultCountry: string;

  getTier: (country?: string) => number;

  moneyPages: readonly string[];
  earnPages: readonly string[];

  priority: {
    money: number;
    earn: number;
    shopping: number;
    content: number;
    low: number;
  };

  buildUrl: (args: { path: string; country?: string }) => string;

  getPageType: (path: string) => string;
  getPriority: (path: string, country?: string) => number;
  getChangeFrequency: (country?: string) => "daily" | "weekly" | "monthly";
  getHreflang: (country?: string) => string;
};

// =======================================
// 🚀 SEO CONFIG
// =======================================
export const SEO_CONFIG: SEOConfigType = {
  siteName: "Cashog",
  baseUrl: "https://cashog.com",
  defaultCountry: "us",

  // ===================================
  // 🌍 TIER (FROM countries.ts)
  // ===================================
  getTier(country) {
    const c = country?.toLowerCase() as CountryCode;
    const meta = getCountry(c);

    if (meta.tier === "tier1") return 1;
    if (meta.tier === "tier2") return 2;
    return 3;
  },

  // ===================================
  // 💰 PAGE GROUPS
  // ===================================
  moneyPages: [
    "/earn",
    "/make-money",
    "/rewards",
    "/affiliate",
    "/partners",
    "/advertise"
  ],

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
    "/vouchers"
  ],

  // ===================================
  // 📊 PRIORITY
  // ===================================
  priority: {
    money: 1.0,
    earn: 0.95,
    shopping: 0.9,
    content: 0.85,
    low: 0.75
  },

  // ===================================
  // 🔗 URL BUILDER
  // ===================================
  buildUrl({ path, country }) {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    const c = country?.toLowerCase();

    if (c && c !== "global") {
      return `${this.baseUrl}/${c}${cleanPath}`;
    }

    return `${this.baseUrl}${cleanPath}`;
  },

  // ===================================
  // 📄 PAGE TYPE
  // ===================================
  getPageType(path) {
    const clean = path.toLowerCase();

    if (this.moneyPages.some(p => clean.startsWith(p))) return "money";
    if (this.earnPages.some(p => clean.startsWith(p))) return "earn";

    if (["shop","store","product","deal","cashback"].some(w => clean.includes(w)))
      return "shopping";

    if (["blog","guide","compare","learn"].some(w => clean.includes(w)))
      return "content";

    return "low";
  },

  // ===================================
  // 🚀 PRIORITY ENGINE
  // ===================================
  getPriority(path, country) {
    const type = this.getPageType(path);
    const base = this.priority[type];

    const tier = this.getTier(country);

    const tierBoost: Record<number, number> = {
      1: 0.05,
      2: 0.04,
      3: 0.03
    };

    return Math.max(0.3, Math.min(1, base + (tierBoost[tier] ?? 0)));
  },

  // ===================================
  // 🔄 CHANGE FREQUENCY
  // ===================================
  getChangeFrequency(country) {
    const tier = this.getTier(country);

    if (tier === 1) return "daily";
    if (tier === 2) return "weekly";
    return "monthly";
  },

  // ===================================
  // 🌐 HREFLANG
  // ===================================
  getHreflang(country) {
    const c = country?.toLowerCase();

    if (!c) return "x-default";

    const map: Record<string, string> = {
      us:"en-US", gb:"en-GB", ca:"en-CA", au:"en-AU",
      de:"de-DE", fr:"fr-FR", es:"es-ES", it:"it-IT",
      nl:"nl-NL", se:"sv-SE", ch:"de-CH",
      br:"pt-BR", mx:"es-MX",
      in:"en-IN", bd:"en-BD", pk:"en-PK",
      ng:"en-NG", za:"en-ZA", ke:"en-KE", eg:"ar-EG",
      id:"id-ID", ph:"en-PH", sg:"en-SG",
      cn:"zh-CN", tw:"zh-TW", jp:"ja-JP", kr:"ko-KR"
    };

    return map[c] || `en-${c.toUpperCase()}`;
  }
};

// =======================================
// 🚀 HELPERS
// =======================================
export const buildUrl = SEO_CONFIG.buildUrl;
export const getPageType = SEO_CONFIG.getPageType;
export const getPriority = SEO_CONFIG.getPriority;
export const getChangeFrequency = SEO_CONFIG.getChangeFrequency;
export const getHreflang = SEO_CONFIG.getHreflang;
