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
  // 🌐 ROOT (SEO FIXED)
  // ===============================
  if (pathname === "/") {
    const res = NextResponse.next();

    // ✅ DO NOT redirect root (important for SEO)
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

  // ===============================
  // ❌ REMOVE INVALID PREFIX
  // ===============================
  if (hasInvalidPrefix) {
    const url = req.nextUrl.clone();
    url.pathname = "/" + segments.slice(1).join("/");

    const res = NextResponse.redirect(url);

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

  // ===============================
  // ➕ ADD COUNTRY PREFIX (SEO SAFE)
  // ===============================
  if (!hasValidPrefix && geo.country !== DEFAULT_COUNTRY) {
    const target = buildUrl(pathname, geo.country);

    // ✅ Prevent infinite redirect
    if (target !== pathname) {
      const url = req.nextUrl.clone();
      url.pathname = target;

      const res = NextResponse.redirect(url);

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
  }

  // ===============================
  // ✅ NORMAL RESPONSE
  // ===============================
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
