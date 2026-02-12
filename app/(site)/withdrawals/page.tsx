"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Lock, Globe, Clock, CreditCard, Gift, Smartphone, Wallet } from "lucide-react";
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

  const paymentMethods = [
    { icon: Wallet, title: "PayPal", desc: "Withdraw instantly to your PayPal account." },
    { icon: CreditCard, title: "Bank Transfer", desc: "Transfer your earnings directly to your bank." },
    { icon: Gift, title: "Gift Cards", desc: "Redeem earnings for popular gift cards worldwide." },
    { icon: Smartphone, title: "Mobile Top-Up", desc: "Recharge your mobile balance directly." },
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

  return (
    <>
      <Meta
        title="Withdrawals | Cashog"
        description="Withdraw your Cashog earnings instantly via PayPal, crypto, or gift cards. Secure and fast worldwide payouts."
      />

      <main className="transition-colors duration-300 bg-white text-gray-900 dark:bg-[#070A14] dark:text-white min-h-screen">

        {/* ================= HERO SECTION - PREMIUM STYLE ================= */}
        <section className="relative py-24 px-4 text-center bg-gradient-to-br from-green-400 via-yellow-400 to-green-500 text-white overflow-hidden rounded-b-[50px] shadow-xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Fast & Secure Withdrawals
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed">
              Cash out your earnings instantly via trusted payment methods. Safe, fast, and globally available.
            </p>

            {/* HERO CTA */}
            <div className="cta-observer inline-block">
              <Link href="/signup">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-3 bg-white text-green-500 px-14 py-5 rounded-3xl font-bold shadow-2xl text-lg md:text-xl transition-all duration-300 hover:scale-105 hover:shadow-3xl"
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
        <section className="max-w-7xl mx-auto px-4 py-20 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {paymentMethods.map((method, i) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="bg-gray-50 dark:bg-[#111827] rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="mx-auto mb-5 text-green-500"
                >
                  <Icon size={40} />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{method.desc}</p>
              </motion.div>
            );
          })}
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
                <div className="flex justify-center mb-4 text-green-500">
                  <Icon size={36} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </motion.div>
            );
          })}
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section className="max-w-4xl mx-auto px-4 py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>

          {/* FAQ Search */}
          <div className="mb-8 flex justify-center">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1F2B] text-gray-900 dark:text-white w-full max-w-md focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
            />
          </div>

          <div className="space-y-4">
            {faqs
              .filter((faq) => faq.question.toLowerCase().includes(faqSearch.toLowerCase()))
              .map((faq, i) => (
                <details
                  key={i}
                  className="bg-gray-100 dark:bg-[#1A1F2B] rounded-2xl p-4 cursor-pointer shadow hover:shadow-lg transition-all duration-300"
                >
                  <summary className="font-semibold text-lg">{faq.question}</summary>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </details>
              ))}
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="text-center py-28 bg-white dark:bg-[#070A14] w-full transition-colors duration-300">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-yellow-400 to-green-500">
            Ready to Withdraw Your Earnings?
          </h2>

          <div className="cta-observer inline-block">
            <Link href="/signup">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-green-400 via-yellow-400 to-green-500 text-white px-16 py-6 rounded-3xl font-bold shadow-2xl text-xl md:text-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl"
              >
                Create Free Account <ArrowRight />
              </motion.span>
            </Link>
          </div>

          <p className="mt-6 text-gray-900 dark:text-gray-300 text-lg max-w-md mx-auto">
            Join Cashog today and start withdrawing real money safely.
          </p>
        </section>

        {/* ================= BACK TO TOP BUTTON ================= */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 p-4 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-colors z-50"
        >
          ↑ Top
        </button>

      </main>
    </>
  );
}
