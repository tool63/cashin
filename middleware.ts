// middleware.ts (FULL FIXED VERSION)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  getGeoInfo,
  extractCountryFromPath,
} from "@/app/core/detector";

import { isValidCountryCode } from "@/app/core/utils/validation";
import { getCountry } from "@/app/core/countries";

import {
  COOKIE_KEYS,
} from "@/app/core/constants";

// ===============================
// 🎯 ENTERPRISE CONFIGURATION
// ===============================
const REDIRECT_STRATEGY = {
  ALWAYS_REDIRECT: true,
  RESPECT_COOKIE: true,
  BOT_NO_REDIRECT: true,
  REDIRECT_ONLY_ON_FIRST_VISIT: false,
  REDIRECT_STATUS: 307 as const,
} as const;

const MAX_REDIRECTS = 2;
const REDIRECT_COUNT_HEADER = 'x-redirect-count';

const BOT_PATTERNS = new RegExp(
  '^(?:' + [
    'googlebot',
    'bingbot',
    'slurp',
    'duckduckbot',
    'baiduspider',
    'yandexbot',
    'facebot',
    'facebookexternalhit',
    'twitterbot',
    'whatsapp',
    'telegram',
    'gptbot',
    'ccbot',
    'claudebot',
    'applebot',
    'ahrefsbot',
    'semrushbot',
  ].join('|') + ')',
  'i'
);

const HUMAN_PATTERNS = /^(Mozilla|Chrome|Safari|Firefox|Edge|Opera)/i;

function isBot(userAgent: string): boolean {
  if (!userAgent) return false;
  if (HUMAN_PATTERNS.test(userAgent) && !BOT_PATTERNS.test(userAgent)) {
    return false;
  }
  return BOT_PATTERNS.test(userAgent);
}

function isFirstVisit(req: NextRequest): boolean {
  return !req.cookies.get(COOKIE_KEYS.VISITED)?.value;
}

function hasRedirectLoop(req: NextRequest): boolean {
  const redirectCount = parseInt(req.headers.get(REDIRECT_COUNT_HEADER) || '0', 10);
  return redirectCount >= MAX_REDIRECTS;
}

function safeRedirect(url: URL, redirectCount: number): NextResponse {
  const response = NextResponse.redirect(url, REDIRECT_STRATEGY.REDIRECT_STATUS);
  response.headers.set(REDIRECT_COUNT_HEADER, String(redirectCount + 1));
  return response;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  if (hasRedirectLoop(req)) {
    console.warn(`Redirect loop detected for ${pathname}, stopping`);
    return NextResponse.next();
  }

  const userAgent = req.headers.get("user-agent") || "";
  const isDetectedBot = isBot(userAgent);
  const urlCountry = extractCountryFromPath(pathname);
  const hasValidCountryPrefix = urlCountry !== null && isValidCountryCode(urlCountry);
  const isGlobalRoute = !hasValidCountryPrefix;

  if (pathname === "/") {
    if (isDetectedBot && REDIRECT_STRATEGY.BOT_NO_REDIRECT) {
      return NextResponse.next();
    }

    if (REDIRECT_STRATEGY.REDIRECT_ONLY_ON_FIRST_VISIT && !isFirstVisit(req)) {
      const res = NextResponse.next();
      setVisitedCookie(res);
      return res;
    }

    const geo = getGeoInfo(req, true);
    if (geo?.country && isValidCountryCode(geo.country)) {
      const url = req.nextUrl.clone();
      url.pathname = `/${geo.country.toLowerCase()}`;
      const response = safeRedirect(url, parseInt(req.headers.get(REDIRECT_COUNT_HEADER) || '0', 10));
      setVisitedCookie(response);
      return response;
    }

    const response = NextResponse.next();
    setVisitedCookie(response);
    return response;
  }

  const geo = getGeoInfo(req, isGlobalRoute);
  const res = NextResponse.next();

  if (isFirstVisit(req)) {
    setVisitedCookie(res);
  }

  if (hasValidCountryPrefix && geo?.country) {
    setCookiesIfChanged(res, req, geo);
  }

  if (isDetectedBot && REDIRECT_STRATEGY.BOT_NO_REDIRECT) {
    return res;
  }

  if (hasValidCountryPrefix) {
    const countryMeta = getCountry(urlCountry);
    if (!countryMeta) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return safeRedirect(url, parseInt(req.headers.get(REDIRECT_COUNT_HEADER) || '0', 10));
    }
  }

  if (REDIRECT_STRATEGY.ALWAYS_REDIRECT) {
    if (isGlobalRoute && geo?.country && isValidCountryCode(geo.country)) {
      if (REDIRECT_STRATEGY.REDIRECT_ONLY_ON_FIRST_VISIT && !isFirstVisit(req)) {
        return res;
      }

      const userCountryCookie = req.cookies.get(COOKIE_KEYS.COUNTRY)?.value;
      const targetCountry = (REDIRECT_STRATEGY.RESPECT_COOKIE && userCountryCookie && isValidCountryCode(userCountryCookie))
        ? userCountryCookie
        : geo.country;

      const newPathname = `/${targetCountry.toLowerCase()}${pathname === '/' ? '' : pathname}`;
      const url = req.nextUrl.clone();
      url.pathname = newPathname;
      return safeRedirect(url, parseInt(req.headers.get(REDIRECT_COUNT_HEADER) || '0', 10));
    }

    if (hasValidCountryPrefix && geo?.country && urlCountry !== geo.country) {
      if (REDIRECT_STRATEGY.REDIRECT_ONLY_ON_FIRST_VISIT && !isFirstVisit(req)) {
        return res;
      }

      const userCountryCookie = req.cookies.get(COOKIE_KEYS.COUNTRY)?.value;
      
      if (userCountryCookie === urlCountry) {
        return res;
      }

      const remainingPath = pathname.replace(/^\/[a-z]{2}/, '');
      const newPathname = `/${geo.country.toLowerCase()}${remainingPath || ''}`;
      const url = req.nextUrl.clone();
      url.pathname = newPathname;
      return safeRedirect(url, parseInt(req.headers.get(REDIRECT_COUNT_HEADER) || '0', 10));
    }
  }

  return res;
}

function setVisitedCookie(res: NextResponse) {
  res.cookies.set(COOKIE_KEYS.VISITED, '1', {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

function setCookiesIfChanged(
  res: NextResponse,
  req: NextRequest,
  geo: { country: string; language: string }
) {
  const currentCountry = req.cookies.get(COOKIE_KEYS.COUNTRY)?.value;
  const currentLanguage = req.cookies.get(COOKIE_KEYS.LANGUAGE)?.value;

  if (geo.country && currentCountry !== geo.country) {
    res.cookies.set(COOKIE_KEYS.COUNTRY, geo.country, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }

  if (geo.language && currentLanguage !== geo.language) {
    res.cookies.set(COOKIE_KEYS.LANGUAGE, geo.language, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }
}

// ===============================
// ⚡ MATCHER ONLY (NO runtime CONFIG)
// ===============================
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|api|favicon.ico|static|images|fonts).*)",
  ],
};
