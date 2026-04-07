// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  getGeoInfo,
  extractCountryFromPath,
} from "@/app/core/detector";

import { isValidCountryCode } from "@/app/core/utils/validation";
import { getCountry } from "@/app/core/countries";

import {
  COOKIE_KEYS,
} from "@/app/core/constants";

// ===============================
// 🚀 MIDDLEWARE
// ===============================
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ===============================
  // 🚫 Skip internal/static files
  // ===============================
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // ===============================
  // 🤖 BOT DETECTION (SEO SAFE)
  // ===============================
  const userAgent = req.headers.get("user-agent") || "";
  const isBot = /bot|crawl|spider/i.test(userAgent);

  // ===============================
  // 🌍 COUNTRY FROM URL
  // ===============================
  const urlCountry = extractCountryFromPath(pathname);

  const hasValidCountryPrefix =
    urlCountry !== null && isValidCountryCode(urlCountry);

  const isGlobalRoute = !hasValidCountryPrefix;

  // ===============================
  // 🌍 ROOT → GLOBAL (NO REDIRECT)
  // ===============================
  if (pathname === "/") {
    return NextResponse.next();
  }

  // ===============================
  // 🌍 GEO DETECTION
  // ===============================
  const geo = getGeoInfo(req, isGlobalRoute);

  const res = NextResponse.next();

  // ===============================
  // 🍪 SET COOKIES (ONLY COUNTRY ROUTES)
  // ===============================
  if (hasValidCountryPrefix && geo?.country) {
    setCookiesIfChanged(res, req, geo);
  }

  // ===============================
  // 🤖 BOTS → NO REDIRECTS
  // ===============================
  if (isBot) {
    return res;
  }

  // ===============================
  // 🚫 INVALID COUNTRY IN URL
  // ===============================
  if (hasValidCountryPrefix) {
    const countryMeta = getCountry(urlCountry);

    if (!countryMeta) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

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

  // Update country cookie
  if (geo.country && currentCountry !== geo.country) {
    res.cookies.set(COOKIE_KEYS.COUNTRY, geo.country, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: "lax",
    });
  }

  // Update language cookie
  if (geo.language && currentLanguage !== geo.language) {
    res.cookies.set(COOKIE_KEYS.LANGUAGE, geo.language, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: "lax",
    });
  }
}

// ===============================
// ⚡ MATCHER (IMPORTANT)
// ===============================
export const config = {
  matcher: [
    "/((?!_next|api|static|images|favicon.ico).*)",
  ],
};
