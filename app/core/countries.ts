// ===============================
// 🌍 COUNTRY TIERS
// ===============================
export type CountryTier = "tier1" | "tier2" | "tier3";

// ===============================
// 🌍 SUPPORTED LANGUAGES
// ===============================
export type SupportedLanguage =
  | "en" | "fr" | "de" | "es" | "pt"
  | "ar" | "zh" | "ja" | "ko";

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
// 🌐 LANGUAGE MAP
// ===============================
const LANGUAGE_BY_COUNTRY: Partial<Record<string, SupportedLanguage>> = {
  fr: "fr",
  de: "de",
  es: "es",
  pt: "pt",
  cn: "zh",
  jp: "ja",
  kr: "ko",
  eg: "ar",
};

// ===============================
// 💰 TIERS
// ===============================
const TIER1 = new Set([
  "us","gb","ca","au","de","fr","nl","se","ch","no","dk","fi","ie","be","at"
]);

const TIER2 = new Set([
  "es","it","pt","gr","pl","cz","hu","tr","ae","sa","kr","jp","sg","my","br","mx","za"
]);

// ===============================
// 🌍 ISO COUNTRIES
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
// 🌍 COUNTRY NAMES (EXPANDED)
// ===============================
const COUNTRY_NAMES: Partial<Record<CountryCode, string>> = {
  // Tier 1
  us: "United States",
  gb: "United Kingdom",
  ca: "Canada",
  au: "Australia",
  de: "Germany",
  fr: "France",
  nl: "Netherlands",
  se: "Sweden",
  ch: "Switzerland",
  no: "Norway",
  dk: "Denmark",
  fi: "Finland",
  ie: "Ireland",
  be: "Belgium",
  at: "Austria",
  
  // Tier 2
  es: "Spain",
  it: "Italy",
  pt: "Portugal",
  gr: "Greece",
  pl: "Poland",
  cz: "Czech Republic",
  hu: "Hungary",
  tr: "Turkey",
  ae: "United Arab Emirates",
  sa: "Saudi Arabia",
  kr: "South Korea",
  jp: "Japan",
  sg: "Singapore",
  my: "Malaysia",
  br: "Brazil",
  mx: "Mexico",
  za: "South Africa",
  
  // Tier 3 (Major)
  bd: "Bangladesh",
  in: "India",
  pk: "Pakistan",
  ng: "Nigeria",
  id: "Indonesia",
  ph: "Philippines",
  eg: "Egypt",
  vn: "Vietnam",
  th: "Thailand",
  ke: "Kenya",
  ua: "Ukraine",
  ro: "Romania",
  il: "Israel",
  hk: "Hong Kong",
  tw: "Taiwan",
};

// ===============================
// 🧠 BUILD
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
// 🌍 COUNTRIES
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
// 🔍 HELPERS
// ===============================
export function normalizeCountry(code?: string | null): CountryCode {
  if (!code) return "global";
  const c = code.toLowerCase().trim();
  return (c in COUNTRIES ? c : "global") as CountryCode;
}

export function getCountry(code?: string | null): CountryMeta {
  return COUNTRIES[normalizeCountry(code)];
}

export function getCountryLanguage(code?: string | null): SupportedLanguage {
  return getCountry(code).defaultLanguage;
}

export function getCountryTier(code?: string | null): CountryTier {
  return getCountry(code).tier;
}

// ===============================
// 🆕 ADDED: NUMERIC TIER HELPER
// ===============================
export function getTierNumber(code?: string | null): 1 | 2 | 3 {
  const meta = getCountry(code);
  if (meta.tier === "tier1") return 1;
  if (meta.tier === "tier2") return 2;
  return 3;
}

// ===============================
// 🆕 ADDED: VALIDATION HELPER
// ===============================
export function isValidCountryCode(code: string): boolean {
  return code in COUNTRIES && code !== "global";
}

// ===============================
// 🆕 ADDED: GET ALL COUNTRIES BY TIER
// ===============================
export function getCountriesByTier(tier: CountryTier): CountryMeta[] {
  return Object.values(COUNTRIES).filter(country => country.tier === tier);
}
