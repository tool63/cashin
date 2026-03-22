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
  // 🚫 Skip internal routes (API, next.js assets)
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

  // Extract country from the path (if valid country exists)
  const validUrlCountry = extractCountryFromPath(pathname);
  const hasValidPrefix = validUrlCountry !== null;

  // Check for invalid country prefixes (like "/xyz")
  const hasInvalidPrefix =
    first && isValidCountryCode(first) && !isSupportedCountry(first);

  // ===============================
  // ❗ FIX: ROOT HANDLING (Global Default)
  // ===============================
  if (pathname === "/") {
    const url = req.nextUrl.clone();

    // If NOT global → redirect to country
    if (geo.country !== DEFAULT_COUNTRY) {
      url.pathname = `/${geo.country}`; // Redirect to country-based URL
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

    // Global → stay on root
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

  // ===============================
  // ❌ REMOVE INVALID PREFIX
  // ===============================
  if (hasInvalidPrefix) {
    const url = req.nextUrl.clone();
    // Remove invalid country-like prefix and keep the rest of the path
    url.pathname = "/" + segments.slice(1).join("/");

    const response = NextResponse.redirect(url);

    response.cookies.set(COOKIE_KEYS.COUNTRY, geo.country, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    response.cookies.set(COOKIE_KEYS.LANGUAGE, geo.language, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });

    return response;
  }

  // ===============================
  // ➕ ADD PREFIX (ONLY IF NEEDED)
  // ===============================
  if (!hasValidPrefix && geo.country !== DEFAULT_COUNTRY) {
    const target = buildUrl(pathname, geo.country);

    if (target !== pathname) {
      const url = req.nextUrl.clone();
      url.pathname = target;
      const response = NextResponse.redirect(url);

      response.cookies.set(COOKIE_KEYS.COUNTRY, geo.country, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });

      response.cookies.set(COOKIE_KEYS.LANGUAGE, geo.language, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
      });

      return response;
    }
  }

  // ===============================
  // 🍪 RESPONSE (NORMAL REQUEST)
  // ===============================
  const res = NextResponse.next();

  // ✅ Persist country
  res.cookies.set(COOKIE_KEYS.COUNTRY, geo.country, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  // ✅ Persist language
  res.cookies.set(COOKIE_KEYS.LANGUAGE, geo.language, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return res;
}
