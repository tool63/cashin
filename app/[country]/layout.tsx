import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "./providers/LanguageProvider"; // your country provider

interface CountryLayoutProps {
  children: ReactNode;
}

export default function CountryLayout({ children }: CountryLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
        <ThemeProvider attribute="class" enableSystem={true}>
          <LanguageProvider>
            <Header />
            <main className="min-h-screen pt-20">{children}</main> {/* pt-20 to offset fixed header */}
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
