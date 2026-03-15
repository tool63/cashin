// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ✅ Country → Primary Language mapping
const COUNTRY_LANGUAGE_MAP: Record<string, string> = {
  us: "EN",
  uk: "EN",
  ca: "EN",
  au: "EN",
  in: "EN",
  fr: "FR",
  de: "DE",
  // Add more countries easily
};

// ✅ Supported translations
const SUPPORTED_LANGUAGES = ["EN", "FR", "DE"];
const DEFAULT_COUNTRY = "us";
const DEFAULT_LANGUAGE = "EN";

// 1️⃣ Hreflang generator for all countries (for SEO integration)
export function generateHreflangs(pathname: string) {
  return Object.entries(COUNTRY_LANGUAGE_MAP).map(([country, lang]) => {
    const normalizedLang = lang.toLowerCase();
    const normalizedCountry = country.toUpperCase();
    return {
      href: `https://example.com/${country}${pathname !== "/" ? pathname : ""}`,
      hreflang: `${normalizedLang}-${normalizedCountry}`,
    };
  });
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ Skip system routes
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

  // 2️⃣ Country detection from headers (URL, IP, CDN)
  const geoCountry =
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cloudfront-viewer-country");

  const detectedCountry = geoCountry?.toLowerCase() || DEFAULT_COUNTRY;

  // Clone URL for redirect
  let redirectUrl = request.nextUrl.clone();

  // 3️⃣ Root path "/"
  if (pathname === "/") {
    redirectUrl.pathname = COUNTRY_LANGUAGE_MAP[detectedCountry]
      ? `/${detectedCountry}`
      : `/${DEFAULT_COUNTRY}`;
    return NextResponse.redirect(redirectUrl);
  }

  // 4️⃣ URL has country slug
  if (segments.length > 0) {
    const countrySlug = segments[0].toLowerCase();

    // Redirect unknown country slug → default
    if (!Object.keys(COUNTRY_LANGUAGE_MAP).includes(countrySlug)) {
      redirectUrl.pathname = `/${DEFAULT_COUNTRY}${pathname}`;
      return NextResponse.redirect(redirectUrl);
    }

    // Normalize URL slug to lowercase
    if (segments[0] !== countrySlug) {
      redirectUrl.pathname = `/${countrySlug}${pathname.slice(segments[0].length + 1)}`;
      return NextResponse.redirect(redirectUrl);
    }

    // 5️⃣ Language detection + fallback
    const countryLang = COUNTRY_LANGUAGE_MAP[countrySlug] || DEFAULT_LANGUAGE;
    const language = countryLang.toUpperCase();

    // 6️⃣ Set language cookie for LanguageProvider
    const response = NextResponse.next();
    response.cookies.set("NEXT_LOCALE", language, {
      path: "/",
      httpOnly: true,
    });

    // 7️⃣ Hreflang header for SEO integration (optional, used in SeoRenderer)
    response.headers.set("x-hreflangs", JSON.stringify(generateHreflangs(pathname)));

    // 8️⃣ Gamification detection (e.g., reward campaigns)
    // Could integrate a header flag or cookie
    if (pathname.includes("/offers") || pathname.includes("/survey")) {
      response.cookies.set("REWARD_CAMPAIGN_ACTIVE", "true", { path: "/" });
    }

    // 9️⃣ AB testing / campaign redirect hooks
    // Example: user in test group redirected to special offer
    const abGroup = Math.random() < 0.5 ? "A" : "B"; // simple random example
    response.cookies.set("AB_GROUP", abGroup, { path: "/" });

    // ✅ Analytics hook
    response.headers.set("x-analytics-country", countrySlug);
    response.headers.set("x-analytics-language", language);

    // ✅ Edge-ready: caching headers for performance
    response.headers.set("Cache-Control", "public, s-maxage=60, stale-while-revalidate=120");

    return response;
  }

  return NextResponse.next();
}

// ✅ Apply to all paths except system routes
export const config = {
  matcher: ["/((?!_next|favicon.ico|robots.txt|api).*)"],
};
