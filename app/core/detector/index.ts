import type { NextRequest } from "next/server";
import { resolveCountry } from "./country";
import { getLanguage } from "./language";
import { isSupportedCountry } from "../utils/validation";

// ===============================
// 🌍 Extract country from URL
// ===============================
export function extractCountryFromPath(path: string): string | null {
  const first = path.split("/").filter(Boolean)[0]?.toLowerCase();
  return first && isSupportedCountry(first) ? first : null;
}

// ===============================
// ✂️ Remove country from path
// ===============================
export function getPathWithoutCountry(path: string): string {
  const segments = path.split("/").filter(Boolean);

  if (segments.length && isSupportedCountry(segments[0])) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }

  return path;
}

// ===============================
// 🔗 Build URL safely
// ===============================
export function buildUrl(path: string, country: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;

  if (clean.startsWith(`/${country}`)) return clean;

  if (clean === "/") return `/${country}`;

  return `/${country}${clean}`;
}

// ===============================
// 🌐 MAIN GEO
// ===============================
export function getGeoInfo(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const urlCountry = extractCountryFromPath(pathname);
  const country = resolveCountry(req, urlCountry);
  const language = getLanguage(req);

  return {
    country,
    language,
    cleanPath: getPathWithoutCountry(pathname),
    shouldUsePrefix: isSupportedCountry(country),
  };
}
