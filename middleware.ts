// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { supportedLanguages, defaultLanguage, countryLangMap } from "./app/core/i18n/config";

// Map country code → default language
const COUNTRY_TO_LANGUAGE: Record<string, string> = {
  us: "EN",
  uk: "EN",
  ca: "EN",
  au: "EN",
  fr: "FR",
  de: "DE",
  in: "EN",
};

/**
 * Normalize language code
 * Example: en-US -> EN, fr-CA -> FR
 */
function normalizeLanguage(lang?: string | null) {
  if (!lang) return null;
  const code = lang.toLowerCase().split("-")[0];
  return supportedLanguages.includes(code as any) ? code.toUpperCase() : null;
}

/**
 * Detect language from request
 */
function detectLanguage(request: NextRequest) {
  // 1️⃣ Cookie preference
  const cookieLang = normalizeLanguage(request.cookies.get("lang")?.value);
  if (cookieLang) return cookieLang;

  // 2️⃣ Accept-Language header
  const acceptLang = request.headers.get("accept-language");
  if (acceptLang) {
    const langs = acceptLang.split(",").map((lang) => lang.split(";")[0].trim());
    for (const lang of langs) {
      const normalized = normalizeLanguage(lang);
      if (normalized) return normalized;
    }
  }

  // 3️⃣ Geo-IP country detection
  const country =
    (request.headers.get("cf-ipcountry") ||
      request.headers.get("x-vercel-ip-country") ||
      request.headers.get("cloudfront-viewer-country") ||
      "") // fallback empty
      .toLowerCase();

  if (country && COUNTRY_TO_LANGUAGE[country]) {
    return COUNTRY_TO_LANGUAGE[country];
  }

  // 4️⃣ Default fallback
  return defaultLanguage.toUpperCase();
}

/**
 * Middleware handler
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip Next.js internals and static files
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return;
  }

  // Check if path already contains a **country slug**
  const pathHasCountry = Object.keys(COUNTRY_TO_LANGUAGE).some((country) =>
    pathname.startsWith(`/${country}`)
  );
  if (pathHasCountry) return;

  // Detect user language
  const lang = detectLanguage(request);

  // Determine country slug from language for redirect
  // If language is from known country, map it back to a country slug
  const countrySlug =
    Object.entries(COUNTRY_TO_LANGUAGE).find(([country, l]) => l === lang)?.[0] || "";

  const url = request.nextUrl.clone();

  if (countrySlug) {
    // Known country → redirect to /countrySlug
    url.pathname = `/${countrySlug}${pathname}`;
  } else {
    // Unknown country → stay on root, default language EN
    url.pathname = pathname;
    url.searchParams.set("lang", lang); // still pass language
  }

  return NextResponse.redirect(url);
}

/**
 * Middleware matcher
 */
export const config = {
  matcher: ["/((?!_next|favicon.ico|robots.txt).*)"],
};
