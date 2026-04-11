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
  flag: string; // 🆕 added
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
    .replace(/./g, char =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
}

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
// 🌍 COUNTRY NAMES (COMPLETE)
// ===============================
const COUNTRY_NAMES: Partial<Record<CountryCode, string>> = {
  // Tier 1 countries
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

  // Tier 2 countries
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

  // Tier 3 countries - Asia
  af: "Afghanistan",
  bd: "Bangladesh",
  bt: "Bhutan",
  bn: "Brunei",
  kh: "Cambodia",
  cn: "China",
  in: "India",
  id: "Indonesia",
  ir: "Iran",
  iq: "Iraq",
  il: "Israel",
  jo: "Jordan",
  kw: "Kuwait",
  kg: "Kyrgyzstan",
  la: "Laos",
  lb: "Lebanon",
  mv: "Maldives",
  mn: "Mongolia",
  mm: "Myanmar",
  np: "Nepal",
  kp: "North Korea",
  om: "Oman",
  pk: "Pakistan",
  ps: "Palestine",
  ph: "Philippines",
  qa: "Qatar",
  lk: "Sri Lanka",
  sy: "Syria",
  tw: "Taiwan",
  tj: "Tajikistan",
  th: "Thailand",
  tl: "Timor-Leste",
  tm: "Turkmenistan",
  uz: "Uzbekistan",
  vn: "Vietnam",
  ye: "Yemen",

  // Tier 3 countries - Africa
  dz: "Algeria",
  ao: "Angola",
  bj: "Benin",
  bw: "Botswana",
  bf: "Burkina Faso",
  bi: "Burundi",
  cv: "Cabo Verde",
  cm: "Cameroon",
  cf: "Central African Republic",
  td: "Chad",
  km: "Comoros",
  cg: "Congo",
  cd: "Congo (DRC)",
  ci: "Côte d'Ivoire",
  dj: "Djibouti",
  eg: "Egypt",
  gq: "Equatorial Guinea",
  er: "Eritrea",
  sz: "Eswatini",
  et: "Ethiopia",
  ga: "Gabon",
  gm: "Gambia",
  gh: "Ghana",
  gn: "Guinea",
  gw: "Guinea-Bissau",
  ke: "Kenya",
  ls: "Lesotho",
  lr: "Liberia",
  ly: "Libya",
  mg: "Madagascar",
  mw: "Malawi",
  ml: "Mali",
  mr: "Mauritania",
  mu: "Mauritius",
  ma: "Morocco",
  mz: "Mozambique",
  na: "Namibia",
  ne: "Niger",
  ng: "Nigeria",
  rw: "Rwanda",
  st: "São Tomé and Príncipe",
  sn: "Senegal",
  sc: "Seychelles",
  sl: "Sierra Leone",
  so: "Somalia",
  ss: "South Sudan",
  sd: "Sudan",
  tz: "Tanzania",
  tg: "Togo",
  tn: "Tunisia",
  ug: "Uganda",
  zm: "Zambia",
  zw: "Zimbabwe",

  // Tier 3 countries - Europe
  al: "Albania",
  am: "Armenia",
  az: "Azerbaijan",
  ba: "Bosnia and Herzegovina",
  bg: "Bulgaria",
  hr: "Croatia",
  cy: "Cyprus",
  ee: "Estonia",
  ge: "Georgia",
  hu: "Hungary",
  is: "Iceland",
  kz: "Kazakhstan",
  lv: "Latvia",
  li: "Liechtenstein",
  lt: "Lithuania",
  lu: "Luxembourg",
  mt: "Malta",
  md: "Moldova",
  mc: "Monaco",
  me: "Montenegro",
  mk: "North Macedonia",
  ro: "Romania",
  ru: "Russia",
  sm: "San Marino",
  rs: "Serbia",
  sk: "Slovakia",
  si: "Slovenia",
  ua: "Ukraine",
  va: "Vatican City",

  // Tier 3 countries - Americas
  ag: "Antigua and Barbuda",
  ar: "Argentina",
  bs: "Bahamas",
  bb: "Barbados",
  bz: "Belize",
  bo: "Bolivia",
  br: "Brazil",
  cl: "Chile",
  co: "Colombia",
  cr: "Costa Rica",
  cu: "Cuba",
  dm: "Dominica",
  do: "Dominican Republic",
  ec: "Ecuador",
  sv: "El Salvador",
  gd: "Grenada",
  gt: "Guatemala",
  gy: "Guyana",
  ht: "Haiti",
  hn: "Honduras",
  jm: "Jamaica",
  mx: "Mexico",
  ni: "Nicaragua",
  pa: "Panama",
  py: "Paraguay",
  pe: "Peru",
  kn: "Saint Kitts and Nevis",
  lc: "Saint Lucia",
  vc: "Saint Vincent and the Grenadines",
  sr: "Suriname",
  tt: "Trinidad and Tobago",
  uy: "Uruguay",
  ve: "Venezuela",

  // Tier 3 countries - Oceania
  fj: "Fiji",
  ki: "Kiribati",
  mh: "Marshall Islands",
  fm: "Micronesia",
  nr: "Nauru",
  nz: "New Zealand",
  pw: "Palau",
  pg: "Papua New Guinea",
  ws: "Samoa",
  sb: "Solomon Islands",
  to: "Tonga",
  tv: "Tuvalu",
  vu: "Vanuatu",

  // Other
  ad: "Andorra",
  by: "Belarus",
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
    flag: getFlagEmoji(code),
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
    flag: "🌍",
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
// 🔢 NUMERIC TIER
// ===============================
export function getTierNumber(code?: string | null): 1 | 2 | 3 {
  const meta = getCountry(code);
  if (meta.tier === "tier1") return 1;
  if (meta.tier === "tier2") return 2;
  return 3;
}

// ===============================
// ✅ VALIDATION
// ===============================
export function isValidCountryCode(code: string): boolean {
  return code in COUNTRIES && code !== "global";
}

// ===============================
// 📊 GET COUNTRIES BY TIER
// ===============================
export function getCountriesByTier(tier: CountryTier): CountryMeta[] {
  return Object.values(COUNTRIES).filter(country => country.tier === tier);
}
