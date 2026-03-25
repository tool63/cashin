import type { MetadataRoute } from "next";
import { DEFAULT_COUNTRY } from "@/app/core/constants";

// ===============================
// 🌍 CONFIG
// ===============================
const BASE_URL = "https://cashog.com";

// ===============================
// 🌎 COUNTRIES ONLY
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
];

const SHOPPING_PAGES = [
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
// 🧠 ALL PAGES
// ===============================
const ALL_PAGES = [
  ...new Set([...CORE_PAGES, ...EARN_PAGES, ...SHOPPING_PAGES, ...CONTENT_PAGES]),
];

// ===============================
// 🔧 HELPERS
// ===============================
function normalizePath(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

function buildUrl(path: string, country?: string) {
  const cleanPath = normalizePath(path);

  if (country && country !== DEFAULT_COUNTRY) {
    return `${BASE_URL}/${country}${cleanPath}`;
  }

  return `${BASE_URL}${cleanPath}`;
}

// ===============================
// 📊 PRIORITY ENGINE
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
// 🚀 SITEMAP (CLEAN)
// ===============================
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const sitemap: MetadataRoute.Sitemap = [];

  // 🌍 GLOBAL
  for (const path of ALL_PAGES) {
    sitemap.push({
      url: buildUrl(path),
      lastModified: now,
      changeFrequency: "daily",
      priority: path === "" ? 1 : 0.98,
    });
  }

  // 🌎 COUNTRY ONLY
  for (const country of ISO_COUNTRIES) {
    for (const path of ALL_PAGES) {
      sitemap.push({
        url: buildUrl(path, country),
        lastModified: now,
        changeFrequency: getChangeFrequency(country),
        priority: getPriority(country, path),
      });
    }
  }

  return sitemap;
}
