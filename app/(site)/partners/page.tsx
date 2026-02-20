"use client";

import React from "react";
import { ArrowRight, User, CreditCard, Target, Globe, BarChart, DollarSign, ShieldCheck, Headphones, CheckCircle, Users } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";

/* ================= DATA ================= */
const steps = [
  { icon: <User size={32} className="text-yellow-400" />, title: "Sign Up as Partner", description: "Create a partner account to start promoting products and earning rewards." },
  { icon: <CreditCard size={32} className="text-green-400" />, title: "Choose Offers", description: "Browse our offers and select campaigns that fit your audience." },
  { icon: <Target size={32} className="text-yellow-400" />, title: "Drive Conversions", description: "Share your unique links and drive traffic to earn commissions." },
  { icon: <BarChart size={32} className="text-green-400" />, title: "Track Your Earnings", description: "Monitor clicks, conversions, and payouts in real-time from your dashboard." },
];

const features = [
  { icon: <Target size={24} className="text-yellow-500" />, title: "High Conversion Offers", description: "Promote campaigns that convert and maximize your earnings.", color: "from-yellow-400/20 to-yellow-500/5" },
  { icon: <BarChart size={24} className="text-green-500" />, title: "Real-Time Tracking", description: "Track your performance and commissions instantly.", color: "from-green-400/20 to-green-500/5" },
  { icon: <Globe size={24} className="text-yellow-500" />, title: "Global Opportunities", description: "Promote offers to users worldwide.", color: "from-yellow-400/20 to-yellow-500/5" },
  { icon: <DollarSign size={24} className="text-green-500" />, title: "Flexible Payments", description: "Receive payouts on your schedule via multiple methods.", color: "from-green-400/20 to-green-500/5" },
  { icon: <ShieldCheck size={24} className="text-yellow-500" />, title: "Trusted Platform", description: "Join a platform used by thousands of successful partners.", color: "from-yellow-400/20 to-yellow-500/5" },
  { icon: <Headphones size={24} className="text-green-500" />, title: "Partner Support", description: "Our team helps you optimize campaigns and increase earnings.", color: "from-green-400/20 to-green-500/5" },
];

const stats = [
  { value: "50M+", label: "Active Users", icon: <Users size={20} /> },
  { value: "150+", label: "Countries", icon: <Globe size={20} /> },
  { value: "2.5B+", label: "Offers Completed/mo", icon: <BarChart size={20} /> },
  { value: "99.9%", label: "Uptime", icon: <CheckCircle size={20} /> },
];

const faqs = [
  { q: "How do I become a partner?", a: "Sign up for a partner account and start sharing your referral links immediately." },
  { q: "How do I earn commissions?", a: "You earn when users complete offers, surveys, or tasks through your referral links." },
  { q: "Are there minimum requirements?", a: "There’s no minimum; anyone can start promoting and earning from day one." },
  { q: "How can I track performance?", a: "Your dashboard provides real-time analytics including clicks, conversions, and earnings." },
  { q: "How are payouts made?", a: "We offer multiple payment options including PayPal, bank transfer, and crypto (where available)."},
  { q: "Can I promote globally?", a: "Yes! Our network allows global promotion with geo-targeted offers for maximum effectiveness." },
];

/* ================= PAGE COMPONENT ================= */
export default function PartnerPage() {
  return (
    <>
      <Meta
        title="Cashog Partners - Join & Earn Rewards"
        description="Become a Cashog partner and earn by promoting offers globally. Real-time tracking, flexible payouts, and high-converting campaigns."
      />

      <main className="relative min-h-screen bg-white dark:bg-[#070A14] text-gray-900 dark:text-white overflow-hidden">

        {/* ============================
            Global Background Gradient + Glow
        ============================ */}
        <div className="absolute inset-0 
          bg-gradient-to-br from-yellow-400/20 via-green-400/30 to-green-500/20
          dark:from-yellow-500/10 dark:via-green-700/20 dark:to-green-800/20
          transition-colors duration-500 pointer-events-none"></div>

        <div className="absolute w-80 h-80 bg-green-400/25 rounded-full blur-[120px] top-10 left-10 animate-blobMove pointer-events-none"></div>
        <div className="absolute w-96 h-96 bg-yellow-400/25 rounded-full blur-[140px] bottom-10 right-10 animate-blobMove2 pointer-events-none"></div>
        <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl pointer-events-none"></div>

        <section className="relative isolate max-w-7xl mx-auto px-4">

          {/* ================= HERO ================= */}
          <div className="py-32 text-center rounded-b-[60px] shadow-xl">
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 text-gray-900 dark:text-white drop-shadow-lg">
              Join Cashog Partners
            </h1>
            <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8 gradient-text drop-shadow-md">
              <TypingText />
            </div>
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Promote offers, earn rewards, and scale your partner business globally with Cashog.
            </p>
            <Link href="/signup?type=partner" className="cta-observer inline-block">
              <motion.span
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-3xl font-bold shadow-2xl text-xl hover:shadow-3xl transition-all duration-300"
              >
                Become a Partner <ArrowRight size={24} />
              </motion.span>
            </Link>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 mt-16">
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800/50 rounded-full">
                  <span className="text-yellow-500">{stat.icon}</span>
                  <span className="font-bold text-gray-900 dark:text-white">{stat.value}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ================= STEPS ================= */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 mt-32">
            How It <span className="gradient-text">Works</span>
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
            Why Join <span className="gradient-text">Cashog Partners</span>
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Thousands of partners trust Cashog to earn rewards and grow their business efficiently.
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
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* ================= FAQ ================= */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
            All you need to know about partnering with Cashog
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
          <div className="py-28 text-center rounded-t-[60px] shadow-xl relative">
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 gradient-text drop-shadow-lg">
              Ready to Start Earning?
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Join thousands of partners already making rewards with Cashog
            </p>
            <Link href="/signup?type=partner" className="cta-observer inline-block">
              <motion.span
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-20 py-7 rounded-3xl font-bold shadow-3xl text-xl hover:shadow-4xl transition-all duration-300"
              >
                Join Now <ArrowRight size={24} />
              </motion.span>
            </Link>
            <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-2">✓ No experience required</span>
              <span className="flex items-center gap-2">✓ Flexible promotion options</span>
              <span className="flex items-center gap-2">✓ 24/7 support</span>
            </div>
          </div>

        </section>
      </main>
    </>
  );
}
