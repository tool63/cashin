import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  getGeoInfo,
  buildUrl,
  extractCountryFromPath,
} from "@/app/core/detector/index";

import {
  isSupportedCountry,
  isValidCountryCode,
} from "@/app/core/utils/validation";

import {
  COOKIE_KEYS,
  DEFAULT_COUNTRY,
} from "@/app/core/constants";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ===============================
  // 🚫 Skip internal routes
  // ===============================
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // ===============================
  // 🌐 BOT DETECTION (IMPORTANT FOR SEO)
  // ===============================
  const userAgent = req.headers.get("user-agent") || "";
  const isBot = /bot|crawl|spider|slurp|google|bing|yandex/i.test(userAgent);

  // ===============================
  // 🌍 GEO INFO
  // ===============================
  const geo = getGeoInfo(req);

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0]?.toLowerCase();

  const validUrlCountry = extractCountryFromPath(pathname);
  const hasValidPrefix = validUrlCountry !== null;

  const hasInvalidPrefix =
    first && isValidCountryCode(first) && !isSupportedCountry(first);

  // ===============================
  // 🌐 ROOT (SEO SAFE)
  // ===============================
  if (pathname === "/") {
    const res = NextResponse.next();

    setCookiesIfChanged(res, req, geo);

    return res;
  }

  // ===============================
  // ❌ REMOVE INVALID PREFIX
  // ===============================
  if (hasInvalidPrefix) {
    const url = req.nextUrl.clone();
    url.pathname = "/" + segments.slice(1).join("/");

    const res = NextResponse.redirect(url);

    setCookiesIfChanged(res, req, geo);

    return res;
  }

  // ===============================
  // ➕ COUNTRY PREFIX (USER ONLY, NOT BOT)
  // ===============================
  if (
    !isBot && // ✅ IMPORTANT: don't redirect bots
    !hasValidPrefix &&
    geo.country !== DEFAULT_COUNTRY
  ) {
    const target = buildUrl(pathname, geo.country);

    if (target !== pathname) {
      const url = req.nextUrl.clone();
      url.pathname = target;

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
// 🍪 SAFE COOKIE HANDLER
// ===============================
function setCookiesIfChanged(
  res: NextResponse,
  req: NextRequest,
  geo: { country: string; language: string }
) {
  const currentCountry = req.cookies.get(COOKIE_KEYS.COUNTRY)?.value;
  const currentLanguage = req.cookies.get(COOKIE_KEYS.LANGUAGE)?.value;

  if (currentCountry !== geo.country) {
    res.cookies.set(COOKIE_KEYS.COUNTRY, geo.country, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  if (currentLanguage !== geo.language) {
    res.cookies.set(COOKIE_KEYS.LANGUAGE, geo.language, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }
}
