"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, User, CreditCard, Gift, CheckCircle, ShieldCheck, Trophy } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";

/* ================= STEPS ================= */
const steps = [
  {
    icon: <User size={32} className="text-yellow-400" />,
    title: "Sign Up for Free",
    description: "Create your Cashog account and start earning Dogecoin instantly with our platform.",
  },
  {
    icon: <CreditCard size={32} className="text-green-400" />,
    title: "Complete Tasks & Offers",
    description: "Play games, watch videos, install apps, or complete surveys to earn points that convert to Dogecoin.",
  },
  {
    icon: <Gift size={32} className="text-yellow-400" />,
    title: "Convert Points to Dogecoin",
    description: "Redeem your points safely and instantly for Dogecoin through secure wallets.",
  },
  {
    icon: <CheckCircle size={32} className="text-green-400" />,
    title: "Withdraw Instantly",
    description: "Dogecoin is delivered directly to your wallet once the redemption threshold is reached.",
  },
];

/* ================= FEATURES ================= */
const features = [
  { title: "Instant Dogecoin Payouts", description: "Receive Dogecoin immediately after redeeming points." },
  { title: "High-Paying Offers", description: "Earn maximum points from top offers for faster rewards." },
  { title: "Global Access", description: "Available for users worldwide on any device." },
  { title: "Mobile-Friendly", description: "Earn Dogecoin on mobile, tablet, or desktop anywhere." },
  { title: "Trusted & Secure", description: "Millions of users trust Cashog for safe, verified Dogecoin payouts." },
  { title: "24/7 Support", description: "Our support team is always ready to help with any questions." },
];

/* ================= FAQ ================= */
const faqs = [
  { q: "How do I withdraw Dogecoin?", a: "After collecting points from tasks, redeem them for Dogecoin directly to your wallet instantly." },
  { q: "Can I earn from mobile?", a: "Yes! The platform is fully responsive and works on any mobile device." },
  { q: "Is signing up free?", a: "Absolutely! Creating an account and earning is 100% free." },
  { q: "Is Dogecoin safe?", a: "Yes, all withdrawals are processed securely and instantly to verified wallets." },
  { q: "How long does delivery take?", a: "Dogecoin payouts are delivered instantly after redemption." },
];

/* ================= COUNTER COMPONENT ================= */
function Counter({ end }: { end: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 20);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 20);

    return () => clearInterval(counter);
  }, [end]);

  return <span>{count.toLocaleString()}</span>;
}

/* ================= FLOATING CTA ================= */
function FloatingCTAObserver() {
  const { theme } = useTheme();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const triggerHeight = 400;
      setShow(window.scrollY > triggerHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Link href="/signup">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-3xl font-bold shadow-xl text-lg bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black`}
            >
              Start Earning <ArrowRight size={18} />
            </motion.span>
          </Link>
        </motion.div>
      )}
    </>
  );
}

/* ================= PAGE COMPONENT ================= */
export default function EarnDogecoinOnline() {
  const { theme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Meta
        title="Cashog - Earn Dogecoin Online"
        description="Learn how to earn Dogecoin online by completing tasks, surveys, and offers with Cashog. Instant, secure, and high-paying crypto rewards!"
      />

      <main
        className={`transition-colors duration-500 min-h-screen ${
          theme === "dark" ? "bg-[#070A14] text-white" : "bg-white text-gray-900"
        }`}
        style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.8s ease-in-out" }}
      >
        {/* ================= HERO ================= */}
        <section
          className={`relative py-24 px-4 text-center rounded-b-3xl transition-colors duration-500 ${
            theme === "dark" ? "bg-[#111827] text-white" : "bg-gray-50 text-gray-900"
          }`}
        >
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-4">
              Earn Dogecoin Online
            </h1>

            <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              <TypingText />
            </div>

            <p className={`text-lg sm:text-xl md:text-2xl mb-8 leading-relaxed ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}>
              Complete tasks, offers, and surveys to earn Dogecoin instantly from anywhere, on any device.
            </p>

            <Link href="/signup" className="inline-block">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-12 py-5 rounded-3xl font-bold shadow-xl text-lg"
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
              className={`rounded-2xl p-8 flex flex-col items-center shadow-md hover:shadow-lg transition-shadow duration-300 ${
                theme === "dark" ? "bg-[#1A1F2B]" : "bg-gray-100"
              }`}
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className={`text-gray-600 ${theme === "dark" ? "dark:text-gray-400" : ""}`}>{step.description}</p>
            </motion.div>
          ))}
        </section>

        {/* ================= ACHIEVEMENT COUNTERS ================= */}
        <section className="max-w-7xl mx-auto px-4 py-16 text-center grid gap-8 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`bg-gray-50 dark:bg-[#111827] rounded-2xl p-6 shadow hover:shadow-xl flex flex-col items-center`}
          >
            <Trophy size={32} className="text-yellow-400 mb-2" />
            <Counter end={50000} />
            <p className="mt-1 text-gray-600 dark:text-gray-400">Users Worldwide</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`bg-gray-50 dark:bg-[#111827] rounded-2xl p-6 shadow hover:shadow-xl flex flex-col items-center`}
          >
            <Trophy size={32} className="text-green-400 mb-2" />
            <Counter end={120000} />
            <p className="mt-1 text-gray-600 dark:text-gray-400">Tasks Completed</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`bg-gray-50 dark:bg-[#111827] rounded-2xl p-6 shadow hover:shadow-xl flex flex-col items-center`}
          >
            <Trophy size={32} className="text-yellow-400 mb-2" />
            <Counter end={85000} />
            <p className="mt-1 text-gray-600 dark:text-gray-400">Crypto Paid Out</p>
          </motion.div>
        </section>

        {/* ================= FEATURES ================= */}
        <section className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Why Choose Cashog for Dogecoin</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-center">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className={`rounded-2xl p-6 text-center shadow hover:shadow-xl transition-shadow duration-300 w-full max-w-sm mx-auto ${
                  theme === "dark" ? "bg-[#111827]" : "bg-gray-50"
                }`}
              >
                <div className="flex justify-center mb-4 text-yellow-500">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className={`text-gray-600 ${theme === "dark" ? "dark:text-gray-400" : ""}`}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className={`rounded-xl p-4 cursor-pointer group ${
                  theme === "dark" ? "bg-[#1A1F2B]" : "bg-gray-100"
                }`}
              >
                <summary className="font-semibold text-lg">{faq.q}</summary>
                <p className={`mt-2 text-gray-600 ${theme === "dark" ? "dark:text-gray-400" : ""}`}>{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className={`text-center py-28 w-full transition-colors duration-300 rounded-t-3xl ${
          theme === "dark" ? "bg-[#111827]" : "bg-[#f9fafb]"
        }`}>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
            Start Earning Dogecoin Today!
          </h2>
          <Link href="/signup" className="inline-block">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-3xl font-bold shadow-2xl text-xl"
            >
              Redeem Dogecoin <ArrowRight size={20} />
            </motion.span>
          </Link>
          <p className="mt-6 text-lg max-w-md mx-auto text-gray-300 transition-colors duration-300">
            Join Cashog and start earning Dogecoin instantly from any device, anywhere.
          </p>
        </section>

        {/* ================= FLOATING CTA ================= */}
        <FloatingCTAObserver />
      </main>
    </>
  );
}
