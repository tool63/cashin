"use client";

import { motion } from "framer-motion";
import SeoEngine from "@/components/seo/SeoEngine";
import { ShoppingBag, Star, Sparkles, ShieldCheck } from "lucide-react";

/* ================= PRODUCT TYPE ================= */
type Product = {
  id: number;
  name: string;
  category: string;
  price: string;
  rating: number;
};

/* ================= SAMPLE PRODUCTS ================= */
const products: Product[] = [
  { id: 1, name: "Cashog Premium Booster", category: "Digital Tool", price: "$29", rating: 5 },
  { id: 2, name: "Advanced Referral Engine", category: "Growth Tool", price: "$49", rating: 4 },
  { id: 3, name: "AI Offer Optimizer", category: "AI Software", price: "$79", rating: 5 },
  { id: 4, name: "Smart Task Tracker", category: "Productivity", price: "$19", rating: 4 },
  { id: 5, name: "Enterprise Analytics Pro", category: "Analytics", price: "$99", rating: 5 },
  { id: 6, name: "Cashog Pro Dashboard", category: "Dashboard", price: "$59", rating: 5 },
];

/* ================= PAGE ================= */
export default function TestProductsPage() {
  return (
    <>
      <SeoEngine
        title="Test Products | Cashog"
        description="Explore modern premium test products built for performance, growth, and intelligent reward optimization."
      />

      <main className="bg-white dark:bg-[#070A14] text-gray-900 dark:text-white transition-colors duration-300 overflow-hidden">

        {/* ================= HERO ================= */}
        <section className="relative py-28 px-6 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/40 via-green-200/30 to-yellow-300/40 dark:from-yellow-900/20 dark:via-green-900/10 dark:to-yellow-800/20 blur-3xl" />

          <motion.div
            className="relative max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              Explore Premium Test Products
            </h1>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10">
              Designed with modern UX, advanced performance, and professional-grade architecture.
            </p>

            <motion.a
              href="#products"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-lg hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              View Products <ShoppingBag size={20} />
            </motion.a>
          </motion.div>
        </section>

        {/* ================= PRODUCT GRID ================= */}
        <section id="products" className="py-24 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            Featured Products
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {products.map((product) => (
              <motion.div
                key={product.id}
                className="group relative bg-white dark:bg-zinc-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 opacity-0 group-hover:opacity-20 transition duration-500" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <Sparkles className="text-yellow-500 w-6 h-6" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {product.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold mb-3">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: product.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>

                  <p className="text-2xl font-bold text-green-600 mb-6">
                    {product.price}
                  </p>

                  <motion.button
                    className="w-full bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-300"
                    whileTap={{ scale: 0.96 }}
                  >
                    Test Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= PREMIUM FEATURE SECTION ================= */}
        <section className="py-28 px-6 bg-gray-50 dark:bg-zinc-900">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-zinc-800 p-10 rounded-3xl shadow-lg"
            >
              <ShieldCheck className="w-8 h-8 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-3">Enterprise Security</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Advanced infrastructure built with corporate-grade security standards.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-zinc-800 p-10 rounded-3xl shadow-lg"
            >
              <Sparkles className="w-8 h-8 text-yellow-500 mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-3">Modern UX</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Designed for smooth interactions and high conversion performance.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-zinc-800 p-10 rounded-3xl shadow-lg"
            >
              <ShoppingBag className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-3">Scalable Architecture</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Built to support growth, analytics, and intelligent optimization.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="py-28 px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            Ready to Experience Premium Products?
          </h2>

          <motion.a
            href="/signup"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-20 py-6 rounded-2xl font-bold shadow-2xl text-xl hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Get Started Now
          </motion.a>
        </section>

      </main>
    </>
  );
}
