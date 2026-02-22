"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Wallet,
  CreditCard,
  Gift,
  Smartphone,
  Globe,
  ShieldCheck,
  ArrowRight,
  Clock,
} from "lucide-react";
import Meta from "@/components/seo/SeoEngine";
import Background from "@/components/Background";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";
import TypingText from "@/components/typing/TypingText";

export default function CashoutMethodsPage() {
  const methods = [
    {
      icon: Wallet,
      title: "PayPal",
      description:
        "Withdraw your earnings directly to your PayPal account instantly and securely worldwide.",
    },
    {
      icon: Gift,
      title: "Gift Cards",
      description:
        "Redeem your points for Amazon, Google Play, Apple, and other popular gift cards.",
    },
    {
      icon: Smartphone,
      title: "Mobile Top-Up",
      description:
        "Recharge your mobile balance directly using your Cashog earnings.",
    },
    {
      icon: CreditCard,
      title: "Bank Transfer",
      description:
        "Transfer your earnings directly to your bank account (available in selected regions).",
    },
  ];

  return (
    <>
      <Meta
        title="Cashout Methods | Cashog"
        description="Discover Cashog cashout methods. Withdraw your earnings via PayPal, gift cards, mobile top-ups, and bank transfers instantly."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        {/* ================= HERO ================= */}
        <section className="relative z-10 py-24 px-4 text-center">
          <div className="max-w-3xl mx-auto">

            <Reveal>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                Withdraw Your Earnings
              </h1>
            </Reveal>

            {/* Typing Effect */}
            <Reveal>
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 gradient-text">
                <TypingText />
              </div>
            </Reveal>

            <Reveal>
              <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
                Choose from multiple trusted payout methods and get your money instantly.
              </p>
            </Reveal>

            <PrimaryCTA href="/signup">
              Start Earning Now <ArrowRight size={20} />
            </PrimaryCTA>

          </div>
        </section>

        {/* ================= CASHOUT METHODS ================= */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {methods.map((method, i) => {
            const IconComponent = method.icon;
            return (
              <Reveal key={i}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="bg-white dark:bg-[#0a0d16] rounded-2xl p-8 text-center border border-gray-200 dark:border-gray-800 shadow"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="mb-4 text-yellow-500"
                  >
                    <IconComponent size={36} />
                  </motion.div>

                  <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {method.description}
                  </p>
                </motion.div>
              </Reveal>
            );
          })}
        </section>

        {/* ================= WITHDRAWAL INFO ================= */}
        <section className="relative z-10 max-w-5xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            {[
              {
                icon: Clock,
                title: "Fast Processing",
                desc: "Most withdrawals are processed instantly or within a few hours.",
              },
              {
                icon: Globe,
                title: "Global Availability",
                desc: "Cashog supports users from around the world.",
              },
              {
                icon: ShieldCheck,
                title: "Secure Payments",
                desc: "All transactions are encrypted and processed securely.",
              },
            ].map((item, i) => (
              <Reveal key={i}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-gray-50 dark:bg-[#111827] rounded-xl p-8 shadow"
                >
                  <div className="flex justify-center mb-4 text-yellow-500">
                    <item.icon size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {item.desc}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="relative z-10 text-center py-28 bg-white dark:bg-[#070A14] w-full transition-colors duration-300">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 gradient-text">
              Ready to Withdraw Your Earnings?
            </h2>
          </Reveal>

          <PrimaryCTA href="/signup">
            Create Free Account <ArrowRight size={20} />
          </PrimaryCTA>

          <p className="mt-6 text-gray-900 dark:text-gray-300 text-lg max-w-md mx-auto">
            Join Cashog today and start withdrawing real money safely.
          </p>
        </section>

      </main>
    </>
  );
}
