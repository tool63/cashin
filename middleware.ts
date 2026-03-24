import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  getGeoInfo,
  buildCountryUrl,
  extractCountryFromPath,
} from "@/app/core/detector/index";

import {
  isSupportedCountry,
  normalizeCountry,
} from "@/app/core/utils/validation";

import {
  COOKIE_KEYS,
  DEFAULT_COUNTRY,
} from "@/app/core/constants";

// ===============================
// 🤖 BOT DETECTION (SEO SAFE)
// ===============================
function isBot(userAgent: string) {
  return /googlebot|bingbot|slurp|duckduckbot|baiduspider/i.test(
    userAgent
  );
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const userAgent = req.headers.get("user-agent") || "";

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
  const firstSegment = segments[0]?.toLowerCase();

  const urlCountry = extractCountryFromPath(pathname);
  const hasValidPrefix = !!urlCountry;

  const normalizedGeoCountry = normalizeCountry(geo.country);

  // ===============================
  // ❌ INVALID PREFIX HANDLING
  // ===============================
  const hasInvalidPrefix =
    firstSegment &&
    !isSupportedCountry(firstSegment) &&
    isSupportedCountry(normalizedGeoCountry || "");

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
  // 🌐 ROOT HANDLING (SEO OPTIMIZED)
  // ===============================
  if (pathname === "/") {
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
  // ➕ ADD COUNTRY PREFIX (SMART SEO)
  // ===============================
  if (
    !hasValidPrefix &&
    normalizedGeoCountry &&
    normalizedGeoCountry !== DEFAULT_COUNTRY
  ) {
    const targetPath = buildCountryUrl(pathname, normalizedGeoCountry);

    // 🚨 Prevent infinite redirects
    if (targetPath !== pathname) {
      const url = req.nextUrl.clone();
      url.pathname = targetPath;

      const res = NextResponse.redirect(url);

      res.cookies.set(COOKIE_KEYS.COUNTRY, normalizedGeoCountry, {
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
  // 🤖 BOT PRIORITY (IMPORTANT FOR SEO)
  // ===============================
  if (isBot(userAgent)) {
    const res = NextResponse.next();

    res.headers.set("x-robots-tag", "index, follow");

    return res;
  }

  // ===============================
  // 🍪 NORMAL RESPONSE
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
