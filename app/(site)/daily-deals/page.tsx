import React from "react";
import Link from "next/link";
import { ArrowRight, Flame, Star, Gift } from "lucide-react";
import { buildSEO, SEOOutput } from "@/components/SEO/seoEngine";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";
import TypingText from "@/components/typing/TypingText";

/* ================= CASHBACK OFFERS ================= */
const cashbackOffers = [
  {
    id: 1,
    title: "High Cashback Shopping",
    payout: "5% Cashback",
    badge: "Top",
    icon: <Star size={28} className="text-yellow-400" />,
  },
  {
    id: 2,
    title: "New Daily Offers",
    payout: "Up to 3% Cashback",
    badge: "New",
    icon: <Gift size={28} className="text-green-400" />,
  },
  {
    id: 3,
    title: "Limited-Time Cashback",
    payout: "Up to 10% Cashback",
    badge: "Hot",
    icon: <Flame size={28} className="text-red-400" />,
  },
  {
    id: 4,
    title: "Exclusive Cashback Deals",
    payout: "Up to 7% Cashback",
    badge: "Exclusive",
    icon: <Gift size={28} className="text-purple-400" />,
  },
];

/* ================= STATS ================= */
const stats = [
  { label: "Daily Active Users", value: "10K+" },
  { label: "Avg. Cashback Rate", value: "5-15%" },
  { label: "Total Paid Out", value: "$2.5M+" },
];

/* ================= SEO METADATA ================= */
export async function generateMetadata() {
  try {
    const seo: SEOOutput = await buildSEO({
      route: "/daily-deals",
      locale: SEO_CONFIG.defaultLocale,
    });

    return {
      ...seo.metadata,
      alternates: {
        canonical: seo.canonical,
        languages: seo.hreflang,
      },
      robots: seo.metadata?.robots,
    };
  } catch (error) {
    console.error("Metadata generation failed:", error);
    return {
      title: "Daily Deals - Cashog",
      description: "Discover today's best cashback offers and daily deals. Shop smart and earn rewards on every purchase.",
    };
  }
}

export default function DailyDeals() {
  return (
    <>
      <main className="bg-white dark:bg-[#070A14] text-gray-900 dark:text-white min-h-screen transition-colors duration-300">

        {/* ================= HERO ================= */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-3xl mx-auto">

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              Today’s Cashback Offers
            </h1>

            <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              <TypingText
                words={[
                  "High Cashback Rewards",
                  "Limited-Time Offers",
                  "Exclusive Cashback Deals",
                  "New Daily Cashback",
                ]}
              />
            </div>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Explore the best cashback offers updated daily. Shop, play, or complete tasks and earn instantly.
            </p>

            <div className="mt-8">
              <Link href="/signup" className="cta-observer inline-block">
                <span className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-10 py-4 rounded-2xl font-bold shadow-xl text-lg hover:opacity-90 transition-opacity">
                  Start Earning Now <ArrowRight size={20} />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-3 gap-4 mb-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/90 dark:bg-[#1A1F2B]/90 border rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-2xl md:text-4xl font-extrabold text-green-500">
                  {stat.value}
                </h3>
                <p className="mt-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= CASHBACK OFFERS GRID ================= */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
            Featured Cashback Deals
          </h2>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {cashbackOffers.map((offer) => (
              <div
                key={offer.id}
                className="relative bg-gray-100 dark:bg-[#1A1F2B] rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="absolute top-4 right-4 text-xs font-bold bg-yellow-400 text-black px-3 py-1 rounded-full">
                  {offer.badge}
                </div>

                <div className="mb-4">{offer.icon}</div>

                <h3 className="text-xl font-semibold mb-2">
                  {offer.title}
                </h3>

                <p className="text-lg font-bold text-yellow-500 mb-4">
                  {offer.payout}
                </p>

                <Link href="/signup">
                  <button className="w-full bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transition-opacity">
                    Claim Cashback
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="text-center py-24">
          <h2 className="text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
            Don’t Miss Today’s Cashback Offers
          </h2>

          <Link href="/signup">
            <span className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-xl hover:opacity-90 transition-opacity">
              Join & Start Earning <ArrowRight size={20} />
            </span>
          </Link>
        </section>

      </main>
    </>
  );
}
