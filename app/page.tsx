// app/page.tsx
import { redirect } from "next/navigation";
import { LanguageDetector, defaultLanguage } from "./[lang]/core/detector";

export default function RootPage() {
  const detector = new LanguageDetector();
  const lang = detector.detect() || defaultLanguage;

  // Persist language in cookie
  detector.setCookie(lang);

  // Redirect to language-specific page
  redirect(`/${lang}`);
}
