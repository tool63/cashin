import type { MetadataRoute } from "next";
import {
  DEFAULT_COUNTRY,
  SUPPORTED_LANGUAGES,
} from "@/app/core/constants";

const BASE_URL = "https://cashog.com";

// ===============================
// 🌍 ISO COUNTRIES (SHORT SAMPLE → use full list in your system)
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
// 🥇 HIGH VALUE COUNTRIES
// ===============================
const HIGH_VALUE = ["us", "gb", "ca", "au"];

// ===============================
// 🥈 MID VALUE COUNTRIES
// ===============================
const MID_VALUE = [
  "de","fr","es","it","nl","se","ch",
  "br","in"
];

// ===============================
// 💰 GLOBAL CORE PAGES
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

// ===============================
// 💸 EARNING PAGES (FULL LIST)
// ===============================
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

// ===============================
// 🛍 SHOPPING STRUCTURE
// ===============================
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

// ===============================
// 📚 CONTENT PAGES
// ===============================
const CONTENT_PAGES = [
  "/blog",
  "/guides",
  "/compare",
];

// ===============================
// 🧠 MERGED ALL PAGES
// ===============================
const ALL_PAGES = [
  ...CORE_PAGES,
  ...EARN_PAGES,
  ...SHOPPING_PAGES,
  ...CONTENT_PAGES,
];

// ===============================
// 🧠 PRIORITY ENGINE
// ===============================
function getPriority(country: string, path: string): number {
  if (path === "") return 1;

  if (HIGH_VALUE.includes(country)) return 0.95;

  if (MID_VALUE.includes(country)) return 0.85;

  return 0.7;
}

// ===============================
// 🔁 CHANGE FREQUENCY ENGINE
// ===============================
function getChangeFreq(country: string): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (HIGH_VALUE.includes(country)) return "daily";
  if (MID_VALUE.includes(country)) return "weekly";
  return "monthly";
}

// ===============================
// 🔗 URL BUILDER
// ===============================
function buildUrl(path: string, country?: string, lang?: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;

  if (!country && !lang) {
    return `${BASE_URL}${clean}`;
  }

  if (lang) {
    return `${BASE_URL}/${lang}${clean}`;
  }

  if (country && country !== DEFAULT_COUNTRY) {
    return `${BASE_URL}/${country}${clean}`;
  }

  return `${BASE_URL}${clean}`;
}

// ===============================
// 🚀 MAIN SITEMAP ENGINE
// ===============================
export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];
  const now = new Date();

  // ===============================
  // 🌍 GLOBAL DEFAULT (MAIN INDEX)
  // ===============================
  for (const path of ALL_PAGES) {
    urls.push({
      url: buildUrl(path),
      lastModified: now,
      changeFrequency: "daily",
      priority: path === "" ? 1 : 0.98,
    });
  }

  // ===============================
  // 🌍 COUNTRY FULL COVERAGE
  // ===============================
  for (const country of ISO_COUNTRIES) {
    for (const path of ALL_PAGES) {
      urls.push({
        url: buildUrl(path, country),
        lastModified: now,
        changeFrequency: getChangeFreq(country),
        priority: getPriority(country, path),
      });
    }
  }

  // ===============================
  // 🌐 LANGUAGE VERSIONS
  // ===============================
  for (const lang of SUPPORTED_LANGUAGES) {
    if (lang === "en") continue;

    for (const path of ALL_PAGES) {
      urls.push({
        url: buildUrl(path, undefined, lang),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.85,
      });
    }
  }

  return urls;
}
