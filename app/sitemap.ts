import type { MetadataRoute } from "next";

const BASE_URL = "https://cashog.com";

// 🔥 Core pages (expand via DB later)
const CORE_PAGES = [
  "",
  "/how-it-works",
  "/start-earning",
  "/cashout",
  "/surveys",
  "/play-games",
  "/watch-videos",
  "/offerwall",
  "/surveywall",
  "/earn-paypal-money",
  "/earn-crypto-online",
  "/blog",
  "/contact",
  "/about",
];

// 🌍 Country system (aligned with your geo engine)
const COUNTRIES = ["global", "us", "gb", "ca", "au", "in", "bd"];

function buildUrl(path: string, country: string) {
  if (country === "global") return `${BASE_URL}${path}`;
  return `${BASE_URL}/${country}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  for (const country of COUNTRIES) {
    for (const path of CORE_PAGES) {
      urls.push({
        url: buildUrl(path, country),
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: path === "" ? 1 : 0.8,
      });
    }
  }

  return urls;
}
