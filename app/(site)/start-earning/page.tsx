"use client";

import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Zap,
  Smartphone,
  Gift,
  Star,
  Video,
  Gamepad,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";

/* ------------------ STEPS ------------------ */
const steps = [
  { title: "Sign Up Instantly", icon: <Gift size={28} />, desc: "Create your account in seconds and start earning." },
  { title: "Pick Your Task", icon: <Video size={28} />, desc: "Select from surveys, app installs, games, and more." },
  { title: "Complete & Earn", icon: <Gamepad size={28} />, desc: "Finish tasks and watch your rewards accumulate." },
  { title: "Withdraw Rewards", icon: <Star size={28} />, desc: "Cash out instantly via PayPal, gift cards, or crypto." },
];

const features = [
  { icon: <Zap size={44} className="text-yellow-400" />, title: "Instant Rewards", desc: "Get paid immediately after completing each task." },
  { icon: <Smartphone size={44} className="text-cyan-400" />, title: "Mobile-First Experience", desc: "Earn anywhere, anytime." },
  { icon: <Gift size={44} className="text-green-400" />, title: "Multiple Income Streams", desc: "Surveys, games, installs and premium offers." },
  { icon: <Star size={44} className="text-purple-400" />, title: "Top Paying Offers", desc: "High value tasks selected daily." },
];

export default function HowToStartEarning() {
  const [showFloating, setShowFloating] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  /* ---------------- FLOATING CTA LOGIC ---------------- */
  useEffect(() => {
    if (!heroRef.current || !footerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const heroVisible = entries.find(e => e.target === heroRef.current)?.isIntersecting;
        const footerVisible = entries.find(e => e.target === footerRef.current)?.isIntersecting;

        setShowFloating(!heroVisible && !footerVisible);
      },
      { threshold: 0.3 }
    );

    observer.observe(heroRef.current);
    observer.observe(footerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Meta
        title="Cashog - How to Start Earning Real Money Online"
        description="Start earning real money with Cashog by completing surveys, games and installs."
      />

      <main className="bg-white dark:bg-[#070A14] text-gray-900 dark:text-white">

        {/* HERO */}
        <section
          ref={heroRef}
          className="max-w-6xl mx-auto px-4 py-28 text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            Earn Real Money <br /> Instantly
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Complete surveys, play games, and install apps to earn rewards instantly.
          </p>

          <Link href="/signup">
            <motion.span
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="mt-10 inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-14 py-6 rounded-2xl font-semibold shadow-xl text-lg"
            >
              Start Earning Now <ArrowRight />
            </motion.span>
          </Link>
        </section>

        {/* STEPS */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            How to Start Earning
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                className="bg-gray-100 dark:bg-[#1A1F2B] rounded-2xl p-8 text-center shadow-sm hover:shadow-md"
              >
                <div className="mb-4 mx-auto w-fit">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* WHY CHOOSE */}
        <section className="bg-gray-50 dark:bg-[#111827] py-28">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-20">
              Why Choose Cashog?
            </h2>

            <div className="grid md:grid-cols-2 gap-y-20 gap-x-16">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -8 }}
                  className="flex flex-col items-center"
                >
                  <div className="mb-6">{feature.icon}</div>
                  <h3 className="text-2xl font-semibold mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER CTA SECTION */}
        <section
          ref={footerRef}
          className="bg-gray-50 dark:bg-[#111827] py-28 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-10">
            Start Earning Real Money Today
          </h2>

          <Link href="/signup">
            <motion.span
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-2xl font-semibold shadow-xl text-lg"
            >
              Join Cashog Now <ArrowRight />
            </motion.span>
          </Link>
        </section>

        {/* ---------------- FLOATING CTA ---------------- */}
        {showFloating && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Link href="/signup">
              <div className="bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-6 py-4 rounded-full font-semibold shadow-2xl cursor-pointer hover:scale-105 transition">
                Start Earning →
              </div>
            </Link>
          </motion.div>
        )}

      </main>
    </>
  );
}
