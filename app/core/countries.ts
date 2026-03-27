// =======================================
// 🌍 GLOBAL COUNTRY SYSTEM (ENTERPRISE)
// =======================================

// ===============================
// 🌐 ALL ISO COUNTRIES (SINGLE SOURCE OF TRUTH)
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
] as const;

export type CountryCode = (typeof ALL_COUNTRIES)[number];

// ===============================
// ⚡ FAST LOOKUP SET (PERFORMANCE)
// ===============================
export const COUNTRY_SET = new Set<string>(ALL_COUNTRIES);

// ===============================
// 🌍 TIER SYSTEM (SEO + MONETIZATION)
// ===============================
export const COUNTRY_TIERS: Record<number, CountryCode[]> = {
  // 💰 Tier 1 (Top earning countries)
  1: ["us","gb","ca","au"],

  // 💶 Tier 2 (High value EU)
  2: ["de","fr","nl","se","ch","no","dk"],

  // 💼 Tier 3 (Mid-high EU)
  3: ["it","es","fi","ie","at","be"],

  // 🌎 Tier 4 (Emerging strong markets)
  4: ["br","mx","pl","pt","tr","ro"],

  // 🌏 Tier 5 (High traffic, lower CPM)
  5: ["in","id","ph","vn","th","eg"],

  // 🌍 Tier 6 (Growth markets)
  6: ["pk","bd","ng","ke","za"],

  // 🌐 Tier 7 (Rest of world)
  7: [] // auto-filled below
};

// ===============================
// 🧠 AUTO-FILL TIER 7
// ===============================
const assignedCountries = new Set(
  Object.values(COUNTRY_TIERS).flat()
);

COUNTRY_TIERS[7] = ALL_COUNTRIES.filter(
  (c) => !assignedCountries.has(c)
);

// ===============================
// 🧠 COUNTRY → TIER MAP (FAST LOOKUP)
// ===============================
export const COUNTRY_TIER_MAP: Record<string, number> = {};

for (const [tier, countries] of Object.entries(COUNTRY_TIERS)) {
  for (const c of countries) {
    COUNTRY_TIER_MAP[c] = Number(tier);
  }
}

// ===============================
// 🔍 HELPERS
// ===============================

// ✅ Validate country
export function isSupportedCountry(code?: string): boolean {
  if (!code) return false;
  const c = code.toLowerCase().trim();
  if (c === "global") return true;
  return COUNTRY_SET.has(c);
}

// ✅ Get tier
export function getCountryTier(code?: string): number {
  if (!code) return 7;
  const c = code.toLowerCase();
  return COUNTRY_TIER_MAP[c] || 7;
}

// ✅ Check tier
export function isTier1(code?: string): boolean {
  return getCountryTier(code) === 1;
}

// ✅ Normalize country
export function normalizeCountry(code?: string): string | undefined {
  if (!code) return undefined;
  const c = code.toLowerCase().trim();
  return isSupportedCountry(c) ? c : undefined;
}

// ✅ Get countries by tier
export function getCountriesByTier(tier: number): CountryCode[] {
  return COUNTRY_TIERS[tier] || [];
}
