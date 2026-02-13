"use client";

import { motion } from "framer-motion";
import SeoEngine from "@/components/seo/SeoEngine";
import { Star, Trophy, Gift, ShieldCheck } from "lucide-react";

type LoyaltyTier = {
  id: number;
  name: string;
  pointsRequired: number;
  reward: string;
  color: string;
};

const tiers: LoyaltyTier[] = [
  { id: 1, name: "Bronze", pointsRequired: 100, reward: "$5 Reward", color: "#FACC15" },
  { id: 2, name: "Silver", pointsRequired: 500, reward: "$25 Reward", color: "#9CA3AF" },
  { id: 3, name: "Gold", pointsRequired: 1000, reward: "$60 Reward", color: "#FBBF24" },
  { id: 4, name: "Platinum", pointsRequired: 2000, reward: "$150 Reward", color: "#60A5FA" },
  { id: 5, name: "Diamond", pointsRequired: 5000, reward: "$500 Reward", color: "#A78BFA" },
];

export default function LoyaltyPage() {
  return (
    <>
      <SeoEngine
        title="Loyalty Program | Cashog"
        description="Join Cashog’s loyalty program, earn points, unlock tiers, and claim premium rewards instantly."
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
              Cashog Loyalty Program
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10">
              Earn points, unlock loyalty tiers, and claim premium rewards instantly. Join now and maximize your earnings!
            </p>

            <motion.a
              href="/signup"
              className="cta-observer inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-lg hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Join Loyalty Program <Trophy size={20} />
            </motion.a>
          </motion.div>
        </section>

        {/* ================= LOYALTY TIERS ================= */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Loyalty Tiers & Rewards
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.id}
                className="relative bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-zinc-800 hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <div
                  className="w-16 h-16 flex items-center justify-center rounded-full mb-4 mx-auto shadow-lg"
                  style={{ backgroundColor: tier.color }}
                >
                  <Star className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-semibold mb-2 text-center">{tier.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                  {tier.pointsRequired.toLocaleString()} Points Required
                </p>
                <p className="text-green-600 font-bold text-center text-lg">{tier.reward}</p>

                <motion.a
                  href="/signup"
                  className="cta-observer mt-6 inline-flex w-full justify-center items-center gap-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-4 py-3 rounded-xl font-semibold shadow hover:scale-105 transition-transform duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  Unlock Tier <Gift size={18} />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= TRUST SECTION ================= */}
        <section className="py-24 px-6 bg-gray-50 dark:bg-zinc-900 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-14">
            Why Join Cashog Loyalty Program?
          </h2>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              {
                icon: ShieldCheck,
                title: "Verified Rewards",
                desc: "All loyalty rewards are verified, secure, and instant."
              },
              {
                icon: Star,
                title: "Premium Tiers",
                desc: "Unlock exclusive tiers with higher points and rewards."
              },
              {
                icon: Trophy,
                title: "Fast Redemption",
                desc: "Claim your rewards quickly after reaching each tier."
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
            Start Earning Loyalty Rewards Today
          </h2>

          <motion.a
            href="/signup"
            className="cta-observer inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-xl hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Join Now <Gift size={20} />
          </motion.a>
        </section>
      </main>
    </>
  );
}
