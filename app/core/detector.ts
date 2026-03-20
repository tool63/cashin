import type { NextRequest } from "next/server";

// ===============================
// 🌍 DEFAULTS
// ===============================
export const DEFAULT_COUNTRY = "us";
export const DEFAULT_LANGUAGE = "en";

// ===============================
// 🌍 SUPPORTED LANGUAGES
// ===============================
export const SUPPORTED_LANGUAGES = ["en", "fr", "de", "es", "pt"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

// ===============================
// 🌍 ALL COUNTRIES (ISO 3166-1)
// ===============================
export const COUNTRY_CODES = [
  "af","ax","al","dz","ad","ao","ai","aq","ag","ar","am","aw","au","at","az",
  "bs","bh","bd","bb","by","be","bz","bj","bm","bt","bo","bq","ba","bw","bv",
  "br","io","bn","bg","bf","bi","kh","cm","ca","cv","ky","cf","td","cl","cn",
  "cx","cc","co","km","cg","cd","ck","cr","ci","hr","cu","cw","cy","cz",
  "dk","dj","dm","do",
  "ec","eg","sv","gq","er","ee","sz","et",
  "fk","fo","fj","fi","fr","gf","pf","tf",
  "ga","gm","ge","de","gh","gi","gr","gl","gd","gp","gu","gt","gg","gn","gw","gy",
  "ht","hm","va","hn","hk","hu",
  "is","in","id","ir","iq","ie","im","il","it",
  "jm","jp","je","jo",
  "kz","ke","ki","kp","kr","kw","kg",
  "la","lv","lb","ls","lr","ly","li","lt","lu",
  "mo","mg","mw","my","mv","ml","mt","mh","mq","mr","mu","yt","mx","fm","md","mc","mn","me","ms","ma","mz","mm",
  "na","nr","np","nl","nc","nz","ni","ne","ng","nu","nf","mk","mp","no","om",
  "pk","pw","ps","pa","pg","py","pe","ph","pn","pl","pt","pr","qa",
  "re","ro","ru","rw",
  "bl","sh","kn","lc","mf","pm","vc","ws","sm","st","sa","sn","rs","sc","sl","sg","sx","sk","si","sb","so","za","gs","ss","es","lk","sd","sr","sj","se","ch","sy",
  "tw","tj","tz","th","tl","tg","tk","to","tt","tn","tr","tm","tc","tv",
  "ug","ua","ae","gb","us","um","uy","uz",
  "vu","ve","vn","vg","vi",
  "wf","eh",
  "ye","zm","zw"
] as const;

export type CountryCode = (typeof COUNTRY_CODES)[number];

// ⚡ VALIDATION SETS
export const VALID_COUNTRY_CODES = new Set<string>(COUNTRY_CODES);

// ===============================
// 🌍 SUPPORTED COUNTRIES (ROUTING)
// ===============================
export const SUPPORTED_COUNTRIES = new Set<CountryCode>([
  "us","gb","ca","au","de","fr",
  "in","bd","pk","ng","mx","br",
  "es","pt","it","nl"
]);

export function isSupportedCountry(country: string): boolean {
  return SUPPORTED_COUNTRIES.has(country.toLowerCase() as CountryCode);
}

// ===============================
// 🌍 COUNTRY VALIDATION
// ===============================
export function isValidCountryCode(code: string): code is CountryCode {
  return VALID_COUNTRY_CODES.has(code.toLowerCase());
}

// ===============================
// 🌍 PREFIX RULE
// ===============================
export function shouldUsePrefix(country: string): boolean {
  return isSupportedCountry(country);
}

// ===============================
// 🌍 LANGUAGE MAP
// ===============================
export const COUNTRY_LANGUAGE_MAP: Partial<
  Record<CountryCode, SupportedLanguage>
> = {
  us: "en", gb: "en", ca: "en", au: "en",
  fr: "fr", de: "de",
  es: "es", pt: "pt",
  mx: "es", ar: "es", co: "es", cl: "es", pe: "es",
  bd: "en", in: "en", pk: "en", ng: "en", za: "en",
  br: "pt",
};

// ===============================
// 🔤 LANGUAGE NORMALIZATION
// ===============================
export function normalizeLanguage(lang: string): SupportedLanguage {
  const base = lang.toLowerCase().split("-")[0];

  if ((SUPPORTED_LANGUAGES as readonly string[]).includes(base)) {
    return base as SupportedLanguage;
  }

  return DEFAULT_LANGUAGE;
}

// ===============================
// 🌍 PATH HELPERS
// ===============================
export function extractCountryFromPath(path: string): string | null {
  const first = path.split("/").filter(Boolean)[0]?.toLowerCase();
  return first && isValidCountryCode(first) ? first : null;
}

export function getPathWithoutCountry(path: string): string {
  const segments = path.split("/").filter(Boolean);

  if (segments.length && isValidCountryCode(segments[0])) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }

  return path;
}

export function buildUrl(path: string, country: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;

  if (!shouldUsePrefix(country)) return clean;

  return clean === "/" ? `/${country}` : `/${country}${clean}`;
}

// ===============================
// 🤖 BOT DETECTION
// ===============================
const BOT_PATTERNS = [
  "googlebot","bingbot","slurp","duckduckbot",
  "yandexbot","baiduspider","facebookexternalhit",
  "twitterbot","linkedinbot","crawler","spider","bot"
];

export function isBot(req: NextRequest): boolean {
  const ua = (req.headers.get("user-agent") || "").toLowerCase();
  return BOT_PATTERNS.some((b) => ua.includes(b));
}

// ===============================
// 🌍 GEO DETECTION
// ===============================
const GEO_HEADERS = [
  "x-vercel-ip-country",
  "cf-ipcountry",
  "x-country",
];

export function detectCountry(req: NextRequest): string {
  if (isBot(req)) return DEFAULT_COUNTRY;

  for (const h of GEO_HEADERS) {
    const val = req.headers.get(h);
    if (val && isValidCountryCode(val)) {
      return val.toLowerCase();
    }
  }

  return DEFAULT_COUNTRY;
}

// ===============================
// 🧠 RESOLVE COUNTRY (CORE)
// ===============================
export function resolveCountry(
  req: NextRequest,
  urlCountry: string | null
): string {
  const query = req.nextUrl.searchParams.get("country");

  const forced = req.cookies.get("FORCED_COUNTRY")?.value;
  if (forced && isValidCountryCode(forced)) return forced;

  if (query && isValidCountryCode(query)) return query;

  if (urlCountry && isValidCountryCode(urlCountry)) return urlCountry;

  const cookie = req.cookies.get("USER_COUNTRY")?.value;
  if (cookie && isValidCountryCode(cookie)) return cookie;

  return detectCountry(req);
}

// ===============================
// 🌐 LANGUAGE RESOLUTION
// ===============================
export function getLanguage(
  req: NextRequest,
  country: string
): SupportedLanguage {
  const cookie = req.cookies.get("NEXT_LOCALE")?.value;
  if (cookie) return normalizeLanguage(cookie);

  const header = req.headers.get("accept-language");
  if (header) {
    return normalizeLanguage(header.split(",")[0]);
  }

  const mapped = COUNTRY_LANGUAGE_MAP[country.toLowerCase() as CountryCode];

  return mapped && SUPPORTED_LANGUAGES.includes(mapped)
    ? mapped
    : DEFAULT_LANGUAGE;
}

// ===============================
// 📦 GEO OBJECT
// ===============================
export interface GeoInfo {
  country: string;
  language: SupportedLanguage;
  cleanPath: string;
  shouldUsePrefix: boolean;
  isBot: boolean;
  isSupportedCountry: boolean;
}

export function getGeoInfo(req: NextRequest): GeoInfo {
  const { pathname } = req.nextUrl;

  const urlCountry = extractCountryFromPath(pathname);
  const country = resolveCountry(req, urlCountry);
  const language = getLanguage(req, country);

  return {
    country,
    language,
    cleanPath: getPathWithoutCountry(pathname),
    shouldUsePrefix: shouldUsePrefix(country),
    isBot: isBot(req),
    isSupportedCountry: isSupportedCountry(country),
  };
}
