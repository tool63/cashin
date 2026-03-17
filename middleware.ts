// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  getGeoInfo,
  COOKIE_KEYS,
  DEFAULT_COUNTRY,
  buildUrl,
  isPublicRoute,
  VALID_COUNTRY_CODES,
} from "@/app/core/geo";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ⛔ Skip static files, API routes, assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 🌍 Get geo info (single source of truth)
  const geoInfo = getGeoInfo(request);

  // ===============================
  // 🚦 ROUTING LOGIC
  // ===============================

  // ✅ 1. Root → redirect to country homepage
  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${geoInfo.country}`;
    return NextResponse.redirect(url);
  }

  // ✅ 2. Public routes → allow (no country prefix)
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // ✅ 3. If NO country in URL → redirect with country
  if (!geoInfo.hasCountryInUrl) {
    const url = request.nextUrl.clone();
    url.pathname = buildUrl(pathname, geoInfo.country);
    return NextResponse.redirect(url);
  }

  // ✅ 4. Validate country in URL
  const firstSegment = pathname.split("/").filter(Boolean)[0]?.toLowerCase();

  if (firstSegment && !VALID_COUNTRY_CODES.has(firstSegment)) {
    const segments = pathname.split("/").filter(Boolean);
    const restPath = segments.slice(1).join("/");

    const url = request.nextUrl.clone();
    url.pathname = restPath
      ? `/${DEFAULT_COUNTRY}/${restPath}`
      : `/${DEFAULT_COUNTRY}`;

    return NextResponse.redirect(url);
  }

  // ===============================
  // 🍪 RESPONSE (cookies + headers)
  // ===============================

  const response = NextResponse.next();

  // 🌐 Language cookie
  response.cookies.set(COOKIE_KEYS.LANGUAGE, geoInfo.language, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: false,
  });

  // 🌍 Country cookie
  response.cookies.set(COOKIE_KEYS.COUNTRY, geoInfo.country, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: false,
  });

  // 📊 Headers for frontend/debugging
  response.headers.set("x-country", geoInfo.country);
  response.headers.set("x-language", geoInfo.language);

  // 🧪 A/B testing
  if (!request.cookies.get(COOKIE_KEYS.AB_GROUP)) {
    const abGroup = Math.random() < 0.5 ? "A" : "B";

    response.cookies.set(COOKIE_KEYS.AB_GROUP, abGroup, {
      path: "/",
      maxAge: 60 * 60 * 24 * 90,
    });
  }

  // ⚡ Cache control
  response.headers.set(
    "Cache-Control",
    "private, s-maxage=120, stale-while-revalidate=300"
  );

  return response;
}

// ===============================
// 🎯 Matcher
// ===============================
export const config = {
  matcher: ["/((?!_next|api|favicon.ico|robots.txt|.*\\..*).*)"],
};
