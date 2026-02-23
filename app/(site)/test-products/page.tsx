"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";
import Background from "@/components/Background";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";
import FAQ from "@/components/faq/FAQ";
import {
  Gift,
  Star,
  ClipboardList,
  CheckCircle,
  TrendingUp,
  Users,
  DollarSign,
  ChevronDown,
} from "lucide-react";

/* ============================= */
/* EARNING OFFERS (TEST PRODUCTS) */
/* ============================= */

const offers = [
  {
    id: 1,
    title: "Test Premium VPN",
    category: "Security",
    reward: "$2.50",
    description: "Install and test the VPN app for 5 minutes.",
  },
  {
    id: 2,
    title: "Test Fitness Tracker",
    category: "Health",
    reward: "$3.00",
    description: "Use the app and log one activity.",
  },
  {
    id: 3,
    title: "Test Language App",
    category: "Education",
    reward: "$2.00",
    description: "Complete beginner lesson inside app.",
  },
  {
    id: 4,
    title: "Test Crypto Wallet",
    category: "Finance",
    reward: "$4.00",
    description: "Create wallet and explore dashboard.",
  },
  {
    id: 5,
    title: "Test Music Streaming",
    category: "Entertainment",
    reward: "$2.50",
    description: "Play a song for at least 3 minutes.",
  },
  {
    id: 6,
    title: "Test Shopping App",
    category: "E-commerce",
    reward: "$3.50",
    description: "Browse products and add one to wishlist.",
  },
  {
    id: 7,
    title: "Test News App",
    category: "Information",
    reward: "$2.00",
    description: "Read one news article completely.",
  },
  {
    id: 8,
    title: "Test Gaming App",
    category: "Gaming",
    reward: "$5.00",
    description: "Play tutorial level for 5 minutes.",
  },
  {
    id: 9,
    title: "Test Productivity Tool",
    category: "Productivity",
    reward: "$3.00",
    description: "Create a sample task inside app.",
  },
];

/* ============================= */
/* OFFER CARD */
/* ============================= */

function OfferCard({
  title,
  category,
  reward,
  description,
}: {
  title: string;
  category: string;
  reward: string;
  description: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      className="relative bg-white dark:bg-[#0a0d16] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-md"
    >
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
            {category}
          </span>

          <ChevronDown
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>

        <h3 className="text-xl font-semibold">{title}</h3>

        <div className="flex items-center gap-2 mt-2 text-green-500 font-bold">
          <DollarSign size={16} />
          {reward}
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          {description}
        </p>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 text-sm text-gray-500 dark:text-gray-400"
            >
              Complete the task as instructed. Once verified, your reward
              will be credited to your account.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-5 flex justify-between items-center">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Earn by testing
        </span>

        <motion.a
          href="/signup"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-green-400 text-black font-semibold shadow-sm"
        >
          Start Task
        </motion.a>
      </div>
    </motion.div>
  );
}

/* ============================= */
/* PAGE */
/* ============================= */

export default function EarningPage() {
  return (
    <>
      <Meta
        title="Earn by Testing Products | Cashog"
        description="Complete test product tasks and earn real rewards instantly."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        {/* ================= HERO ================= */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-24 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400/20 to-green-400/20 border border-yellow-400/30 mb-6">
              <Gift size={16} className="text-yellow-400" />
              <span className="text-sm font-medium">
                Earn by Testing Products
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-6">
              Turn Tasks Into
              <span className="bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
                {" "}
                Real Rewards
              </span>
            </h1>

            <div className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-8">
              <TypingText />
            </div>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
              Complete simple product testing tasks and earn rewards instantly.
              No experience required.
            </p>

            <PrimaryCTA href="/signup">Start Earning</PrimaryCTA>
          </Reveal>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section className="relative z-10 max-w-6xl mx-auto px-6 pb-28">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              How It Works
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Simple steps to start earning
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <ClipboardList className="w-8 h-8 text-green-400" />,
                title: "Choose Task",
                desc: "Select a product testing task.",
              },
              {
                icon: <CheckCircle className="w-8 h-8 text-yellow-400" />,
                title: "Complete Task",
                desc: "Follow instructions and finish task.",
              },
              {
                icon: <Gift className="w-8 h-8 text-green-400" />,
                title: "Get Reward",
                desc: "Reward credited after verification.",
              },
            ].map((step) => (
              <motion.div
                key={step.title}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border shadow-md"
              >
                <div className="flex justify-center mb-4">{step.icon}</div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= OFFERS ================= */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Available Tasks
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Complete tasks and earn rewards
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {offers.map((offer) => (
              <OfferCard
                key={offer.id}
                title={offer.title}
                category={offer.category}
                reward={offer.reward}
                description={offer.description}
              />
            ))}
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="relative z-10 max-w-6xl mx-auto px-6 pb-28 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Community Performance
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-12">
              Real numbers from our earning community
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Users />, label: "Active Earners", value: "350K+" },
              { icon: <TrendingUp />, label: "Tasks Completed", value: "1.2M+" },
              { icon: <Star />, label: "Average Rating", value: "4.8" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 border shadow-md"
              >
                <div className="flex justify-center mb-2 text-green-400">
                  {stat.icon}
                </div>
                <h3 className="text-sm uppercase text-gray-600 dark:text-gray-400">
                  {stat.label}
                </h3>
                <div className="text-3xl font-bold mt-2">{stat.value}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="relative z-10 max-w-4xl mx-auto px-6 pb-28 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-10">
              Everything you need to know
            </p>
          </Reveal>

          <FAQ
            faqs={[
              { q: "Is it free to earn?", a: "Yes. No cost to join or earn." },
              { q: "When are rewards paid?", a: "Rewards are credited instantly after verification." },
              { q: "Are tasks safe?", a: "Yes. All tasks are verified and safe." },
            ]}
          />
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="relative z-10 text-center pb-32">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              Start Earning Today
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-10">
              Join Cashog and turn simple tasks into real rewards.
            </p>

            <PrimaryCTA href="/signup">Join Now</PrimaryCTA>
          </Reveal>
        </section>
      </main>
    </>
  );
}
