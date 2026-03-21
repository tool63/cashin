import type { NextRequest } from "next/server";
import { resolveCountry } from "./country";
import { getLanguage } from "./language";
import { isSupportedCountry } from "../utils/validation";
import { DEFAULT_COUNTRY } from "../constants";

// ===============================
// 🌍 Extract country from URL
// ===============================
export function extractCountryFromPath(path: string): string | null {
  const first = path.split("/").filter(Boolean)[0]?.toLowerCase();

  // ❌ Never treat "global" as URL prefix
  if (first === DEFAULT_COUNTRY) return null;

  return first && isSupportedCountry(first) ? first : null;
}

// ===============================
// ✂️ Remove country from path
// ===============================
export function getPathWithoutCountry(path: string): string {
  const segments = path.split("/").filter(Boolean);

  if (segments.length && isSupportedCountry(segments[0])) {
    const country = segments[0].toLowerCase();

    // ❌ Do not strip "global" (should not exist anyway)
    if (country === DEFAULT_COUNTRY) return path;

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

  // ✅ DO NOT prefix global
  if (country === DEFAULT_COUNTRY) return clean;

  // Prevent double prefix
  if (clean.startsWith(`/${country}`)) return clean;

  if (clean === "/") return `/${country}`;

  return `/${country}${clean}`;
}

// ===============================
// 🌐 MAIN GEO INFO
// ===============================
export function getGeoInfo(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const urlCountry = extractCountryFromPath(pathname);
  const country = resolveCountry(req, urlCountry);
  const language = getLanguage(req);

  return {
    country,
    language,

    // Clean path (without country)
    cleanPath: getPathWithoutCountry(pathname),

    // ✅ Only use prefix if NOT global
    shouldUsePrefix: country !== DEFAULT_COUNTRY,
  };
}
