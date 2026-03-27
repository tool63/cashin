import type { SupportedLanguage } from "./types";

// ===============================
// 🌍 COUNTRY TIERS
// ===============================
export type CountryTier = "tier1" | "tier2" | "tier3";

// ===============================
// 🌍 COUNTRY TYPE
// ===============================
export type CountryMeta = {
  code: string;
  name: string;
  tier: CountryTier;
  defaultLanguage: SupportedLanguage;
};

// ===============================
// 🌐 LANGUAGE FALLBACK MAP
// ===============================
const LANGUAGE_BY_COUNTRY: Partial<Record<string, SupportedLanguage>> = {
  fr: "fr",
  de: "de",
  es: "es",
  pt: "pt",
};

// ===============================
// 💰 TIER DEFINITIONS
// ===============================
const TIER1 = new Set([
  "us","gb","ca","au","de","fr","nl","se","ch","no","dk","fi","ie","be","at"
]);

const TIER2 = new Set([
  "es","it","pt","gr","pl","cz","hu","tr","ae","sa","kr","jp","sg","my","br","mx","za"
]);

// ===============================
// 🌍 ISO COUNTRY LIST (SYNC WITH VALIDATOR)
// ===============================
export const ISO_COUNTRIES = [
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
] as const;

export type CountryCode = typeof ISO_COUNTRIES[number] | "global";

// ===============================
// 🌍 COUNTRY NAME MAP (IMPORTANT FOR SEO)
// ===============================
const COUNTRY_NAMES: Partial<Record<CountryCode, string>> = {
  us: "United States",
  gb: "United Kingdom",
  bd: "Bangladesh",
  in: "India",
  de: "Germany",
  fr: "France",
  es: "Spain",
  pt: "Portugal",
  br: "Brazil",
  ca: "Canada",
  au: "Australia",
  pk: "Pakistan",
  ng: "Nigeria",
  id: "Indonesia",
  ph: "Philippines",
};

// ===============================
// 🧠 BUILD COUNTRY OBJECT
// ===============================
function buildCountry(code: string): CountryMeta {
  const tier: CountryTier =
    TIER1.has(code) ? "tier1" :
    TIER2.has(code) ? "tier2" :
    "tier3";

  return {
    code,
    name: COUNTRY_NAMES[code as CountryCode] || code.toUpperCase(),
    tier,
    defaultLanguage: LANGUAGE_BY_COUNTRY[code] || "en",
  };
}

// ===============================
// 🌍 FINAL COUNTRIES OBJECT
// ===============================
export const COUNTRIES: Record<CountryCode, CountryMeta> = {
  global: {
    code: "global",
    name: "Global",
    tier: "tier3",
    defaultLanguage: "en",
  },

  ...Object.fromEntries(
    ISO_COUNTRIES.map((code) => [code, buildCountry(code)])
  ) as Record<string, CountryMeta>,
} as Record<CountryCode, CountryMeta>;

// ===============================
// 🔧 NORMALIZER (VERY IMPORTANT)
// ===============================
export function normalizeCountryCode(code?: string | null): CountryCode {
  if (!code) return "global";
  const c = code.toLowerCase();
  return (c in COUNTRIES ? c : "global") as CountryCode;
}

// ===============================
// 🔍 HELPERS
// ===============================
export function getCountry(code?: string): CountryMeta {
  return COUNTRIES[normalizeCountryCode(code)];
}

export function getCountryLanguage(code?: string): SupportedLanguage {
  return getCountry(code).defaultLanguage;
}

export function getCountryTier(code?: string): CountryTier {
  return getCountry(code).tier;
}

export function isTier1(code?: string): boolean {
  return getCountryTier(code) === "tier1";
}

export function isTier2(code?: string): boolean {
  return getCountryTier(code) === "tier2";
}

export function isTier3(code?: string): boolean {
  return getCountryTier(code) === "tier3";
}

// ===============================
// 📊 GROUPED LISTS
// ===============================
export const TIER1_COUNTRIES = Object.values(COUNTRIES).filter(
  (c) => c.tier === "tier1"
);

export const TIER2_COUNTRIES = Object.values(COUNTRIES).filter(
  (c) => c.tier === "tier2"
);

export const TIER3_COUNTRIES = Object.values(COUNTRIES).filter(
  (c) => c.tier === "tier3"
);
