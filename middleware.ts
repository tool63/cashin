// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  getGeoInfo,
  COOKIE_KEYS,
  DEFAULT_COUNTRY,
  VALID_COUNTRY_CODES,
  buildUrl,
} from "@/app/core/detector";

// ===============================
// ⚡ PERFORMANCE CONFIG
// ===============================
const STATIC_FILE_REGEX = /\.(.*)$/;

// ===============================
// 🚀 MAIN MIDDLEWARE
// ===============================
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // ===============================
  // ⛔ Skip internal/static requests
  // ===============================
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    STATIC_FILE_REGEX.test(pathname)
  ) {
    return NextResponse.next();
  }

  // ===============================
  // 🌍 GEO DETECTION
  // ===============================
  const geo = getGeoInfo(request);

  // ===============================
  // 🚦 ROUTING ENGINE
  // ===============================

  // ✅ 1. Root → redirect to geo country
  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${geo.country}`;
    return NextResponse.redirect(url);
  }

  // ✅ 2. Ensure country exists in URL
  if (!geo.hasCountryInUrl) {
    const url = request.nextUrl.clone();
    url.pathname = buildUrl(pathname, geo.country);
    return NextResponse.redirect(url);
  }

  // ✅ 3. Validate country
  const segments = pathname.split("/").filter(Boolean);
  const country = segments[0]?.toLowerCase();

  if (!VALID_COUNTRY_CODES.has(country)) {
    const rest = segments.slice(1).join("/");

    const url = request.nextUrl.clone();
    url.pathname = rest
      ? `/${DEFAULT_COUNTRY}/${rest}`
      : `/${DEFAULT_COUNTRY}`;

    return NextResponse.redirect(url);
  }

  // ===============================
  // 🍪 RESPONSE SETUP
  // ===============================
  const response = NextResponse.next();

  // ===============================
  // 🌍 GEO COOKIES
  // ===============================
  response.cookies.set(COOKIE_KEYS.COUNTRY, geo.country, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
  });

  response.cookies.set(COOKIE_KEYS.LANGUAGE, geo.language, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  // ===============================
  // 🧪 A/B TESTING (Growth System)
  // ===============================
  if (!request.cookies.get(COOKIE_KEYS.AB_GROUP)) {
    const group = Math.random() < 0.5 ? "A" : "B";

    response.cookies.set(COOKIE_KEYS.AB_GROUP, group, {
      path: "/",
      maxAge: 60 * 60 * 24 * 90,
      sameSite: "lax",
    });

    response.headers.set("x-ab-group", group);
  }

  // ===============================
  // 💰 TRACKING (Revenue critical)
  // ===============================
  if (search.includes("ref=")) {
    const ref = new URLSearchParams(search).get("ref");

    if (ref) {
      response.cookies.set("referral_code", ref, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
    }
  }

  // ===============================
  // 📊 DEBUG + ANALYTICS HEADERS
  // ===============================
  response.headers.set("x-country", geo.country);
  response.headers.set("x-language", geo.language);
  response.headers.set("x-path", pathname);

  // ===============================
  // ⚡ CACHE (EDGE OPTIMIZED)
  // ===============================
  response.headers.set(
    "Cache-Control",
    "public, s-maxage=120, stale-while-revalidate=300"
  );

  return response;
}

// ===============================
// 🎯 MATCHER
// ===============================
export const config = {
  matcher: ["/((?!_next|api|favicon.ico|robots.txt|.*\\..*).*)"],
};
