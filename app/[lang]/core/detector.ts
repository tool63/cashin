// app/lang/core/detector.ts

import { cookies } from "next/headers";

export const supportedLanguages = ["en", "es", "fr", "de", "pt"];
export const defaultLanguage = "en";

export function detectLanguage(): string {

  const cookieStore = cookies();

  const langCookie = cookieStore.get("lang")?.value;

  if (langCookie && supportedLanguages.includes(langCookie)) {
    return langCookie;
  }

  return defaultLanguage;
}

export function setLanguageCookie(lang: string) {

  if (!supportedLanguages.includes(lang)) return;

  cookies().set("lang", lang, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

}
