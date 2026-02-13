"use client";

import React from "react";
import { ArrowRight, Zap, User, Gift, CheckCircle, ShieldCheck, ClipboardList, CreditCard } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";

/* ================= STEPS ================= */
const steps = [
  {
    icon: <User size={36} className="text-yellow-400" />,
    title: "Sign Up Free",
    description: "Create your account quickly and start exploring beginner-friendly online jobs.",
  },
  {
    icon: <ClipboardList size={36} className="text-green-400" />,
    title: "Discover Jobs",
    description: "Browse easy-to-start tasks, surveys, or micro-jobs perfect for beginners.",
  },
  {
    icon: <Zap size={36} className="text-yellow-400" />,
    title: "Start Earning",
    description: "Complete jobs and tasks to earn rewards and gain experience online fast.",
  },
  {
    icon: <CheckCircle size={36} className="text-green-400" />,
    title: "Withdraw Instantly",
    description: "Get paid securely through PayPal, gift cards, or mobile top-ups with minimal waiting.",
  },
];

/* ================= FEATURES ================= */
const features = [
  { icon: <ShieldCheck size={28} className="text-yellow-500" />, title: "Trusted & Safe", description: "Millions of users rely on our platform for secure beginner-friendly jobs." },
  { icon: <CreditCard size={28} className="text-yellow-500" />, title: "Instant Payouts", description: "Receive your earnings quickly with reliable payment methods." },
  { icon: <Gift size={28} className="text-yellow-500" />, title: "Easy-to-Start Jobs", description: "Simple tasks and micro-jobs designed for beginners with no prior experience." },
  { icon: <Zap size={28} className="text-yellow-500" />, title: "Fast Earnings", description: "Earn rewards rapidly as you complete tasks and build skills." },
  { icon: <User size={28} className="text-yellow-500" />, title: "Global Access", description: "Beginner-friendly online jobs are available worldwide, anytime." },
];

/* ================= FAQ ================= */
const faqs = [
  { q: "Do I need experience?", a: "No, all jobs are beginner-friendly and require no prior experience." },
  { q: "How do I get paid?", a: "Withdraw via PayPal, gift cards, or mobile top-ups instantly after completing tasks." },
  { q: "Are these jobs safe?", a: "Yes, our platform ensures secure, verified, and trusted opportunities." },
  { q: "Can I work on mobile?", a: "Absolutely! All jobs are accessible on desktop and mobile devices." },
  { q: "Do I have to invest?", a: "No investment is needed; all jobs are completely free to start." },
];

/* ================= PAGE COMPONENT ================= */
export default function OnlineJobsForBeginners() {
  return (
    <>
      <Meta
        title="Cashog - Online Jobs for Beginners"
        description="Start your journey with beginner-friendly online jobs. Earn easily, safely, and instantly on Cashog."
      />

      <main className="transition-colors duration-300 bg-white dark:bg-[#0B0E1A] text-gray-900 dark:text-white min-h-screen">

        {/* ================= HERO ================= */}
        <section className="py-24 px-6 text-center relative">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6">
              Online Jobs for Beginners
            </h1>
            <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              <TypingText />
            </div>
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Find simple, beginner-friendly online jobs you can start immediately and earn safely from anywhere.
            </p>

            {/* ================= HERO CTA BUTTON ================= */}
            <Link href="/signup" className="cta-observer inline-block">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-14 py-6 rounded-3xl font-bold shadow-2xl text-xl"
              >
                Start Now <ArrowRight size={24} />
              </motion.span>
            </Link>
          </div>
        </section>

        {/* ================= STEPS ================= */}
        <section className="max-w-7xl mx-auto px-6 py-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4 text-center">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-gray-100 dark:bg-[#1A1F2B] rounded-2xl p-8 flex flex-col items-center shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-[#2C3140]"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-700 dark:text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </section>

        {/* ================= FEATURES ================= */}
        <section className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-12">
            Why Choose Cashog
          </h2>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5 justify-center">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="bg-gray-50 dark:bg-[#111827] rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-shadow duration-500 w-full max-w-xs mx-auto border border-gray-200 dark:border-[#2C3140]"
              >
                <div className="flex justify-center mb-4 text-yellow-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
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
            Start Your Online Job Journey Today
          </h2>

          {/* ================= FINAL CTA BUTTON ================= */}
          <Link href="/signup" className="cta-observer inline-block">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-3xl font-bold shadow-2xl text-xl"
            >
              Join & Start Earning <ArrowRight size={24} />
            </motion.span>
          </Link>

          <p className="mt-6 text-gray-900 dark:text-gray-300 text-lg max-w-md mx-auto">
            Discover beginner-friendly online jobs and start earning safely and easily from anywhere.
          </p>
        </section>

      </main>
    </>
  );
}
