import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  getGeoInfo,
  buildUrl,
  extractCountryFromPath,
} from "@/app/core/detector/index";

import {
  isValidCountryCode,
} from "@/app/core/utils/validation";

import {
  COOKIE_KEYS,
  DEFAULT_COUNTRY,
  COUNTRY_LANGUAGE_MAP, // ✅ Use this instead of old COUNTRY_LANG_MAP
} from "@/app/core/constants";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ===============================
  // 🚫 Skip internal, static, or API routes
  // ===============================
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // ===============================
  // 🌐 BOT DETECTION (SEO SAFE)
  // ===============================
  const userAgent = req.headers.get("user-agent") || "";
  const isBot = /bot|crawl|spider|slurp|google|bing|yandex/i.test(userAgent);

  // ===============================
  // 🌍 GEO INFO
  // ===============================
  const geo = getGeoInfo(req);

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0]?.toLowerCase();

  const urlCountry = extractCountryFromPath(pathname);
  const hasValidPrefix = urlCountry !== null;

  const hasInvalidPrefix =
    firstSegment && isValidCountryCode(firstSegment) && !(firstSegment in COUNTRY_LANGUAGE_MAP);

  // ===============================
  // 🌐 ROOT PATH (SEO SAFE)
  // ===============================
  if (pathname === "/") {
    const res = NextResponse.next();
    setCookiesIfChanged(res, req, geo);
    return res;
  }

  // ===============================
  // ❌ REMOVE INVALID COUNTRY PREFIX
  // ===============================
  if (hasInvalidPrefix) {
    const url = req.nextUrl.clone();
    url.pathname = "/" + segments.slice(1).join("/");

    const res = NextResponse.redirect(url);
    setCookiesIfChanged(res, req, geo);
    return res;
  }

  // ===============================
  // ➕ ADD COUNTRY PREFIX FOR USERS (IGNORE BOTS)
  // ===============================
  if (!isBot && !hasValidPrefix && geo.country !== DEFAULT_COUNTRY) {
    const targetUrl = buildUrl(pathname, geo.country);

    // Avoid unnecessary redirect if already correct
    if (targetUrl !== `${req.nextUrl.origin}${pathname}`) {
      const url = req.nextUrl.clone();
      url.pathname = targetUrl.replace(req.nextUrl.origin, "");

      const res = NextResponse.redirect(url);
      setCookiesIfChanged(res, req, geo);
      return res;
    }
  }

  // ===============================
  // ✅ NORMAL RESPONSE
  // ===============================
  const res = NextResponse.next();
  setCookiesIfChanged(res, req, geo);
  return res;
}

// ===============================
// 🍪 COOKIE HANDLER
// ===============================
function setCookiesIfChanged(
  res: NextResponse,
  req: NextRequest,
  geo: { country: string; language: string }
) {
  const currentCountry = req.cookies.get(COOKIE_KEYS.COUNTRY)?.value;
  const currentLanguage = req.cookies.get(COOKIE_KEYS.LANGUAGE)?.value;

  // Only update if changed
  if (currentCountry !== geo.country) {
    res.cookies.set(COOKIE_KEYS.COUNTRY, geo.country, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  }

  if (currentLanguage !== geo.language) {
    res.cookies.set(COOKIE_KEYS.LANGUAGE, geo.language, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  }
}
