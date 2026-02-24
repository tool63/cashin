"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SeoEngine from "@/components/seo/SeoEngine";
import Background from "@/components/Background";
import Reveal from "@/components/animations/Reveal";
import TypingText from "@/components/typing/TypingText";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import FAQ from "@/components/faq/FAQ";
import { Gift, CheckCircle } from "lucide-react";

/* ================= COUNT UP ================= */
function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
}

/* ================= STAGGER ANIMATION ================= */
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/* ================= DATA ================= */
const vouchers = [
  { id: 1, title: "Amazon Gift Card", code: "AMZ50", reward: "$50", expiry: "Feb 28, 2026", popular: true },
  { id: 2, title: "Google Play Voucher", code: "GP30", reward: "$30", expiry: "Mar 15, 2026" },
  { id: 3, title: "Netflix Gift Card", code: "NFLX20", reward: "$20", expiry: "Apr 10, 2026" },
  { id: 4, title: "Steam Wallet", code: "STM25", reward: "$25", expiry: "May 12, 2026" },
  { id: 5, title: "Xbox Gift Card", code: "XBOX15", reward: "$15", expiry: "Jun 20, 2026" },
  { id: 6, title: "PlayStation Voucher", code: "PSN40", reward: "$40", expiry: "Jul 18, 2026" },
];

const testimonials = [
  { name: "Alex", text: "Super fast redemption and premium vouchers!" },
  { name: "Sarah", text: "I love earning Amazon gift cards here." },
  { name: "Michael", text: "The rewards are real and instant." },
  { name: "Emma", text: "Best voucher platform I've used so far." },
  { name: "Daniel", text: "Smooth process and secure payouts." },
  { name: "Olivia", text: "High-value gift cards every month!" },
];

const faqs = [
  { q: "How do I claim vouchers?", a: "Complete tasks and redeem rewards instantly." },
  { q: "Are vouchers secure?", a: "Yes, all vouchers are verified and safe." },
  { q: "How fast is redemption?", a: "Most vouchers are redeemable instantly." },
];

/* ================= PAGE ================= */
export default function VouchersPage() {
  return (
    <>
      <SeoEngine
        title="Vouchers & Gift Cards | Cashog"
        description="Claim premium vouchers instantly with Cashog."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        {/* ================= HERO ================= */}
        <section className="relative z-10 py-32 px-6 text-center">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              Claim <span className="gradient-text">Premium Vouchers</span>
            </h1>

            <div className="text-2xl md:text-3xl font-bold mb-6">
              <TypingText />
            </div>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              Redeem high-value gift cards instantly.
            </p>

            <PrimaryCTA href="/signup">
              Claim Vouchers
            </PrimaryCTA>
          </Reveal>
        </section>

        {/* ================= STATS ================= */}
        <section className="relative z-10 py-28 px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                Trusted by a <span className="gradient-text">Growing Community</span>
              </h2>
            </div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="max-w-6xl mx-auto grid gap-8 md:grid-cols-4"
            >
              {[
                { value: 50000, label: "Vouchers Claimed" },
                { value: 25000, label: "Happy Users" },
                { value: 100000, label: "Rewards Distributed" },
                { value: 99, label: "Satisfaction Rate", suffix: "%" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={item}
                  className="bg-white dark:bg-[#0a0d16] p-8 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-800 text-center"
                >
                  <h3 className="text-3xl font-bold text-green-500 mb-2">
                    <CountUp end={stat.value} />
                    {stat.suffix ? stat.suffix : "+"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </Reveal>
        </section>

        {/* ================= VOUCHERS ================= */}
        <section className="relative z-10 py-28 px-6 max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                Unlock <span className="gradient-text">Premium Rewards</span>
              </h2>

              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Choose from high-value gift cards and redeem instantly.
              </p>
            </div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid gap-8 md:grid-cols-3"
            >
              {vouchers.map((voucher) => (
                <motion.div
                  key={voucher.id}
                  variants={item}
                  whileHover={{ y: -6 }}
                  className={`bg-white dark:bg-[#0a0d16] p-8 rounded-3xl shadow-lg border flex flex-col ${
                    voucher.popular
                      ? "border-green-400"
                      : "border-gray-200 dark:border-gray-800"
                  }`}
                >
                  {voucher.popular && (
                    <div className="absolute -top-4 right-6 bg-gradient-to-r from-yellow-400 to-green-500 text-black px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                      Most Popular
                    </div>
                  )}

                  <Gift className="w-8 h-8 text-yellow-500 mb-4" />

                  <h3 className="text-xl font-semibold mb-2">{voucher.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">
                    Code: <span className="font-bold">{voucher.code}</span>
                  </p>
                  <p className="text-green-600 font-bold mb-4">{voucher.reward}</p>

                  <motion.a
                    href="/signup"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-auto inline-flex justify-center items-center gap-2
                               bg-gradient-to-r from-yellow-400 via-green-400 to-green-500
                               text-black px-4 py-2.5 rounded-xl font-semibold text-sm shadow"
                  >
                    Claim Now <CheckCircle size={16} />
                  </motion.a>
                </motion.div>
              ))}
            </motion.div>
          </Reveal>
        </section>

        {/* ================= TESTIMONIALS ================= */}
        <section className="relative z-10 py-28 px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold">
                Loved by <span className="gradient-text">Thousands</span>
              </h2>
            </div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8"
            >
              {testimonials.map((itemData, i) => (
                <motion.div
                  key={i}
                  variants={item}
                  className="bg-white dark:bg-[#0a0d16] rounded-3xl p-6 shadow-md border border-gray-200 dark:border-gray-800"
                >
                  <p className="italic text-gray-600 dark:text-gray-300">
                    “{itemData.text}”
                  </p>
                  <h3 className="mt-4 font-semibold text-green-500">
                    — {itemData.name}
                  </h3>
                </motion.div>
              ))}
            </motion.div>
          </Reveal>
        </section>

        {/* ================= FAQ ================= */}
        <section className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8">
            Frequently Asked Questions
          </h2>
          <FAQ faqs={faqs} />
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="relative z-10 py-36 px-6 text-center overflow-hidden">
          <div className="absolute inset-0 -z-10 flex justify-center">
            <div className="w-[600px] h-[600px] bg-gradient-to-r from-yellow-400/20 via-green-400/20 to-green-500/20 blur-3xl rounded-full" />
          </div>

          <Reveal>
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-8">
              Start Earning & Redeem
              <span className="gradient-text block mt-3">
                Premium Gift Cards Today
              </span>
            </h2>

            <PrimaryCTA href="/signup">
              Get Started Now
            </PrimaryCTA>
          </Reveal>
        </section>
      </main>
    </>
  );
}
