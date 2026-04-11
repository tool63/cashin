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
  flag: string;
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
// 🏳️ FLAG HELPER
// ===============================
function getFlagEmoji(code: string): string {
  if (code === "global") return "🌍";

  return code
    .toUpperCase()
    .replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
}

// ===============================
// 🌍 SINGLE SOURCE OF TRUTH (AUTO SAFE)
// ===============================
const COUNTRY_NAMES: Record<string, string> = {
  af: "Afghanistan",
  al: "Albania",
  dz: "Algeria",
  ad: "Andorra",
  ao: "Angola",
  ag: "Antigua and Barbuda",
  ar: "Argentina",
  am: "Armenia",
  au: "Australia",
  at: "Austria",
  az: "Azerbaijan",

  bs: "Bahamas",
  bh: "Bahrain",
  bd: "Bangladesh",
  bb: "Barbados",
  by: "Belarus",
  be: "Belgium",
  bz: "Belize",
  bj: "Benin",
  bt: "Bhutan",
  bo: "Bolivia",
  ba: "Bosnia and Herzegovina",
  bw: "Botswana",
  br: "Brazil",
  bn: "Brunei",
  bg: "Bulgaria",
  bf: "Burkina Faso",
  bi: "Burundi",

  cv: "Cape Verde",
  kh: "Cambodia",
  cm: "Cameroon",
  ca: "Canada",
  cf: "Central African Republic",
  td: "Chad",
  cl: "Chile",
  cn: "China",
  co: "Colombia",
  km: "Comoros",
  cg: "Congo",
  cd: "Democratic Republic of the Congo",
  cr: "Costa Rica",
  ci: "Ivory Coast",
  hr: "Croatia",
  cu: "Cuba",
  cy: "Cyprus",
  cz: "Czech Republic",

  dk: "Denmark",
  dj: "Djibouti",
  dm: "Dominica",
  do: "Dominican Republic",

  ec: "Ecuador",
  eg: "Egypt",
  sv: "El Salvador",
  ee: "Estonia",
  et: "Ethiopia",
  fi: "Finland",
  fr: "France",

  de: "Germany",
  gh: "Ghana",
  gr: "Greece",
  gt: "Guatemala",
  hn: "Honduras",
  hu: "Hungary",
  in: "India",
  id: "Indonesia",
  ir: "Iran",
  iq: "Iraq",
  ie: "Ireland",
  il: "Israel",
  it: "Italy",

  jp: "Japan",
  ke: "Kenya",
  kr: "South Korea",
  kw: "Kuwait",
  lb: "Lebanon",
  my: "Malaysia",
  mx: "Mexico",
  mc: "Monaco",
  mn: "Mongolia",
  ma: "Morocco",
  np: "Nepal",
  nl: "Netherlands",
  nz: "New Zealand",
  ng: "Nigeria",
  no: "Norway",

  pk: "Pakistan",
  pe: "Peru",
  ph: "Philippines",
  pl: "Poland",
  pt: "Portugal",
  qa: "Qatar",

  ro: "Romania",
  ru: "Russia",
  sa: "Saudi Arabia",
  sg: "Singapore",
  za: "South Africa",
  es: "Spain",
  se: "Sweden",
  ch: "Switzerland",
  th: "Thailand",
  tr: "Turkey",
  ua: "Ukraine",
  ae: "United Arab Emirates",
  gb: "United Kingdom",
  us: "United States",
  vn: "Vietnam",

  vn: "Vietnam",
  zm: "Zambia",
  zw: "Zimbabwe",
};

// ===============================
// 🧠 BUILD COUNTRY
// ===============================
function buildCountry(code: string): CountryMeta {
  const tier: CountryTier =
    TIER1.has(code)
      ? "tier1"
      : TIER2.has(code)
      ? "tier2"
      : "tier3";

  return {
    code,
    name: COUNTRY_NAMES[code] ?? "Unknown Country",
    tier,
    defaultLanguage: LANGUAGE_BY_COUNTRY[code] || "en",
    flag: getFlagEmoji(code),
  };
}

// ===============================
// 🌍 COUNTRIES MAP (AUTO GENERATED)
// ===============================
export const COUNTRIES: Record<string, CountryMeta> = {
  global: {
    code: "global",
    name: "Global",
    tier: "tier3",
    defaultLanguage: "en",
    flag: "🌍",
  },

  ...Object.fromEntries(
    Object.keys(COUNTRY_NAMES).map((code) => [
      code,
      buildCountry(code),
    ])
  ),
} as Record<string, CountryMeta>;

// ===============================
// 🔍 HELPERS
// ===============================
export function normalizeCountry(code?: string | null): string {
  if (!code) return "global";
  const c = code.toLowerCase().trim();
  return COUNTRIES[c] ? c : "global";
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

export function getTierNumber(code?: string | null): 1 | 2 | 3 {
  const t = getCountry(code).tier;
  return t === "tier1" ? 1 : t === "tier2" ? 2 : 3;
}

export function isValidCountryCode(code: string): boolean {
  return Boolean(COUNTRIES[code]) && code !== "global";
}

export function getCountriesByTier(tier: CountryTier): CountryMeta[] {
  return Object.values(COUNTRIES).filter(
    (c) => c.tier === tier
  );
}
