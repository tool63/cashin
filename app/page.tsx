// app/page.tsx
import { redirect } from "next/navigation";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";

export default function RootPage() {
  // Redirect root URL to default language
  redirect(`/${SEO_CONFIG.defaultLocale}`);
}
