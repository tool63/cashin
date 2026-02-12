"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, ShieldCheck, CheckCircle, User, Gift, CreditCard } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import FloatingCTA from "@/components/cta/FloatingCTA";

/* ================= COUNT-UP COMPONENT ================= */
function CountUp({ end }: { end: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 1500;
    const increment = end / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [visible, end]);

  return <span ref={ref}>{count}</span>;
}

/* ================= DATA ================= */
const features = [
  { icon: <ShieldCheck size={28} className="text-yellow-400" />, title: "Trusted & Secure", description: "Millions of users trust our platform daily." },
  { icon: <CheckCircle size={28} className="text-green-400" />, title: "Fast Payouts", description: "Instant payouts via PayPal, gift cards, and mobile top-ups." },
  { icon: <User size={28} className="text-yellow-400" />, title: "Global Reach", description: "Available in 125+ countries worldwide." },
  { icon: <Gift size={28} className="text-green-400" />, title: "High-Paying Offers", description: "Maximize your earnings with top offers." },
  { icon: <CreditCard size={28} className="text-yellow-400" />, title: "Mobile Friendly", description: "Earn on the go from any device." },
];

const stats = [
  { title: "Users", value: 1250000, color: "text-yellow-400" },
  { title: "Payouts", value: 2750000, color: "text-green-400" },
  { title: "Tasks Completed", value: 5800000, color: "text-yellow-400" },
  { title: "Countries Supported", value: 125, color: "text-green-400" },
];

const faqs = [
  { q: "Is Cashog safe?", a: "Yes, our platform is fully secure and trusted by millions of users worldwide." },
  { q: "How do I withdraw earnings?", a: "Withdraw via PayPal, gift cards, or mobile top-ups instantly." },
  { q: "Is it free to join?", a: "Yes! Creating an account is completely free." },
  { q: "Can I earn on mobile?", a: "Absolutely! Our platform is fully mobile-friendly." },
];

/* ================= MAIN PAGE ================= */
export default function TrustSafetyPage() {
  return (
    <>
      <Meta
        title="Cashog - Trust & Safety"
        description="Learn about Cashog's trusted, secure, and safe platform for earning real money online."
      />

      <main className="transition-colors duration-300 bg-white text-gray-900 dark:bg-[#070A14] dark:text-white min-h-screen">

        {/* ================= HERO ================= */}
        <section className="relative py-24 px-6 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-green-400/10 to-green-500/10 blur-3xl -z-10"></div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500"
          >
            Trusted & Secure Platform
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Cashog ensures every task and payout is secure. Join millions of users worldwide earning real money safely.
          </motion.p>

          <Link href="/signup" className="cta-observer inline-block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black dark:text-white px-14 py-6 rounded-3xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Create Free Account <ArrowRight size={20} />
            </motion.div>
          </Link>
          <FloatingCTA />
        </section>

        {/* ================= FEATURES ================= */}
        <section className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Platform Features</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5 justify-center">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="bg-gray-50 dark:bg-[#111827] rounded-xl p-6 text-center shadow hover:shadow-lg transition-shadow duration-300 w-full max-w-xs mx-auto"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="bg-white dark:bg-[#111827] py-20 text-center">
          <div className="max-w-5xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-10">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="flex flex-col items-center"
              >
                <h3 className={`text-4xl font-bold ${stat.color}`}>
                  <CountUp end={stat.value} />
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">{stat.title}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="max-w-4xl mx-auto px-4 py-16 text-center">
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

      </main>
    </>
  );
}
