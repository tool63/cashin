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
      <body className="relative">

        {/* GLOBAL BACKGROUND */}
        <Background />

        <RootProviders>
          <div className="relative z-10 flex flex-col min-h-screen">

            {/* HEADER - fully transparent, outside container */}
            <Header className="border-b border-theme bg-transparent backdrop-blur-none w-full fixed top-0 left-0 z-20" />

            {/* MAIN CONTENT */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-32 pb-16 relative z-10">
              {children}
            </main>

            {/* FOOTER - fully transparent */}
            <Footer className="bg-transparent backdrop-blur-none w-full relative z-10" />

          </div>

          {/* FLOATING CTA */}
          <div className="fixed bottom-6 right-6 z-50">
            <FloatingCTA />
          </div>

        </RootProviders>

      </body>
    </html>
  );
}
