"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Lock,
  Globe,
  Clock,
} from "lucide-react";
import Meta from "@/components/seo/SeoEngine";
import { useState } from "react";

export default function WithdrawalsPage() {
  const [faqSearch, setFaqSearch] = useState("");

  const faqs = [
    {
      question: "How do I withdraw my earnings?",
      answer:
        "You can withdraw your earnings via PayPal, crypto, or gift cards once you reach the minimum payout threshold.",
    },
    {
      question: "How long do withdrawals take?",
      answer: "Most withdrawals are processed instantly or within a few hours.",
    },
    {
      question: "Is there a minimum withdrawal?",
      answer:
        "Yes, the minimum withdrawal depends on your selected payment method.",
    },
    {
      question: "Are withdrawals available worldwide?",
      answer:
        "Yes! Cashog supports users from most countries worldwide.",
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
    <>
      <Meta
        title="Withdrawals | Cashog"
        description="Withdraw your Cashog earnings instantly via PayPal, crypto, or gift cards. Secure and fast worldwide payouts."
      />

      <main className="transition-colors duration-300 bg-white dark:bg-[#070A14] text-gray-900 dark:text-white min-h-screen">

        {/* ================= HERO SECTION ================= */}
        <section className="relative py-24 px-4 text-center bg-white dark:bg-[#070A14] rounded-b-[50px] shadow-xl transition-colors duration-300 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              Fast & Secure Withdrawals
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed text-gray-600 dark:text-gray-300">
              Cash out your earnings instantly via trusted payment methods. Safe, fast, and globally available.
            </p>

            {/* HERO CTA */}
            <div className="cta-observer inline-block">
              <Link href="/signup">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-14 py-5 rounded-3xl font-bold shadow-xl text-lg md:text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  Start Earning Now <ArrowRight />
                </motion.span>
              </Link>
            </div>
          </motion.div>

          {/* Decorative Circles */}
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </section>

        {/* ================= PAYMENT METHODS ================= */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
            Supported Payment Methods
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {paymentMethods.map((method, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-gray-100 dark:bg-[#1A1F2B] rounded-3xl p-6 flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="text-5xl mb-4">{method.icon}</div>
                <h3 className="text-xl font-semibold mb-1">{method.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{method.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= TRUSTED / SECURITY SECTION NAME ================= */}
        <section className="text-center py-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
            Trusted & Secure Payments
          </h2>
        </section>

        {/* ================= SECURITY FEATURES ================= */}
        <section className="max-w-6xl mx-auto px-4 py-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4 text-center">
          {securityFeatures.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="bg-gray-50 dark:bg-[#111827] rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex justify-center mb-4 text-green-400">
                  <Icon size={36} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
              </motion.div>
            );
          })}
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section className="max-w-4xl mx-auto px-4 py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="mb-8 flex justify-center">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-[#111827] text-gray-900 dark:text-white w-full max-w-md focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
            />
          </div>

          <div className="space-y-4">
            {faqs
              .filter((faq) =>
                faq.question.toLowerCase().includes(faqSearch.toLowerCase())
              )
              .map((faq, i) => (
                <details
                  key={i}
                  className="bg-gray-100 dark:bg-[#1A1F2B] rounded-2xl p-4 cursor-pointer shadow hover:shadow-lg transition-all duration-300"
                >
                  <summary className="font-semibold text-lg">{faq.question}</summary>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </details>
              ))}
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="text-center py-28 bg-white dark:bg-[#070A14] w-full transition-colors duration-300">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
            Ready to Withdraw Your Earnings?
          </h2>

          <div className="cta-observer inline-block">
            <Link href="/signup">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-3xl font-bold shadow-xl text-xl md:text-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                Create Free Account <ArrowRight />
              </motion.span>
            </Link>
          </div>

          <p className="mt-6 text-gray-900 dark:text-gray-300 text-lg max-w-md mx-auto">
            Join Cashog today and start withdrawing real money safely.
          </p>
        </section>

      </main>
    </>
  );
}
