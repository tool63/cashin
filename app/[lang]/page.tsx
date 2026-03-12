import dynamic from "next/dynamic";
import { buildSEO } from "@/components/SEO/seoEngine";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";
import SeoRenderer from "@/components/SEO/SeoRenderer";

import Background from "@/components/Background";
import FAQ from "@/components/faq/FAQ";

/* Homepage Sections */
import HeroSection from "@/components/homepage/HeroSection";
import FeaturesSection from "@/components/homepage/FeaturesSection";
import TasksSection from "@/components/homepage/TasksSection";
import HighPayingOffers from "@/components/homepage/HighPayingOffers";
import TrustSection from "@/components/homepage/TrustSection";
import PaymentSection from "@/components/homepage/PaymentSection";
import FinalCTASection from "@/components/homepage/FinalCTASection";
import StatsSection from "@/components/homepage/StatsSection";
import TestimonialSection from "@/components/homepage/TestimonialSection";

/* Animation Components */
import OpeningStyle from "@/components/animations/openingstyle";
import RevealWithBorder from "@/components/animations/CircleBorder";

/* Live Components */
const LiveJoining = dynamic(() => import("@/components/homepage/LiveJoining"), { ssr: false });
const LiveEarnings = dynamic(() => import("@/components/homepage/LiveEarnings"), { ssr: false });
const LiveOfferCompletion = dynamic(() => import("@/components/homepage/LiveOfferCompletion"), { ssr: false });
const LiveWithdrawals = dynamic(() => import("@/components/homepage/LiveWithdrawals"), { ssr: false });

export default async function HomePage({
  params,
}: {
  params: { lang: string };
}) {

  const lang = params?.lang ?? SEO_CONFIG.defaultLocale;

  const seo = await buildSEO({
    route: "/",
    locale: lang,
    title: "Earn Money Online",
    description:
      "Cashog is a premium rewards platform where users earn money online by completing surveys, playing games, testing apps, and finishing offers. Join millions of users earning real cash and gift cards daily.",
    keywords: [
      "earn money online",
      "make money completing tasks",
      "paid surveys online",
      "earn money playing games",
      "get paid for offers",
      "cash rewards platform",
      "make money online free",
      "best GPT sites",
      "earn paypal cash online",
      "earn gift cards online",
      "cashog rewards",
    ],
  });

  const handleOpenAuth = (type: "login" | "signup" | "reset") => {
    console.log("Open auth modal:", type);
  };

  return (
    <>
      <SeoRenderer seo={seo} />
      <Background />

      <main className="relative min-h-screen bg-transparent text-gray-900 dark:text-white">

        <OpeningStyle>
          <RevealWithBorder>
            <HeroSection onOpenAuth={handleOpenAuth} />
          </RevealWithBorder>
        </OpeningStyle>

        <OpeningStyle>
          <RevealWithBorder>
            <StatsSection />
          </RevealWithBorder>
        </OpeningStyle>

        <OpeningStyle>
          <RevealWithBorder>
            <LiveJoining />
          </RevealWithBorder>
        </OpeningStyle>

        <OpeningStyle>
          <RevealWithBorder>
            <LiveEarnings />
          </RevealWithBorder>
        </OpeningStyle>

        <OpeningStyle>
          <RevealWithBorder>
            <LiveOfferCompletion />
          </RevealWithBorder>
        </OpeningStyle>

        <OpeningStyle>
          <RevealWithBorder>
            <LiveWithdrawals />
          </RevealWithBorder>
        </OpeningStyle>

        <OpeningStyle>
          <RevealWithBorder>
            <FeaturesSection />
          </RevealWithBorder>
        </OpeningStyle>

        <OpeningStyle>
          <RevealWithBorder>
            <TasksSection />
          </RevealWithBorder>
        </OpeningStyle>

        <OpeningStyle>
          <RevealWithBorder>
            <HighPayingOffers />
          </RevealWithBorder>
        </OpeningStyle>

        <OpeningStyle>
          <RevealWithBorder>
            <TestimonialSection />
          </RevealWithBorder>
        </OpeningStyle>

        <OpeningStyle>
          <RevealWithBorder>
            <TrustSection />
          </RevealWithBorder>
        </OpeningStyle>

        <OpeningStyle>
          <RevealWithBorder>
            <PaymentSection />
          </RevealWithBorder>
        </OpeningStyle>

        <OpeningStyle>
          <RevealWithBorder>
            <section className="max-w-7xl mx-auto px-4 py-12 bg-transparent">
              <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-yellow-400 to-green-500 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h2>

              <FAQ
                faqs={[
                  { q: "How can I start earning money online?", a: "Simply sign up and start completing tasks." },
                  { q: "Is this website legit?", a: "Yes, we have paid millions to our users." },
                  { q: "How much can I earn?", a: "Active users earn $100-$500 monthly." },
                  { q: "Payment methods?", a: "PayPal, Payoneer, Bitcoin, and gift cards." },
                  { q: "Do I need to pay?", a: "No, joining is 100% free." },
                  { q: "Which countries are supported?", a: "Over 50 countries including US, UK, Canada." },
                  { q: "How fast are withdrawals?", a: "Usually within 24-48 hours." },
                ]}
              />

            </section>
          </RevealWithBorder>
        </OpeningStyle>

        <OpeningStyle>
          <RevealWithBorder>
            <FinalCTASection />
          </RevealWithBorder>
        </OpeningStyle>

        <div className="h-12"></div>

      </main>
    </>
  );
}
