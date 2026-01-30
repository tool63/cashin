import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cashog – Earn Rewards Online",
  description: "Earn money with surveys, apps, games, and offers on Cashog.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
