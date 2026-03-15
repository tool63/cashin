// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Country → Language mapping
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
const DEFAULT_COUNTRY = "us";

/**
 * Detect user country from headers
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

  /**
   * Skip system routes
   */
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  const segments = pathname.split("/").filter(Boolean);

  /**
   * ROOT VISIT → Detect country
   */
  if (pathname === "/") {
    const detectedCountry = detectCountry(request);

    const country = SUPPORTED_COUNTRIES.includes(detectedCountry)
      ? detectedCountry
      : DEFAULT_COUNTRY;

    url.pathname = `/${country}`;

    const response = NextResponse.redirect(url);

    response.cookies.set("country", country, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });

    return response;
  }

  /**
   * If first segment is NOT a country
   * redirect to default country
   */
  const country = segments[0];

  if (!SUPPORTED_COUNTRIES.includes(country)) {
    url.pathname = `/${DEFAULT_COUNTRY}${pathname}`;
    return NextResponse.redirect(url);
  }

  /**
   * Store country cookie
   */
  const response = NextResponse.next();

  response.cookies.set("country", country, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|robots.txt|sitemap.xml).*)"],
};
