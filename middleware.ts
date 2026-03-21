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

import { COOKIE_KEYS, DEFAULT_COUNTRY } from "@/app/core/constants";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ===============================
  // 🚫 Skip internal routes
  // ===============================
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".") // static files
  ) {
    return NextResponse.next();
  }

  const geo = getGeoInfo(req);

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0]?.toLowerCase();

  const hasPrefix = isValidCountryCode(first || "");

  // ===============================
  // 🌍 ROOT HANDLING (FIXED)
  // ===============================
  if (pathname === "/") {
    // ✅ Default/global → stay on root
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

    // ✅ Non-default → redirect to /country
    const url = req.nextUrl.clone();
    url.pathname = `/${geo.country}`;
    return NextResponse.redirect(url);
  }

  // ===============================
  // ❌ Remove invalid prefix
  // ===============================
  if (hasPrefix && !isSupportedCountry(first!)) {
    const url = req.nextUrl.clone();
    url.pathname = "/" + segments.slice(1).join("/");
    return NextResponse.redirect(url);
  }

  // ===============================
  // ➕ Add prefix ONLY if NOT default
  // ===============================
  if (!hasPrefix && geo.country !== DEFAULT_COUNTRY) {
    const target = buildUrl(pathname, geo.country);

    if (target !== pathname) {
      const url = req.nextUrl.clone();
      url.pathname = target;
      return NextResponse.redirect(url);
    }
  }

  const res = NextResponse.next();

  // ===============================
  // 🍪 Persist country
  // ===============================
  res.cookies.set(COOKIE_KEYS.COUNTRY, geo.country, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  // ===============================
  // 🌐 Persist language
  // ===============================
  res.cookies.set(COOKIE_KEYS.LANGUAGE, geo.language, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return res;
}
