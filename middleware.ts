// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  getGeoInfo,
  COOKIE_KEYS,
  DEFAULT_COUNTRY,
  VALID_COUNTRY_CODES,
  buildUrl,
  PUBLIC_ROUTES,
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

  // -------------------------------
  // ⛔ Skip static, API, and public routes
  // -------------------------------
  const firstSegment = pathname.split("/").filter(Boolean)[0]?.toLowerCase();
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    STATIC_FILE_REGEX.test(pathname) ||
    PUBLIC_ROUTES.has(firstSegment || "")
  ) {
    return NextResponse.next();
  }

  // -------------------------------
  // 🌍 GEO INFO
  // -------------------------------
  const geo = getGeoInfo(request);

  // -------------------------------
  // 🚦 ROUTING
  // 1️⃣ Redirect root to geo country
  // -------------------------------
  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${geo.country}`;
    return NextResponse.redirect(url);
  }

  // 2️⃣ Ensure country exists in URL
  if (!geo.hasCountryInUrl) {
    const url = request.nextUrl.clone();
    url.pathname = buildUrl(geo.pathWithoutCountry, geo.country);
    return NextResponse.redirect(url);
  }

  // 3️⃣ Validate country segment
  const segments = pathname.split("/").filter(Boolean);
  const country = segments[0]?.toLowerCase();

  if (!VALID_COUNTRY_CODES.has(country)) {
    const restOfPath = segments.slice(1).join("/");
    const url = request.nextUrl.clone();
    url.pathname = restOfPath ? `/${DEFAULT_COUNTRY}/${restOfPath}` : `/${DEFAULT_COUNTRY}`;
    return NextResponse.redirect(url);
  }

  // -------------------------------
  // 🍪 RESPONSE SETUP
  // -------------------------------
  const response = NextResponse.next();

  // 4️⃣ Set GEO cookies (country + language)
  response.cookies.set(COOKIE_KEYS.COUNTRY, geo.country, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    sameSite: "lax",
  });

  response.cookies.set(COOKIE_KEYS.LANGUAGE, geo.language, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: "lax",
  });

  // 5️⃣ A/B Testing
  if (!request.cookies.get(COOKIE_KEYS.AB_GROUP)) {
    const group = Math.random() < 0.5 ? "A" : "B";
    response.cookies.set(COOKIE_KEYS.AB_GROUP, group, {
      path: "/",
      maxAge: 60 * 60 * 24 * 90, // 90 days
      sameSite: "lax",
    });
    response.headers.set("x-ab-group", group);
  }

  // 6️⃣ Referral Tracking
  if (search.includes("ref=")) {
    const ref = new URLSearchParams(search).get("ref");
    if (ref) {
      response.cookies.set("referral_code", ref, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
    }
  }

  // 7️⃣ Debug / Analytics Headers
  response.headers.set("x-country", geo.country);
  response.headers.set("x-language", geo.language);
  response.headers.set("x-path", pathname);

  // 8️⃣ Edge Cache Headers
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
