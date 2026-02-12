"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, User, CreditCard, Gift, CheckCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";
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
const steps = [
  { icon: <User size={32} />, title: "Sign Up for Free", description: "Create your account in minutes and join our growing community of earners." },
  { icon: <CreditCard size={32} />, title: "Complete Tasks & Offers", description: "Play games, watch videos, install apps, or complete surveys to earn points." },
  { icon: <Gift size={32} />, title: "Earn Rewards", description: "Points can be redeemed for real cash via PayPal, gift cards, or mobile top-ups." },
  { icon: <CheckCircle size={32} />, title: "Withdraw Easily", description: "Instant payouts once you reach the minimum withdrawal threshold." },
];

const features = [
  { title: "Fast Payouts", description: "Get your money instantly via PayPal or gift cards." },
  { title: "Trusted & Secure", description: "Millions of users trust our platform daily." },
  { title: "High-Paying Offers", description: "Access top offers that maximize your earnings." },
  { title: "Mobile-Friendly", description: "Earn on the go with our fully responsive platform." },
  { title: "Trusted Payments", description: "Secure and reliable payouts every time." },
];

const faqs = [
  { q: "How do I cash out?", a: "You can withdraw via PayPal, gift cards, or mobile top-ups once you reach the minimum threshold." },
  { q: "Are surveys safe?", a: "Yes, all tasks and surveys are secure and verified for safety." },
  { q: "Can I join from any country?", a: "Yes! Our platform supports users globally." },
  { q: "Is there a minimum age to join?", a: "You must be at least 13 years old to create an account." },
  { q: "How long does it take to get paid?", a: "Most withdrawals are processed instantly or within a few hours." },
  { q: "Do I need to pay anything to join?", a: "No, signing up is completely free." },
  { q: "Can I complete offers on mobile?", a: "Yes! Our platform is fully mobile-friendly, so you can earn anywhere." },
];

const stats = [
  { title: "Users", value: 1250000, color: "text-yellow-400" },
  { title: "Payouts", value: 2750000, color: "text-green-400" },
  { title: "Offers Completed", value: 5800000, color: "text-yellow-400" },
  { title: "Countries Supported", value: 125, color: "text-green-400" },
];

/* ================= MAIN PAGE ================= */
export default function HowItWorks() {
  return (
    <>
      <Meta
        title="Cashog - How It Works"
        description="Learn how to earn real money online by completing tasks, surveys, and high-paying offers on Cashog."
      />

      <main className="transition-colors duration-300 bg-white text-gray-900 dark:bg-[#070A14] dark:text-white min-h-screen">

        {/* ================= HERO ================= */}
        <section className="relative py-24 px-6 text-center overflow-hidden">
          {/* subtle gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-green-400/10 to-green-500/10 blur-3xl -z-10"></div>

          <div className="max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500"
            >
              Earn Real Money Online
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500"
            >
              <TypingText />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-10 leading-relaxed"
            >
              Follow these simple steps and start earning instantly from anywhere.
            </motion.p>

            <Link href="/signup" className="cta-observer inline-block">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-12 py-5 rounded-2xl font-bold shadow-xl text-lg"
              >
                Start Earning Now <ArrowRight />
              </motion.span>
            </Link>
          </div>
          <FloatingCTA />
        </section>

        {/* ================= HOW IT WORKS STEPS ================= */}
        <section className="max-w-7xl mx-auto px-4 py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4 place-items-center text-center">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-100 dark:bg-[#1A1F2B] rounded-xl p-8 flex flex-col items-center text-center shadow-md hover:shadow-lg transition-shadow duration-300 w-full max-w-xs"
            >
              <div className="mb-4 text-yellow-500">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </section>

        {/* ================= FEATURES ================= */}
        <section className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Why Choose Cashog
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5 justify-center">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="bg-gray-50 dark:bg-[#111827] rounded-xl p-6 text-center shadow hover:shadow-lg transition-shadow duration-300 w-full max-w-xs"
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

        {/* ================= STATS / COUNT-UP ================= */}
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

        {/* ================= FINAL CTA ================= */}
        <section className="text-center py-28 bg-white dark:bg-[#070A14] w-full transition-colors duration-300">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
            Ready to Start Earning Today?
          </h2>

          <Link href="/signup" className="cta-observer inline-block">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-xl"
            >
              Start Earning in 60 Seconds <ArrowRight />
            </motion.span>
          </Link>

          <p className="mt-6 text-gray-900 dark:text-gray-300 text-lg max-w-md mx-auto transition-colors duration-300">
            Become part of our community and start earning daily rewards instantly.
          </p>
        </section>

      </main>
    </>
  );
}
