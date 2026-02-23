"use client";

import React from "react";
import {
  Trophy,
  User,
  Gift,
  ClipboardList,
  DollarSign,
  Shield,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";
import Background from "@/components/Background";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";
import FAQ from "@/components/faq/FAQ";

/* ================= MINING TASKS ================= */
const miningRewards = [
  {
    title: "Crypto Miner 101",
    category: "Beginner",
    difficulty: "Easy",
    reward: "$2",
  },
  {
    title: "Blockchain Basics",
    category: "Education",
    difficulty: "Medium",
    reward: "$3",
  },
  {
    title: "Altcoin Explorer",
    category: "Research",
    difficulty: "Hard",
    reward: "$5",
  },
  {
    title: "Mining Advanced Tips",
    category: "Pro Level",
    difficulty: "Expert",
    reward: "$7",
  },
];

/* ================= FEATURES ================= */
const features = [
  {
    icon: <DollarSign size={36} className="text-green-400" />,
    title: "High Reward Tasks",
    description:
      "Earn more by completing higher difficulty mining challenges.",
  },
  {
    icon: <Shield size={36} className="text-blue-400" />,
    title: "Secure Platform",
    description: "Your earnings and account are fully protected.",
  },
  {
    icon: <TrendingUp size={36} className="text-yellow-400" />,
    title: "Progress Tracking",
    description: "Track your mining growth and maximize rewards.",
  },
];

/* ================= FAQ ================= */
const faqs = [
  {
    q: "What are Mining Rewards?",
    a: "Mining Rewards allow you to complete structured earning tasks and receive real payouts.",
  },
  {
    q: "Do I need real crypto mining hardware?",
    a: "No. These are structured earning tasks, not real blockchain mining.",
  },
  {
    q: "How fast are rewards credited?",
    a: "Most rewards are credited instantly after successful completion.",
  },
  {
    q: "Is it free to participate?",
    a: "Yes. Joining and completing tasks is completely free.",
  },
  {
    q: "How do I withdraw earnings?",
    a: "You can withdraw via PayPal or gift cards once you reach the minimum payout threshold.",
  },
];

export default function MiningRewardsPage() {
  return (
    <>
      <Meta
        title="Mining Rewards | Cashog"
        description="Complete mining challenges and earn real rewards instantly on Cashog."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        <section className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          {/* HERO */}
          <Reveal>
            <div className="text-center mb-20">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                Mining Rewards
              </h1>

              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 gradient-text">
                <TypingText />
              </div>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed mb-10">
                Complete structured mining challenges and earn real money rewards instantly.
              </p>

              <PrimaryCTA href="/signup">
                Start Mining Now
              </PrimaryCTA>
            </div>
          </Reveal>

          {/* MINING TASKS */}
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-4 mb-24">
            {miningRewards.map((task, i) => (
              <Reveal key={i}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {/* Category Badge */}
                  <div className="flex justify-center mb-3">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400/20 to-green-400/20 text-yellow-600 dark:text-yellow-400 border border-yellow-400/30">
                      {task.category}
                    </span>
                  </div>

                  <div className="mb-4 flex justify-center">
                    <ClipboardList size={28} className="text-yellow-400" />
                  </div>

                  <h3 className="text-lg font-semibold mb-2">
                    {task.title}
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Difficulty: {task.difficulty}
                  </p>

                  <p className="text-green-600 font-bold mb-4">
                    Reward: {task.reward}
                  </p>

                  {/* Premium Compact Button */}
                  <a
                    href="/signup"
                    className="inline-flex items-center justify-center px-5 py-2 text-sm font-semibold rounded-xl 
                    bg-gradient-to-r from-yellow-400 to-green-400 
                    text-black shadow-md hover:shadow-lg 
                    transition-all duration-300 
                    hover:scale-105 active:scale-95"
                  >
                    Mine Now
                  </a>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* FEATURES */}
          <div className="grid gap-6 md:gap-8 md:grid-cols-3 mb-24">
            {features.map((feature, i) => (
              <Reveal key={i}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="mb-4 flex justify-center">
                    {feature.icon}
                  </div>

                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* HOW IT WORKS */}
          <div className="grid gap-6 md:gap-8 md:grid-cols-3 mb-24">
            {[
              {
                icon: <User size={32} className="text-yellow-400" />,
                title: "Sign Up",
                desc: "Create your Cashog account in minutes.",
              },
              {
                icon: <Trophy size={32} className="text-green-400" />,
                title: "Complete Tasks",
                desc: "Finish mining challenges to earn rewards.",
              },
              {
                icon: <Gift size={32} className="text-yellow-400" />,
                title: "Withdraw",
                desc: "Redeem your earnings securely and easily.",
              },
            ].map((step, i) => (
              <Reveal key={i}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="mb-4 flex justify-center">
                    {step.icon}
                  </div>

                  <h3 className="text-xl font-semibold mb-2">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {step.desc}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* FAQ */}
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Frequently Asked Questions
            </h2>

            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Everything you need to know about Mining Rewards
            </p>
          </Reveal>

          <div className="mb-24">
            <FAQ faqs={faqs} />
          </div>

          {/* FINAL CTA */}
          <Reveal>
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                Ready to Start Mining?
              </h2>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed mb-10">
                Join today and unlock structured earning opportunities.
              </p>

              <PrimaryCTA href="/signup">
                Join Now
              </PrimaryCTA>
            </div>
          </Reveal>
        </section>
      </main>
    </>
  );
}
