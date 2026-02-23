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
  Trophy,
} from "lucide-react";

/* ================= OFFER TYPE ================= */
type Offer = {
  id: number;
  title: string;
  category: string;
  reward: string;
  popularity: number;
};

/* ================= SAMPLE DATA ================= */
const offers: Offer[] = [
  { id: 1, title: "Install SuperApp", category: "App Install", reward: "$2", popularity: 85 },
  { id: 2, title: "Complete Survey 5 Min", category: "Survey", reward: "$3", popularity: 90 },
  { id: 3, title: "Watch Promotional Video", category: "Video", reward: "$1", popularity: 70 },
  { id: 4, title: "Sign Up Newsletter", category: "Signup", reward: "$2.5", popularity: 60 },
  { id: 5, title: "Download Game X", category: "App Install", reward: "$4", popularity: 95 },
  { id: 6, title: "Refer a Friend", category: "Referral", reward: "$5", popularity: 80 },
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
  { label: "Offers Completed", number: 15000 },
  { label: "Active Users", number: 12000 },
  { label: "Average Reward ($)", number: 3.5 },
];

/* ================= HOW IT WORKS STEPS ================= */
const steps = [
  {
    icon: <User className="w-8 h-8 text-yellow-400 mx-auto" />,
    title: "Sign Up",
    desc: "Create your account in minutes.",
  },
  {
    icon: <Star className="w-8 h-8 text-green-400 mx-auto" />,
    title: "Complete Offers",
    desc: "Choose tasks and finish them easily.",
  },
  {
    icon: <Gift className="w-8 h-8 text-yellow-500 mx-auto" />,
    title: "Redeem Rewards",
    desc: "Withdraw earnings securely.",
  },
];

/* ================= PAGE ================= */
export default function CompleteOffersPage() {
  return (
    <>
      <SeoEngine
        title="Complete Offers | Cashog"
        description="Browse high-paying offers, complete surveys and installs, and earn real rewards instantly."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">

          {/* ================= HERO ================= */}
          <Reveal>
            <div className="text-center mb-20">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
                Complete Offers
              </h1>

              <div className="text-3xl md:text-4xl font-extrabold gradient-text mb-6">
                <TypingText />
              </div>

              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
                Discover high-paying offers, complete tasks, and redeem your rewards instantly.
              </p>

              <PrimaryCTA href="/signup">
                Start Completing
              </PrimaryCTA>
            </div>
          </Reveal>

          {/* ================= OFFERS ================= */}
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {offers.map((offer) => (
              <Reveal key={offer.id}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="bg-white dark:bg-[#0a0d16] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <ClipboardList className="text-yellow-400 w-5 h-5" />
                      <span className="text-xs px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-500 border border-yellow-400/30">
                        {offer.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold mb-1">
                      {offer.title}
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      Reward: <span className="text-green-500 font-semibold">{offer.reward}</span>
                    </p>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-2 bg-gradient-to-r from-yellow-400 to-green-400 rounded-full transition-all duration-500"
                        style={{ width: `${offer.popularity}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {offer.popularity}% Popular
                    </p>
                  </div>

                  <div className="mt-5">
                    <a
                      href="/signup"
                      className="inline-flex items-center justify-center px-5 py-2 text-sm font-semibold rounded-xl 
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

          {/* ================= STATS ================= */}
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {stats.map((stat, index) => (
              <Reveal key={index}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-[#0a0d16] border border-gray-200 dark:border-gray-800 rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="text-4xl font-extrabold text-green-500">
                    <CountUp end={stat.number} />
                    {stat.label === "Average Reward ($)" && "$"}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* ================= HOW IT WORKS ================= */}
          <div className="grid md:grid-cols-3 gap-10 mb-24 text-center">
            {steps.map((step, i) => (
              <Reveal key={i}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="bg-white dark:bg-[#0a0d16] border border-gray-200 dark:border-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  {step.icon}
                  <h3 className="text-xl font-semibold mt-4 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {step.desc}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* ================= FINAL CTA ================= */}
          <Reveal>
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                Ready to Start Earning?
              </h2>
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
