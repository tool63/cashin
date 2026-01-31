"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  BarChart3,
  Wallet,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

const steps = [
  {
    title: "Create Your Free Account",
    description: "Sign up on Cashog in under a minute. No investment required.",
    icon: <Zap size={28} />,
  },
  {
    title: "Choose How You Want to Earn",
    description: "Pick from surveys, games, app installs, offers, videos, and more.",
    icon: <Activity size={28} />,
  },
  {
    title: "Complete Simple Tasks",
    description: "Finish tasks at your own pace and earn rewards instantly.",
    icon: <BarChart3 size={28} />,
  },
  {
    title: "Withdraw Your Earnings",
    description: "Cash out via PayPal, Gift Cards, Crypto, and other options.",
    icon: <Wallet size={28} />,
  },
];

export default function HowCashogWorks() {
  const heroRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const [showFloating, setShowFloating] = useState(false);

  const ctaGradient =
    "bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400";

  const handleCTA = () => {
    alert("Create your Cashog account to start earning!");
  };

  useEffect(() => {
    if (!heroRef.current || !endRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const heroVisible = entries.find(
          (e) => e.target === heroRef.current
        )?.isIntersecting;

        const endVisible = entries.find(
          (e) => e.target === endRef.current
        )?.isIntersecting;

        setShowFloating(!heroVisible && !endVisible);
      },
      { threshold: 0.3 }
    );

    observer.observe(heroRef.current);
    observer.observe(endRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1220] via-[#060b18] to-black text-white">
      {/* HERO */}
      <section
        ref={heroRef}
        className="px-4 pt-24 pb-28 text-center max-w-6xl mx-auto"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-extrabold"
        >
          How{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Cashog
          </span>{" "}
          Works
        </motion.h1>

        <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
          Learn how Cashog helps you earn real rewards online — safely, easily,
          and worldwide.
        </p>

        <motion.button
          onClick={handleCTA}
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className={`mt-10 inline-flex items-center gap-3 px-12 py-5 rounded-full font-bold text-lg ${ctaGradient} shadow-xl hover:scale-105`}
        >
          Start Earning Now <ArrowRight />
        </motion.button>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-white/5 border-y border-white/10 px-4 py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-gray-300 text-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-emerald-400" size={16} />
            Secure & Verified
          </div>
          <div className="flex items-center gap-2">
            <Zap className="text-yellow-400" size={16} />
            Instant Tracking
          </div>
          <div className="flex items-center gap-2">
            <Activity className="text-cyan-400" size={16} />
            Beginner Friendly
          </div>
          <div className="flex items-center gap-2">
            <BarChart3 className="text-purple-400" size={16} />
            Multiple Earning Options
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="px-4 py-20 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">
          Start Earning in 4 Simple Steps
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0f1629] border border-white/10 rounded-2xl p-8 hover:border-cyan-400/40 transition"
            >
              <div className="text-cyan-400 mb-4 mx-auto w-fit">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {step.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FINAL CTA (before global footer) */}
      <section
        ref={endRef}
        className="px-4 py-28 text-center max-w-6xl mx-auto"
      >
        <h2 className="text-4xl font-extrabold">
          Ready to Start Earning?
        </h2>

        <p className="text-gray-300 mt-4 text-lg">
          Join Cashog today and turn your free time into rewards.
        </p>

        <motion.button
          onClick={handleCTA}
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className={`mt-10 inline-flex items-center gap-3 px-14 py-5 rounded-full font-bold text-lg ${ctaGradient}`}
        >
          Start Earning Now <ArrowRight />
        </motion.button>

        <div className="flex justify-center gap-6 mt-12 text-gray-400">
          <Facebook className="hover:text-blue-500 cursor-pointer" />
          <Twitter className="hover:text-sky-400 cursor-pointer" />
          <Instagram className="hover:text-pink-500 cursor-pointer" />
        </div>
      </section>

      {/* FLOATING CTA */}
      {showFloating && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <button
            onClick={handleCTA}
            className={`px-6 py-4 rounded-full font-bold text-sm md:text-lg ${ctaGradient} shadow-xl hover:scale-105`}
          >
            Start Earning in 60 Seconds
          </button>
        </motion.div>
      )}
    </div>
  );
}
