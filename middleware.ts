import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  getGeoInfo,
  buildUrl,
  extractCountryFromPath,
} from "@/app/core/detector/index";

import { isValidCountryCode } from "@/app/core/utils/validation";
import { getCountry } from "@/app/core/countries";

import {
  COOKIE_KEYS,
  DEFAULT_COUNTRY,
} from "@/app/core/constants";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ===============================
  // 🚫 Skip internal, static, or API routes
  // ===============================
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/images")
  ) {
    return NextResponse.next();
  }

  // ===============================
  // 🌐 BOT DETECTION (SEO SAFE)
  // ===============================
  const userAgent = req.headers.get("user-agent") || "";
  const isBot = /bot|crawl|spider|slurp|googlebot|bingbot|yandexbot|baiduspider/i.test(userAgent);

  // ===============================
  // 🌍 Get country from URL path
  // ===============================
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0]?.toLowerCase();
  const urlCountry = extractCountryFromPath(pathname);
  
  // Check if the URL has a valid country prefix
  const hasValidCountryPrefix = urlCountry !== null && isValidCountryCode(urlCountry);
  
  // Check if the URL is a global route (no country prefix)
  const isGlobalRoute = !hasValidCountryPrefix;

  // ===============================
  // 🌍 ROOT PATH - Force global
  // ===============================
  if (pathname === "/") {
    // Create geo info with forced global country
    const geo = {
      country: DEFAULT_COUNTRY,
      language: "en", // You might want to detect this from headers
    };
    
    const res = NextResponse.next();
    setCookiesIfChanged(res, req, geo);
    return res;
  }

  // ===============================
  // 🚫 BLOCK INVALID COUNTRY CODES
  // ===============================
  if (firstSegment && !isValidCountryCode(firstSegment) && firstSegment !== "global") {
    // Valid paths that should be accessible without country prefix
    const validPaths = [
      "", "earn", "make-money", "rewards", "shopping-rewards", 
      "affiliate", "partners", "advertise", "how-it-works", 
      "start-earning", "cashout", "surveys", "app-installs", 
      "play-games", "watch-videos", "mining-rewards", "complete-offers",
      "cashback", "offerwall", "surveywall", "watch-ads", "micro-tasks",
      "blog", "guides", "compare"
    ];
    
    if (!validPaths.includes(firstSegment)) {
      // Invalid prefix that's not a valid page - redirect to home
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  // ===============================
  // 🌍 Get geo info based on route type
  // ===============================
  let geo;
  
  if (isGlobalRoute) {
    // For global routes (like /earn, /surveys), don't use cookies
    // Only use URL or query params
    geo = getGeoInfo(req, true); // Pass flag to ignore cookies
  } else {
    // For country-specific routes, use full resolution
    geo = getGeoInfo(req, false);
  }
  
  // ===============================
  // 🍪 SET COOKIES FOR ALL REQUESTS
  // ===============================
  const res = NextResponse.next();
  
  // Only set cookies if not a global route or if it's a bot
  // This prevents overwriting with country-specific values on global routes
  if (!isGlobalRoute || isBot) {
    setCookiesIfChanged(res, req, geo);
  }
  
  // ===============================
  // 🌐 HANDLE BOTS - Let them see all URLs without redirects
  // ===============================
  if (isBot) {
    return res;
  }

  // ===============================
  // 🧑 HANDLE USERS
  // ===============================
  
  // Case 1: Global route (no country in URL)
  if (isGlobalRoute) {
    // Don't redirect - just return the response
    // Users see global content (English by default)
    return res;
  }
  
  // Case 2: Has valid country prefix
  if (hasValidCountryPrefix) {
    // Verify the country is valid in our system
    const countryMeta = getCountry(urlCountry);
    if (!countryMeta) {
      // Invalid country in our system - redirect to home
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
    
    return res;
  }

  return res;
}

// ===============================
// 🍪 COOKIE HANDLER
// ===============================
function setCookiesIfChanged(
  res: NextResponse,
  req: NextRequest,
  geo: { country: string; language: string }
) {
  const currentCountry = req.cookies.get(COOKIE_KEYS.COUNTRY)?.value;
  const currentLanguage = req.cookies.get(COOKIE_KEYS.LANGUAGE)?.value;

  // Only update if changed and not global
  if (geo.country !== DEFAULT_COUNTRY && currentCountry !== geo.country) {
    res.cookies.set(COOKIE_KEYS.COUNTRY, geo.country, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: "lax",
    });
  }

  if (currentLanguage !== geo.language) {
    res.cookies.set(COOKIE_KEYS.LANGUAGE, geo.language, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: "lax",
    });
  }
}
