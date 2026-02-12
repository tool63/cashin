"use client";

import { useState } from "react";
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

/* ------------------ WHY CHOOSE (PREMIUM STYLE) ------------------ */
const features = [
  {
    icon: <Zap size={44} className="text-yellow-400" />,
    title: "Instant Rewards",
    desc: "Get paid immediately after completing each task with no delays.",
  },
  {
    icon: <Smartphone size={44} className="text-cyan-400" />,
    title: "Mobile-First Experience",
    desc: "Earn anywhere, anytime with a fully optimized mobile platform.",
  },
  {
    icon: <Gift size={44} className="text-green-400" />,
    title: "Multiple Income Streams",
    desc: "Surveys, games, app installs and exclusive high-value offers.",
  },
  {
    icon: <Star size={44} className="text-purple-400" />,
    title: "Top Paying Offers",
    desc: "Carefully selected premium tasks designed to maximize earnings.",
  },
];

const faqs = [
  { q: "Do I need prior experience?", a: "No experience is needed. Anyone can start earning immediately." },
  { q: "How long does it take to get paid?", a: "Most rewards are processed instantly or within a few hours." },
  { q: "What payment methods are supported?", a: "Withdraw via PayPal, gift cards, or crypto." },
  { q: "Is Cashog secure?", a: "Yes. Cashog is safe, secure and trusted by thousands of users." },
];

export default function HowToStartEarning() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <>
      <Meta
        title="Cashog - How to Start Earning Real Money Online"
        description="Learn how to start earning real money online with Cashog. Complete surveys, play games, and install apps to earn instantly."
      />

      <main className="bg-white dark:bg-[#070A14] text-gray-900 dark:text-white transition-colors duration-300">

        {/* ---------------- HERO ---------------- */}
        <section className="max-w-6xl mx-auto px-4 py-28 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            Earn Real Money <br /> Instantly
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Complete surveys, play games, watch videos, and install apps to earn rewards instantly.
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

        {/* ---------------- STEPS ---------------- */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            How to Start Earning
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                className="bg-gray-100 dark:bg-[#1A1F2B] rounded-2xl p-8 text-center transition shadow-sm hover:shadow-md"
              >
                <div className="mb-4 mx-auto w-fit">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ---------------- WHY CHOOSE (PREMIUM) ---------------- */}
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
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-6">{feature.icon}</div>

                  <h3 className="text-2xl font-semibold mb-4">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 max-w-md leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- FAQ ---------------- */}
        <section className="max-w-4xl mx-auto px-4 py-24 text-center">
          <h2 className="text-3xl font-bold mb-14">
            Frequently Asked Questions
          </h2>

          <div className="space-y-5">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-gray-100 dark:bg-[#1A1F2B] rounded-xl p-6 cursor-pointer transition"
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
              >
                <h3 className="font-semibold flex justify-between">
                  {faq.q}
                  <span>{openFAQ === i ? "-" : "+"}</span>
                </h3>
                {openFAQ === i && (
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- FINAL CTA ---------------- */}
        <section className="bg-gray-50 dark:bg-[#111827] py-28 text-center">
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

      </main>
    </>
  );
}
