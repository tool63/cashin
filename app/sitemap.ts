import type { MetadataRoute } from "next";
import {
  DEFAULT_COUNTRY,
  SUPPORTED_LANGUAGES,
} from "@/app/core/constants";

// ===============================
// 🌍 CONFIG
// ===============================
const BASE_URL = "https://cashog.com";

// ===============================
// 🌎 COUNTRY GROUPS
// ===============================
const ISO_COUNTRIES = [
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
// 🥇 PRIORITY GROUPS
// ===============================
const HIGH_VALUE_COUNTRIES = ["us", "gb", "ca", "au"];
const MID_VALUE_COUNTRIES = ["de", "fr", "es", "it", "nl", "se", "ch", "br", "in"];

// ===============================
// 📦 PAGE STRUCTURE
// ===============================
const CORE_PAGES = [
  "",
  "/earn",
  "/make-money",
  "/rewards",
  "/shopping-rewards",
  "/affiliate",
  "/partners",
  "/advertise",
  "/how-it-works",
  "/start-earning",
  "/cashout",
];

const EARN_PAGES = [
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
  "/vouchers",
];

const SHOPPING_PAGES = [
  "/shopping-rewards",
  "/shopping-rewards/electronics",
  "/shopping-rewards/fashion",
  "/shopping-rewards/home-garden",
  "/shopping-rewards/grocery",
  "/shopping-rewards/beauty",
  "/shopping-rewards/mobile",
  "/shopping-rewards/travel",
  "/shopping-rewards/travel/hotels",
  "/shopping-rewards/travel/flights",
];

const CONTENT_PAGES = ["/blog", "/guides", "/compare"];

// ===============================
// 🧠 PAGE SET (OPTIMIZED)
// ===============================
const ALL_PAGES = [
  ...new Set([...CORE_PAGES, ...EARN_PAGES, ...SHOPPING_PAGES, ...CONTENT_PAGES]),
];

// ===============================
// 🔧 HELPERS (ENTERPRISE LEVEL)
// ===============================
function normalizePath(path: string) {
  if (!path) return "/";
  return path.startsWith("/") ? path : `/${path}`;
}

function buildUrl({
  path,
  country,
  lang,
}: {
  path: string;
  country?: string;
  lang?: string;
}) {
  const cleanPath = normalizePath(path);

  if (lang) return `${BASE_URL}/${lang}${cleanPath}`;

  if (country && country !== DEFAULT_COUNTRY) {
    return `${BASE_URL}/${country}${cleanPath}`;
  }

  return `${BASE_URL}${cleanPath}`;
}

// ===============================
// 📊 PRIORITY ENGINE (SMART)
// ===============================
function getPriority(country: string, path: string): number {
  if (path === "/") return 1;

  if (HIGH_VALUE_COUNTRIES.includes(country)) return 0.95;
  if (MID_VALUE_COUNTRIES.includes(country)) return 0.85;

  return 0.75;
}

// ===============================
// 🔄 CHANGEFREQ ENGINE
// ===============================
function getChangeFrequency(
  country: string
): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (HIGH_VALUE_COUNTRIES.includes(country)) return "daily";
  if (MID_VALUE_COUNTRIES.includes(country)) return "weekly";
  return "monthly";
}

// ===============================
// 🚀 SITEMAP ENGINE (CORE)
// ===============================
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const sitemap: MetadataRoute.Sitemap = [];

  // ===============================
  // 🌍 GLOBAL (NO COUNTRY / NO LANG)
  // ===============================
  for (const path of ALL_PAGES) {
    sitemap.push({
      url: buildUrl({ path }),
      lastModified: now,
      changeFrequency: "daily",
      priority: path === "" ? 1 : 0.98,
    });
  }

  // ===============================
  // 🌎 COUNTRY PAGES (DEDUPED)
  // ===============================
  for (const country of ISO_COUNTRIES) {
    for (const path of ALL_PAGES) {
      sitemap.push({
        url: buildUrl({ path, country }),
        lastModified: now,
        changeFrequency: getChangeFrequency(country),
        priority: getPriority(country, path),
      });
    }
  }

  // ===============================
  // 🌐 LANGUAGE PAGES (DEDUPED)
  // ===============================
  const uniqueLanguages = Array.from(new Set(SUPPORTED_LANGUAGES));

  for (const lang of uniqueLanguages) {
    if (lang === "en") continue;

    for (const path of ALL_PAGES) {
      sitemap.push({
        url: buildUrl({ path, lang }),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.85,
      });
    }
  }

  return sitemap;
}
