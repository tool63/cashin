import { redirect } from "next/navigation";

export default function RootPage() {
  // Redirect root URL to default language page, e.g., /en
  redirect("/en");
}
