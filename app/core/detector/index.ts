import type { NextRequest } from "next/server";
import { resolveCountry } from "./country";
import { getLanguage } from "./language";
import { isSupportedCountry, isValidCountryCode } from "../utils/validation";
import { DEFAULT_COUNTRY } from "../constants";

// ===============================
// 🌍 Extract country from URL
// ===============================
export function extractCountryFromPath(path: string): string | null {
  const first = path.split("/").filter(Boolean)[0]?.toLowerCase();

  // ❌ Never treat "global" as URL prefix
  if (first === DEFAULT_COUNTRY) return null;

  // ✅ Only return if it's a valid ISO country
  if (first && isSupportedCountry(first)) {
    return first;
  }

  return null;
}

// ===============================
// 🔍 Check if path has valid country prefix
// ===============================
export function hasValidCountryPrefix(path: string): boolean {
  return extractCountryFromPath(path) !== null;
}

// ===============================
// 🔍 Check if path has any country-like prefix (including invalid)
// ===============================
export function hasCountryLikePrefix(path: string): boolean {
  const first = path.split("/").filter(Boolean)[0]?.toLowerCase();
  return first ? isValidCountryCode(first) : false;
}

// ===============================
// ✂️ Remove country from path
// ===============================
export function getPathWithoutCountry(path: string): string {
  const segments = path.split("/").filter(Boolean);

  if (segments.length && isSupportedCountry(segments[0])) {
    const country = segments[0].toLowerCase();

    // ❌ Do not strip "global"
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

  // Remove any existing invalid prefix first
  const withoutPrefix = getPathWithoutCountry(clean);
  
  if (withoutPrefix === "/") return `/${country}`;
  
  return `/${country}${withoutPrefix}`;
}

// ===============================
// 🧹 Clean invalid prefixes from URL
// ===============================
export function cleanInvalidPrefix(path: string): string {
  const segments = path.split("/").filter(Boolean);
  const first = segments[0]?.toLowerCase();

  // If the first segment looks like a country code but isn't valid, remove it
  if (first && isValidCountryCode(first) && !isSupportedCountry(first)) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }

  return path;
}

// ===============================
// 🌐 MAIN GEO INFO
// ===============================
export function getGeoInfo(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Get valid country from URL (only real ISO codes, not "global")
  const urlCountry = extractCountryFromPath(pathname);
  
  // Check if there's an invalid prefix that needs cleaning
  const hasInvalidPrefix = hasCountryLikePrefix(pathname) && !hasValidCountryPrefix(pathname);
  
  // Clean the path if there's an invalid prefix
  const cleanPathname = hasInvalidPrefix ? cleanInvalidPrefix(pathname) : pathname;

  // ✅ Resolve country (single source of truth)
  const country = resolveCountry(req, urlCountry);

  // ===============================
  // 🔥 IMPORTANT FIX
  // ===============================
  // Language should ALWAYS come AFTER country is resolved
  const language = getLanguage(req, country);

  return {
    country,
    language,

    // Clean path (without country prefix)
    cleanPath: getPathWithoutCountry(cleanPathname),
    
    // Original path for reference
    originalPath: pathname,
    
    // Cleaned path with invalid prefixes removed
    cleanedPath: cleanPathname,

    // Only use prefix if NOT global
    shouldUsePrefix: country !== DEFAULT_COUNTRY,
    
    // Helper flags
    hasValidPrefix: urlCountry !== null,
    hasInvalidPrefix,
  };
}
