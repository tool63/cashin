import { ReactNode } from "react";
import ThemeProviderWrapper from "./providers/ThemeProviderWrapper";
import LanguageProvider from "./providers/LanguageProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface CountryLayoutProps {
  children: ReactNode;
}

export default function CountryLayout({ children }: CountryLayoutProps) {
  return (
    <ThemeProviderWrapper>
      <LanguageProvider>
        <Header />

        <main className="min-h-screen pt-20 bg-bg-secondary dark:bg-bg-primary">
          {children}
        </main>

        <Footer />
      </LanguageProvider>
    </ThemeProviderWrapper>
  );
}
