"use client";

import React from "react";
import { ArrowRight, User, Gift, CheckCircle, ShieldCheck, Laptop, ClipboardList, Video, CreditCard } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";

/* ================= EARNING METHODS ================= */
const methods = [
  {
    icon: <CreditCard size={36} className="text-green-400" />,
    title: "Complete Offers Online",
    description: "Earn points by completing surveys, free trials, app installs, and more."
  },
  {
    icon: <Video size={36} className="text-yellow-400" />,
    title: "Watch Videos for Money",
    description: "Enjoy engaging videos while earning real money instantly."
  },
  {
    icon: <ClipboardList size={36} className="text-green-400" />,
    title: "Play Games & Get Paid",
    description: "Get rewarded for playing popular online games and achieving milestones."
  },
  {
    icon: <Laptop size={36} className="text-yellow-400" />,
    title: "Work From Home Jobs",
    description: "Access verified remote jobs and earn safely from your home."
  },
  {
    icon: <User size={36} className="text-green-400" />,
    title: "Install Apps for Cash",
    description: "Download and install apps to earn instant rewards."
  },
  {
    icon: <Gift size={36} className="text-yellow-400" />,
    title: "Earn Without Investment",
    description: "Start earning without spending any money upfront."
  },
];

/* ================= FAQ ================= */
const faqs = [
  { q: "Are these earning methods safe?", a: "Yes! All tasks and methods are verified and safe for users worldwide." },
  { q: "Do I need to pay to start?", a: "No, all earning methods are free to start and participate." },
  { q: "How can I withdraw earnings?", a: "Withdraw your points via PayPal, gift cards, or mobile top-ups instantly." },
  { q: "Can I earn on mobile?", a: "Absolutely! All methods are fully mobile-friendly." },
  { q: "Is there a minimum age?", a: "You must be at least 13 years old to create an account and start earning." },
];

/* ================= PAGE COMPONENT ================= */
export default function OnlineEarningMethods() {
  return (
    <>
      <Meta
        title="Cashog - Online Earning Methods"
        description="Discover multiple ways to earn online with Cashog. Complete offers, watch videos, play games, and access remote jobs."
      />

      <main className="transition-colors duration-300 bg-white dark:bg-[#0B0E1A] text-gray-900 dark:text-white min-h-screen">

        {/* ================= HERO ================= */}
        <section className="py-24 px-6 text-center relative">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6">
              Online Earning Methods
            </h1>
            <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              <TypingText />
            </div>
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Discover multiple ways to earn online safely and instantly. From completing offers to remote jobs, we make earning easy.
            </p>

            {/* ================= HERO CTA BUTTON ================= */}
            <Link href="/signup" className="cta-observer inline-block">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-14 py-6 rounded-3xl font-bold shadow-2xl text-xl"
              >
                Start Earning Online <ArrowRight size={24} />
              </motion.span>
            </Link>
          </div>
        </section>

        {/* ================= METHODS GRID ================= */}
        <section className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-12">
            Popular Online Earning Methods
          </h2>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 justify-center">
            {methods.map((method, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="bg-gray-100 dark:bg-[#1A1F2B] rounded-2xl p-8 flex flex-col items-center shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-[#2C3140]"
              >
                <div className="mb-4">{method.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                <p className="text-gray-700 dark:text-gray-400">{method.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-gray-100 dark:bg-[#1A1F2B] rounded-xl p-5 cursor-pointer group border border-gray-200 dark:border-[#2C3140] hover:bg-gray-200 dark:hover:bg-[#2A2F43] transition-all duration-300">
                <summary className="font-semibold text-lg">{faq.q}</summary>
                <p className="mt-3 text-gray-700 dark:text-gray-400">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="text-center py-32 bg-white dark:bg-[#0B0E1A] w-full transition-colors duration-300">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
            Start Exploring & Earning Today
          </h2>

          {/* ================= FINAL CTA BUTTON ================= */}
          <Link href="/signup" className="cta-observer inline-block">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-3xl font-bold shadow-2xl text-xl"
            >
              Join & Earn Online <ArrowRight size={24} />
            </motion.span>
          </Link>

          <p className="mt-6 text-gray-900 dark:text-gray-300 text-lg max-w-md mx-auto">
            Access multiple online earning methods and start earning safely from anywhere in the world.
          </p>
        </section>

      </main>
    </>
  );
}
