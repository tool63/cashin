// =======================================
// 🌐 hreflang.ts (FULL ENTERPRISE VERSION)
// =======================================

export type HreflangLink = {
  rel: "alternate";
  hrefLang: string;
  href: string;
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
// 🌐 BASE CONFIG
// ===============================
export const BASE_URL = "https://cashog.com";
export const GLOBAL_HREFLANG = "x-default";

// ===============================
// 🌍 COUNTRY → HREFLANG MAP (OVERRIDES)
// ===============================
export const COUNTRY_HREFLANG_MAP: Record<string, string> = {
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
  in: "en-IN",
  bd: "en-BD",
  pk: "en-PK",
  br: "pt-BR",
  mx: "es-MX",
  sg: "en-SG",
  ph: "en-PH",
  za: "en-ZA",
  ng: "en-NG",
  ke: "en-KE",
  eg: "ar-EG",
  cn: "zh-CN",
  tw: "zh-TW",
  jp: "ja-JP",
  kr: "ko-KR",
};

// ===============================
// 🧹 PATH NORMALIZER
// ===============================
function normalizePath(path: string): string {
  if (!path) return "/";
  let clean = path.startsWith("/") ? path : `/${path}`;
  clean = clean.split("?")[0].split("#")[0];
  clean = clean.replace(/\/+/g, "/");
  if (clean.length > 1 && clean.endsWith("/")) clean = clean.slice(0, -1);
  return clean;
}

// ===============================
// 🌍 COUNTRY NORMALIZER
// ===============================
function normalizeCountry(country?: string): string | undefined {
  if (!country) return undefined;
  const c = country.toLowerCase().trim();
  return /^[a-z]{2}$/.test(c) ? c : undefined;
}

// ===============================
// 🔗 URL BUILDER
// ===============================
export function buildUrl(path: string, country?: string): string {
  const cleanPath = normalizePath(path);
  const cleanCountry = normalizeCountry(country);
  return cleanCountry && ALL_COUNTRIES.includes(cleanCountry)
    ? `${BASE_URL}/${cleanCountry}${cleanPath}`
    : `${BASE_URL}${cleanPath}`;
}

// ===============================
// 🌐 GET HREFLANG
// ===============================
export function getHreflang(country: string): string {
  const c = country.toLowerCase();
  return COUNTRY_HREFLANG_MAP[c] || `en-${c.toUpperCase()}`;
}

// ===============================
// 🌐 GENERATE HREFLANG LINKS
// ===============================
export function generateHreflangLinks(path: string): HreflangLink[] {
  const cleanPath = normalizePath(path);
  const links: HreflangLink[] = [];

  // x-default
  links.push({ rel: "alternate", hrefLang: GLOBAL_HREFLANG, href: buildUrl(cleanPath) });

  // All countries
  for (const country of ALL_COUNTRIES) {
    links.push({ rel: "alternate", hrefLang: getHreflang(country), href: buildUrl(cleanPath, country) });
  }

  return links;
}

// ===============================
// 🌍 SINGLE COUNTRY URL HELPER
// ===============================
export function getCountryUrl(path: string, country?: string) {
  return buildUrl(path, country);
}

// ===============================
// 🌐 GLOBAL URL HELPER
// ===============================
export function getGlobalUrl(path: string) {
  return buildUrl(path);
}

// ===============================
// 🧭 SUPPORTED COUNTRIES
// ===============================
export function getSupportedCountries() {
  return ALL_COUNTRIES;
}
