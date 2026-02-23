"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SeoEngine from "@/components/seo/SeoEngine";
import Background from "@/components/Background";
import Reveal from "@/components/animations/Reveal";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import TypingText from "@/components/typing/TypingText";
import {
  ClipboardList,
  Star,
  Gift,
  User,
} from "lucide-react";

/* ================= OFFER TYPE ================= */
type Offer = {
  id: number;
  title: string;
  category: string;
  reward: string;
  popularity: number;
};

/* ================= SAMPLE DATA (9 OFFERS) ================= */
const offers: Offer[] = [
  { id: 1, title: "Install MegaApp", category: "App Install", reward: "$3", popularity: 90 },
  { id: 2, title: "Complete Quick Survey", category: "Survey", reward: "$2", popularity: 85 },
  { id: 3, title: "Watch Promo Video", category: "Video", reward: "$1", popularity: 70 },
  { id: 4, title: "Sign Up for Newsletter", category: "Signup", reward: "$2.5", popularity: 60 },
  { id: 5, title: "Download Game X", category: "App Install", reward: "$4", popularity: 95 },
  { id: 6, title: "Refer a Friend", category: "Referral", reward: "$5", popularity: 80 },
  { id: 7, title: "Complete Daily Task", category: "Task", reward: "$1.5", popularity: 75 },
  { id: 8, title: "Premium Trial Signup", category: "Trial", reward: "$3.5", popularity: 88 },
  { id: 9, title: "Download Finance App", category: "Finance", reward: "$4.5", popularity: 92 },
];

/* ================= COUNT UP ================= */
function CountUp({ end }: { end: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000;
          const increment = end / (duration / 16);

          const counter = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(counter);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <div ref={ref}>{count.toLocaleString()}</div>;
}

/* ================= STATS ================= */
const stats = [
  { label: "Total Offers", number: 3200 },
  { label: "Active Users", number: 15000 },
  { label: "Average Reward", number: 3.7 },
];

/* ================= PAGE ================= */
export default function OfferWallPage() {
  return (
    <>
      <SeoEngine
        title="Premium Reward Marketplace | Cashog"
        description="Enterprise-grade digital earning platform powered by high-value curated opportunities."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">

          {/* ================= HERO ================= */}
          <Reveal>
            <div className="text-center mb-24">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
                Premium Reward Marketplace
              </h1>

              <div className="text-3xl md:text-4xl font-extrabold gradient-text mb-6">
                <TypingText />
              </div>

              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
                Enterprise-grade digital earning platform engineered for performance, trust, and scalability.
              </p>

              <PrimaryCTA href="/signup">
                Activate Access
              </PrimaryCTA>
            </div>
          </Reveal>

          {/* ================= OFFERS ================= */}
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
                Curated High-Value Opportunities
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Access verified premium campaigns designed to maximize your earning potential.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 mb-28">
            {offers.map((offer) => (
              <Reveal key={offer.id}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="bg-white/80 dark:bg-[#0c111b]/80 backdrop-blur-xl
                  border border-gray-200 dark:border-gray-800
                  rounded-2xl p-6 shadow-sm hover:shadow-xl
                  transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <ClipboardList className="text-yellow-500 w-5 h-5" />
                      <span className="text-xs px-3 py-1 rounded-full
                        bg-yellow-500/10 text-yellow-600 dark:text-yellow-400
                        border border-yellow-500/20">
                        {offer.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold mb-2">
                      {offer.title}
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      Reward: <span className="text-green-500 font-semibold">{offer.reward}</span>
                    </p>

                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-2 bg-gradient-to-r from-yellow-400 to-green-400 rounded-full"
                        style={{ width: `${offer.popularity}%` }}
                      />
                    </div>

                    <p className="text-xs text-gray-500 mt-2">
                      {offer.popularity}% Popular
                    </p>
                  </div>

                  <div className="mt-6">
                    <a
                      href="/signup"
                      className="inline-flex items-center justify-center
                      px-5 py-2 text-sm font-semibold rounded-xl
                      bg-gradient-to-r from-yellow-400 to-green-400
                      text-black shadow-md hover:shadow-lg
                      transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      Claim Offer
                    </a>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* ================= STATS (FIXED SAME LAYOUT ALL DEVICES) ================= */}
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
                Platform Performance Metrics
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Real-time growth insights powered by our global reward infrastructure.
              </p>
            </div>
          </Reveal>

          {/* 👇 Always 3 columns even on mobile */}
          <div className="grid grid-cols-3 gap-4 mb-28">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white/80 dark:bg-[#0c111b]/80 backdrop-blur-xl
                border border-gray-200 dark:border-gray-800
                rounded-2xl p-6 text-center shadow-sm hover:shadow-lg
                transition-all duration-300"
              >
                <h3 className="text-2xl md:text-4xl font-extrabold text-green-500">
                  <CountUp end={stat.number} />
                  {stat.label === "Average Reward" && "$"}
                </h3>
                <p className="mt-2 text-xs md:text-base text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ================= FINAL CTA ================= */}
          <Reveal>
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                Activate Your Earning Potential
              </h2>

              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                Join a next-generation reward ecosystem trusted by thousands worldwide.
              </p>

              <PrimaryCTA href="/signup">
                Join Cashog Today
              </PrimaryCTA>
            </div>
          </Reveal>

        </section>
      </main>
    </>
  );
}
