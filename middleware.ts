// middleware.ts
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
  REDIRECT_ONLY_ON_FIRST_VISIT: false, // 🔥 New: Only redirect new users
  REDIRECT_STATUS: 307 as const, // 307 (temporary) or 308 (permanent)
} as const;

// 🔥 New: Loop protection
const MAX_REDIRECTS = 2;
const REDIRECT_COUNT_HEADER = 'x-redirect-count';

// 🔥 Improved: More precise bot detection with whitelist
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

// 🔥 New: Skip bot detection for known good UAs
const HUMAN_PATTERNS = /^(Mozilla|Chrome|Safari|Firefox|Edge|Opera)/i;

// ===============================
// 🧠 SMART BOT DETECTION
// ===============================
function isBot(userAgent: string): boolean {
  if (!userAgent) return false;
  
  // Quick human check (prevents false positives)
  if (HUMAN_PATTERNS.test(userAgent) && !BOT_PATTERNS.test(userAgent)) {
    return false;
  }
  
  return BOT_PATTERNS.test(userAgent);
}

// ===============================
// 🔥 NEW: First Visit Detection
// ===============================
function isFirstVisit(req: NextRequest): boolean {
  return !req.cookies.get(COOKIE_KEYS.VISITED)?.value;
}

// ===============================
// 🔥 NEW: Redirect Loop Protection
// ===============================
function hasRedirectLoop(req: NextRequest): boolean {
  const redirectCount = parseInt(req.headers.get(REDIRECT_COUNT_HEADER) || '0', 10);
  return redirectCount >= MAX_REDIRECTS;
}

// ===============================
// 🔥 NEW: Safe Redirect with Loop Protection
// ===============================
function safeRedirect(url: URL, redirectCount: number): NextResponse {
  const response = NextResponse.redirect(url, REDIRECT_STRATEGY.REDIRECT_STATUS);
  response.headers.set(REDIRECT_COUNT_HEADER, String(redirectCount + 1));
  return response;
}

// ===============================
// 🚀 MAIN MIDDLEWARE
// ===============================
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ===============================
  // 🚫 Skip internal/static files (PERFORMANCE)
  // ===============================
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // ===============================
  // 🔥 Loop Protection
  // ===============================
  if (hasRedirectLoop(req)) {
    console.warn(`Redirect loop detected for ${pathname}, stopping`);
    return NextResponse.next();
  }

  // ===============================
  // 🤖 BOT DETECTION (IMPROVED)
  // ===============================
  const userAgent = req.headers.get("user-agent") || "";
  const isDetectedBot = isBot(userAgent);

  // ===============================
  // 🌍 EXTRACT COUNTRY FROM URL
  // ===============================
  const urlCountry = extractCountryFromPath(pathname);
  const hasValidCountryPrefix = urlCountry !== null && isValidCountryCode(urlCountry);
  const isGlobalRoute = !hasValidCountryPrefix;

  // ===============================
  // 🏠 ROOT PATH HANDLING
  // ===============================
  if (pathname === "/") {
    // Don't redirect bots
    if (isDetectedBot && REDIRECT_STRATEGY.BOT_NO_REDIRECT) {
      return NextResponse.next();
    }

    // 🔥 Only redirect on first visit (optional)
    if (REDIRECT_STRATEGY.REDIRECT_ONLY_ON_FIRST_VISIT && !isFirstVisit(req)) {
      const res = NextResponse.next();
      // Still set visited cookie
      setVisitedCookie(res);
      return res;
    }

    // Get geo info and redirect to country version
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

  // ===============================
  // 🌍 GEO DETECTION
  // ===============================
  const geo = getGeoInfo(req, isGlobalRoute);
  const res = NextResponse.next();

  // ===============================
  // 🍪 SET VISITED COOKIE (First visit tracking)
  // ===============================
  if (isFirstVisit(req)) {
    setVisitedCookie(res);
  }

  // ===============================
  // 🍪 SET COUNTRY/LANGUAGE COOKIES
  // ===============================
  if (hasValidCountryPrefix && geo?.country) {
    setCookiesIfChanged(res, req, geo);
  }

  // ===============================
  // 🤖 BOTS → NO REDIRECTS (SEO CRITICAL)
  // ===============================
  if (isDetectedBot && REDIRECT_STRATEGY.BOT_NO_REDIRECT) {
    return res;
  }

  // ===============================
  // 🚫 VALIDATE COUNTRY EXISTS
  // ===============================
  if (hasValidCountryPrefix) {
    const countryMeta = getCountry(urlCountry);
    if (!countryMeta) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return safeRedirect(url, parseInt(req.headers.get(REDIRECT_COUNT_HEADER) || '0', 10));
    }
  }

  // ===============================
  // 🌍 SMART REDIRECT LOGIC
  // ===============================
  if (REDIRECT_STRATEGY.ALWAYS_REDIRECT) {
    // Case 1: Global route → Redirect to country version
    if (isGlobalRoute && geo?.country && isValidCountryCode(geo.country)) {
      // 🔥 Only redirect on first visit (optional)
      if (REDIRECT_STRATEGY.REDIRECT_ONLY_ON_FIRST_VISIT && !isFirstVisit(req)) {
        return res;
      }

      // Check if user explicitly chose a different country via cookie
      const userCountryCookie = req.cookies.get(COOKIE_KEYS.COUNTRY)?.value;
      const targetCountry = (REDIRECT_STRATEGY.RESPECT_COOKIE && userCountryCookie && isValidCountryCode(userCountryCookie))
        ? userCountryCookie
        : geo.country;

      const newPathname = `/${targetCountry.toLowerCase()}${pathname === '/' ? '' : pathname}`;
      const url = req.nextUrl.clone();
      url.pathname = newPathname;
      return safeRedirect(url, parseInt(req.headers.get(REDIRECT_COUNT_HEADER) || '0', 10));
    }

    // Case 2: Wrong country in URL → Redirect to correct country
    if (hasValidCountryPrefix && geo?.country && urlCountry !== geo.country) {
      // 🔥 Only redirect on first visit (optional)
      if (REDIRECT_STRATEGY.REDIRECT_ONLY_ON_FIRST_VISIT && !isFirstVisit(req)) {
        return res;
      }

      // Check if user explicitly chose this country
      const userCountryCookie = req.cookies.get(COOKIE_KEYS.COUNTRY)?.value;
      
      // If user manually selected this country, respect their choice
      if (userCountryCookie === urlCountry) {
        return res;
      }

      // Otherwise redirect to their geo country
      const remainingPath = pathname.replace(/^\/[a-z]{2}/, '');
      const newPathname = `/${geo.country.toLowerCase()}${remainingPath || ''}`;
      const url = req.nextUrl.clone();
      url.pathname = newPathname;
      return safeRedirect(url, parseInt(req.headers.get(REDIRECT_COUNT_HEADER) || '0', 10));
    }
  }

  return res;
}

// ===============================
// 🍪 COOKIE HANDLERS (Optimized)
// ===============================
function setVisitedCookie(res: NextResponse) {
  res.cookies.set(COOKIE_KEYS.VISITED, '1', {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
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

  // Throttle cookie writes - only if changed
  if (geo.country && currentCountry !== geo.country) {
    res.cookies.set(COOKIE_KEYS.COUNTRY, geo.country, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }

  if (geo.language && currentLanguage !== geo.language) {
    res.cookies.set(COOKIE_KEYS.LANGUAGE, geo.language, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }
}

// ===============================
// 🧹 HELPER FUNCTIONS
// ===============================
export function clearCountryCookie(res: NextResponse) {
  res.cookies.set(COOKIE_KEYS.COUNTRY, "", {
    path: "/",
    maxAge: 0,
    sameSite: "lax",
  });
}

export function clearVisitedCookie(res: NextResponse) {
  res.cookies.set(COOKIE_KEYS.VISITED, "", {
    path: "/",
    maxAge: 0,
    sameSite: "lax",
  });
}

// ===============================
// ⚡ OPTIMIZED MATCHER
// ===============================
export const config = {
  runtime: 'edge', // 🔥 Edge runtime for better performance
  matcher: [
    "/((?!_next/static|_next/image|api|favicon.ico|static|images|fonts).*)",
  ],
};
