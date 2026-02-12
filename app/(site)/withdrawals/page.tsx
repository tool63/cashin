"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ShieldCheck,
  ArrowRight,
  Clock,
  CheckCircle,
  DollarSign,
} from "lucide-react";
import Meta from "@/components/seo/SeoEngine";
import FloatingCTA from "@/components/cta/FloatingCTA";
import Header from "@/components/Header";

// Payment / withdrawal methods (PayPal + crypto + gift cards)
const paymentMethods = [
  { icon: "🪙", title: "PayPal", description: "Instant payout" },
  { icon: "₿", title: "Tether (USDT)", description: "Instant payout" },
  { icon: "🎁", title: "Bitcoin", description: "Instant payout" },
  { icon: "Ł", title: "Gift Cards", description: "Instant payout" },
  { icon: "Ξ", title: "Litecoin", description: "Instant payout" },
  { icon: "Ξ", title: "Ethereum", description: "Instant payout" },
  { icon: "Ð", title: "Dogecoin", description: "Instant payout" },
  { icon: "🟡", title: "Binance Coin (BNB)", description: "Instant payout" },
];

// FAQ for SEO
const faqs = [
  {
    question: "How do I withdraw my Cashog earnings?",
    answer:
      "You can withdraw via PayPal, crypto, gift cards, or bank transfer once you reach the minimum payout threshold.",
  },
  {
    question: "How fast are withdrawals processed?",
    answer:
      "Most withdrawals are processed instantly or within a few hours.",
  },
  {
    question: "Is Cashog secure?",
    answer: "Yes, all transactions are encrypted and verified for safety.",
  },
  {
    question: "Are withdrawals available worldwide?",
    answer: "Yes! Cashog supports users from around the world.",
  },
];

export default function WithdrawalsRootPage() {
  const [ctaVisible, setCtaVisible] = useState(true);

  return (
    <>
      {/* ================= META ================= */}
      <Meta
        title="Withdrawals | Cashog"
        description="Track your Cashog withdrawals and view payout methods instantly. Secure and fast withdrawals worldwide."
      />

      {/* JSON-LD FAQ for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }),
        }}
      />

      <Header onToggleCTA={() => setCtaVisible((prev) => !prev)} />

      <main className="transition-colors duration-300 bg-white text-gray-900 dark:bg-[#070A14] dark:text-white min-h-screen">

        {/* ================= HERO SECTION ================= */}
        <section className="relative py-24 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6"
            >
              Track and Withdraw Your Earnings
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto"
            >
              View your withdrawal methods, track payout options, and withdraw instantly. Cashog makes earning and withdrawing fast, secure, and reliable.
            </motion.p>
            <Link href="/signup" className="inline-block">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-12 py-5 rounded-2xl font-bold shadow-xl text-lg"
              >
                Create Free Account <ArrowRight />
              </motion.span>
            </Link>
          </div>

          {/* Floating CTA button controlled by header */}
          <FloatingCTA show={ctaVisible} />
        </section>

        {/* ================= PAYMENT METHODS ================= */}
        <section className="max-w-7xl mx-auto px-4 py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {paymentMethods.map((method, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-gray-100 dark:bg-[#1A1F2B] rounded-xl p-8 flex flex-col items-center text-center shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4 text-yellow-500 text-4xl">{method.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{method.description}</p>
            </motion.div>
          ))}
        </section>

        {/* ================= TRUST INFO ================= */}
        <section className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-gray-50 dark:bg-[#111827] rounded-xl p-6 shadow">
            <Clock size={32} className="mx-auto mb-4 text-yellow-500" />
            <h3 className="text-xl font-semibold mb-2">Fast Processing</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Most withdrawals are processed instantly or within a few hours.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-[#111827] rounded-xl p-6 shadow">
            <ShieldCheck size={32} className="mx-auto mb-4 text-yellow-500" />
            <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
            <p className="text-gray-600 dark:text-gray-400">
              All transactions are encrypted and processed safely.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-[#111827] rounded-xl p-6 shadow">
            <DollarSign size={32} className="mx-auto mb-4 text-yellow-500" />
            <h3 className="text-xl font-semibold mb-2">Multiple Methods</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Withdraw via PayPal, crypto, gift cards, or other available options.
            </p>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-gray-100 dark:bg-[#1A1F2B] rounded-xl p-4 cursor-pointer">
                <summary className="font-semibold text-lg">{faq.question}</summary>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="text-center py-28 bg-white dark:bg-[#070A14] w-full transition-colors duration-300">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
            Ready to Withdraw Your Earnings?
          </h2>
          <Link href="/signup" className="inline-block">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-xl"
            >
              Create Free Account <CheckCircle />
            </motion.span>
          </Link>
          <p className="mt-6 text-gray-900 dark:text-gray-300 text-lg max-w-md mx-auto">
            Join Cashog today and start tracking and withdrawing your earnings instantly.
          </p>
        </section>

      </main>
    </>
  );
}
