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

export function generateHreflangs(pathname: string) {
  return Object.entries(COUNTRY_LANGUAGE_MAP).map(([country, lang]) => ({
    href: `https://example.com/${country}${pathname.replace(/^\/[a-z]{2}/, "")}`,
    hreflang: `${lang}-${country.toUpperCase()}`,
  }));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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
  const redirectUrl = request.nextUrl.clone();

  const geoCountry =
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-vercel-ip-country") ||
    DEFAULT_COUNTRY;

  const detectedCountry = geoCountry.toLowerCase();

  const safeCountry = COUNTRY_LANGUAGE_MAP[detectedCountry]
    ? detectedCountry
    : DEFAULT_COUNTRY;

  // Root → redirect to detected country
  if (pathname === "/") {
    redirectUrl.pathname = `/${safeCountry}`;
    return NextResponse.redirect(redirectUrl);
  }

  if (segments.length > 0) {
    const countrySlug = segments[0].toLowerCase();

    // Replace invalid country slug
    if (!COUNTRY_LANGUAGE_MAP[countrySlug]) {
      const restPath = pathname.split("/").slice(2).join("/");
      redirectUrl.pathname = `/${DEFAULT_COUNTRY}${restPath ? `/${restPath}` : ""}`;
      return NextResponse.redirect(redirectUrl);
    }

    const language = COUNTRY_LANGUAGE_MAP[countrySlug];

    const response = NextResponse.next();

    response.cookies.set("NEXT_LOCALE", language, {
      path: "/",
      httpOnly: true,
    });

    response.headers.set(
      "x-hreflangs",
      JSON.stringify(generateHreflangs(pathname))
    );

    if (pathname.includes("/offers") || pathname.includes("/survey")) {
      response.cookies.set("REWARD_CAMPAIGN_ACTIVE", "true", { path: "/" });
    }

    const abGroup = Math.random() < 0.5 ? "A" : "B";
    response.cookies.set("AB_GROUP", abGroup, { path: "/" });

    response.headers.set("x-analytics-country", countrySlug);
    response.headers.set("x-analytics-language", language);

    response.headers.set(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=120"
    );

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|robots.txt|api).*)"],
};
