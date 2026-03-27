import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_KEYS } from "@/app/core/constants";

export default function RootPage() {
  const cookieStore = cookies();

  const savedCountry =
    cookieStore.get(COOKIE_KEYS.COUNTRY)?.value || "/";

  // Redirect to country route
  redirect(`/${savedCountry}`);
}
