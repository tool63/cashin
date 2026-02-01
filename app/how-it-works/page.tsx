"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  Coins,
  Gamepad2,
  Smartphone,
  Wallet,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    title: "Create Your Free Account",
    description:
      "Sign up in under 60 seconds. No credit card. No risk.",
    icon: <Zap size={28} />,
  },
  {
    title: "Choose How You Earn",
    description:
      "Surveys, games, apps, mining rewards, offers & more.",
    icon: <Activity size={28} />,
  },
  {
    title: "Complete Tasks",
    description:
      "Earn coins instantly for every verified action.",
    icon: <Coins size={28} />,
  },
  {
    title: "Cash Out Anytime",
    description:
      "Withdraw PayPal, crypto, or gift cards with no delays.",
    icon: <Wallet size={28} />,
  },
];

const earningMethods = [
  { title: "Play Games", icon: <Gamepad2 size={26} />, desc: "Get paid for playing top mobile & PC games." },
  { title: "Install Apps", icon: <Smartphone size={26} />, desc: "Install & use apps to earn instantly." },
  { title: "Surveys", icon: <TrendingUp size={26} />, desc: "High-paying global surveys." },
  { title: "Mining Rewards", icon: <Coins size={26} />, desc: "Earn passive coins every hour." },
];

export default function HowCashoozWorks() {
  const heroRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [showFloating, setShowFloating] = useState(false);

  const ctaGradient =
    "bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400";

  const handleCTA = () => {
    alert("Redirect to signup page");
  };

  useEffect(() => {
    if (!heroRef.current || !footerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const heroVisible = entries.find(
          (e) => e.target === heroRef.current
        )?.isIntersecting;
        const footerVisible = entries.find(
          (e) => e.target === footerRef.current
        )?.isIntersecting;

        setShowFloating(!heroVisible && !footerVisible);
      },
      { threshold: 0.3 }
    );

    observer.observe(heroRef.current);
    observer.observe(footerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#020617] to-black text-white overflow-hidden">

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative px-6 pt-32 pb-40 max-w-7xl mx-auto text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight"
        >
          How{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400">
            Cashooz
          </span>{" "}
          Works
        </motion.h1>

        <p className="mt-8 text-gray-400 max-w-3xl mx-auto text-lg md:text-xl">
          A smarter, faster and more rewarding way to earn online — inspired by
          top platforms like Freecash, built to be better.
        </p>

        <motion.button
          onClick={handleCTA}
          whileHover={{ scale: 1.05 }}
          className={`mt-14 inline-flex items-center gap-4 px-16 py-6 rounded-full font-bold text-lg ${ctaGradient} shadow-[0_0_60px_rgba(34,211,238,0.35)]`}
        >
          Start Earning in 60 Seconds <ArrowRight />
        </motion.button>
      </section>

      {/* TRUST STATS */}
      <section className="max-w-7xl mx-auto px-6 -mt-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-10 text-center">
          <div>
            <h3 className="text-3xl font-bold text-cyan-400">1M+</h3>
            <p className="text-gray-400 mt-2">Users Worldwide</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-emerald-400">$5M+</h3>
            <p className="text-gray-400 mt-2">Paid to Users</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-teal-400">24/7</h3>
            <p className="text-gray-400 mt-2">Instant Withdrawals</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-purple-400">100%</h3>
            <p className="text-gray-400 mt-2">Legit & Secure</p>
          </div>
        </div>
      </section>

      {/* STEPS TIMELINE */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Start Earning in 4 Simple Steps
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              whileInView={{ opacity: [0, 1], y: [30, 0] }}
              transition={{ delay: i * 0.15 }}
              className="relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-cyan-400/40 transition"
            >
              <div className="text-cyan-400 mb-6">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-3">
                {step.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EARNING METHODS */}
      <section className="bg-white/5 py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Multiple Ways to Earn
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {earningMethods.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="bg-black/40 border border-white/10 rounded-2xl p-8"
              >
                <div className="text-emerald-400 mb-5">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="max-w-7xl mx-auto px-6 py-28 text-center">
        <ShieldCheck className="mx-auto text-emerald-400 mb-6" size={48} />
        <h2 className="text-3xl font-bold mb-6">
          Safe, Secure & Transparent
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto text-lg">
          Advanced fraud detection, encrypted tracking, and verified partners
          ensure every reward you earn is real and payable.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-300">
          <span className="flex items-center gap-2"><CheckCircle2 size={16} /> No fake offers</span>
          <span className="flex items-center gap-2"><CheckCircle2 size={16} /> No hidden fees</span>
          <span className="flex items-center gap-2"><CheckCircle2 size={16} /> Real-time tracking</span>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        ref={footerRef}
        className="px-6 py-32 text-center max-w-7xl mx-auto"
      >
        <h2 className="text-4xl font-extrabold">
          Ready to Earn Real Rewards?
        </h2>
        <p className="text-gray-400 mt-6 text-lg">
          Join Cashooz today and start earning within minutes.
        </p>

        <motion.button
          onClick={handleCTA}
          whileHover={{ scale: 1.05 }}
          className={`mt-12 inline-flex items-center gap-4 px-16 py-6 rounded-full font-bold text-lg ${ctaGradient} shadow-2xl`}
        >
          Start Earning Now <ArrowRight />
        </motion.button>
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
            className={`px-6 py-4 rounded-full font-bold text-lg ${ctaGradient} shadow-2xl hover:scale-105`}
          >
            Start Earning in 60 Seconds
          </button>
        </motion.div>
      )}
    </div>
  );
}
