// app/layout.tsx
import { redirect } from "next/navigation";
import { LanguageDetector, defaultLanguage } from "./[lang]/core/detector";

/**
 * Root layout automatically redirects users to their detected language.
 * Server-side only (no "use client"), so cookies and headers work.
 */
export default function RootLayout() {
  try {
    // Instantiate detector
    const detector = new LanguageDetector();

    // Detect language (cookie, Accept-Language, Geo-IP)
    const lang = detector.detect() || defaultLanguage;

    // Set persistent cookie for future visits
    detector.setCookie(lang);

    // Server-side redirect to the correct language route
    redirect(`/${lang}`);
  } catch (err) {
    console.error("[RootLayout] Language detection failed:", err);

    // Fallback to default language if detection fails
    redirect(`/${defaultLanguage}`);
  }
}
