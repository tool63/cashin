"use client";

import { motion } from "framer-motion";
import SeoEngine from "@/components/seo/SeoEngine";
import { CheckCircle, Gift, Sparkles, ShieldCheck, Rocket, Star } from "lucide-react";

type Trial = {
  id: number;
  title: string;
  description: string;
  reward: string;
  duration: string;
  popular?: boolean;
};

const trials: Trial[] = [
  {
    id: 1,
    title: "Streaming Premium Trial",
    description: "Access full premium content with zero upfront payment.",
    reward: "$5.00",
    duration: "7 Days",
    popular: true,
  },
  {
    id: 2,
    title: "Finance App Signup Bonus",
    description: "Install, verify account and earn instant reward.",
    reward: "$8.00",
    duration: "Instant",
  },
  {
    id: 3,
    title: "AI Productivity Tool Trial",
    description: "Try advanced AI features and earn cashback reward.",
    reward: "$10.00",
    duration: "14 Days",
  },
];

export default function FreeTrialsPage() {
  return (
    <>
      <SeoEngine
        title="Free Trials | Cashog"
        description="Join premium free trial offers and earn rewards instantly. Advanced, stylish and high-converting earning experience."
      />

      <main className="bg-white dark:bg-zinc-950 text-gray-900 dark:text-white transition-colors duration-300">

        {/* ================= HERO ================= */}
        <section className="relative py-28 px-6 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/40 via-green-200/30 to-green-300/40 dark:from-yellow-900/20 dark:via-green-900/10 dark:to-green-800/20 blur-3xl" />

          <motion.div
            className="relative max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Complete Free Trials & <span className="bg-gradient-to-r from-yellow-500 to-green-500 bg-clip-text text-transparent">Earn Premium Rewards</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10">
              Try top premium services for free and get paid instantly. Secure, verified and high-converting offers.
            </p>

            <motion.a
              href="/signup"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-lg"
            >
              Start Free Trials <Rocket size={20} />
            </motion.a>
          </motion.div>
        </section>

        {/* ================= TRIAL CARDS ================= */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Featured Free Trial Offers
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {trials.map((trial, i) => (
              <motion.div
                key={trial.id}
                className={`relative bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border ${
                  trial.popular
                    ? "border-green-400 scale-105"
                    : "border-gray-200 dark:border-zinc-800"
                } hover:shadow-2xl transition-all duration-300`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                {trial.popular && (
                  <div className="absolute -top-4 right-6 bg-gradient-to-r from-yellow-400 to-green-500 text-black px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                    Most Popular
                  </div>
                )}

                <Sparkles className="w-8 h-8 text-yellow-500 mb-4" />

                <h3 className="text-xl font-semibold mb-3">{trial.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {trial.description}
                </p>

                <div className="mb-6">
                  <p className="text-green-600 font-bold text-lg">
                    Reward: {trial.reward}
                  </p>
                  <p className="text-sm text-gray-500">
                    Duration: {trial.duration}
                  </p>
                </div>

                <motion.a
                  href="/signup"
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex w-full justify-center items-center gap-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-4 py-3 rounded-xl font-semibold shadow"
                >
                  Start Trial <CheckCircle size={18} />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= WHY TRUST ================= */}
        <section className="py-24 px-6 bg-gray-50 dark:bg-zinc-900 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-14">
            Why Choose Cashog Free Trials?
          </h2>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              {
                icon: ShieldCheck,
                title: "Verified Offers",
                desc: "All trials are manually verified for safety and real payouts."
              },
              {
                icon: Gift,
                title: "Instant Rewards",
                desc: "Receive your earnings immediately after successful completion."
              },
              {
                icon: Star,
                title: "Premium Experience",
                desc: "Clean UI, fast tracking and advanced payout system."
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
            Ready to Start Earning from Free Trials?
          </h2>

          <motion.a
            href="/signup"
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-xl"
          >
            Join Cashog Now <Rocket size={20} />
          </motion.a>
        </section>

      </main>
    </>
  );
}
