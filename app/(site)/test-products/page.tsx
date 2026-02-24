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
  ClipboardList,
  CheckCircle,
  Users,
  TrendingUp,
  Star,
  DollarSign,
  ChevronDown,
} from "lucide-react";

/* ============================= */
/* OFFERS DATA */
/* ============================= */

const offers = [
  { id: 1, title: "Test Premium VPN", category: "Security", reward: "$2.50", description: "Install and test the VPN app for 5 minutes." },
  { id: 2, title: "Test Fitness Tracker", category: "Health", reward: "$3.00", description: "Log one workout activity inside the app." },
  { id: 3, title: "Test Language App", category: "Education", reward: "$2.00", description: "Complete one beginner lesson." },
  { id: 4, title: "Test Crypto Wallet", category: "Finance", reward: "$4.00", description: "Create wallet and explore dashboard." },
  { id: 5, title: "Test Music Streaming", category: "Entertainment", reward: "$2.50", description: "Play one song for 3 minutes." },
  { id: 6, title: "Test Shopping App", category: "E-commerce", reward: "$3.50", description: "Browse products and add one to wishlist." },
  { id: 7, title: "Test News App", category: "Information", reward: "$2.00", description: "Read one article fully." },
  { id: 8, title: "Test Gaming App", category: "Gaming", reward: "$5.00", description: "Complete tutorial level." },
  { id: 9, title: "Test Productivity Tool", category: "Productivity", reward: "$3.00", description: "Create one sample task." },
];

/* ============================= */
/* OFFER CARD */
/* ============================= */

function OfferCard({
  id,
  title,
  category,
  reward,
  description,
  activeId,
  setActiveId,
}: {
  id: number;
  title: string;
  category: string;
  reward: string;
  description: string;
  activeId: number | null;
  setActiveId: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const isOpen = activeId === id;

  return (
    <motion.div
      layout
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      onClick={() => setActiveId(isOpen ? null : id)}
      className={`
        relative rounded-3xl p-6 cursor-pointer
        bg-white dark:bg-[#0a0d16]
        border
        ${isOpen
          ? "border-green-500 shadow-xl"
          : "border-gray-200 dark:border-gray-800 shadow-md"}
        transition-all duration-300
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
          {category}
        </span>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown />
        </motion.div>
      </div>

      <h3 className="text-xl font-semibold">{title}</h3>

      <div className="flex items-center gap-2 mt-2 text-green-500 font-bold">
        <DollarSign size={16} />
        {reward}
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
        {description}
      </p>

      {/* Expand Area */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400"
          >
            Complete the task carefully. Once verified, your reward
            will be credited instantly to your account balance.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.div layout className="mt-5 flex justify-between items-center">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Earn by testing
        </span>

        <motion.a
          href="/signup"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-green-400 text-black font-semibold shadow-sm"
        >
          Start Task
        </motion.a>
      </motion.div>
    </motion.div>
  );
}

/* ============================= */
/* MAIN PAGE */
/* ============================= */

export default function EarningPage() {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <>
      <Meta
        title="Earn by Testing Products | Cashog"
        description="Complete simple test product tasks and earn real rewards instantly."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        {/* HERO */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-24 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400/20 to-green-400/20 border border-yellow-400/30 mb-6">
              <Gift size={16} className="text-yellow-400" />
              <span className="text-sm font-medium">
                Earn by Testing Products
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-6">
              Turn Simple Tasks Into
              <span className="bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
                {" "}Real Rewards
              </span>
            </h1>

            <div className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-8">
              <TypingText />
            </div>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
              Complete easy product testing tasks and earn instantly.
              No investment required.
            </p>

            <PrimaryCTA href="/signup">Start Earning</PrimaryCTA>
          </Reveal>
        </section>

        {/* OFFERS */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Available Test Tasks
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Click a card to see more details
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {offers.map((offer) => (
              <OfferCard
                key={offer.id}
                id={offer.id}
                title={offer.title}
                category={offer.category}
                reward={offer.reward}
                description={offer.description}
                activeId={activeId}
                setActiveId={setActiveId}
              />
            ))}
          </div>
        </section>

        {/* STATS */}
        <section className="relative z-10 max-w-6xl mx-auto px-6 pb-28 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Community Stats
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
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
                <h3 className="text-sm text-gray-600 dark:text-gray-400 uppercase">
                  {stat.label}
                </h3>
                <div className="text-3xl font-bold mt-2">{stat.value}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="relative z-10 max-w-4xl mx-auto px-6 pb-28 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
          </Reveal>

          <FAQ
            faqs={[
              { q: "Is it free to join?", a: "Yes, completely free." },
              { q: "When do I get paid?", a: "After task verification." },
              { q: "Is this safe?", a: "All offers are verified and secure." },
            ]}
          />
        </section>

        {/* FINAL CTA */}
        <section className="relative z-10 text-center pb-32">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
              Start Earning Today
            </h2>
            <PrimaryCTA href="/signup">Join Now</PrimaryCTA>
          </Reveal>
        </section>
      </main>
    </>
  );
}
