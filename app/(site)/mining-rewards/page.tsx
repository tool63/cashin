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

/* ================= PREMIUM MINING TASKS ================= */
const miningRewards = [
  { title: "Crypto Basics", category: "Beginner", difficulty: "Easy", reward: "$2" },
  { title: "Blockchain Fundamentals", category: "Education", difficulty: "Medium", reward: "$3" },
  { title: "Altcoin Research", category: "Research", difficulty: "Medium", reward: "$4" },
  { title: "Mining Strategy Guide", category: "Pro", difficulty: "Hard", reward: "$5" },
  { title: "Market Analysis Task", category: "Analytics", difficulty: "Hard", reward: "$6" },
  { title: "Daily Mining Challenge", category: "Task", difficulty: "Easy", reward: "$2.5" },
  { title: "Crypto Portfolio Tips", category: "Education", difficulty: "Medium", reward: "$3.5" },
  { title: "Reward Booster Mission", category: "Bonus", difficulty: "Hard", reward: "$7" },
  { title: "Advanced Mining Guide", category: "Expert", difficulty: "Very Hard", reward: "$8" },
];

/* ================= FEATURES ================= */
const features = [
  {
    icon: <DollarSign size={36} className="text-green-400" />,
    title: "High Reward Tasks",
    description: "Earn premium rewards by completing structured challenges.",
  },
  {
    icon: <Shield size={36} className="text-blue-400" />,
    title: "Secure Platform",
    description: "Your earnings and account data are fully protected.",
  },
  {
    icon: <TrendingUp size={36} className="text-yellow-400" />,
    title: "Performance Tracking",
    description: "Monitor progress and maximize earning potential.",
  },
];

/* ================= FAQ ================= */
const faqs = [
  {
    q: "What are Mining Rewards?",
    a: "Mining Rewards are structured earning tasks that reward users with real payouts.",
  },
  {
    q: "Do I need crypto mining hardware?",
    a: "No. These are digital tasks and challenges — no hardware required.",
  },
  {
    q: "How fast are rewards credited?",
    a: "Most rewards are credited instantly after task completion.",
  },
  {
    q: "Is it free to participate?",
    a: "Yes. Joining and completing tasks is completely free.",
  },
  {
    q: "How do I withdraw earnings?",
    a: "You can withdraw via PayPal or gift cards after reaching minimum payout.",
  },
];

export default function MiningRewardsPage() {
  return (
    <>
      <Meta
        title="Premium Mining Rewards | Cashog"
        description="Complete premium mining challenges and earn real rewards instantly."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        <section className="relative z-10 max-w-7xl mx-auto px-4 py-24">

          {/* ================= HERO SECTION ================= */}
          <Reveal>
            <div className="text-center mb-24">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                Premium Mining Rewards
              </h1>

              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 gradient-text">
                <TypingText />
              </div>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed mb-10">
                Complete premium challenges and unlock real rewards through structured tasks.
              </p>

              <PrimaryCTA href="/signup">
                Start Earning Now
              </PrimaryCTA>
            </div>
          </Reveal>

          {/* ================= PREMIUM TASKS SECTION ================= */}
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
                Premium Opportunities
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                High-value tasks designed to maximize your earning potential.
              </p>
            </div>
          </Reveal>

          {/* OFFER CARDS (Offerwall Style) */}
          <div className="grid gap-6 md:gap-8 md:grid-cols-3 mb-28">
            {miningRewards.map((task) => (
              <Reveal key={task.title}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="bg-white/90 dark:bg-[#0c111b]/90 backdrop-blur-xl
                  rounded-2xl p-6 shadow-sm hover:shadow-xl
                  transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Category Badge */}
                    <div className="flex justify-between items-center mb-4">
                      <ClipboardList className="text-yellow-500 w-5 h-5" />

                      <span className="text-xs px-3 py-1 rounded-full
                        bg-yellow-500/10 text-yellow-600 dark:text-yellow-400
                        border border-yellow-500/20">
                        {task.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold mb-2">
                      {task.title}
                    </h3>

                    {/* Difficulty */}
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Difficulty: {task.difficulty}
                    </p>

                    {/* Reward */}
                    <p className="text-green-500 font-semibold mt-1">
                      Reward: {task.reward}
                    </p>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden mt-4">
                      <div
                        className="h-2 bg-gradient-to-r from-yellow-400 to-green-400 rounded-full"
                        style={{
                          width:
                            task.difficulty === "Easy"
                              ? "90%"
                              : task.difficulty === "Medium"
                              ? "70%"
                              : "50%",
                        }}
                      />
                    </div>

                    <p className="text-xs text-gray-500 mt-2">
                      Completion Potential
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="mt-6">
                    <a
                      href="/signup"
                      className="inline-flex items-center justify-center
                      px-5 py-2 text-sm font-semibold rounded-xl
                      bg-gradient-to-r from-yellow-400 to-green-400
                      text-black shadow-md hover:shadow-lg
                      transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      Complete Task
                    </a>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* ================= FEATURES SECTION ================= */}
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
                Platform Advantages
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Secure, fast, and optimized for earning opportunities.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 md:gap-8 md:grid-cols-3 mb-28">
            {features.map((feature) => (
              <Reveal key={feature.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white/90 dark:bg-[#0c111b]/90 backdrop-blur-xl
                  rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800
                  shadow-sm hover:shadow-lg transition-all duration-300"
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

          {/* ================= HOW IT WORKS ================= */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
              How It Works
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Start earning in three simple steps.
            </p>
          </div>

          <div className="grid gap-6 md:gap-8 md:grid-cols-3 mb-28">
            {[
              {
                icon: <User size={32} className="text-yellow-400" />,
                title: "Create Account",
                desc: "Join in seconds and start earning opportunities.",
              },
              {
                icon: <Trophy size={32} className="text-green-400" />,
                title: "Complete Tasks",
                desc: "Finish challenges and unlock rewards.",
              },
              {
                icon: <Gift size={32} className="text-yellow-400" />,
                title: "Withdraw",
                desc: "Redeem earnings securely and easily.",
              },
            ].map((step) => (
              <Reveal key={step.title}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="bg-white dark:bg-[#0c111b] rounded-2xl p-6 text-center
                  border border-gray-200 dark:border-gray-800 shadow-sm
                  hover:shadow-lg transition-all duration-300"
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

          {/* ================= FAQ ================= */}
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

          {/* ================= FINAL CTA ================= */}
          <Reveal>
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                Ready to Start Earning?
              </h2>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed mb-10">
                Join today and unlock premium earning opportunities.
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
