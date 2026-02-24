"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SeoEngine from "@/components/seo/SeoEngine";
import Background from "@/components/Background";
import TypingText from "@/components/typing/TypingText";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";
import {
  Eye,
  Star,
  Gift,
  User,
  Users,
  TrendingUp,
  DollarSign,
} from "lucide-react";

/* ================= AD TYPE ================= */
type Ad = {
  id: number;
  title: string;
  category: string;
  reward: string;
  popularity: number;
};

/* ================= ADS ================= */
const ads: Ad[] = [
  { id: 1, title: "Watch Tech Ad", category: "Technology", reward: "$0.5", popularity: 90 },
  { id: 2, title: "Fashion Brand Video", category: "Fashion", reward: "$1", popularity: 85 },
  { id: 3, title: "Food & Beverages Clip", category: "Food", reward: "$0.8", popularity: 80 },
  { id: 4, title: "Travel Destination Promo", category: "Travel", reward: "$1.2", popularity: 88 },
  { id: 5, title: "Gaming Trailer", category: "Gaming", reward: "$1", popularity: 95 },
  { id: 6, title: "Fitness Campaign Video", category: "Health", reward: "$0.6", popularity: 75 },
  { id: 7, title: "Mobile App Promo", category: "Apps", reward: "$0.9", popularity: 83 },
  { id: 8, title: "E-commerce Deal Ad", category: "Shopping", reward: "$1.1", popularity: 89 },
  { id: 9, title: "Streaming Service Trailer", category: "Entertainment", reward: "$1.3", popularity: 92 },
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
  { label: "Total Ads", number: 850, icon: <Eye className="w-6 h-6 text-green-400" /> },
  { label: "Active Watchers", number: 12000, icon: <Users className="w-6 h-6 text-green-400" /> },
  { label: "Average Reward ($)", number: 0.9, icon: <DollarSign className="w-6 h-6 text-green-400" /> },
];

/* ================= FAQ QUESTIONS ================= */
const faqs = [
  { q: "Is watching ads free?", a: "Yes. You can watch ads and earn rewards without any cost." },
  { q: "How fast are payouts?", a: "Most payouts are processed instantly or within a few hours." },
  { q: "How much can I earn?", a: "Earnings depend on the number of ads you watch." },
  { q: "Do I need special skills?", a: "No. Anyone can watch ads and earn rewards." },
  { q: "Can I use mobile?", a: "Yes. The platform works on phones and tablets." },
  { q: "Why was my reward not credited?", a: "Make sure you watched the ad fully before claiming." },
  { q: "What payment methods are available?", a: "We support multiple digital payout methods." },
];

export default function WatchAdsPage() {
  return (
    <>
      <SeoEngine
        title="Watch Ads | Cashog"
        description="Earn rewards by watching premium ads."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        {/* HERO */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
          <Reveal>
            <>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                Watch Ads & Earn Instantly
              </h1>

              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold gradient-text mb-6">
                <TypingText />
              </div>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-10">
                Engage with premium ad content and earn cash instantly for every video you watch.
              </p>

              <PrimaryCTA href="/signup">
                Start Watching Ads
              </PrimaryCTA>
            </>
          </Reveal>
        </section>

        {/* ADS GRID */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
          <Reveal>
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                Featured Ads
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
                Watch ads and earn rewards
              </p>
            </>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {ads.map((ad) => (
              <Reveal key={ad.id}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border shadow-md flex flex-col"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Eye className="text-green-400 w-5 h-5" />
                    <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                      {ad.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold mb-2">{ad.title}</h3>

                  <div className="w-full bg-gray-200 dark:bg-zinc-700 h-2 rounded-full mt-2">
                    <div
                      className="bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 h-2 rounded-full"
                      style={{ width: `${ad.popularity}%` }}
                    />
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {ad.popularity}% Popularity
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-green-500 font-bold">{ad.reward}</span>

                    <motion.a
                      href="/signup"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-yellow-400 to-green-400 text-black"
                    >
                      Watch Now
                    </motion.a>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* STATS */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 pb-24">
          <Reveal>
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                Watch Ads Stats
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
                Real numbers from our growing community
              </p>
            </>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {stats.map((stat) => (
              <Reveal key={stat.label}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border shadow-md"
                >
                  <div className="flex justify-center mb-2">{stat.icon}</div>

                  <h3 className="text-3xl font-extrabold text-green-500">
                    <CountUp end={stat.number} />
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {stat.label}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 pb-24">
          <Reveal>
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                How Watching Ads Works
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
                Start earning in three simple steps
              </p>
            </>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: <User className="w-8 h-8 text-yellow-400" />, title: "Sign Up", desc: "Create your free account." },
              { icon: <Star className="w-8 h-8 text-green-400" />, title: "Watch Ads", desc: "Watch ads fully to earn rewards." },
              { icon: <Gift className="w-8 h-8 text-yellow-400" />, title: "Claim Rewards", desc: "Withdraw instantly after watching." },
            ].map((step) => (
              <Reveal key={step.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border shadow-md"
                >
                  <div className="flex justify-center mb-4">{step.icon}</div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                    {step.desc}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="relative z-10 max-w-4xl mx-auto px-4 py-20 text-center">
          <Reveal>
            <>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-8">
                Everything you need to know about watching ads
              </p>
            </>
          </Reveal>

          <div className="grid gap-4">
            {faqs.map((faq, index) => (
              <Reveal key={index}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-[#0a0d16] rounded-2xl p-5 text-left border shadow-md"
                >
                  <h3 className="font-semibold text-lg">{faq.q}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
                    {faq.a}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative z-10 text-center py-28">
          <Reveal>
            <>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                Turn Watching Ads Into Real Rewards
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed mb-10">
                Join Cashog today and start earning with every ad you watch.
              </p>

              <PrimaryCTA href="/signup">
                Join Now
              </PrimaryCTA>
            </>
          </Reveal>
        </section>

      </main>
    </>
  );
}
