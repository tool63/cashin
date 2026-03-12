import { redirect } from "next/navigation";
import { detectLanguage } from "./[lang]/core/detector";

export default function RootPage() {
  const lang = detectLanguage();

  redirect(`/${lang}`);
}
