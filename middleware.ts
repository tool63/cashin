// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Supported countries and their default language
 */
const COUNTRY_LANGUAGE_MAP: Record<string, string> = {
  us: "EN",
  uk: "EN",
  ca: "EN",
  au: "EN",
  fr: "FR",
  de: "DE",
  in: "EN",
};

const SUPPORTED_COUNTRIES = Object.keys(COUNTRY_LANGUAGE_MAP);

/**
 * Detect visitor country from request headers
 */
function detectCountry(request: NextRequest): string {
  const country =
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cloudfront-viewer-country");

  return country?.toLowerCase() || "";
}

/**
 * Middleware
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip Next.js internals and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  const segments = pathname.split("/").filter(Boolean);

  /**
   * Case 1 — Root visit
   */
  if (pathname === "/") {
    const country = detectCountry(request);

    if (SUPPORTED_COUNTRIES.includes(country)) {
      url.pathname = `/${country}`;
      return NextResponse.redirect(url);
    }

    // Unsupported country → stay on root
    return NextResponse.next();
  }

  /**
   * Case 2 — Validate country slug
   */
  const firstSegment = segments[0];

  if (!SUPPORTED_COUNTRIES.includes(firstSegment)) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  /**
   * Case 3 — Prevent nested routes
   * Example: /us/eu → /us
   */
  if (segments.length > 1) {
    url.pathname = `/${firstSegment}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

/**
 * Middleware matcher
 */
export const config = {
  matcher: ["/((?!_next|favicon.ico|robots.txt).*)"],
};
