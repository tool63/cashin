// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ===============================
// 🌐 Defaults & Config
// ===============================
const DEFAULT_COUNTRY = "us";
const DEFAULT_LANGUAGE = "en";
const SUPPORTED_LANGUAGES = ["en", "fr", "de"];
const PUBLIC_ROUTES = [
  "about", "contact", "blog", "faq", "terms", "privacy", "promo-codes", "daily-deals"
];

// Country → default language mapping (only 3 languages supported for now)
const COUNTRY_LANGUAGE_MAP: Record<string, string> = {
  us: "en", uk: "en", ca: "en", au: "en", in: "en",
  fr: "fr", de: "de", be: "fr", ch: "de", at: "de",
};

// List of all valid ISO 3166-1 alpha-2 country codes (for worldwide URL validation)
const VALID_COUNTRY_CODES = new Set([
  "us","uk","ca","au","in","fr","de","be","ch","at","bd","pk","jp","id","ph","br",
  // Add other country codes as needed
]);

// ===============================
// 🌍 Detect country from headers / IP
// ===============================
function detectCountry(request: NextRequest): string {
  const geo =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    request.headers.get("cloudfront-viewer-country");

  const code = geo ? geo.toLowerCase() : DEFAULT_COUNTRY;
  return VALID_COUNTRY_CODES.has(code) ? code : DEFAULT_COUNTRY;
}

// ===============================
// 🌐 Detect language
// Priority: cookie → accept-language → country map → default
// ===============================
function detectLanguage(request: NextRequest, country: string, preferCookie = true): string {
  // 1️⃣ Cookie
  if (preferCookie) {
    const cookieLang = request.cookies.get("NEXT_LOCALE")?.value;
    if (cookieLang) {
      const normalized = cookieLang.toLowerCase().split("-")[0];
      if (SUPPORTED_LANGUAGES.includes(normalized)) return normalized;
    }
  }

  // 2️⃣ Accept-Language header
  const acceptLang = request.headers.get("accept-language");
  if (acceptLang) {
    for (const lang of acceptLang.split(",").map(l => l.split(";")[0].trim())) {
      const short = lang.toLowerCase().split("-")[0];
      if (SUPPORTED_LANGUAGES.includes(short)) return short;
    }
  }

  // 3️⃣ Country map
  const mappedLang = COUNTRY_LANGUAGE_MAP[country];
  if (mappedLang && SUPPORTED_LANGUAGES.includes(mappedLang)) return mappedLang;

  // 4️⃣ Default
  return DEFAULT_LANGUAGE;
}

// ===============================
// 🚀 Middleware
// ===============================
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0]?.toLowerCase();
  const response = NextResponse.next();

  // ⛔ Skip system, API, or static files
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return response;
  }

  let country: string;
  let language: string;

  // -------------------------------
  // 1️⃣ Root URL "/" → global homepage
  // -------------------------------
  if (pathname === "/") {
    country = detectCountry(request);
    language = detectLanguage(request, country);

  // -------------------------------
  // 2️⃣ Public routes (no country prefix)
  // -------------------------------
  } else if (PUBLIC_ROUTES.includes(firstSegment || "")) {
    country = detectCountry(request);
    language = detectLanguage(request, country);

  // -------------------------------
  // 3️⃣ Country-prefixed URLs "/us/..."/"/fr/..."
  // -------------------------------
  } else if (firstSegment && /^[a-z]{2}$/.test(firstSegment) && VALID_COUNTRY_CODES.has(firstSegment)) {
    country = firstSegment;
    language = detectLanguage(request, country, true);

    // Campaign tracking for country-specific pages
    if (pathname.includes("/offers") || pathname.includes("/survey") || pathname.includes("/rewards")) {
      response.cookies.set("REWARD_CAMPAIGN_ACTIVE", "true", {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }

  // -------------------------------
  // 4️⃣ Unknown route → redirect to default country
  // -------------------------------
  } else {
    const redirectUrl = request.nextUrl.clone();
    const restPath = segments.join("/");
    redirectUrl.pathname = `/${DEFAULT_COUNTRY}/${restPath}`;
    return NextResponse.redirect(redirectUrl);
  }

  // -------------------------------
  // 🍪 Set cookies
  // -------------------------------
  response.cookies.set("NEXT_LOCALE", language, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });

  response.cookies.set("USER_COUNTRY", country, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  // -------------------------------
  // 🧪 A/B Testing
  // -------------------------------
  if (!request.cookies.get("AB_GROUP")) {
    const abGroup = Math.random() < 0.5 ? "A" : "B";
    response.cookies.set("AB_GROUP", abGroup, {
      path: "/",
      maxAge: 60 * 60 * 24 * 90, // 90 days
    });
  }

  // -------------------------------
  // 📊 Headers for frontend / analytics
  // -------------------------------
  response.headers.set("x-country", country);
  response.headers.set("x-language", language);

  // -------------------------------
  // ⚡ Cache headers (per user)
  // -------------------------------
  response.headers.set(
    "Cache-Control",
    "private, s-maxage=120, stale-while-revalidate=300"
  );

  return response;
}

// ===============================
// ⚙️ Matcher
// ===============================
export const config = {
  matcher: ["/((?!_next|favicon.ico|robots.txt|api).*)"],
};
