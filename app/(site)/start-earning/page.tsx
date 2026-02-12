"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Gift,
  Gamepad2,
  Smartphone,
  Star,
  ShieldCheck,
  Zap,
  DollarSign,
} from "lucide-react";
import Meta from "@/components/seo/SeoEngine";

export default function StartEarningPage() {
  return (
    <>
      <Meta
        title="Start Earning | Cashog"
        description="Start earning real money with Cashog. Complete offers, play games, take surveys, and withdraw instantly."
        keywords="earn money online, make money with offers, cash rewards, online income, Cashog"
      />

      <main className="bg-white dark:bg-black text-gray-900 dark:text-white">

        {/* ================= HERO SECTION ================= */}
        <section className="relative py-24 text-center overflow-hidden">
          <div className="max-w-4xl mx-auto px-6">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-extrabold mb-6"
            >
              Earn Real Money
              <br />
              Instantly
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10"
            >
              Join thousands of users earning daily with Cashog by completing
              simple online tasks.
            </motion.p>

            <Link
              href="/register"
              className="inline-block px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 transition"
            >
              Start Earning Now
            </Link>
          </div>
        </section>

        {/* ================= EARNING METHODS ================= */}
        <section className="py-20 bg-gray-50 dark:bg-zinc-900">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Ways You Can Earn
            </h2>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  icon: <Gift size={40} />,
                  title: "Complete Offers",
                  desc: "Install apps, sign up, or try new services and get rewarded instantly.",
                },
                {
                  icon: <Gamepad2 size={40} />,
                  title: "Play Games",
                  desc: "Earn money by reaching levels or completing missions in games.",
                },
                {
                  icon: <Smartphone size={40} />,
                  title: "Take Surveys",
                  desc: "Share your opinion and earn cash from trusted survey partners.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -8 }}
                  className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-md text-center"
                >
                  <div className="flex justify-center mb-4 text-indigo-500">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= WHY CHOOSE CASHOG ================= */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Why Choose Cashog
            </h2>

            <div className="grid md:grid-cols-3 gap-10 text-center">
              {[
                {
                  icon: <DollarSign size={40} />,
                  title: "High Rewards",
                  desc: "Competitive payouts for every completed task.",
                },
                {
                  icon: <Zap size={40} />,
                  title: "Instant Tracking",
                  desc: "Your earnings are tracked in real-time.",
                },
                {
                  icon: <ShieldCheck size={40} />,
                  title: "Secure & Trusted",
                  desc: "Safe withdrawals and verified offer partners.",
                },
                {
                  icon: <Star size={40} />,
                  title: "Top Rated Platform",
                  desc: "Thousands of satisfied users worldwide.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="p-6"
                >
                  <div className="flex justify-center mb-4 text-indigo-500">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FINAL CTA (MATCH HOW-IT-WORKS STYLE) ================= */}
        <section className="py-24 bg-gradient-to-r from-indigo-600 to-purple-700 text-white text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Earning with Cashog?
            </h2>

            <p className="text-lg md:text-xl mb-10 text-indigo-100">
              Sign up today and turn your free time into real income.
            </p>

            <Link
              href="/register"
              className="inline-block px-10 py-4 rounded-full font-semibold bg-white text-indigo-600 hover:scale-105 transition"
            >
              Create Free Account
            </Link>
          </div>
        </section>

      </main>
    </>
  );
}
