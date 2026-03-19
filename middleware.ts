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

const STATIC_FILE_REGEX = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0]?.toLowerCase();

  // -------------------------------
  // ⛔ Skip static, API, public
  // -------------------------------
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
  // 1️⃣ ROOT → Redirect
  // -------------------------------
  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${geo.country}`;
    return NextResponse.redirect(url);
  }

  // -------------------------------
  // 2️⃣ Missing country
  // -------------------------------
  if (!geo.hasCountryInUrl) {
    const url = request.nextUrl.clone();
    url.pathname = buildUrl(geo.pathWithoutCountry, geo.country);
    return NextResponse.redirect(url);
  }

  // -------------------------------
  // 3️⃣ Validate country
  // -------------------------------
  const country = firstSegment;

  if (!country || !VALID_COUNTRY_CODES.has(country)) {
    const rest = segments.slice(1).join("/");
    const url = request.nextUrl.clone();

    url.pathname = rest
      ? `/${DEFAULT_COUNTRY}/${rest}`
      : `/${DEFAULT_COUNTRY}`;

    return NextResponse.redirect(url);
  }

  // -------------------------------
  // ✅ PASS THROUGH
  // -------------------------------
  const response = NextResponse.next();

  // -------------------------------
  // 🔥 FIX: INVALID LANGUAGE COOKIE
  // -------------------------------
  const langCookie = request.cookies.get(COOKIE_KEYS.LANGUAGE)?.value;

  if (langCookie) {
    const normalized = langCookie.toLowerCase().split("-")[0];

    if (!["en", "fr", "de", "es", "pt"].includes(normalized)) {
      response.cookies.set(COOKIE_KEYS.LANGUAGE, geo.language, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });
    }
  }

  // -------------------------------
  // 🍪 COUNTRY COOKIE
  // -------------------------------
  const existingCountry = request.cookies.get(COOKIE_KEYS.COUNTRY)?.value;

  if (!existingCountry || existingCountry !== geo.country) {
    response.cookies.set(COOKIE_KEYS.COUNTRY, geo.country, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
    });
  }

  // -------------------------------
  // 🌐 LANGUAGE COOKIE
  // -------------------------------
  const existingLang = request.cookies.get(COOKIE_KEYS.LANGUAGE)?.value;

  if (!existingLang || existingLang !== geo.language) {
    response.cookies.set(COOKIE_KEYS.LANGUAGE, geo.language, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }

  // -------------------------------
  // 🧪 A/B TESTING
  // -------------------------------
  if (!request.cookies.get(COOKIE_KEYS.AB_GROUP)) {
    const group = Math.random() < 0.5 ? "A" : "B";

    response.cookies.set(COOKIE_KEYS.AB_GROUP, group, {
      path: "/",
      maxAge: 60 * 60 * 24 * 90,
      sameSite: "lax",
    });

    response.headers.set("x-ab-group", group);
  }

  // -------------------------------
  // 🔗 REFERRAL TRACKING
  // -------------------------------
  if (search.includes("ref=")) {
    const ref = new URLSearchParams(search).get("ref");

    if (ref) {
      response.cookies.set("referral_code", ref, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
    }
  }

  // -------------------------------
  // 📊 DEBUG HEADERS
  // -------------------------------
  response.headers.set("x-country", geo.country);
  response.headers.set("x-language", geo.language);
  response.headers.set("x-path", pathname);

  // -------------------------------
  // ⚡ EDGE CACHE
  // -------------------------------
  response.headers.set(
    "Cache-Control",
    "public, s-maxage=120, stale-while-revalidate=300"
  );

  return response;
}

// -------------------------------
// 🎯 MATCHER
// -------------------------------
export const config = {
  matcher: ["/((?!_next|api|favicon.ico|robots.txt|.*\\..*).*)"],
};
