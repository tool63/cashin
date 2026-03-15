// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COUNTRY_LANGUAGE_MAP: Record<string, string> = {
  us: "EN",
  uk: "EN",
  ca: "EN",
  au: "EN",
  in: "EN",
  fr: "FR",
  de: "DE",
};

const SUPPORTED_COUNTRIES = Object.keys(COUNTRY_LANGUAGE_MAP);

export function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  // Skip system routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt"
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);

  // Detect geo country
  const geoCountry =
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cloudfront-viewer-country");

  const detectedCountry = geoCountry?.toLowerCase() || "";

  let redirectUrl = request.nextUrl.clone();

  // Case 1: Root path
  if (pathname === "/") {
    if (SUPPORTED_COUNTRIES.includes(detectedCountry)) {
      redirectUrl.pathname = `/${detectedCountry}`;
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next();
  }

  // Case 2: Has slug
  if (segments.length > 0) {
    const slug = segments[0];

    if (!SUPPORTED_COUNTRIES.includes(slug)) {
      // Redirect unknown country slug to default (us)
      redirectUrl.pathname = `/us${pathname}`;
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|robots.txt|api).*)"],
};
