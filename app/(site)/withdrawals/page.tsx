// app/withdrawals/page.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Lock, Globe } from "lucide-react";
import Meta from "@/components/seo/SeoEngine";
import FloatingCTA from "@/components/cta/FloatingCTA";

export default function WithdrawalsPage() {
  const faqs = [
    {
      question: "How do I withdraw my earnings?",
      answer:
        "You can withdraw your earnings via PayPal, crypto, or gift cards once you reach the minimum payout threshold.",
    },
    {
      question: "How long do withdrawals take?",
      answer:
        "Most withdrawals are processed instantly or within a few hours.",
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

  return (
    <>
      <Meta
        title="Withdrawals | Cashog"
        description="Withdraw your Cashog earnings instantly via PayPal, crypto, or gift cards. Secure and fast worldwide payouts."
      />

      <main className="transition-colors duration-300 bg-white text-gray-900 dark:bg-[#070A14] dark:text-white min-h-screen">

        {/* ================= HERO SECTION ================= */}
        <section className="relative py-20 px-4 text-center">
          <div className="max-w-3xl mx-auto">

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
              Fast & Secure Withdrawals
            </h1>

            <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
              Cash out your earnings instantly with trusted payment methods.
              Simple, secure, and available worldwide.
            </p>

            {/* IMPORTANT: SAME CLASS AS YOUR WORKING PAGES */}
            <Link href="/signup" className="cta-observer inline-block">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-12 py-5 rounded-2xl font-bold shadow-xl text-lg"
              >
                Create Free Account <ArrowRight />
              </motion.span>
            </Link>

          </div>

          {/* SAME POSITION AS HOW IT WORKS PAGE */}
          <FloatingCTA />
        </section>

        {/* ================= PAYMENT METHODS ================= */}
        <section className="max-w-7xl mx-auto px-4 py-16 grid gap-12 md:grid-cols-3">
          {[
            {
              title: "PayPal",
              desc: "Withdraw instantly to your PayPal account.",
            },
            {
              title: "Crypto Payments",
              desc: "Receive payouts via USDT, Bitcoin, Ethereum, and more.",
            },
            {
              title: "Gift Cards",
              desc: "Redeem earnings for popular gift cards worldwide.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-gray-100 dark:bg-[#1A1F2B] rounded-xl p-8 text-center shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* ================= SECURITY SECTION ================= */}
        <section className="max-w-6xl mx-auto px-4 py-16 grid gap-8 md:grid-cols-3 text-center">
          {[
            {
              icon: <Lock size={30} />,
              title: "Encrypted Transactions",
              desc: "All withdrawals are protected with advanced encryption.",
            },
            {
              icon: <ShieldCheck size={30} />,
              title: "Trusted Partners",
              desc: "We work only with verified payment providers.",
            },
            {
              icon: <Globe size={30} />,
              title: "Global Access",
              desc: "Withdraw from almost anywhere in the world.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-gray-50 dark:bg-[#111827] rounded-xl p-6 shadow hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4 text-yellow-500">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="bg-gray-100 dark:bg-[#1A1F2B] rounded-xl p-4 cursor-pointer"
              >
                <summary className="font-semibold text-lg">
                  {faq.question}
                </summary>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

      </main>
    </>
  );
}
