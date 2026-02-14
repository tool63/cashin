"use client";

import React from "react";
import { ArrowRight, User, CreditCard, Gift, CheckCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";

/* ================= STEPS ================= */
const steps = [
  {
    icon: <User size={32} className="text-yellow-400" />,
    title: "Sign Up as Advertiser",
    description: "Create an advertiser account and access our platform to promote your brand or products.",
  },
  {
    icon: <CreditCard size={32} className="text-green-400" />,
    title: "Set Up Campaigns",
    description: "Design your ad campaigns, choose target audience, and set your budget with ease.",
  },
  {
    icon: <Gift size={32} className="text-yellow-400" />,
    title: "Reach Millions",
    description: "Your ads will be displayed to millions of active users completing tasks, surveys, and offers.",
  },
  {
    icon: <CheckCircle size={32} className="text-green-400" />,
    title: "Monitor & Optimize",
    description: "Track clicks, conversions, and ROI in real-time with our advertiser dashboard.",
  },
];

/* ================= FEATURES ================= */
const features = [
  { title: "High Engagement", description: "Reach an active audience ready to interact with your ads." },
  { title: "Real-Time Analytics", description: "Monitor performance metrics instantly to optimize campaigns." },
  { title: "Global Reach", description: "Promote to users from anywhere in the world." },
  { title: "Flexible Budgets", description: "Set daily or total campaign budgets to control spending efficiently." },
  { title: "Trusted Platform", description: "Advertise on a platform trusted by millions of users worldwide." },
  { title: "Dedicated Support", description: "Our team helps you set up and optimize campaigns 24/7." },
];

/* ================= FAQ ================= */
const faqs = [
  { q: "How do I start advertising?", a: "Sign up for a free advertiser account and create your first campaign instantly." },
  { q: "Can I target specific users?", a: "Yes, our platform allows detailed targeting by demographics, location, and interests." },
  { q: "Is there a minimum budget?", a: "You can start with any budget that fits your advertising goals." },
  { q: "How is campaign performance tracked?", a: "Real-time dashboards provide clicks, conversions, and ROI metrics." },
  { q: "Can I run campaigns globally?", a: "Absolutely! Our platform supports global reach and multi-country campaigns." },
];

/* ================= PAGE COMPONENT ================= */
export default function AdvertisePage() {
  return (
    <>
      <Meta
        title="Cashog - Advertise with Us"
        description="Reach millions of active users by advertising with Cashog. Flexible budgets, real-time analytics, and global reach for your campaigns."
      />

      <main className="transition-colors duration-300 bg-white dark:bg-[#070A14] text-gray-900 dark:text-white min-h-screen">

        {/* ================= HERO ================= */}
        <section className="py-24 px-4 text-center rounded-b-3xl transition-colors duration-300 
            bg-white dark:bg-[#111827]">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 
                text-gray-900 dark:text-white">
              Advertise with Cashog
            </h1>

            <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 
                bg-clip-text text-transparent 
                bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              <TypingText />
            </div>

            <p className="text-lg sm:text-xl md:text-2xl mb-8 
                text-gray-700 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
              Reach millions of active users, maximize engagement, and grow your business with Cashog.
            </p>

            <Link href="/signup" className="cta-observer inline-block">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 
                    bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 
                    text-black dark:text-black px-12 py-5 rounded-3xl font-bold shadow-xl
                    dark:shadow-none text-lg"
              >
                Start Advertising <ArrowRight size={20} />
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
            Why Advertise with Cashog
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
        <section className="text-center py-28 w-full rounded-t-3xl transition-colors duration-300
            bg-white dark:bg-[#111827]">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 
              bg-clip-text text-transparent 
              bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
            Start Advertising with Cashog Today!
          </h2>
          <Link href="/signup" className="cta-observer inline-block">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 
                  bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 
                  text-black dark:text-black px-16 py-6 rounded-3xl font-bold shadow-2xl 
                  dark:shadow-none text-xl"
            >
              Launch Your Campaign <ArrowRight size={20} />
            </motion.span>
          </Link>
          <p className="mt-6 text-gray-700 dark:text-gray-300 text-lg max-w-md mx-auto transition-colors duration-300">
            Reach millions of active users and grow your brand with Cashog’s trusted advertising platform.
          </p>
        </section>

      </main>
    </>
  );
}
