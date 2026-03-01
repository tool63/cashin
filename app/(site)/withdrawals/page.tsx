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
  Lock,
} from "lucide-react";

import { buildSEO } from "@/components/SEO/seoEngine";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";

import Background from "@/components/Background";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";
import FAQ from "@/components/faq/FAQ";

/* =========================
   SEO Metadata (Custom Engine)
========================= */

export const metadata: Metadata = buildSEO({
  route: "/withdrawals",
  locale: SEO_CONFIG.defaultLocale,
});

/* =========================
   Page Component
========================= */

export default function WithdrawalsPage() {
  const faqs = [
    {
      q: "How do I withdraw my earnings?",
      a: "You can withdraw your earnings via PayPal, crypto, or gift cards once you reach the minimum payout threshold.",
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
  ];

  const securityFeatures = [
    {
      icon: Lock,
      title: "Encrypted Transactions",
      desc: "All withdrawals are protected with advanced encryption.",
    },
    {
      icon: ShieldCheck,
      title: "Trusted Partners",
      desc: "We work only with verified payment providers.",
    },
    {
      icon: Globe,
      title: "Global Access",
      desc: "Withdraw from almost anywhere in the world.",
    },
    {
      icon: Clock,
      title: "Fast Processing",
      desc: "Most withdrawals are processed instantly or within a few hours.",
    },
  ];

  const paymentMethods = [
    { title: "PayPal", subtitle: "Instant payout", icon: "🪙" },
    { title: "Tether (USDT)", subtitle: "Instant payout", icon: "₿" },
    { title: "Bitcoin", subtitle: "Instant payout", icon: "₿" },
    { title: "Gift Cards", subtitle: "Instant payout", icon: "🎁" },
    { title: "Litecoin", subtitle: "Instant payout", icon: "Ł" },
    { title: "Ethereum", subtitle: "Instant payout", icon: "Ξ" },
    { title: "Dogecoin", subtitle: "Instant payout", icon: "Ð" },
    { title: "Binance Coin (BNB)", subtitle: "Instant payout", icon: "🟡" },
  ];

  return (
    <main className="relative min-h-screen text-gray-900 dark:text-white">
      <Background />

      {/* HERO */}
      <section className="relative z-10 text-center py-24 px-4">
        <Reveal>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
            Fast & Secure Withdrawals
          </h1>
        </Reveal>

        <Reveal>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Cash out your earnings instantly via trusted payment methods.
          </p>
        </Reveal>

        <PrimaryCTA href="/signup">
          Start Earning
        </PrimaryCTA>
      </section>

      {/* PAYMENT METHODS */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Supported Payment Methods
          </h2>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {paymentMethods.map((method, i) => (
            <Reveal key={i}>
              <motion.div
                whileHover={{ y: -6 }}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow"
              >
                <div className="text-5xl mb-4">{method.icon}</div>
                <h3 className="text-xl font-semibold">{method.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {method.subtitle}
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
          {securityFeatures.map((item, i) => {
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

        <FAQ faqs={faqs} />
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
