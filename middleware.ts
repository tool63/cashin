// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ================================
// ✅ CENTRAL COUNTRY → LANGUAGE MAP
// Language codes in ALL UPPERCASE
// ================================
const COUNTRY_LANGUAGE_MAP: Record<string, string> = {
  us: "EN",
  uk: "EN",
  ca: "EN",
  au: "EN",
  in: "EN",
  fr: "FR",
  de: "DE",
  es: "ES",
  mx: "ES",
  br: "PT",
};

// Supported countries list
const SUPPORTED_COUNTRIES = Object.keys(COUNTRY_LANGUAGE_MAP);
const DEFAULT_COUNTRY = "us";
const COOKIE_NAME = "country";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year in seconds

// ================================
// 🔍 Detect country from headers
// Works across Cloudflare, Vercel, AWS
// ================================
function detectCountry(request: NextRequest): string {
  const headers = [
    "cf-ipcountry",
    "x-vercel-ip-country",
    "cloudfront-viewer-country",
  ];

  for (const header of headers) {
    const country = request.headers.get(header);
    if (country) return country.toLowerCase();
  }

  return "";
}

// ================================
// 🌐 Middleware main function
// ================================
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip assets, API, system routes, and files
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

  // ================================
  // ROOT PATH: Detect & redirect to country
  // ================================
  if (pathname === "/") {
    const detectedCountry = detectCountry(request);
    const country = SUPPORTED_COUNTRIES.includes(detectedCountry)
      ? detectedCountry
      : DEFAULT_COUNTRY;

    url.pathname = `/${country}`;

    const response = NextResponse.redirect(url);
    response.cookies.set(COOKIE_NAME, country, {
      path: "/",
      maxAge: COOKIE_MAX_AGE,
      sameSite: "lax",
      secure: true,
    });
    return response;
  }

  // ================================
  // Validate first path segment as country
  // ================================
  const countrySegment = segments[0];
  if (!SUPPORTED_COUNTRIES.includes(countrySegment)) {
    url.pathname = `/${DEFAULT_COUNTRY}${pathname}`;
    return NextResponse.redirect(url);
  }

  // ================================
  // Set country cookie for valid paths
  // ================================
  const response = NextResponse.next();
  response.cookies.set(COOKIE_NAME, countrySegment, {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
    secure: true,
  });

  return response;
}

// ================================
// ⚙️ Middleware matcher config
// Ignore _next, favicon, robots, sitemap
// ================================
export const config = {
  matcher: ["/((?!_next|favicon.ico|robots.txt|sitemap.xml).*)"],
};
