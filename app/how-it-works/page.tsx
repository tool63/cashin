"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Activity, BarChart3, Wallet } from "lucide-react";

const steps = [
  {
    title: "Sign Up Quickly",
    description: "Create your free Cashog account in less than 60 seconds.",
    icon: <Zap size={28} />,
  },
  {
    title: "Explore Ways to Earn",
    description: "Surveys, App Installs, Games, Offers, and more all in one place.",
    icon: <Activity size={28} />,
  },
  {
    title: "Complete Tasks",
    description: "Choose the activities that suit you and start earning rewards instantly.",
    icon: <BarChart3 size={28} />,
  },
  {
    title: "Redeem Rewards",
    description: "Withdraw via PayPal, Gift Cards, Crypto, and more.",
    icon: <Wallet size={28} />,
  },
];

export default function HowCashogWorks() {
  const heroRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [showFloating, setShowFloating] = useState(false);

  const handleCTA = () => alert("Create your Cashog account to start earning today!");

  const ctaGradient = "bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400";

  useEffect(() => {
    if (!heroRef.current || !footerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const heroVisible = entries.find((e) => e.target === heroRef.current)?.isIntersecting;
        const footerVisible = entries.find((e) => e.target === footerRef.current)?.isIntersecting;
        setShowFloating(!heroVisible && !footerVisible);
      },
      { threshold: 0.3 }
    );
    observer.observe(heroRef.current);
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b101f] via-[#020617] to-black text-white">
      {/* HERO */}
      <section ref={heroRef} className="px-4 pt-24 pb-28 text-center max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-extrabold"
        >
          How <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">Cashog</span> Works
        </motion.h1>
        <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
          A step-by-step guide to start earning rewards online with Cashog.
        </p>
        <motion.button
          onClick={handleCTA}
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className={`mt-10 inline-flex items-center gap-3 px-12 py-5 rounded-3xl font-bold text-lg ${ctaGradient} shadow-2xl hover:scale-105`}
        >
          Start Earning Now <ArrowRight />
        </motion.button>
      </section>

      {/* STEPS */}
      <section className="px-4 py-20 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Step-by-Step Process</h2>
        <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
          Follow these simple steps to start earning online rewards quickly and easily.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-cyan-400/40 transition"
            >
              <div className="text-cyan-400 mb-4 mx-auto w-fit">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section ref={footerRef} className="px-4 py-28 text-center max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold">Ready to Start Earning?</h2>
        <p className="text-gray-300 mt-4 text-lg">Join Cashog today and earn rewards in minutes.</p>
        <motion.button
          onClick={handleCTA}
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className={`mt-10 inline-flex items-center gap-3 px-14 py-5 rounded-full font-bold text-lg ${ctaGradient} shadow-2xl`}
        >
          Start Earning Now <ArrowRight />
        </motion.button>
      </section>

      {/* FLOATING CTA */}
      {showFloating && (
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="fixed bottom-6 right-6 z-50">
          <button
            onClick={handleCTA}
            className={`px-6 py-4 rounded-full font-bold text-lg ${ctaGradient} shadow-2xl hover:scale-105`}
          >
            Start Earning in 60 Seconds
          </button>
        </motion.div>
      )}
    </div>
  );
}
