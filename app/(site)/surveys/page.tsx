"use client";

import React from "react";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import Background from "@/components/Background";
import Reveal from "@/components/animations/Reveal";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import { ShoppingBag, Star, Tag } from "lucide-react";

/* ================= PRODUCTS ================= */
const products = [
  { id: 1, name: "Premium VPN Access", category: "Security", price: "$5", rating: 4.8 },
  { id: 2, name: "Gaming Gift Card", category: "Gaming", price: "$10", rating: 4.9 },
  { id: 3, name: "E-Book: Growth Hacking", category: "Business", price: "$3", rating: 4.7 },
  { id: 4, name: "Pro Design Assets", category: "Design", price: "$8", rating: 4.8 },
  { id: 5, name: "Stock Photos Pack", category: "Media", price: "$6", rating: 4.6 },
  { id: 6, name: "AI Writing Credits", category: "AI Tools", price: "$4", rating: 4.9 },
];

/* ================= PAGE ================= */
export default function ProductsPage() {
  return (
    <>
      <Meta
        title="Products | Test Store"
        description="Browse premium digital products and earn rewards."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        {/* HERO */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
          <Reveal>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              Discover Premium Products
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-10">
              High-quality digital products to boost productivity and creativity.
            </p>
            <PrimaryCTA href="/signup">Get Started</PrimaryCTA>
          </Reveal>
        </section>

        {/* PRODUCT GRID */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Featured Products
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Hand-picked digital goods
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border shadow-md flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3">
                  <ShoppingBag className="text-green-400 w-5 h-5" />
                  <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                    {product.category}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>

                <div className="flex justify-center mt-2">
                  {Array(Math.floor(product.rating))
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400" />
                    ))}
                </div>

                <div className="mt-4 text-green-500 font-bold text-lg">
                  {product.price}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs text-gray-600 dark:text-gray-300">
                    Limited offer
                  </span>

                  <motion.a
                    href="/signup"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-yellow-400 to-green-400 text-black shadow-sm"
                  >
                    Buy Now
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative z-10 text-center py-28">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              Start Your Digital Journey
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed mb-10">
              Access premium tools and content today.
            </p>
            <PrimaryCTA href="/signup">Join Now</PrimaryCTA>
          </Reveal>
        </section>
      </main>
    </>
  );
}
