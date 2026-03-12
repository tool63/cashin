// app/layout.tsx
import { redirect } from "next/navigation";
import { LanguageDetector, defaultLanguage } from "./[lang]/core/detector";

/**
 * Root layout automatically redirects users to their detected language.
 * Uses LanguageDetector (cookie, Accept-Language, Geo-IP, fallback).
 */
export default function RootLayout() {
  try {
    const detector = new LanguageDetector();
    const lang = detector.detect() || defaultLanguage;

    // Optional: set cookie for first-time visitors
    detector.setCookie(lang);

    // Redirect to /[lang]
    redirect(`/${lang}`);
  } catch (err) {
    console.error("[RootLayout] Language detection failed:", err);
    // fallback to default language
    redirect(`/${defaultLanguage}`);
  }
}
