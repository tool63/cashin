"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SeoEngine from "@/components/seo/SeoEngine";
import Background from "@/components/Background";
import Reveal from "@/components/animations/Reveal";
import TypingText from "@/components/typing/TypingText";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import FAQ from "@/components/faq/FAQ";
import { Gift, CheckCircle, Star, ShieldCheck } from "lucide-react";

/* ================= COUNT UP COMPONENT ================= */
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

/* ================= VOUCHERS ================= */
type Voucher = {
  id: number;
  title: string;
  code: string;
  reward: string;
  expiry: string;
  popular?: boolean;
};

const vouchers: Voucher[] = [
  { id: 1, title: "Amazon Gift Card", code: "AMZ50", reward: "$50", expiry: "Feb 28, 2026", popular: true },
  { id: 2, title: "Google Play Voucher", code: "GP30", reward: "$30", expiry: "Mar 15, 2026" },
  { id: 3, title: "Netflix Gift Card", code: "NFLX20", reward: "$20", expiry: "Apr 10, 2026" },
  { id: 4, title: "Steam Wallet", code: "STM25", reward: "$25", expiry: "May 12, 2026" },
  { id: 5, title: "Xbox Gift Card", code: "XBOX15", reward: "$15", expiry: "Jun 20, 2026" },
  { id: 6, title: "PlayStation Voucher", code: "PSN40", reward: "$40", expiry: "Jul 18, 2026" },
  { id: 7, title: "Spotify Premium", code: "SPOT10", reward: "$10", expiry: "Aug 10, 2026" },
  { id: 8, title: "Uber Gift Card", code: "UBER20", reward: "$20", expiry: "Sep 30, 2026" },
  { id: 9, title: "Apple Store Card", code: "APL50", reward: "$50", expiry: "Oct 25, 2026" },
];

/* ================= FAQ ================= */
const faqs = [
  { q: "How do I claim vouchers?", a: "Complete tasks and redeem rewards instantly." },
  { q: "Are vouchers secure?", a: "Yes. All vouchers are verified and safe." },
  { q: "How fast is redemption?", a: "Most vouchers are redeemable instantly." },
  { q: "Do vouchers expire?", a: "Yes. Check expiry dates before redemption." },
  { q: "What rewards can I claim?", a: "Gift cards, vouchers, and premium rewards." },
];

export default function VouchersPage() {
  return (
    <>
      <SeoEngine
        title="Vouchers & Gift Cards | Cashog"
        description="Claim premium vouchers and gift cards instantly with Cashog."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        {/* ================= HERO ================= */}
        <section className="relative z-10 py-28 px-6 text-center">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Claim Vouchers & Gift Cards
            </h1>

            <div className="text-2xl md:text-3xl font-bold gradient-text mb-6">
              <TypingText />
            </div>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
              Redeem premium vouchers and gift cards instantly.
              Secure and high-value rewards.
            </p>

            <PrimaryCTA href="/signup">
              Claim Vouchers
            </PrimaryCTA>
          </Reveal>
        </section>

        {/* ================= STATS SECTION ================= */}
        <section className="relative z-10 py-20 px-6">
          <Reveal>
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-green-500">
                  <CountUp end={50000} />+
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Vouchers Claimed</p>
              </div>

              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-yellow-500">
                  <CountUp end={25000} />+
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Happy Users</p>
              </div>

              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-green-500">
                  <CountUp end={100000} />+
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Rewards Distributed</p>
              </div>

              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-yellow-500">
                  <CountUp end={99} />%
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Satisfaction Rate</p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ================= VOUCHERS ================= */}
        <section className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Available Vouchers
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {vouchers.map((voucher, i) => (
              <motion.div
                key={voucher.id}
                whileHover={{ y: -4 }}
                className="relative bg-white dark:bg-[#0a0d16] rounded-2xl p-6 border shadow-md flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Gift className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{voucher.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Code: <span className="font-bold">{voucher.code}</span>
                </p>
                <p className="text-green-600 font-bold mb-2">{voucher.reward}</p>
                <p className="text-sm text-gray-500 mb-4">Expires: {voucher.expiry}</p>

                <motion.a
                  href="/signup"
                  whileHover={{ scale: 1.05 }}
                  className="mt-auto inline-flex w-full justify-center items-center gap-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-4 py-3 rounded-xl font-semibold shadow"
                >
                  Claim Voucher <CheckCircle size={18} />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Frequently Asked Questions
          </h2>

          <FAQ faqs={faqs} />
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="relative z-10 py-28 px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Claim Your Rewards Today
          </h2>

          <PrimaryCTA href="/signup">
            Claim Now
          </PrimaryCTA>
        </section>
      </main>
    </>
  );
}
