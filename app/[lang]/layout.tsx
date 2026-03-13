// app/[lang]/layout.tsx

import { ReactNode } from "react";
import { notFound } from "next/navigation";

import { supportedLanguages } from "@/app/core/i18n/config";

import RootProviders from "./providers/RootProviders";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/cta/FloatingCTA";
import Background from "@/components/Background";

interface LangLayoutProps {
  children: ReactNode;
  params: { lang: string };
}

export function generateStaticParams() {
  return supportedLanguages.map((lang) => ({
    lang,
  }));
}

export default function LangLayout({
  children,
  params,
}: LangLayoutProps) {
  const lang = params.lang;

  if (!supportedLanguages.includes(lang as any)) {
    notFound();
  }

  return (
    <html lang={lang}>
      <body className="bg-primary">

        <Background />

        <RootProviders>
          <div className="flex flex-col min-h-screen relative z-10">

            {/* Remove bg-transparent, use header-gradient */}
            <Header className="border-b border-theme header-gradient" />

            <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-24 pb-16">
              {children}
            </main>

            <Footer className="bg-primary" />

          </div>

          <div className="fixed bottom-6 right-6 z-50">
            <FloatingCTA />
          </div>

        </RootProviders>

      </body>
    </html>
  );
}
