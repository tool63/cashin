// app/how-it-works/page.tsx
"use client";

import { ArrowRight, User, CreditCard, Gift, CheckCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";
import FloatingCTA from "@/components/cta/FloatingCTA";

const steps = [
  {
    icon: <User size={32} />,
    title: "Sign Up for Free",
    description: "Create your account in minutes and join our growing community of earners.",
  },
  {
    icon: <CreditCard size={32} />,
    title: "Complete Tasks & Offers",
    description: "Play games, watch videos, install apps, or complete surveys to earn points.",
  },
  {
    icon: <Gift size={32} />,
    title: "Earn Rewards",
    description: "Points can be redeemed for real cash via PayPal, gift cards, or mobile top-ups.",
  },
  {
    icon: <CheckCircle size={32} />,
    title: "Withdraw Easily",
    description: "Instant payouts once you reach the minimum withdrawal threshold.",
  },
];

export default function HowItWorks() {
  return (
    <>
      <Meta
        title="Cashog - How It Works"
        description="Learn how to earn real money online by completing tasks, surveys, and high-paying offers on Cashog."
      />

      <main className="transition-colors duration-300 bg-white text-gray-900 dark:bg-[#070A14] dark:text-white min-h-screen">

        {/* HERO-STYLE SECTION */}
        <section className="relative py-20 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              Earn Real Money Online
            </h1>

            <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              <TypingText />
            </div>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
              Follow these simple steps and start earning instantly from anywhere.
            </p>

            {/* HERO CTA BUTTON */}
            <Link href="/signup" className="cta-observer inline-block">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-10 py-4 rounded-xl font-semibold shadow-lg"
              >
                Start Earning Now <ArrowRight />
              </motion.span>
            </Link>
          </div>

          {/* Floating CTA */}
          <FloatingCTA />
        </section>

        {/* HOW IT WORKS STEPS */}
        <section className="max-w-7xl mx-auto px-4 py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-100 dark:bg-[#1A1F2B] rounded-xl p-8 flex flex-col items-center text-center shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4 text-yellow-500">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </section>

        {/* FINAL CTA SECTION */}
        <section className="text-center py-20 px-4">
          <Link href="/signup" className="cta-observer inline-block">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-10 py-4 rounded-xl font-semibold shadow-lg"
            >
              Join Now & Start Earning <ArrowRight />
            </motion.span>
          </Link>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg max-w-md mx-auto">
            Become part of our community and start earning daily rewards instantly.
          </p>
        </section>

      </main>
    </>
  );
}
