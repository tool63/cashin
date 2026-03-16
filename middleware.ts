// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COUNTRY_LANGUAGE_MAP: Record<string, string> = {
  us: "en",
  uk: "en",
  ca: "en",
  au: "en",
  in: "en",
  fr: "fr",
  de: "de",
};

const DEFAULT_COUNTRY = "us";

/**
 * Detect visitor country from CDN headers
 */
function detectCountry(request: NextRequest) {
  const geo =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry");

  const country = geo?.toLowerCase();

  return COUNTRY_LANGUAGE_MAP[country || ""]
    ? country
    : DEFAULT_COUNTRY;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /**
   * Skip system files
   */
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const redirectUrl = request.nextUrl.clone();

  /**
   * ROOT → redirect to detected country
   */
  if (pathname === "/") {
    const country = detectCountry(request);
    redirectUrl.pathname = `/${country}`;
    return NextResponse.redirect(redirectUrl);
  }

  /**
   * Validate country slug
   */
  const countrySlug = segments[0]?.toLowerCase();

  if (!COUNTRY_LANGUAGE_MAP[countrySlug]) {
    const restPath = segments.slice(1).join("/");
    redirectUrl.pathname = `/${DEFAULT_COUNTRY}${restPath ? `/${restPath}` : ""}`;
    return NextResponse.redirect(redirectUrl);
  }

  /**
   * Set language cookie
   */
  const language = COUNTRY_LANGUAGE_MAP[countrySlug];
  const response = NextResponse.next();

  response.cookies.set("NEXT_LOCALE", language, {
    path: "/",
    httpOnly: true,
  });

  /**
   * Reward campaign detection
   */
  if (pathname.includes("/offers") || pathname.includes("/survey")) {
    response.cookies.set("REWARD_CAMPAIGN_ACTIVE", "true", { path: "/" });
  }

  /**
   * Simple A/B testing
   */
  if (!request.cookies.get("AB_GROUP")) {
    const abGroup = Math.random() < 0.5 ? "A" : "B";
    response.cookies.set("AB_GROUP", abGroup, { path: "/" });
  }

  /**
   * Analytics headers
   */
  response.headers.set("x-country", countrySlug);
  response.headers.set("x-language", language);

  /**
   * Edge cache optimization
   */
  response.headers.set(
    "Cache-Control",
    "public, s-maxage=120, stale-while-revalidate=300"
  );

  return response;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|robots.txt|api).*)"],
};
