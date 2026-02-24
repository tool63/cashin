"use client";

import { motion } from "framer-motion";
import SeoEngine from "@/components/seo/SeoEngine";
import Background from "@/components/Background";
import Reveal from "@/components/animations/Reveal";
import TypingText from "@/components/typing/TypingText";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import FAQ from "@/components/faq/FAQ";
import { Lock, Trophy, Gift, ShieldCheck } from "lucide-react";

/* ================= POINT RULE ================= */
/*
   1000 points = $1 reward value
*/

type LoyaltyTier = {
  id: number;
  name: string;
  pointsRequired: number;
  reward: string;
  color: string;
};

/* ================= 9 LOYALTY OFFERS ================= */
const tiers: LoyaltyTier[] = [
  { id: 1, name: "Bronze", pointsRequired: 100, reward: "$0.10 Reward", color: "#FACC15" },
  { id: 2, name: "Silver", pointsRequired: 500, reward: "$0.50 Reward", color: "#9CA3AF" },
  { id: 3, name: "Gold", pointsRequired: 1000, reward: "$1.00 Reward", color: "#FBBF24" },
  { id: 4, name: "Platinum", pointsRequired: 5000, reward: "$5.00 Reward", color: "#60A5FA" },
  { id: 5, name: "Diamond", pointsRequired: 10000, reward: "$10.00 Reward", color: "#A78BFA" },
  { id: 6, name: "Elite", pointsRequired: 20000, reward: "$20.00 Reward", color: "#F97316" },
  { id: 7, name: "Master", pointsRequired: 50000, reward: "$50.00 Reward", color: "#22C55E" },
  { id: 8, name: "Legend", pointsRequired: 100000, reward: "$100.00 Reward", color: "#EC4899" },
  { id: 9, name: "Ultimate", pointsRequired: 500000, reward: "$500.00 Reward", color: "#8B5CF6" },
];

/* ================= TESTIMONIALS ================= */
const testimonials = [
  { name: "Alex", text: "Loyalty program rewards are amazing. I love earning points!" },
  { name: "Sarah", text: "1000 points = $1 makes rewards clear and valuable." },
  { name: "John", text: "Tiers are exciting. I can see my progress and earnings." },
  { name: "Emma", text: "Cashog loyalty program is simple and rewarding." },
  { name: "Michael", text: "I unlocked a tier and received rewards instantly!" },
];

/* ================= FAQ ================= */
const faqs = [
  { q: "How does point conversion work?", a: "1000 points equals $1 reward value." },
  { q: "Is the loyalty program free?", a: "Yes. Joining and earning points is free." },
  { q: "How do I earn points?", a: "Complete tasks and activities to earn points." },
  { q: "What rewards can I claim?", a: "Cash rewards and premium benefits." },
  { q: "Do points expire?", a: "No. Points remain active on your account." },
];

export default function LoyaltyPage() {
  return (
    <>
      <SeoEngine
        title="Loyalty Program | Cashog"
        description="Join Cashog loyalty, earn points, unlock tiers, and claim rewards."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        {/* ================= HERO WITH TYPING TEXT ================= */}
        <section className="relative z-10 py-28 px-6 text-center">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Cashog Loyalty Program
            </h1>

            <div className="text-2xl md:text-3xl font-bold gradient-text mb-6">
              <TypingText />
            </div>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
              Earn points and unlock premium rewards.
              1000 points = $1 reward value.
            </p>

            <PrimaryCTA href="/signup">
              Join Loyalty Program
            </PrimaryCTA>
          </Reveal>
        </section>

        {/* ================= LOYALTY TIERS ================= */}
        <section className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Loyalty Tiers & Rewards
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-14">
              Unlock premium tiers and rewards
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.id}
                whileHover={{ y: -4 }}
                className="relative bg-white dark:bg-[#0a0d16] rounded-2xl p-6 border shadow-md flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                {/* PREMIUM LOCK ICON */}
                <div
                  className="w-16 h-16 flex items-center justify-center rounded-full mb-4 mx-auto shadow-lg"
                  style={{ backgroundColor: tier.color }}
                >
                  <Lock className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-semibold mb-2 text-center">{tier.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                  {tier.pointsRequired.toLocaleString()} Points Required
                </p>
                <p className="text-green-600 font-bold text-center text-lg">{tier.reward}</p>

                <motion.a
                  href="/signup"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-6 inline-flex w-full justify-center items-center gap-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-4 py-3 rounded-xl font-semibold shadow"
                >
                  Unlock Access <Gift size={18} />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= TESTIMONIALS ================= */}
        <section className="relative z-10 max-w-6xl mx-auto px-6 py-24">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              What Users Say
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-14">
              Real feedback from our community
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-800"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <p className="text-gray-600 dark:text-gray-300 italic">
                  “{item.text}”
                </p>
                <h3 className="mt-4 font-semibold text-green-500">— {item.name}</h3>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= TRUST SECTION ================= */}
        <section className="relative z-10 max-w-6xl mx-auto px-6 py-24">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Why Join Cashog Loyalty
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-14">
              Secure rewards and premium tiers
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: "Verified Rewards", desc: "Rewards are secure and instant." },
              { icon: Trophy, title: "Premium Tiers", desc: "Unlock higher rewards with each tier." },
              { icon: Lock, title: "Secure Access", desc: "Only unlocked tiers grant rewards." },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-800"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <item.icon className="w-8 h-8 mx-auto mb-4 text-yellow-500" />
                <h3 className="text-xl font-semibold mb-2 text-center">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-300 mb-8">
              Everything about loyalty rewards
            </p>
          </Reveal>

          <FAQ faqs={faqs} />
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="relative z-10 py-28 px-6 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start Earning Loyalty Rewards Today
            </h2>

            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-10">
              Join Cashog and unlock premium rewards.
            </p>

            <PrimaryCTA href="/signup">
              Join Now
            </PrimaryCTA>
          </Reveal>
        </section>
      </main>
    </>
  );
}
