// app/layout.tsx
import "@/styles/globals.css"; // Correct path
import { ReactNode } from "react";

export const metadata = {
  title: "Cashog",
  description: "Earn rewards online with Cashog",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        {children}
      </body>
    </html>
  );
}
