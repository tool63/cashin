import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  getGeoInfo,
  buildUrl,
} from "@/app/core/detector";
import {
  isValidCountryCode,
  isSupportedCountry,
} from "@/app/core/utils/validation";
import { COOKIE_KEYS } from "@/app/core/constants";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api") || pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  const geo = getGeoInfo(req);

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0]?.toLowerCase();

  const hasPrefix = isValidCountryCode(first || "");

  // 🔥 root redirect
  if (pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = `/${geo.country}`;
    return NextResponse.redirect(url);
  }

  // 🔥 remove unsupported prefix
  if (hasPrefix && !isSupportedCountry(first!)) {
    const url = req.nextUrl.clone();
    url.pathname = "/" + segments.slice(1).join("/");
    return NextResponse.redirect(url);
  }

  // 🔥 add prefix
  if (!hasPrefix) {
    const target = buildUrl(pathname, geo.country);

    if (target !== pathname) {
      const url = req.nextUrl.clone();
      url.pathname = target;
      return NextResponse.redirect(url);
    }
  }

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
