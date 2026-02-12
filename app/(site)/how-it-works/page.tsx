"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Activity, BarChart3 } from "lucide-react";
import DarkLightToggle from "@/components/switch/DarkLightToggle"; // import toggle

const steps = [
  {
    title: "Sign Up Quickly",
    description: "Create your free Cashooz account in less than 60 seconds.",
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
    icon: <ShieldCheck size={28} />,
  },
];

export default function HowItWorksPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const handleCTA = () => {
    alert("Create your Cashooz account to start earning today!");
  };

  const ctaGradient = "bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b101f] via-[#020617] to-black text-white">
      {/* DARK/LIGHT TOGGLE */}
      <div className="fixed top-6 right-6 z-50">
        <DarkLightToggle />
      </div>

      {/* HERO */}
      <section ref={heroRef} className="px-4 pt-24 pb-28 text-center max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-extrabold"
        >
          How <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">Cashooz Works</span>
        </motion.h1>

        <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
          A step-by-step guide to start earning rewards online with Cashooz.
        </p>

        <div className="mt-10">
          <motion.button
            onClick={handleCTA}
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className={`inline-flex items-center gap-3 px-12 py-5 rounded-3xl font-bold text-lg ${ctaGradient} shadow-2xl hover:scale-105`}
          >
            Start Earning Now <ArrowRight />
          </motion.button>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-white/5 px-4 py-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-gray-300 text-sm">
          <div className="flex gap-2 items-center">
            <ShieldCheck className="text-emerald-400" size={16} /> Secure & Safe
          </div>
          <div className="flex gap-2 items-center">
            <Zap className="text-yellow-400" size={16} /> Instant Rewards
          </div>
          <div className="flex gap-2 items-center">
            <Activity className="text-emerald-400" size={16} /> Easy & Fast Tasks
          </div>
          <div className="flex gap-2 items-center">
            <BarChart3 className="text-purple-400" size={16} /> High Quality Opportunities
          </div>
        </div>
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

      {/* FAQ */}
      <section className="px-4 py-20 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="text-gray-400 mt-6 space-y-4">
          <div className="bg-white/5 rounded-xl p-6 cursor-pointer hover:bg-white/10 transition">
            <h3 className="font-semibold">How do I start earning on Cashooz?</h3>
            <p className="mt-2 text-sm">
              Sign up, choose an earning method like surveys or app installs, and start completing tasks to earn rewards.
            </p>
          </div>
          <div className="bg-white/5 rounded-xl p-6 cursor-pointer hover:bg-white/10 transition">
            <h3 className="font-semibold">How do I redeem my rewards?</h3>
            <p className="mt-2 text-sm">
              Rewards can be redeemed instantly via PayPal, Gift Cards, Crypto, or other available options.
            </p>
          </div>
          <div className="bg-white/5 rounded-xl p-6 cursor-pointer hover:bg-white/10 transition">
            <h3 className="font-semibold">Is Cashooz safe?</h3>
            <p className="mt-2 text-sm">
              Yes, we use secure tracking and encrypted systems to ensure your data and rewards are safe.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section ref={footerRef} className="px-4 py-28 text-center max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold">Ready to Start Earning?</h2>
        <p className="text-gray-300 mt-4 text-lg">Join Cashooz today and earn rewards in minutes.</p>
        <motion.button
          onClick={handleCTA}
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className={`mt-10 inline-flex items-center gap-3 px-14 py-5 rounded-full font-bold text-lg ${ctaGradient} shadow-2xl hover:scale-105`}
        >
          Start Earning Now <ArrowRight />
        </motion.button>
      </section>
    </div>
  );
}
