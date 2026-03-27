// app/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_KEYS } from "@/app/core/constants";
import { isValidCountryCode } from "@/app/core/countries";

export default async function RootPage() {
  const cookieStore = cookies();
  
  // Check if user has a saved country
  const savedCountry = cookieStore.get(COOKIE_KEYS.COUNTRY)?.value;
  
  // If user has a saved country and it's valid, redirect there
  if (savedCountry && isValidCountryCode(savedCountry)) {
    redirect(`/${savedCountry}`);
  }
  
  // Otherwise, redirect to global (no country prefix)
  // This will use the [country] layout with country="global"
  redirect("/global");
}
