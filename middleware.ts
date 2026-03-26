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
  SUPPORTED_COUNTRIES,       // ['us', 'uk', 'ca', ...]
  COUNTRY_LANG_MAP,          // { us: 'en', fr: 'fr', ... }
} from "@/app/core/constants";

export function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  // 🚫 Skip API, Next internals, or static assets
  if (pathname.startsWith("/api") || pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next();
  }

  // 🌐 BOT DETECTION
  const userAgent = req.headers.get("user-agent") || "";
  const isBot = /bot|crawl|spider|slurp|google|bing|yandex/i.test(userAgent);

  // 🌍 GEO INFO
  const geo = getGeoInfo(req);

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0]?.toLowerCase();

  const urlCountry = extractCountryFromPath(pathname);
  const hasValidPrefix = urlCountry !== null;
  const hasInvalidPrefix =
    firstSegment && isValidCountryCode(firstSegment) && !isSupportedCountry(firstSegment);

  // 🌐 ROOT PATH
  if (pathname === "/") {
    const res = NextResponse.next();
    setCookiesIfChanged(res, req, geo);
    return res;
  }

  // ❌ REMOVE INVALID COUNTRY PREFIX
  if (hasInvalidPrefix) {
    const url = req.nextUrl.clone();
    url.pathname = "/" + segments.slice(1).join("/");
    const res = NextResponse.redirect(url);
    setCookiesIfChanged(res, req, geo);
    return res;
  }

  // ➕ ADD COUNTRY PREFIX FOR USERS (skip bots)
  if (!isBot && !hasValidPrefix && geo.country !== DEFAULT_COUNTRY) {
    const targetPath = buildUrl(pathname, geo.country);
    if (targetPath !== pathname) {
      const url = req.nextUrl.clone();
      url.pathname = targetPath.replace(origin, "");
      const res = NextResponse.redirect(url);
      setCookiesIfChanged(res, req, geo);
      return res;
    }
  }

  // ✅ NORMAL RESPONSE
  const res = NextResponse.next();
  setCookiesIfChanged(res, req, geo);

  // 🌐 HREFLANG HEADERS FOR SEO (bots only)
  if (isBot) {
    const hreflangLinks = SUPPORTED_COUNTRIES.map((country) => {
      const lang = COUNTRY_LANG_MAP[country] || "en";
      const href = buildUrl(pathname, country);
      return `<${href}>; rel="alternate"; hreflang="${lang}"`;
    });

    // x-default points to default country
    hreflangLinks.push(`<${buildUrl(pathname, DEFAULT_COUNTRY)}>; rel="alternate"; hreflang="x-default"`);

    res.headers.set("Link", hreflangLinks.join(", "));
  }

  return res;
}

// 🍪 COOKIE HANDLER
function setCookiesIfChanged(
  res: NextResponse,
  req: NextRequest,
  geo: { country: string; language: string }
) {
  const currentCountry = req.cookies.get(COOKIE_KEYS.COUNTRY)?.value;
  const currentLanguage = req.cookies.get(COOKIE_KEYS.LANGUAGE)?.value;

  if (currentCountry !== geo.country) {
    res.cookies.set(COOKIE_KEYS.COUNTRY, geo.country, { path: "/", maxAge: 60 * 60 * 24 * 30 });
  }

  if (currentLanguage !== geo.language) {
    res.cookies.set(COOKIE_KEYS.LANGUAGE, geo.language, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  }
}
