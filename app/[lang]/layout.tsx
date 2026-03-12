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

  /* ---------- HEADER & FOOTER GRADIENT LOGIC ---------- */
  // Same as footer, light/dark aware gradient
  const headerFooterBg = `
    bg-gradient-to-br
    from-yellow-400/20 via-green-400/30 to-green-500/20
    dark:from-yellow-500/10 dark:via-green-700/20 dark:to-green-800/20
  `;

  return (
    <html lang={lang}>
      <body>
        <Background />

        <RootProviders>
          <div className="flex flex-col min-h-screen relative z-10">

            {/* HEADER */}
            <Header className={`${headerFooterBg} border-b border-theme`} />

            {/* MAIN CONTENT */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-24 pb-16">
              {children}
            </main>

            {/* FOOTER */}
            <Footer className={headerFooterBg} />

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
