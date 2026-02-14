"use client";

import { useEffect } from "react";
import { ArrowRight, ShoppingBasket, Leaf, Sparkles, Percent } from "lucide-react";
import { useCTA } from "@/components/global/GlobalCTA";
import TypingText from "@/components/ui/TypingText";

export default function GroceryRewardsPage() {
  const { openCTA } = useCTA();

  // CTA Observer Logic
  useEffect(() => {
    const sections = document.querySelectorAll(".cta-observer");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            openCTA();
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, [openCTA]);

  const offers = [
    {
      title: "Supermarket Cashback",
      reward: "Up to 12% Cashback",
      desc: "Earn premium grocery cashback at top supermarkets and hypermarkets.",
      icon: <ShoppingBasket size={28} />,
    },
    {
      title: "Organic & Health Stores",
      reward: "Up to 15% Rewards",
      desc: "Cashback on organic, vegan & wellness grocery purchases.",
      icon: <Leaf size={28} />,
    },
    {
      title: "Weekly Essentials Bonus",
      reward: "Extra ₹500 Bonus",
      desc: "Unlock weekly reward bonuses on everyday grocery shopping.",
      icon: <Sparkles size={28} />,
    },
    {
      title: "Bulk Purchase Deals",
      reward: "Flat 10% Back",
      desc: "Higher savings on bulk purchases & monthly stock-up orders.",
      icon: <Percent size={28} />,
    },
  ];

  return (
    <main className="relative overflow-hidden bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-500">

      {/* ===== HERO SECTION ===== */}
      <section className="relative py-24 px-6 text-center cta-observer">
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-white to-yellow-100 dark:from-green-950 dark:via-black dark:to-yellow-950 opacity-60 blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto animate-fadeInUp">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Premium Grocery
            <span className="block bg-gradient-to-r from-green-500 via-yellow-400 to-green-600 bg-clip-text text-transparent">
              Shopping Rewards
            </span>
          </h1>

          <div className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300">
            <TypingText
              texts={[
                "Earn cashback on every grocery purchase.",
                "Unlock premium supermarket rewards.",
                "Save more on daily essentials.",
              ]}
            />
          </div>

          <button
            onClick={openCTA}
            className="mt-10 inline-flex items-center gap-2 bg-gradient-to-r from-green-500 via-yellow-400 to-green-600 text-black font-semibold px-10 py-4 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300"
          >
            Start Saving Now <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* ===== OFFERS GRID ===== */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {offers.map((offer, index) => (
            <div
              key={index}
              className="group relative bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className="text-green-500 mb-4">{offer.icon}</div>

              <h3 className="text-xl font-semibold mb-2">
                {offer.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {offer.desc}
              </p>

              <div className="font-bold text-lg bg-gradient-to-r from-green-500 to-yellow-400 bg-clip-text text-transparent">
                {offer.reward}
              </div>

              <button
                onClick={openCTA}
                className="mt-6 w-full bg-gradient-to-r from-green-500 via-yellow-400 to-green-600 text-black py-3 rounded-xl font-medium shadow-lg hover:scale-105 transition-all duration-300"
              >
                Activate Offer
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURE SECTION ===== */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-white/5 transition-colors duration-500">
        <div className="max-w-5xl mx-auto text-center cta-observer">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Smart Grocery Savings
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
            Earn consistent cashback on every supermarket visit.
            Stack bonuses, unlock seasonal multipliers, and
            maximize savings with our advanced grocery reward system.
          </p>

          <button
            onClick={openCTA}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 via-yellow-400 to-green-600 text-black font-semibold px-10 py-4 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300"
          >
            Unlock Grocery Rewards <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* ===== FINAL CTA SECTION ===== */}
      <section className="py-24 px-6 text-center cta-observer">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Turn Everyday Grocery Into Real Cashback
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-10">
            Don’t miss out on premium supermarket offers.
            Activate rewards and start earning instantly.
          </p>

          <button
            onClick={openCTA}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 via-yellow-400 to-green-600 text-black font-semibold px-10 py-4 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300"
          >
            Claim Grocery Cashback <ArrowRight size={20} />
          </button>
        </div>
      </section>

    </main>
  );
}
