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
    title: "Join as a Partner",
    description: "Create a partner account with Cashog and start collaborating instantly.",
  },
  {
    icon: <CreditCard size={32} className="text-green-400" />,
    title: "Collaborate & Promote",
    description: "Work with Cashog to promote services, integrate offers, or co-market campaigns.",
  },
  {
    icon: <Gift size={32} className="text-yellow-400" />,
    title: "Earn Revenue Together",
    description: "Share profits from users, sales, or leads generated through your partnership.",
  },
  {
    icon: <CheckCircle size={32} className="text-green-400" />,
    title: "Seamless Management",
    description: "Monitor collaborations, revenue, and performance with our easy partner dashboard.",
  },
];

/* ================= FEATURES ================= */
const features = [
  { title: "Trusted Collaboration", description: "Work with a platform trusted by millions worldwide." },
  { title: "Revenue Sharing", description: "Flexible and transparent revenue-sharing models for all partners." },
  { title: "Global Access", description: "Partner with Cashog from anywhere in the world." },
  { title: "Marketing Support", description: "Access banners, creatives, and promotional resources for campaigns." },
  { title: "Real-Time Analytics", description: "Track performance, conversions, and revenue in real time." },
  { title: "24/7 Partner Support", description: "Our dedicated partner support team is always ready to assist." },
];

/* ================= FAQ ================= */
const faqs = [
  { q: "How do I become a Cashog partner?", a: "Sign up for a partner account and start collaborating immediately." },
  { q: "What types of partnerships are available?", a: "We offer affiliate, co-marketing, referral, and integration partnerships." },
  { q: "Is there a fee to join?", a: "No, joining the Cashog partner program is completely free." },
  { q: "Can I track my performance?", a: "Yes, all partners have access to real-time dashboards and analytics." },
  { q: "Is support available for partners?", a: "Absolutely! Our team is available 24/7 to assist with any questions or campaigns." },
];

/* ================= PAGE COMPONENT ================= */
export default function PartnersPage() {
  return (
    <>
      <Meta
        title="Cashog - Partners"
        description="Join Cashog as a partner and collaborate to earn revenue. Trusted partnerships, real-time tracking, and global access."
      />

      <main className="transition-colors duration-300 bg-white dark:bg-[#070A14] text-gray-900 dark:text-white min-h-screen">

        {/* ================= HERO ================= */}
        <section className="py-24 px-4 text-center bg-[#111827] dark:bg-[#111827] rounded-b-3xl">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 text-white">
              Become a Cashog Partner
            </h1>

            <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              <TypingText />
            </div>

            <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-300 max-w-xl mx-auto leading-relaxed">
              Collaborate with Cashog to grow your business, earn revenue, and gain global exposure.
            </p>

            <Link href="/signup" className="cta-observer inline-block">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-12 py-5 rounded-3xl font-bold shadow-xl text-lg"
              >
                Join as a Partner <ArrowRight size={20} />
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
            Why Partner with Cashog
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
        <section className="text-center py-28 bg-[#111827] dark:bg-[#111827] w-full transition-colors duration-300 rounded-t-3xl">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
            Partner with Cashog Today!
          </h2>
          <Link href="/signup" className="cta-observer inline-block">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-3xl font-bold shadow-2xl text-xl"
            >
              Join as a Partner <ArrowRight size={20} />
            </motion.span>
          </Link>
          <p className="mt-6 text-gray-300 text-lg max-w-md mx-auto transition-colors duration-300">
            Collaborate, grow revenue, and gain global exposure by joining Cashog’s partner program.
          </p>
        </section>

      </main>
    </>
  );
}
