// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  supportedLanguages,
  defaultLanguage,
  countryLangMap,
} from "./app/core/i18n/config";

function normalizeLanguage(lang?: string | null) {
  if (!lang) return null;

  const code = lang.toLowerCase().split("-")[0];

  return supportedLanguages.includes(code as any) ? code : null;
}

function detectLanguage(request: NextRequest) {
  const cookieLang = normalizeLanguage(request.cookies.get("lang")?.value);

  if (cookieLang) return cookieLang;

  const acceptLang = request.headers.get("accept-language");

  if (acceptLang) {
    const langs = acceptLang.split(",").map((l) => l.split(";")[0]);

    for (const lang of langs) {
      const normalized = normalizeLanguage(lang);

      if (normalized) return normalized;
    }
  }

  const country =
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-vercel-ip-country");

  if (country && countryLangMap[country]) {
    return countryLangMap[country];
  }

  return defaultLanguage;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return;
  }

  const pathnameHasLang = supportedLanguages.some((lang) =>
    pathname.startsWith(`/${lang}`)
  );

  if (pathnameHasLang) return;

  const lang = detectLanguage(request);

  const url = request.nextUrl.clone();

  url.pathname = `/${lang}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
