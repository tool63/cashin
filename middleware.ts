import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  getGeoInfo,
  buildUrl,
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
  // 🌍 GEO INFO (country + language)
  // ===============================
  const geo = getGeoInfo(req);

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0]?.toLowerCase();

  const hasPrefix = isValidCountryCode(first || "");

  // ===============================
  // 🌍 ROOT HANDLING
  // ===============================
  if (pathname === "/") {
    // Stay on root for global
    if (geo.country === DEFAULT_COUNTRY) {
      const res = NextResponse.next();

      res.cookies.set(COOKIE_KEYS.COUNTRY, geo.country, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });

      res.cookies.set(COOKIE_KEYS.LANGUAGE, geo.language, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
      });

      return res;
    }

    // Redirect to country
    const url = req.nextUrl.clone();
    url.pathname = `/${geo.country}`;

    return NextResponse.redirect(url);
  }

  // ===============================
  // ❌ Remove invalid country prefix
  // ===============================
  if (hasPrefix && !isSupportedCountry(first!)) {
    const url = req.nextUrl.clone();
    url.pathname = "/" + segments.slice(1).join("/");
    return NextResponse.redirect(url);
  }

  // ===============================
  // ➕ Add prefix if missing (non-global)
  // ===============================
  if (!hasPrefix && geo.country !== DEFAULT_COUNTRY) {
    const target = buildUrl(pathname, geo.country);

    if (target !== pathname) {
      const url = req.nextUrl.clone();
      url.pathname = target;
      return NextResponse.redirect(url);
    }
  }

  // ===============================
  // 🍪 RESPONSE
  // ===============================
  const res = NextResponse.next();

  // ✅ Persist country (single source of truth)
  res.cookies.set(COOKIE_KEYS.COUNTRY, geo.country, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  // ✅ Persist language (derived from country)
  res.cookies.set(COOKIE_KEYS.LANGUAGE, geo.language, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return res;
}
