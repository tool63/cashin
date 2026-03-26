// =======================================
// 🌐 seoConfig.ts (ENTERPRISE + GLOBAL HREFLANG)
// =======================================

export type SEOConfigType = {
  siteName: string;
  baseUrl: string;
  defaultCountry: string;

  getTier: (country?: string) => number;

  moneyPages: string[];
  earnPages: string[];

  priority: Record<string, number>;

  buildUrl: (args: { path: string; country?: string }) => string;

  getPageType: (path: string) => string;
  getPriority: (path: string, country?: string) => number;
  getChangeFrequency: (country?: string) => "daily" | "weekly" | "monthly";

  getHreflang: (country?: string) => string;
};

// ===============================
// 🌍 GLOBAL COUNTRY LIST (200+)
// ===============================
export const ALL_COUNTRIES = [
  "af","al","dz","ad","ao","ag","ar","am","au","at","az",
  "bs","bh","bd","bb","by","be","bz","bj","bt","bo","ba","bw","br","bn","bg","bf","bi",
  "cv","kh","cm","ca","cf","td","cl","cn","co","km","cg","cd","cr","ci","hr","cu","cy","cz",
  "dk","dj","dm","do",
  "ec","eg","sv","gq","er","ee","sz","et",
  "fj","fi","fr",
  "ga","gm","ge","de","gh","gr","gd","gt","gn","gw","gy",
  "ht","hn","hu",
  "is","in","id","ir","iq","ie","il","it",
  "jm","jp","jo",
  "kz","ke","ki","kp","kr","kw","kg",
  "la","lv","lb","ls","lr","ly","li","lt","lu",
  "mg","mw","my","mv","ml","mt","mh","mr","mu","mx","fm","md","mc","mn","me","ma","mz","mm",
  "na","nr","np","nl","nz","ni","ne","ng","mk","no",
  "om",
  "pk","pw","pa","pg","py","pe","ph","pl","pt",
  "qa",
  "ro","ru","rw",
  "kn","lc","vc","ws","sm","st","sa","sn","rs","sc","sl","sg","sk","si","sb","so","za","ss","es","lk","sd","sr","se","ch","sy",
  "tw","tj","tz","th","tl","tg","to","tt","tn","tr","tm","tv",
  "ug","ua","ae","gb","us","uy","uz",
  "vu","va","ve","vn",
  "ye",
  "zm","zw"
];

// ===============================
// 🧠 HELPERS (NORMALIZE)
// ===============================
function normalizePath(path: string): string {
  if (!path) return "/";
  let clean = path.startsWith("/") ? path : `/${path}`;
  clean = clean.split("?")[0].split("#")[0];
  clean = clean.replace(/\/+/g, "/");
  if (clean.length > 1 && clean.endsWith("/")) clean = clean.slice(0, -1);
  return clean;
}

function normalizeCountry(country?: string): string | undefined {
  if (!country) return undefined;
  const c = country.toLowerCase().trim();
  return /^[a-z]{2}$/.test(c) ? c : undefined;
}

// ===============================
// 🧠 SAFE MATCH (PREFIX SUPPORT)
// ===============================
function matchPath(list: string[], path: string): boolean {
  return list.some((p) => path === p || path.startsWith(`${p}/`));
}

// ===============================
// 🚀 SEO CONFIG
// ===============================
export const SEO_CONFIG: SEOConfigType = {
  siteName: "Cashog",
  baseUrl: "https://cashog.com",
  defaultCountry: "us",

  // ===============================
  // 🌍 TIER SYSTEM
  // ===============================
  getTier(country) {
    const c = normalizeCountry(country);
    if (!c) return 1;

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
  moneyPages: ["/earn","/make-money","/rewards","/affiliate","/partners","/advertise"],
  earnPages: [
    "/surveys","/app-installs","/play-games","/watch-videos","/mining-rewards",
    "/complete-offers","/cashback","/offerwall","/surveywall","/watch-ads","/micro-tasks",
    "/complete-free-trials","/test-products","/read-emails","/visit-websites",
    "/review-tasks","/spinning-wheel","/loyalty","/vouchers"
  ],

  // ===============================
  // 📊 PRIORITY
  // ===============================
  priority: {
    money: 1.0,
    earn: 0.95,
    shopping: 0.9,
    content: 0.85,
    low: 0.75
  },

  // ===============================
  // 🔗 URL BUILDER
  // ===============================
  buildUrl({ path, country }) {
    const cleanPath = normalizePath(path);
    const cleanCountry = normalizeCountry(country);
    return cleanCountry && ALL_COUNTRIES.includes(cleanCountry)
      ? `${this.baseUrl}/${cleanCountry}${cleanPath}`
      : `${this.baseUrl}${cleanPath}`;
  },

  // ===============================
  // 📄 PAGE TYPE
  // ===============================
  getPageType(path) {
    const clean = normalizePath(path);
    if (matchPath(this.moneyPages, clean)) return "money";
    if (matchPath(this.earnPages, clean)) return "earn";
    if (["shop","store","product","deal","cashback"].some((w) => clean.includes(w))) return "shopping";
    if (["blog","guide","compare","learn"].some((w) => clean.includes(w))) return "content";
    return "low";
  },

  // ===============================
  // 🚀 PRIORITY ENGINE
  // ===============================
  getPriority(path, country) {
    const type = this.getPageType(path);
    const base = this.priority[type] ?? 0.75;
    const tier = this.getTier(country);
    const tierBoost: Record<number, number> = { 1:0.05, 2:0.04, 3:0.03, 4:0.02, 5:0.01, 6:0, 7:-0.02 };
    return Math.max(0.3, Math.min(1, base + (tierBoost[tier] ?? 0)));
  },

  // ===============================
  // 🔄 CHANGE FREQUENCY
  // ===============================
  getChangeFrequency(country) {
    const tier = this.getTier(country);
    if (tier === 1) return "daily";
    if (tier <= 3) return "weekly";
    return "monthly";
  },

  // ===============================
  // 🌐 HREFLANG
  // ===============================
  getHreflang(country) {
    const c = normalizeCountry(country);
    if (!c) return "x-default";

    const map: Record<string,string> = {
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

// ===============================
// 🚀 ALIASES
// ===============================
export const buildUrl = (args: Parameters<typeof SEO_CONFIG.buildUrl>[0]) => SEO_CONFIG.buildUrl(args);
export const getPageType = (path: string) => SEO_CONFIG.getPageType(path);
export const getPriority = (path: string, country?: string) => SEO_CONFIG.getPriority(path, country);
export const getChangeFrequency = (country?: string) => SEO_CONFIG.getChangeFrequency(country);
export const getHreflang = (country?: string) => SEO_CONFIG.getHreflang(country);
