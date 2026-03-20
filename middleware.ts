import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  getGeoInfo,
  buildUrl,
  isValidCountryCode,
  isSupportedCountry,
  COOKIE_KEYS,
} from "@/app/core/detector";

// ===============================
// 🚫 STATIC FILES
// ===============================
const STATIC_FILE_REGEX = /\.(.*)$/;

// ===============================
// 🌍 MIDDLEWARE
// ===============================
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ===============================
  // ⛔ EARLY EXIT (PERFORMANCE)
  // ===============================
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/robots.txt") ||
    STATIC_FILE_REGEX.test(pathname)
  ) {
    return NextResponse.next();
  }

  // ===============================
  // 🔤 NORMALIZE LOWERCASE (SEO)
  // ===============================
  if (pathname !== pathname.toLowerCase()) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.toLowerCase();
    return NextResponse.redirect(url, 301);
  }

  // ===============================
  // 🌍 GEO DATA
  // ===============================
  const geo = getGeoInfo(req);

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0]?.toLowerCase();

  const hasPrefix = !!firstSegment && isValidCountryCode(firstSegment);

  // ===============================
  // 🤖 BOT SAFETY (NO REDIRECTS)
  // ===============================
  if (geo.isBot) {
    return NextResponse.next();
  }

  // ===============================
  // 🔥 ROOT HANDLING (FIXED ORDER)
  // ===============================
  if (pathname === "/") {
    if (geo.shouldUsePrefix) {
      const url = req.nextUrl.clone();
      url.pathname = `/${geo.country}`;
      return NextResponse.redirect(url, 307);
    }
    return NextResponse.next();
  }

  // ===============================
  // 🔥 INVALID / UNSUPPORTED PREFIX
  // ===============================
  if (hasPrefix) {
    // ❌ Unsupported country → remove prefix
    if (!isSupportedCountry(firstSegment!)) {
      const url = req.nextUrl.clone();
      const cleanPath = segments.slice(1).join("/");
      url.pathname = cleanPath ? `/${cleanPath}` : "/";
      return NextResponse.redirect(url, 307);
    }
  }

  // ===============================
  // 🔥 ADD PREFIX (SAFE)
  // ===============================
  if (!hasPrefix && geo.shouldUsePrefix) {
    const target = buildUrl(pathname, geo.country);

    if (target !== pathname) {
      const url = req.nextUrl.clone();
      url.pathname = target;
      return NextResponse.redirect(url, 307);
    }
  }

  // ===============================
  // 🚀 RESPONSE
  // ===============================
  const res = NextResponse.next();

  // ===============================
  // 🍪 COOKIES (FIXED)
  // ===============================
  res.cookies.set(COOKIE_KEYS.COUNTRY, geo.country, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  res.cookies.set(COOKIE_KEYS.LANGUAGE, geo.language, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  // ===============================
  // 🧪 DEBUG HEADERS (DEV ONLY)
  // ===============================
  if (process.env.NODE_ENV === "development") {
    res.headers.set("x-country", geo.country);
    res.headers.set("x-language", geo.language);
    res.headers.set("x-supported", geo.isSupportedCountry ? "1" : "0");
    res.headers.set("x-prefix", geo.shouldUsePrefix ? "1" : "0");
  }

  // ===============================
  // 🌐 SEO CANONICAL (FIXED)
  // ===============================
  const url = new URL(req.url);

  const canonicalPath = geo.shouldUsePrefix
    ? `/${geo.country}${geo.cleanPath}`
    : geo.cleanPath;

  res.headers.set(
    "Link",
    `<${url.origin}${canonicalPath}>; rel="canonical"`
  );

  // ===============================
  // ⚡ CACHE CONTROL
  // ===============================
  res.headers.set(
    "Cache-Control",
    geo.isBot
      ? "public, s-maxage=3600, stale-while-revalidate=7200"
      : "public, s-maxage=180, stale-while-revalidate=600"
  );

  // ===============================
  // 🌐 VARY HEADERS (IMPROVED)
  // ===============================
  res.headers.set(
    "Vary",
    "Accept-Language, Cookie, User-Agent, X-Vercel-IP-Country"
  );

  // ===============================
  // 🔒 CSP (SAFER)
  // ===============================
  if (process.env.NODE_ENV === "production") {
    res.headers.set(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';"
    );
  }

  return res;
}

// ===============================
// 🎯 MATCHER
// ===============================
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|.*\\..*).*)",
  ],
};
