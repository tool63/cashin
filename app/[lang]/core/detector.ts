// app/[lang]/core/detector.ts

import { cookies } from "next/headers";

export const supportedLanguages = ["en", "es", "fr", "de", "pt"]; // Add more if needed
export const defaultLanguage = "en";

/**
 * Detect language from:
 * 1. URL param (handled in [lang] route)
 * 2. Cookie
 * 3. Browser Accept-Language header
 */
export function detectLanguage(requestHeaders?: Headers): string {
  // 1️⃣ Check for cookie
  const cookieStore = cookies();
  const langCookie = cookieStore.get("lang")?.value;
  if (langCookie && supportedLanguages.includes(langCookie)) {
    return langCookie;
  }

  // 2️⃣ Check Accept-Language header if provided
  if (requestHeaders) {
    const acceptLang = requestHeaders.get("accept-language");
    if (acceptLang) {
      const langs = acceptLang.split(",").map((l) => l.split(";")[0].trim());
      const match = langs.find((l) => supportedLanguages.includes(l));
      if (match) return match;
    }
  }

  // 3️⃣ Fallback to default
  return defaultLanguage;
}

/**
 * Utility to set language cookie
 */
export function setLanguageCookie(lang: string) {
  if (!supportedLanguages.includes(lang)) return;
  cookies().set("lang", lang, { path: "/", maxAge: 60 * 60 * 24 * 365 }); // 1 year
}
