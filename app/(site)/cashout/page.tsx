import type { Metadata } from "next";
import React from "react";
import { motion } from "framer-motion";
import {
  Wallet,
  CreditCard,
  Gift,
  Smartphone,
  Globe,
  ShieldCheck,
  Clock,
} from "lucide-react";

import { buildSEO } from "@/components/SEO/seoEngine";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";

import Background from "@/components/Background";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";
import TypingText from "@/components/typing/TypingText";
import FAQ from "@/components/faq/FAQ";

/* =========================
   SEO Metadata (Custom Engine)
========================= */

export const metadata: Metadata = buildSEO({
  route: "/cashout",
  locale: SEO_CONFIG.defaultLocale,
});

/* =========================
   Page Component
========================= */

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
  ];

  return (
    <main className="relative min-h-screen text-gray-900 dark:text-white">
      <Background />

      {/* HERO */}
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
              Choose from multiple trusted payout methods and withdraw your money
              quickly and securely.
            </p>
          </Reveal>

          <PrimaryCTA href="/signup">
            Start Earning Now
          </PrimaryCTA>

        </div>
      </section>

      {/* PAYMENT METHODS */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Supported Payment Methods
          </h2>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {methods.map((method, i) => (
            <Reveal key={i}>
              <motion.div
                whileHover={{ y: -6 }}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow"
              >
                <div className="mb-4 flex justify-center">
                  {method.icon}
                </div>
                <h3 className="text-xl font-semibold">
                  {method.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {method.description}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SECURITY FEATURES */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 py-20">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Secure & Trusted Withdrawals
          </h2>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {withdrawalInfo.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={i}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-gray-50 dark:bg-[#111827] rounded-xl p-6 text-center shadow"
                >
                  <div className="flex justify-center mb-4 text-green-400">
                    <Icon size={36} />
                  </div>
                  <h3 className="text-lg font-semibold">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {item.desc}
                  </p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 py-20">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Frequently Asked Questions
          </h2>
        </Reveal>

        <FAQ faqs={[
          {
            q: "How do I withdraw my earnings?",
            a: "You can withdraw via PayPal, crypto, or gift cards once you reach the minimum payout threshold.",
          },
          {
            q: "How long do withdrawals take?",
            a: "Most withdrawals are processed instantly or within a few hours.",
          },
          {
            q: "Is there a minimum withdrawal?",
            a: "Yes, the minimum withdrawal depends on your selected payment method.",
          },
          {
            q: "Are withdrawals available worldwide?",
            a: "Yes! Cashog supports users from most countries worldwide.",
          },
        ]} />
      </section>

      {/* FINAL CTA */}
      <section className="relative z-10 text-center py-28">
        <Reveal>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
            Ready to Withdraw?
          </h2>
        </Reveal>

        <PrimaryCTA href="/signup">
          Create Free Account
        </PrimaryCTA>
      </section>
    </main>
  );
}
