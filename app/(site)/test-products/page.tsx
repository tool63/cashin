"use client";

import { motion } from "framer-motion";
import SeoEngine from "@/components/seo/SeoEngine";
import { CheckCircle, PackageCheck, Star, Gift, Rocket, ShieldCheck } from "lucide-react";

type ProductTest = {
  id: number;
  title: string;
  description: string;
  reward: string;
  duration: string;
  popular?: boolean;
};

const products: ProductTest[] = [
  {
    id: 1,
    title: "Smartphone Beta Test",
    description: "Get early access to the latest smartphone and earn rewards by reviewing it.",
    reward: "$15.00",
    duration: "7 Days",
    popular: true,
  },
  {
    id: 2,
    title: "Headphones Trial",
    description: "Test premium headphones and submit feedback for instant payout.",
    reward: "$8.00",
    duration: "3 Days",
  },
  {
    id: 3,
    title: "Fitness Tracker Test",
    description: "Try new fitness tracker features and report your experience.",
    reward: "$12.00",
    duration: "5 Days",
  },
];

export default function TestProductsPage() {
  return (
    <>
      <SeoEngine
        title="Test Products | Cashog"
        description="Participate in product testing offers and earn instant rewards. Premium, modern and secure experience."
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
              Test Products & Earn Instant Rewards
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10">
              Join exclusive product tests and provide your feedback. Get rewards instantly with Cashog.
            </p>

            <motion.a
              href="/signup"
              className="cta-observer inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-lg hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Start Testing Products <Rocket size={20} />
            </motion.a>
          </motion.div>
        </section>

        {/* ================= PRODUCT TEST CARDS ================= */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Featured Product Testing Offers
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                className={`relative bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border ${
                  product.popular
                    ? "border-green-400 scale-105"
                    : "border-gray-200 dark:border-zinc-800"
                } hover:shadow-2xl transition-all duration-300`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                {product.popular && (
                  <div className="absolute -top-4 right-6 bg-gradient-to-r from-yellow-400 to-green-500 text-black px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                    Most Popular
                  </div>
                )}

                <PackageCheck className="w-8 h-8 text-yellow-500 mb-4" />

                <h3 className="text-xl font-semibold mb-3">{product.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {product.description}
                </p>

                <div className="mb-6">
                  <p className="text-green-600 font-bold text-lg">
                    Reward: {product.reward}
                  </p>
                  <p className="text-sm text-gray-500">
                    Duration: {product.duration}
                  </p>
                </div>

                <motion.a
                  href="/signup"
                  className="cta-observer inline-flex w-full justify-center items-center gap-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-4 py-3 rounded-xl font-semibold shadow hover:scale-105 transition-transform duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  Test Product <CheckCircle size={18} />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= TRUST SECTION ================= */}
        <section className="py-24 px-6 bg-gray-50 dark:bg-zinc-900 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-14">
            Why Test Products with Cashog?
          </h2>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              {
                icon: Star,
                title: "Premium Products",
                desc: "Access high-quality products before anyone else."
              },
              {
                icon: Gift,
                title: "Instant Rewards",
                desc: "Receive payouts immediately after completing the test."
              },
              {
                icon: ShieldCheck,
                title: "Verified Tests",
                desc: "All product tests are secure and fully verified."
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
            Ready to Test Products & Earn Rewards?
          </h2>

          <motion.a
            href="/signup"
            className="cta-observer inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-xl hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Join Cashog Now <Rocket size={20} />
          </motion.a>
        </section>

      </main>
    </>
  );
}
