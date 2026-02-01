// /app/how-it-works/page.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, ShieldCheck, Coins } from "lucide-react";

// Revalidate for ISR (Next.js requirement)
export const revalidate = 60; // ✅ Must be a number or false

// Features Data
const features = [
  { icon: <Coins size={32} />, title: "Earn Instantly", desc: "Start earning points immediately by completing tasks." },
  { icon: <ShieldCheck size={32} />, title: "Safe & Secure", desc: "All your data and earnings are protected with top-tier security." },
  { icon: <Clock size={32} />, title: "Fast Payouts", desc: "Withdraw your earnings instantly to multiple payout methods." },
];

// FAQ Data
const faqs = [
  { q: "How do I start earning?", a: "Sign up, choose a task, complete it, and collect points instantly." },
  { q: "Is Cashog free?", a: "Yes, joining and participating is completely free." },
  { q: "How long does a withdrawal take?", a: "Most withdrawals are instant. Some may take up to 24 hours." },
];

export default function HowItWorksPage() {
  const [showCTA, setShowCTA] = useState(true);
  const lastScroll = useRef(0);

  // Auto-hide/show floating CTA on scroll
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setShowCTA(current < lastScroll.current || current < 300 || current + window.innerHeight >= document.body.offsetHeight);
      lastScroll.current = current;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-black to-gray-900 text-white font-sans">
      
      {/* Hero Section */}
      <section className="text-center py-28 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
        >
          Earn Online with Cashog
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10"
        >
          Complete simple tasks, play games, and watch ads to earn points instantly. Safe, secure, and fast payouts guaranteed.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-4 rounded-xl shadow-lg transition-all"
        >
          Get Started
        </motion.button>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((f, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-gray-800 p-8 rounded-2xl text-center hover:scale-105 hover:bg-gray-700 transition-transform shadow-md"
            >
              <div className="flex justify-center mb-4 text-yellow-400">{f.icon}</div>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-gray-300">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="flex flex-col gap-6">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gray-800 p-6 rounded-xl shadow-md hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
              <p className="text-gray-300">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Floating CTA Button */}
      <AnimatePresence>
        {showCTA && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-4 rounded-full shadow-2xl flex items-center gap-2">
              Start Earning in 60 Seconds <ArrowRight size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
