// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ✅ Country → Primary Language mapping
// Use lowercase country codes for URL slug consistency
const COUNTRY_LANGUAGE_MAP: Record<string, string> = {
  us: "en",
  uk: "en",
  ca: "en",
  au: "en",
  in: "en",
  fr: "fr",
  de: "de",
  // Add more countries later
};

// ✅ Supported translations
const SUPPORTED_LANGUAGES = ["en", "fr", "de"];
const DEFAULT_COUNTRY = "us";
const DEFAULT_LANGUAGE = "en";

// 1️⃣ Generate hreflangs for SEO
export function generateHreflangs(pathname: string) {
  return Object.entries(COUNTRY_LANGUAGE_MAP).map(([country, lang]) => {
    const normalizedLang = lang.toLowerCase();
    const normalizedCountry = country.toUpperCase();
    const normalizedPath = pathname.startsWith(`/${country}`) ? pathname : `/${country}${pathname}`;
    return {
      href: `https://example.com${normalizedPath}`,
      hreflang: `${normalizedLang}-${normalizedCountry}`,
    };
  });
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ Skip static/system routes
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

  // 2️⃣ Detect country from headers or default
  const geoCountry =
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cloudfront-viewer-country");
  const detectedCountry = (geoCountry?.toLowerCase() || DEFAULT_COUNTRY);

  const redirectUrl = request.nextUrl.clone();

  // 3️⃣ Root path "/" → redirect to detected country
  if (pathname === "/") {
    redirectUrl.pathname = `/${detectedCountry}`;
    return NextResponse.redirect(redirectUrl);
  }

  // 4️⃣ URL has country slug
  if (segments.length > 0) {
    const countrySlug = segments[0].toLowerCase();

    // Redirect unknown country slug → default country
    if (!COUNTRY_LANGUAGE_MAP[countrySlug]) {
      redirectUrl.pathname = `/${DEFAULT_COUNTRY}${pathname}`;
      return NextResponse.redirect(redirectUrl);
    }

    // Normalize URL slug to lowercase
    if (segments[0] !== countrySlug) {
      redirectUrl.pathname = `/${countrySlug}${pathname.slice(segments[0].length + 1)}`;
      return NextResponse.redirect(redirectUrl);
    }

    // 5️⃣ Get language from country mapping
    const language = COUNTRY_LANGUAGE_MAP[countrySlug].toLowerCase(); // consistent lowercase

    // 6️⃣ Set language cookie for frontend / LanguageProvider
    const response = NextResponse.next();
    response.cookies.set("NEXT_LOCALE", language, {
      path: "/",
      httpOnly: true,
    });

    // 7️⃣ Hreflang header for SEO
    response.headers.set("x-hreflangs", JSON.stringify(generateHreflangs(pathname)));

    // 8️⃣ Gamification detection (reward campaigns)
    if (pathname.includes("/offers") || pathname.includes("/survey")) {
      response.cookies.set("REWARD_CAMPAIGN_ACTIVE", "true", { path: "/" });
    }

    // 9️⃣ Simple AB testing cookie
    const abGroup = Math.random() < 0.5 ? "A" : "B";
    response.cookies.set("AB_GROUP", abGroup, { path: "/" });

    // 10️⃣ Analytics headers
    response.headers.set("x-analytics-country", countrySlug);
    response.headers.set("x-analytics-language", language);

    // 11️⃣ Edge caching
    response.headers.set("Cache-Control", "public, s-maxage=60, stale-while-revalidate=120");

    return response;
  }

  return NextResponse.next();
}

// ✅ Apply middleware to all non-system paths
export const config = {
  matcher: ["/((?!_next|favicon.ico|robots.txt|api).*)"],
};
