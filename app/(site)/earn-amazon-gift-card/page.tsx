"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Gift,
  CreditCard,
  CheckCircle,
  ShieldCheck,
  ArrowRight,
  Smartphone,
  Globe,
  Sparkles,
} from "lucide-react";

export default function EarnAmazonGiftCardPage() {
  const router = useRouter();

  // ===== Smart CTA Logic =====
  const [ctaText, setCtaText] = useState("Start Earning Free");
  const [ctaLink, setCtaLink] = useState("/signup");

  useEffect(() => {
    const user = localStorage.getItem("user");
    const verified = localStorage.getItem("verified");

    if (!user) {
      setCtaText("Start Earning Free");
      setCtaLink("/signup");
    } else if (user && verified !== "true") {
      setCtaText("Verify Your Account");
      setCtaLink("/verify");
    } else {
      setCtaText("Go to Dashboard");
      setCtaLink("/dashboard");
    }
  }, []);

  const handleCTA = () => {
    router.push(ctaLink);
  };

  return (
    <main className="bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white overflow-hidden">

      {/* ================= HERO SECTION ================= */}
      <section className="relative py-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 px-4 py-2 rounded-full text-sm mb-6 border border-amber-500/20">
              <Sparkles size={16} />
              Earn Amazon Gift Cards Easily
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Turn Simple Tasks Into{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Amazon Gift Cards
              </span>
            </h1>

            <p className="text-gray-400 text-lg mb-8 max-w-xl">
              Complete surveys, test apps, watch videos, and get rewarded with 
              Amazon gift cards. Fast payouts. Secure platform. Worldwide access.
            </p>

            {/* Smart CTA */}
            <button
              onClick={handleCTA}
              className="group bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition px-8 py-4 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-orange-500/20"
            >
              {ctaText}
              <ArrowRight
                className="group-hover:translate-x-1 transition"
                size={18}
              />
            </button>
          </motion.div>

          {/* Hero Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 border border-gray-800 p-8 rounded-3xl shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <Gift className="text-amber-400" size={36} />
              <div>
                <h3 className="text-xl font-semibold">Amazon Rewards</h3>
                <p className="text-gray-400 text-sm">Instant Digital Delivery</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-gray-400">
                <span>Survey Completion</span>
                <span className="text-white font-medium">$5 - $15</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>App Testing</span>
                <span className="text-white font-medium">$10+</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Video Watching</span>
                <span className="text-white font-medium">$3+</span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="py-20 px-6 lg:px-20 bg-slate-900/40">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A secure and professional earning ecosystem designed for maximum rewards.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {[
            {
              icon: CheckCircle,
              title: "Easy Tasks",
              desc: "No complex skills required.",
            },
            {
              icon: ShieldCheck,
              title: "Secure & Legit",
              desc: "Trusted by thousands worldwide.",
            },
            {
              icon: Smartphone,
              title: "Mobile Friendly",
              desc: "Earn directly from your phone.",
            },
            {
              icon: Globe,
              title: "Global Access",
              desc: "Available worldwide.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -6 }}
              className="bg-slate-800/70 border border-gray-800 p-8 rounded-2xl text-center backdrop-blur-lg"
            >
              <item.icon className="mx-auto text-amber-400 mb-4" size={30} />
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-24 px-6 lg:px-20 text-center bg-gradient-to-r from-amber-600/10 via-orange-500/10 to-amber-600/10">
        <h2 className="text-3xl lg:text-5xl font-bold mb-6">
          Ready to Earn Amazon Gift Cards?
        </h2>
        <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
          Join thousands of users earning daily rewards. Start today and redeem your first Amazon gift card fast.
        </p>

        <button
          onClick={handleCTA}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition px-10 py-5 rounded-xl text-lg font-semibold shadow-lg shadow-orange-500/20"
        >
          {ctaText}
          <ArrowRight size={20} />
        </button>
      </section>

    </main>
  );
}
