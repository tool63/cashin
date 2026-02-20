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

      <main className="relative min-h-screen text-gray-900 dark:text-white overflow-hidden transition-colors duration-300">

        {/* ============================
            ONE PAGE SECTION
        ============================ */}
        <section className="relative isolate max-w-7xl mx-auto px-4">

          {/* ================= HERO ================= */}
          <div className="py-32 text-center">
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 text-gray-900 dark:text-white drop-shadow-lg">
              Become a Cashog Partner
            </h1>

            <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8 
                bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 drop-shadow-md">
              <TypingText />
            </div>

            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Collaborate with Cashog to grow your business, earn revenue, and gain global exposure.
            </p>

            <Link href="/signup" className="cta-observer inline-block">
              <motion.span
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-3xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 text-xl"
              >
                Join as a Partner <ArrowRight size={24} />
              </motion.span>
            </Link>
          </div>

          {/* ================= STEPS ================= */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 mt-32">
            How It <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">Works</span>
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-20">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="bg-gray-50 dark:bg-[#0b0e1a] rounded-2xl p-8 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 group hover:-translate-y-2"
              >
                <div className="mb-4 p-4 rounded-full bg-gradient-to-r from-yellow-400/20 via-green-400/20 to-green-500/20 group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>

          {/* ================= FEATURES ================= */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Why Partner with <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">Cashog</span>
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Join thousands of partners who trust Cashog to grow revenue and expand globally.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-20">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white dark:bg-[#070A14] rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:-translate-y-2"
              >
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-yellow-400/20 via-green-400/20 to-green-500/20 mb-4 justify-center">
                  <ShieldCheck size={24} className="text-yellow-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* ================= FAQ ================= */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Frequently Asked <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">Questions</span>
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
            Everything you need to know about partnering with Cashog
          </p>
          <div className="space-y-4 mb-20">
            {faqs.map((faq, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-white dark:bg-[#0b0e1a] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <summary className="font-semibold text-lg px-6 py-4 cursor-pointer flex items-center justify-between hover:bg-gradient-to-r hover:from-yellow-400/5 hover:via-green-400/5 hover:to-green-500/5">
                  <span>{faq.q}</span>
                  <span className="text-green-500 group-open:rotate-180 transition-transform duration-300">▼</span>
                </summary>
                <div className="px-6 pb-4 text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 pt-4">
                  {faq.a}
                </div>
              </motion.details>
            ))}
          </div>

          {/* ================= FINAL CTA ================= */}
          <div className="py-28 text-center rounded-t-[60px] relative">
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 gradient-text drop-shadow-lg">
              Partner with Cashog Today!
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Collaborate, grow revenue, and gain global exposure by joining Cashog’s partner program.
            </p>
            <Link href="/signup" className="cta-observer inline-block">
              <motion.span
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-20 py-7 rounded-3xl font-bold shadow-3xl text-xl hover:shadow-4xl transition-all duration-300"
              >
                Join as a Partner <ArrowRight size={24} />
              </motion.span>
            </Link>
          </div>

        </section>
      </main>
    </>
  );
}
