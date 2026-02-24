"use client";

import React from "react";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";
import Background from "@/components/Background";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";
import FAQ from "@/components/faq/FAQ";
import { DollarSign, Shield, Clock, Star } from "lucide-react";

export default function TestProductsEarningPage() {
  const offers = [
    { id: 1, title: "Mobile App Testing", category: "App", reward: "$3.50", description: "Install and test a new productivity app for 5 minutes." },
    { id: 2, title: "Game Beta Review", category: "Game", reward: "$5.00", description: "Play a new mobile game and submit feedback." },
    { id: 3, title: "E-commerce UX Test", category: "Shopping", reward: "$4.20", description: "Browse and review checkout experience." },
    { id: 4, title: "Survey Platform Trial", category: "Survey", reward: "$2.80", description: "Sign up and complete profile survey." },
    { id: 5, title: "Finance App Trial", category: "Finance", reward: "$6.00", description: "Test budgeting features and report issues." },
    { id: 6, title: "Streaming App Review", category: "Media", reward: "$4.75", description: "Explore UI and watch demo content." },
    { id: 7, title: "Fitness App Test", category: "Health", reward: "$3.90", description: "Track one workout session." },
    { id: 8, title: "Food Delivery Test", category: "Food", reward: "$5.40", description: "Browse restaurants and simulate checkout." },
    { id: 9, title: "Crypto Wallet Trial", category: "Crypto", reward: "$7.25", description: "Test wallet interface & security features." },
  ];

  const faqs = [
    {
      question: "How do I earn money?",
      answer: "Simply complete product testing tasks. Once verified, your reward is credited instantly."
    },
    {
      question: "Is there any investment required?",
      answer: "No. You do not need to pay anything. All offers are completely free to complete."
    },
    {
      question: "How long does approval take?",
      answer: "Most offers are approved instantly or within a few hours depending on verification."
    },
    {
      question: "How do I withdraw earnings?",
      answer: "You can withdraw through available payment methods once you reach the minimum threshold."
    }
  ];

  return (
    <>
      <Meta
        title="Earn with Test Products | Cashooz"
        description="Earn money by testing apps, games, platforms and digital products."
      />

      <div className="relative overflow-hidden bg-white dark:bg-[#05070f] text-gray-900 dark:text-white">
        <Background />

        {/* HERO */}
        <section className="relative py-24 text-center px-6">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Earn By Testing
              <span className="block bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
                <TypingText words={["Apps", "Games", "Websites", "Platforms"]} />
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
              Complete real product testing tasks and get paid instantly.
              No investment required.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-8">
              <PrimaryCTA href="/signup">
                Start Earning Now
              </PrimaryCTA>
            </div>
          </Reveal>
        </section>

        {/* OFFERS */}
        <section className="relative py-20 px-6 max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
              Live Test Product Offers
            </h2>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-3">
            {offers.map((offer) => (
              <motion.div
                key={offer.id}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="relative group rounded-3xl p-6 bg-white dark:bg-[#0a0d16] border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
                  {offer.category}
                </span>

                <h3 className="text-xl font-semibold mt-4">
                  {offer.title}
                </h3>

                <div className="flex items-center gap-2 mt-2 text-green-500 font-bold">
                  <DollarSign size={16} />
                  {offer.reward}
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                  {offer.description}
                </p>

                <a
                  href="/signup"
                  className="mt-6 inline-block w-full text-center py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-green-400 text-black font-semibold shadow-md hover:shadow-lg transition"
                >
                  Start Task
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TRUST */}
        <section className="py-20 bg-gray-50 dark:bg-[#0b0f1c]">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
            <Feature icon={<Shield />} title="Secure Platform" desc="All offers verified and secure." />
            <Feature icon={<Clock />} title="Instant Rewards" desc="Rewards credited immediately after completion." />
            <Feature icon={<Star />} title="Premium Offers" desc="High-paying campaigns updated daily." />
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 max-w-4xl mx-auto px-6">
          <Reveal>
            <h2 className="text-3xl font-bold text-center mb-10">
              Frequently Asked Questions
            </h2>
          </Reveal>

          <FAQ faqs={faqs} />
        </section>
      </div>
    </>
  );
}

function Feature({ icon, title, desc }: any) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-8 rounded-2xl bg-white dark:bg-[#0f1424] border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg transition"
    >
      <div className="flex justify-center mb-4 text-green-500">
        {icon}
      </div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
        {desc}
      </p>
    </motion.div>
  );
}
