"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Activity, BarChart3, Eye } from "lucide-react";
import Link from "next/link";

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

const earnAnywhere = [
  { title: "On Mobile", description: "Earn anytime, anywhere using your smartphone.", icon: <Eye size={28} /> },
  { title: "On Desktop", description: "Complete tasks comfortably from your PC or laptop.", icon: <Eye size={28} /> },
  { title: "On Tablet", description: "Take surveys and install apps on your tablet.", icon: <Eye size={28} /> },
];

export default function HowItWorksPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [showFloating, setShowFloating] = useState(false);

  const ctaGradient = "bg-gradient-to-r from-yellow-400 via-green-400 to-green-500";

  // Handle CTA click
  const handleCTA = () => {
    window.location.href = "/signup";
  };

  // Floating CTA show/hide logic
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
    <div className="min-h-screen bg-white dark:bg-[#070A14] text-gray-900 dark:text-white">

      {/* HERO */}
      <section ref={heroRef} className="px-4 pt-24 pb-28 text-center max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4"
        >
          How <span className="bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 bg-clip-text text-transparent">Cashooz Works</span>
        </motion.h1>

        <p className="text-gray-600 dark:text-gray-300 mt-6 max-w-2xl mx-auto text-lg sm:text-xl">
          Step-by-step guide to start earning rewards online with Cashooz.
        </p>

        <div className="mt-10">
          <Link href="/signup">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`inline-flex items-center gap-3 px-12 py-5 rounded-3xl font-bold text-lg ${ctaGradient} shadow-2xl`}
            >
              Start Earning Now <ArrowRight />
            </motion.span>
          </Link>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-white/5 px-4 py-10 max-w-7xl mx-auto rounded-2xl mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-gray-600 dark:text-gray-300 text-sm">
          <div className="flex gap-2 items-center"><ShieldCheck className="text-emerald-400" size={16} /> Secure & Safe</div>
          <div className="flex gap-2 items-center"><Zap className="text-yellow-400" size={16} /> Instant Rewards</div>
          <div className="flex gap-2 items-center"><Activity className="text-emerald-400" size={16} /> Easy & Fast Tasks</div>
          <div className="flex gap-2 items-center"><BarChart3 className="text-purple-400" size={16} /> High Quality Opportunities</div>
        </div>
      </section>

      {/* STEP-BY-STEP PROCESS */}
      <section className="px-4 py-20 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Step-by-Step Process</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
          Follow these simple steps to start earning online rewards quickly and easily.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-yellow-400/40 transition"
            >
              <div className="text-yellow-400 mb-4 mx-auto w-fit">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* NEW FEATURE: EARN FROM ANYWHERE */}
      <section className="px-4 py-20 max-w-7xl mx-auto text-center bg-white/5 rounded-2xl mb-20">
        <h2 className="text-3xl font-bold mb-4">Earn From Anywhere</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
          Access Cashooz from any device — mobile, desktop, or tablet — and earn rewards at your convenience.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {earnAnywhere.map((item, i) => (
            <motion.div
              key={i}
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-yellow-400/40 transition flex flex-col items-center gap-3"
            >
              <div className="text-yellow-400">{item.icon}</div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-20 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="text-gray-600 dark:text-gray-300 mt-6 space-y-4">
          <div className="bg-white/5 rounded-xl p-6 cursor-pointer hover:bg-white/10 transition">
            <h3 className="font-semibold">How do I start earning on Cashooz?</h3>
            <p className="mt-2 text-sm">Sign up, choose an earning method like surveys or app installs, and start completing tasks to earn rewards.</p>
          </div>
          <div className="bg-white/5 rounded-xl p-6 cursor-pointer hover:bg-white/10 transition">
            <h3 className="font-semibold">How do I redeem my rewards?</h3>
            <p className="mt-2 text-sm">Rewards can be redeemed instantly via PayPal, Gift Cards, Crypto, or other available options.</p>
          </div>
          <div className="bg-white/5 rounded-xl p-6 cursor-pointer hover:bg-white/10 transition">
            <h3 className="font-semibold">Is Cashooz safe?</h3>
            <p className="mt-2 text-sm">Yes, we use secure tracking and encrypted systems to ensure your data and rewards are safe.</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section ref={footerRef} className="px-4 py-28 text-center max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-4">Ready to Start Earning?</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">Join Cashooz today and earn rewards in minutes.</p>
        <Link href="/signup">
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={`mt-10 inline-flex items-center gap-3 px-14 py-5 rounded-full font-bold text-lg ${ctaGradient} shadow-2xl`}
          >
            Start Earning Now <ArrowRight />
          </motion.span>
        </Link>
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
