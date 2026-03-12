import { redirect } from "next/navigation";
import { LanguageDetector, defaultLanguage } from "./[lang]/core/detector";

export default function RootPage() {
  const detector = new LanguageDetector();
  const lang = detector.detect() || defaultLanguage;

  detector.setCookie(lang);

  redirect(`/${lang}`);
}
