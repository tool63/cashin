"use client";

import { motion } from "framer-motion";
import SeoEngine from "@/components/seo/SeoEngine";
import { Gift, CheckCircle, Star, ShieldCheck } from "lucide-react";

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
];

export default function VouchersPage() {
  return (
    <>
      <SeoEngine
        title="Vouchers & Gift Cards | Cashog"
        description="Claim premium vouchers and gift cards instantly with Cashog. Modern, secure, and rewarding experience."
      />

      <main className="bg-white dark:bg-zinc-950 text-gray-900 dark:text-white transition-colors duration-300">

        {/* ================= HERO ================= */}
        <section className="relative py-28 px-6 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/40 via-green-200/30 to-yellow-300/40 dark:from-yellow-900/20 dark:via-green-900/10 dark:to-green-800/20 blur-3xl" />

          <motion.div
            className="relative max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Claim Vouchers & Gift Cards
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10">
              Redeem premium vouchers and gift cards instantly. Secure, verified, and high-value rewards at your fingertips.
            </p>

            <motion.a
              href="/signup"
              className="cta-observer inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-lg hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Claim Vouchers <Gift size={20} />
            </motion.a>
          </motion.div>
        </section>

        {/* ================= VOUCHER CARDS ================= */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Available Vouchers
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {vouchers.map((voucher, i) => (
              <motion.div
                key={voucher.id}
                className={`relative bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border ${
                  voucher.popular
                    ? "border-green-400 scale-105"
                    : "border-gray-200 dark:border-zinc-800"
                } hover:shadow-2xl transition-all duration-300`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                {voucher.popular && (
                  <div className="absolute -top-4 right-6 bg-gradient-to-r from-yellow-400 to-green-500 text-black px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                    Most Popular
                  </div>
                )}

                <Gift className="w-8 h-8 text-yellow-500 mb-4" />

                <h3 className="text-xl font-semibold mb-2">{voucher.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Code: <span className="font-bold">{voucher.code}</span></p>
                <p className="text-green-600 font-bold mb-2">{voucher.reward}</p>
                <p className="text-sm text-gray-500 mb-4">Expires: {voucher.expiry}</p>

                <motion.a
                  href="/signup"
                  className="cta-observer mt-6 inline-flex w-full justify-center items-center gap-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-4 py-3 rounded-xl font-semibold shadow hover:scale-105 transition-transform duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  Claim Voucher <CheckCircle size={18} />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= TRUST SECTION ================= */}
        <section className="py-24 px-6 bg-gray-50 dark:bg-zinc-900 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-14">
            Why Claim Vouchers with Cashog?
          </h2>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              {
                icon: ShieldCheck,
                title: "Verified & Secure",
                desc: "All vouchers are verified and securely redeemable instantly."
              },
              {
                icon: Star,
                title: "Premium Rewards",
                desc: "High-value vouchers and gift cards for premium users."
              },
              {
                icon: Gift,
                title: "Fast Redemption",
                desc: "Redeem your vouchers quickly after claiming."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white dark:bg-zinc-800 p-8 rounded-3xl shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <item.icon className="w-8 h-8 mx-auto mb-4 text-yellow-500" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="py-28 px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Claim Your Vouchers Today
          </h2>

          <motion.a
            href="/signup"
            className="cta-observer inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-xl hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Claim Now <Gift size={20} />
          </motion.a>
        </section>
      </main>
    </>
  );
}
