// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  supportedLanguages,
  defaultLanguage,
  countryLangMap,
} from "./app/core/i18n/config";

/**
 * Normalize language code
 * Example:
 * en-US -> en
 * fr-CA -> fr
 */
function normalizeLanguage(lang?: string | null) {
  if (!lang) return null;

  const code = lang.toLowerCase().split("-")[0];

  return supportedLanguages.includes(code as any) ? code : null;
}

/**
 * Detect language from request
 */
function detectLanguage(request: NextRequest) {
  /* 1️⃣ Cookie preference */
  const cookieLang = normalizeLanguage(request.cookies.get("lang")?.value);

  if (cookieLang) {
    return cookieLang;
  }

  /* 2️⃣ Accept-Language header */
  const acceptLang = request.headers.get("accept-language");

  if (acceptLang) {
    const langs = acceptLang
      .split(",")
      .map((lang) => lang.split(";")[0].trim());

    for (const lang of langs) {
      const normalized = normalizeLanguage(lang);

      if (normalized) {
        return normalized;
      }
    }
  }

  /* 3️⃣ Geo-IP country detection */
  const country =
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cloudfront-viewer-country");

  if (country && countryLangMap[country]) {
    return countryLangMap[country];
  }

  /* 4️⃣ Default fallback */
  return defaultLanguage;
}

/**
 * Middleware handler
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /* Skip Next.js internal routes */
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return;
  }

  /* Check if path already contains language */
  const pathnameHasLang = supportedLanguages.some((lang) =>
    pathname.startsWith(`/${lang}`)
  );

  if (pathnameHasLang) {
    return;
  }

  /* Detect language */
  const lang = detectLanguage(request);

  /* Redirect to localized path */
  const url = request.nextUrl.clone();

  url.pathname = `/${lang}${pathname}`;

  return NextResponse.redirect(url);
}

/**
 * Middleware matcher
 */
export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
