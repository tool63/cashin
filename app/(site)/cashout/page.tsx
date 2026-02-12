"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Wallet,
  CreditCard,
  Gift,
  Smartphone,
  Globe,
  ShieldCheck,
  ArrowRight,
  Clock,
} from "lucide-react";
import Meta from "@/components/seo/SeoEngine";

export default function CashoutMethodsPage() {
  const methods = [
    {
      icon: Wallet,
      title: "PayPal",
      description:
        "Withdraw your earnings directly to your PayPal account instantly and securely worldwide.",
    },
    {
      icon: Gift,
      title: "Gift Cards",
      description:
        "Redeem your points for Amazon, Google Play, Apple, and other popular gift cards.",
    },
    {
      icon: Smartphone,
      title: "Mobile Top-Up",
      description:
        "Recharge your mobile balance directly using your Cashog earnings.",
    },
    {
      icon: CreditCard,
      title: "Bank Transfer",
      description:
        "Transfer your earnings directly to your bank account (available in selected regions).",
    },
  ];

  return (
    <>
      <Meta
        title="Cashout Methods | Cashog"
        description="Discover Cashog cashout methods. Withdraw your earnings via PayPal, gift cards, mobile top-ups, and bank transfers instantly."
      />

      <main className="transition-colors duration-300 bg-white text-gray-900 dark:bg-[#070A14] dark:text-white min-h-screen">

        {/* ================= HERO ================= */}
        <section className="relative py-20 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              Withdraw Your Earnings
            </h1>

            <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              Fast & Secure Cashouts
            </div>

            <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
              Choose from multiple trusted payout methods and get your money instantly.
            </p>

            {/* HERO CTA WRAPPER */}
            <div className="cta-observer inline-block">
              <Link href="/signup">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-12 py-5 rounded-2xl font-bold shadow-xl text-lg"
                >
                  Start Earning Now <ArrowRight />
                </motion.span>
              </Link>
            </div>
          </div>
        </section>

        {/* ================= CASHOUT METHODS ================= */}
        <section className="max-w-7xl mx-auto px-4 py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {methods.map((method, i) => {
            const IconComponent = method.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="bg-gray-100 dark:bg-[#1A1F2B] rounded-xl p-8 flex flex-col items-center text-center shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.3, rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="mb-4 text-yellow-500"
                >
                  <IconComponent size={36} />
                </motion.div>

                <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {method.description}
                </p>
              </motion.div>
            );
          })}
        </section>

        {/* ================= WITHDRAWAL INFO ================= */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div className="bg-gray-50 dark:bg-[#111827] rounded-xl p-8 shadow">
              <Clock size={32} className="mx-auto mb-4 text-yellow-500" />
              <h3 className="text-xl font-semibold mb-2">Fast Processing</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Most withdrawals are processed instantly or within a few hours.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-[#111827] rounded-xl p-8 shadow">
              <Globe size={32} className="mx-auto mb-4 text-yellow-500" />
              <h3 className="text-xl font-semibold mb-2">Global Availability</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Cashog supports users from around the world.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-[#111827] rounded-xl p-8 shadow">
              <ShieldCheck size={32} className="mx-auto mb-4 text-yellow-500" />
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600 dark:text-gray-400">
                All transactions are encrypted and processed securely.
              </p>
            </div>
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="text-center py-28 bg-white dark:bg-[#070A14] w-full transition-colors duration-300">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
            Ready to Withdraw Your Earnings?
          </h2>

          {/* FINAL CTA WRAPPER */}
          <div className="cta-observer inline-block">
            <Link href="/signup">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-xl"
              >
                Create Free Account <ArrowRight />
              </motion.span>
            </Link>
          </div>

          <p className="mt-6 text-gray-900 dark:text-gray-300 text-lg max-w-md mx-auto">
            Join Cashog today and start withdrawing real money safely.
          </p>
        </section>

      </main>
    </>
  );
}
