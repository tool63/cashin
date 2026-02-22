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
      icon: <Wallet size={40} className="text-yellow-400" />,
      title: "PayPal",
      description:
        "Withdraw your earnings directly to your PayPal account instantly and securely worldwide.",
    },
    {
      icon: <Gift size={40} className="text-green-400" />,
      title: "Gift Cards",
      description:
        "Redeem your points for Amazon, Google Play, Apple, and other popular gift cards.",
    },
    {
      icon: <Smartphone size={40} className="text-blue-400" />,
      title: "Mobile Top-Up",
      description:
        "Recharge your mobile balance directly using your Cashog earnings.",
    },
    {
      icon: <CreditCard size={40} className="text-purple-400" />,
      title: "Bank Transfer",
      description:
        "Transfer your earnings directly to your bank account (available in selected regions).",
    },
  ];

  const withdrawalInfo = [
    {
      icon: <Clock size={36} className="text-yellow-400" />,
      title: "Fast Processing",
      desc: "Most withdrawals are processed instantly or within a few hours.",
    },
    {
      icon: <Globe size={36} className="text-blue-400" />,
      title: "Global Availability",
      desc: "Cashog supports users from around the world.",
    },
    {
      icon: <ShieldCheck size={36} className="text-green-400" />,
      title: "Secure Payments",
      desc: "All transactions are encrypted and processed securely.",
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

            <Reveal>
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 gradient-text">
                <TypingText />
              </div>
            </Reveal>

            <Reveal>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
                Choose from multiple trusted payout methods and withdraw your money quickly and securely.
              </p>
            </Reveal>

            <PrimaryCTA href="/signup">
              Start Earning Now <ArrowRight size={20} />
            </PrimaryCTA>

          </div>
        </section>

        {/* ================= CASHOUT METHODS ================= */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 py-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {methods.map((method, i) => (
            <Reveal key={i}>
              <motion.div
                whileHover={{ y: -6 }}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-8 text-center border border-gray-200 dark:border-gray-800 shadow"
              >
                <div className="mb-4 flex justify-center">
                  {method.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {method.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {method.description}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </section>

        {/* ================= WITHDRAWAL INFO ================= */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 py-16">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Cashog Withdrawals Are Better
            </h2>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-3">
            {withdrawalInfo.map((item, i) => (
              <Reveal key={i}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-gray-50 dark:bg-[#111827] rounded-xl p-8 text-center shadow hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {item.desc}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ================= FINAL CTA (MATCHED BACKGROUND) ================= */}
        <section className="relative z-10 text-center py-28 w-full">

          <Reveal>
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 gradient-text">
              Ready to Withdraw Your Earnings?
            </h2>
          </Reveal>

          <PrimaryCTA href="/signup">
            Create Free Account <ArrowRight size={20} />
          </PrimaryCTA>

          <p className="mt-6 text-gray-900 dark:text-gray-300 text-lg max-w-md mx-auto">
            Join Cashog today and start withdrawing real money safely and securely.
          </p>
        </section>

      </main>
    </>
  );
}
