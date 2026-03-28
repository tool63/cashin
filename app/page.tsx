// app/page.tsx
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isValidCountryCode } from "@/app/core/countries";

function getCountryFromHeaders(): string | null {
  const h = headers();

  // Works on Vercel / Cloudflare
  const country =
    h.get("x-vercel-ip-country") ||
    h.get("cf-ipcountry");

  return country?.toLowerCase() || null;
}

export default function RootPage() {
  const detectedCountry = getCountryFromHeaders();

  // If valid → redirect to country page
  if (detectedCountry && isValidCountryCode(detectedCountry)) {
    redirect(`/${detectedCountry}`);
  }

  // Fallback (unknown country)
  redirect("/bd"); // or your preferred default
}
