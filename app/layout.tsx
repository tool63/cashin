// app/layout.tsx
import { redirect } from "next/navigation";
import { LanguageDetector, defaultLanguage } from "./[lang]/core/detector";

/**
 * Root layout automatically redirects users to their detected language.
 * Uses LanguageDetector (cookie, Accept-Language, Geo-IP, fallback).
 */
export default function RootLayout() {
  try {
    // Instantiate detector (server-side)
    const detector = new LanguageDetector();

    // Detect the language
    const lang = detector.detect() || defaultLanguage;

    // Set persistent cookie for next visits
    detector.setCookie(lang);

    // Server-side redirect to /[lang] route
    redirect(`/${lang}`);
  } catch (err) {
    console.error("[RootLayout] Language detection failed:", err);

    // Fallback to default language if detection fails
    redirect(`/${defaultLanguage}`);
  }
}
