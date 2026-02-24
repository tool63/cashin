"use client";

import React from "react";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import Background from "@/components/Background";
import Reveal from "@/components/animations/Reveal";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import { ShoppingCart, Star, Tag, Truck, ShieldCheck, Gift } from "lucide-react";

/* ================= TEST PRODUCTS ================= */
const products = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: "$59", rating: 4.8, orders: "2K+" },
  { id: 2, name: "Smart Watch Pro", category: "Wearables", price: "$99", rating: 4.7, orders: "1.5K+" },
  { id: 3, name: "Gaming Mouse", category: "Accessories", price: "$39", rating: 4.6, orders: "3K+" },
  { id: 4, name: "Bluetooth Speaker", category: "Audio", price: "$49", rating: 4.9, orders: "4K+" },
  { id: 5, name: "Fitness Band", category: "Health", price: "$29", rating: 4.5, orders: "2.3K+" },
  { id: 6, name: "Portable Charger", category: "Utilities", price: "$25", rating: 4.7, orders: "5K+" },
];

/* ================= PAGE ================= */
export default function TestProductsPage() {
  return (
    <>
      <Meta
        title="Test Products | Cashog"
        description="Explore and test premium products."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        <section className="relative z-10 max-w-7xl mx-auto px-4 py-20">

          {/* HERO */}
          <Reveal>
            <div className="text-center mb-20">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                Discover & Test Products
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed mb-10">
                Explore trending products and test them before everyone else.
              </p>

              <PrimaryCTA href="/signup">
                Get Started
              </PrimaryCTA>
            </div>
          </Reveal>

          {/* PRODUCTS GRID */}
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Featured Products
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Hand-picked premium items for testing
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3 mb-24">
            {products.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-md"
              >
                <div className="flex justify-between items-center mb-4">
                  <ShoppingCart className="text-green-400 w-5 h-5" />
                  <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                    {product.category}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>

                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Orders: {product.orders}
                </p>

                <div className="flex justify-center mt-2">
                  {Array(Math.floor(product.rating)).fill(0).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400" />
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-green-500 font-bold">
                    {product.price}
                  </span>

                  <motion.a
                    href="/signup"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-yellow-400 to-green-400 text-black shadow-sm hover:shadow-md"
                  >
                    Test Now
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* BENEFITS SECTION */}
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Why Test With Us?
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Exclusive advantages for our community
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3 mb-24">
            {[
              { icon: <Truck className="w-8 h-8 text-yellow-400" />, title: "Fast Shipping", desc: "Quick delivery worldwide." },
              { icon: <ShieldCheck className="w-8 h-8 text-green-400" />, title: "Secure Process", desc: "Safe and verified product testing." },
              { icon: <Gift className="w-8 h-8 text-yellow-400" />, title: "Exclusive Rewards", desc: "Earn bonuses for feedback." },
            ].map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-md"
              >
                <div className="flex justify-center items-center mb-4">
                  {item.icon}
                </div>

                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* FINAL CTA */}
          <Reveal>
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                Ready to Test Products?
              </h2>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed mb-10">
                Join today and start exploring premium test products.
              </p>

              <PrimaryCTA href="/signup">
                Join Now
              </PrimaryCTA>
            </div>
          </Reveal>

        </section>
      </main>
    </>
  );
}
