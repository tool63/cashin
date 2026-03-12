// app/layout.tsx
import { redirect } from "next/navigation";
import { LanguageDetector, defaultLanguage, SupportedLang } from "./[lang]/core/detector";

/**
 * Root layout automatically redirects users to their detected language.
 * Prevents redirect loops by only acting on the root path `/`.
 */
export default function RootLayout() {
  try {
    // Only redirect if the path is exactly `/`
    const currentPath = typeof window === "undefined" ? "/" : window.location.pathname;
    if (currentPath === "/" || currentPath === "") {

      // Instantiate language detector
      const detector = new LanguageDetector();

      // Detect preferred language
      const lang: SupportedLang = detector.detect() || defaultLanguage;

      // Persist language in cookie for future visits
      detector.setCookie(lang);

      // Server-side redirect to the language-specific route
      redirect(`/${lang}`);
    }

    // If path is already language-specific, just render normally
    return null;

  } catch (err) {
    console.error("[RootLayout] Language detection failed:", err);

    // Fallback to default language without loop
    redirect(`/${defaultLanguage}`);
  }
}
