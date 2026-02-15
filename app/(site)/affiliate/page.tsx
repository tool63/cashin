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
    title: "Sign Up for Free",
    description: "Create your Cashog affiliate account and start earning commissions instantly.",
  },
  {
    icon: <CreditCard size={32} className="text-green-400" />,
    title: "Share Your Referral Links",
    description: "Promote Cashog using unique referral links and banners to your audience.",
  },
  {
    icon: <Gift size={32} className="text-yellow-400" />,
    title: "Earn Commissions",
    description: "Earn points and cash for every user who signs up and completes tasks through your link.",
  },
  {
    icon: <CheckCircle size={32} className="text-green-400" />,
    title: "Withdraw Easily",
    description: "Receive your affiliate earnings via PayPal or other supported payout methods instantly.",
  },
];

/* ================= FEATURES ================= */
const features = [
  { title: "High Commission Rates", description: "Earn generous commissions for every referred user." },
  { title: "Real-Time Tracking", description: "Monitor clicks, conversions, and earnings in real time." },
  { title: "Global Access", description: "Promote Cashog from anywhere in the world." },
  { title: "Marketing Materials", description: "Get access to banners, links, and creatives to maximize referrals." },
  { title: "Trusted & Secure", description: "Millions of users trust Cashog, making it easier to convert referrals." },
  { title: "24/7 Support", description: "Our affiliate support team is ready to assist whenever needed." },
];

/* ================= FAQ ================= */
const faqs = [
  { q: "How do I join the affiliate program?", a: "Sign up for a free Cashog affiliate account and start sharing your referral links immediately." },
  { q: "How do I get paid?", a: "Earnings can be withdrawn via PayPal or other supported payout methods once you reach the minimum threshold." },
  { q: "Is there any cost to join?", a: "No, joining our affiliate program is completely free." },
  { q: "Can I join from any country?", a: "Yes! Our affiliate program is global and open to users worldwide." },
  { q: "Are my referrals tracked accurately?", a: "Yes, all clicks, sign-ups, and conversions are tracked in real time for complete transparency." },
];

/* ================= PAGE COMPONENT ================= */
export default function AffiliateProgram() {
  return (
    <>
      <Meta
        title="Cashog - Affiliate Program"
        description="Join Cashog's Affiliate Program and earn commissions by referring users. High payouts, real-time tracking, and global access!"
      />

      <div className="relative w-screen min-h-screen bg-[#0B0F1A] overflow-auto">
        {/* ============================
            Animated Gradient Overlays
        ============================ */}
        <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 opacity-20"></div>
        <div className="absolute w-72 h-72 bg-green-400/30 rounded-full blur-3xl animate-float top-20 left-10"></div>
        <div className="absolute w-96 h-96 bg-yellow-400/30 rounded-full blur-3xl animate-float animation-delay-2000 bottom-10 right-10"></div>

        {/* ============================
            Full Content
        ============================ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full flex flex-col items-center px-4 sm:px-8 pt-24 pb-16 text-white"
        >

          {/* ================= HERO ================= */}
          <section className="text-center max-w-3xl mx-auto mb-24">
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-4">
              Cashog Affiliate Program
            </h1>

            <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              <TypingText />
            </div>

            <p className="text-gray-300 text-lg sm:text-xl md:text-2xl mb-8 max-w-xl mx-auto leading-relaxed">
              Refer users, earn commissions, and get paid instantly with Cashog’s trusted affiliate program.
            </p>

            <Link href="/signup" className="cta-observer inline-block">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-12 py-5 rounded-3xl font-bold shadow-xl text-lg"
              >
                Join Affiliate Program <ArrowRight size={20} />
              </motion.span>
            </Link>
          </section>

          {/* ================= STEPS ================= */}
          <section className="max-w-7xl w-full mx-auto grid gap-12 md:grid-cols-2 lg:grid-cols-4 text-center mb-24">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="bg-[#111827] rounded-2xl p-8 flex flex-col items-center shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </section>

          {/* ================= FEATURES ================= */}
          <section className="max-w-7xl w-full mx-auto text-center mb-24">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              Why Join Cashog Affiliate Program
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-center">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="bg-[#111827] rounded-2xl p-6 text-center shadow hover:shadow-xl transition-shadow duration-300 w-full max-w-sm mx-auto"
                >
                  <div className="flex justify-center mb-4 text-yellow-500">
                    <ShieldCheck size={28} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ================= FAQ ================= */}
          <section className="max-w-4xl w-full mx-auto text-center mb-24">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="bg-[#111827] rounded-xl p-4 cursor-pointer group">
                  <summary className="font-semibold text-lg">{faq.q}</summary>
                  <p className="mt-2 text-gray-400">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* ================= FINAL CTA ================= */}
          <section className="text-center py-28 w-full rounded-t-3xl">
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              Become a Cashog Affiliate Today!
            </h2>
            <Link href="/signup" className="cta-observer inline-block">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-3xl font-bold shadow-2xl text-xl"
              >
                Join Now & Start Earning <ArrowRight size={20} />
              </motion.span>
            </Link>
            <p className="mt-6 text-gray-400 text-lg max-w-md mx-auto">
              Refer users, earn commissions, and grow with Cashog’s trusted affiliate program.
            </p>
          </section>

        </motion.div>
      </div>
    </>
  );
}
