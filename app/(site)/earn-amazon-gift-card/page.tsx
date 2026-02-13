"use client";

import React from "react";
import { ArrowRight, Gift, CreditCard, User, CheckCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";

/* ================= STEPS ================= */
const steps = [
  {
    icon: <User size={32} className="text-yellow-400" />,
    title: "Sign Up for Free",
    description: "Join Cashog and instantly get access to Amazon gift card earning offers.",
  },
  {
    icon: <CreditCard size={32} className="text-green-400" />,
    title: "Complete Offers",
    description: "Play games, watch videos, install apps, or answer surveys to earn points fast.",
  },
  {
    icon: <Gift size={32} className="text-yellow-400" />,
    title: "Redeem Amazon Gift Cards",
    description: "Convert your points into Amazon gift cards instantly and securely.",
  },
  {
    icon: <CheckCircle size={32} className="text-green-400" />,
    title: "Withdraw Easily",
    description: "Gift cards delivered instantly to your account once the threshold is met.",
  },
];

/* ================= FEATURES ================= */
const features = [
  { title: "Instant Delivery", description: "Get your Amazon gift cards instantly after redemption." },
  { title: "High-Paying Offers", description: "Top offers ensure maximum points per task completed." },
  { title: "Global Access", description: "Available to users worldwide, no matter where you are." },
  { title: "Mobile-Friendly", description: "Earn points anytime, anywhere on mobile or desktop." },
  { title: "Trusted & Secure", description: "Millions of users trust Cashog for safe rewards." },
  { title: "24/7 Support", description: "Our support team is always ready to help." },
];

/* ================= FAQ ================= */
const faqs = [
  { q: "How do I redeem Amazon gift cards?", a: "Simply collect points from tasks and redeem them in your rewards section." },
  { q: "Can I earn from mobile?", a: "Yes! Our platform is fully responsive and mobile-friendly." },
  { q: "Is signing up free?", a: "Absolutely, you can join and start earning instantly without paying anything." },
  { q: "Do I need a PayPal account?", a: "No, you can directly redeem points for Amazon gift cards without PayPal." },
  { q: "How long does delivery take?", a: "Amazon gift cards are delivered instantly to your account after redemption." },
];

/* ================= PAGE COMPONENT ================= */
export default function EarnAmazonGiftCard() {
  return (
    <>
      <Meta
        title="Cashog - Earn Amazon Gift Cards"
        description="Learn how to earn Amazon gift cards online by completing tasks, surveys, and offers with Cashog. Fast, secure, and instant rewards!"
      />

      <main className="transition-colors duration-300 bg-white dark:bg-[#070A14] text-gray-900 dark:text-white min-h-screen">

        {/* ================= HERO ================= */}
        <section className="py-24 px-4 text-center bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 rounded-b-3xl">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 text-white">
              Earn Amazon Gift Cards Online
            </h1>

            <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-white">
              <TypingText />
            </div>

            <p className="text-lg sm:text-xl md:text-2xl mb-8 text-white/90 max-w-xl mx-auto leading-relaxed">
              Complete simple tasks and start earning Amazon gift cards instantly from anywhere in the world.
            </p>

            <Link href="/signup" className="cta-observer inline-block">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-white text-black px-12 py-5 rounded-3xl font-bold shadow-xl text-lg"
              >
                Start Earning Now <ArrowRight size={20} />
              </motion.span>
            </Link>
          </div>
        </section>

        {/* ================= STEPS ================= */}
        <section className="max-w-7xl mx-auto px-4 py-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4 text-center">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-gray-100 dark:bg-[#1A1F2B] rounded-2xl p-8 flex flex-col items-center shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </section>

        {/* ================= FEATURES ================= */}
        <section className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Why Choose Cashog for Amazon Gift Cards
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-center">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="bg-gray-50 dark:bg-[#111827] rounded-2xl p-6 text-center shadow hover:shadow-xl transition-shadow duration-300 w-full max-w-sm mx-auto"
              >
                <div className="flex justify-center mb-4 text-yellow-500">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-gray-100 dark:bg-[#1A1F2B] rounded-xl p-4 cursor-pointer group">
                <summary className="font-semibold text-lg">{faq.q}</summary>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="text-center py-28 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 w-full transition-colors duration-300 rounded-t-3xl">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-white">
            Start Earning Amazon Gift Cards Today!
          </h2>
          <Link href="/signup" className="cta-observer inline-block">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-white text-black px-16 py-6 rounded-3xl font-bold shadow-2xl text-xl"
            >
              Redeem Gift Cards <ArrowRight size={20} />
            </motion.span>
          </Link>
          <p className="mt-6 text-white/90 text-lg max-w-md mx-auto transition-colors duration-300">
            Join Cashog and start earning Amazon gift cards from any device, anywhere in the world.
          </p>
        </section>

      </main>
    </>
  );
}
