// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Country → Language
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
 * Detect user country from request headers
 */
function detectCountry(request: NextRequest): string {
  const country =
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cloudfront-viewer-country");

  return country?.toLowerCase() || "";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip system paths
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
   * Root visit
   */
  if (pathname === "/") {
    const country = detectCountry(request);

    if (SUPPORTED_COUNTRIES.includes(country)) {
      url.pathname = `/${country}`;
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  /**
   * Validate country slug
   */
  const firstSegment = segments[0];

  if (!SUPPORTED_COUNTRIES.includes(firstSegment)) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  /**
   * Prevent nested routes
   * /us/eu → /us
   */
  if (segments.length > 1) {
    url.pathname = `/${firstSegment}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|robots.txt).*)"],
};
