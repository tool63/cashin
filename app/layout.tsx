// app/layout.tsx
import { redirect } from "next/navigation";

export default function RootLayout() {
  // Redirect to default language, e.g., "en"
  redirect("/en");
}
