// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { countryLangMap, defaultLanguage } from "@/app/core/i18n/config";

const COOKIE_NAME = "country";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

// Supported countries (lowercase for URL paths)
const SUPPORTED_COUNTRIES = Object.keys(countryLangMap).map((c) => c.toLowerCase());
const DEFAULT_COUNTRY = defaultLanguage.toLowerCase();

// Detect country from headers (Cloudflare, Vercel, AWS)
function detectCountry(request: NextRequest): string {
  const headersToCheck = ["cf-ipcountry", "x-vercel-ip-country", "cloudfront-viewer-country"];
  for (const header of headersToCheck) {
    const country = request.headers.get(header);
    if (country) return country.toLowerCase();
  }
  return "";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.startsWith("/static") || pathname.includes(".")) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  const segments = pathname.split("/").filter(Boolean);

  // Root redirect to detected country
  if (pathname === "/") {
    const detected = detectCountry(request);
    const country = SUPPORTED_COUNTRIES.includes(detected) ? detected : DEFAULT_COUNTRY;
    url.pathname = `/${country}`;
    const response = NextResponse.redirect(url);
    response.cookies.set(COOKIE_NAME, country, { path: "/", maxAge: COOKIE_MAX_AGE, sameSite: "lax", secure: true });
    return response;
  }

  // Validate first segment
  const countrySegment = segments[0];
  if (!SUPPORTED_COUNTRIES.includes(countrySegment)) {
    url.pathname = `/${DEFAULT_COUNTRY}${pathname}`;
    return NextResponse.redirect(url);
  }

  const response = NextResponse.next();
  response.cookies.set(COOKIE_NAME, countrySegment, { path: "/", maxAge: COOKIE_MAX_AGE, sameSite: "lax", secure: true });

  return response;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|robots.txt|sitemap.xml).*)"],
};
