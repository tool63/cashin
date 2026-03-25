import type { MetadataRoute } from "next";
import { DEFAULT_COUNTRY } from "@/app/core/constants";

// ===============================
// 🌍 CONFIG
// ===============================
const BASE_URL = "https://cashog.com";

// ===============================
// 🌎 ALL COUNTRIES (FULL GLOBAL)
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
// 🧠 7-TIER COUNTRY SYSTEM
// ===============================
function getTier(country: string): number {
  if (["us","gb","ca","au"].includes(country)) return 1;
  if (["de","fr","nl","se","ch","no","dk"].includes(country)) return 2;
  if (["it","es","fi","ie","at","be"].includes(country)) return 3;
  if (["br","mx","pl","pt","tr","ro"].includes(country)) return 4;
  if (["in","id","ph","vn","th","eg"].includes(country)) return 5;
  if (["pk","bd","ng","ke","za"].includes(country)) return 6;

  return 7; // fallback (rest of world)
}

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

const ALL_PAGES = Array.from(
  new Set([
    ...CORE_PAGES,
    ...EARN_PAGES,
    ...SHOPPING_PAGES,
    ...CONTENT_PAGES,
  ])
);

// ===============================
// 🔧 HELPERS
// ===============================
function normalizePath(path: string) {
  if (!path || path === "") return "/";
  return path.startsWith("/") ? path : `/${path}`;
}

function buildUrl(path: string, country?: string) {
  const clean = normalizePath(path);

  if (country && country !== DEFAULT_COUNTRY) {
    return `${BASE_URL}/${country}${clean}`;
  }

  return `${BASE_URL}${clean}`;
}

// ===============================
// 📊 PAGE VALUE ENGINE
// ===============================
function getPageWeight(path: string): number {
  const clean = normalizePath(path);

  if (clean === "/") return 1;

  if (
    ["/earn","/make-money","/rewards","/affiliate"].includes(clean)
  ) return 0.98;

  if (EARN_PAGES.includes(clean)) return 0.95;

  if (clean.includes("shopping")) return 0.9;

  if (
    clean.includes("blog") ||
    clean.includes("guides") ||
    clean.includes("compare")
  ) return 0.85;

  return 0.75;
}

// ===============================
// 📊 FINAL PRIORITY ENGINE
// ===============================
function getPriority(country: string | undefined, path: string): number {
  const base = getPageWeight(path);

  if (!country) return base;

  const tier = getTier(country);

  const tierBoost: Record<number, number> = {
    1: 0.05,
    2: 0.04,
    3: 0.03,
    4: 0.02,
    5: 0.01,
    6: 0,
    7: -0.02,
  };

  const boost = tierBoost[tier] ?? 0;

  return Math.max(0.3, Math.min(1, base + boost));
}

// ===============================
// 🔄 CHANGE FREQUENCY
// ===============================
function getChangeFrequency(
  country?: string
): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (!country) return "daily";

  const tier = getTier(country);

  if (tier === 1) return "daily";
  if (tier <= 3) return "weekly";

  return "monthly";
}

// ===============================
// 🚀 FINAL SITEMAP ENGINE
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
      priority: getPriority(undefined, path),
    });
  }

  // 🌎 ALL COUNTRIES (TIER BASED)
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
