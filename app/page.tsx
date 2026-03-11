// app/page.tsx
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/en"); // redirect root to English page
}
