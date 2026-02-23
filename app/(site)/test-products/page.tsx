"use client";

import React from "react";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";
import Background from "@/components/Background";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";
import FAQ from "@/components/faq/FAQ";
import {
  ShoppingBag,
  Star,
  ShieldCheck,
  Zap,
  Crown,
  Sparkles,
} from "lucide-react";

/* ================= PRODUCTS ================= */
const products = [
  {
    id: 1,
    name: "AI Business Toolkit",
    category: "AI Suite",
    price: "$29",
    rating: 4.9,
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Premium Design System",
    category: "UI Kit",
    price: "$49",
    rating: 4.8,
    badge: "Pro Choice",
  },
  {
    id: 3,
    name: "Growth Automation Pack",
    category: "Marketing",
    price: "$39",
    rating: 4.9,
    badge: "Hot",
  },
];

/* ================= FAQ ================= */
const faqs = [
  {
    q: "Are these lifetime access products?",
    a: "Yes. One-time purchase gives you lifetime access.",
  },
  {
    q: "Do I get future updates?",
    a: "Yes. All updates are included for free.",
  },
  {
    q: "Is premium support included?",
    a: "Yes. Dedicated support is available.",
  },
];

/* ================= PAGE ================= */
export default function TestProductsPage() {
  return (
    <>
      <Meta
        title="Premium Products | Cashog"
        description="Discover premium digital products designed for professionals."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white overflow-hidden">
        <Background />

        {/* ================= HERO SECTION ================= */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-28 text-center">

          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400/20 to-green-400/20 border border-yellow-400/30 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium">
                Premium Digital Marketplace
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-6">
              Power Your Business With
            </h1>

            <div className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-8 bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
              <TypingText />
            </div>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
              Elite digital products engineered for scalability, growth, and premium user experience.
            </p>

            <PrimaryCTA href="/signup">
              Explore Products
            </PrimaryCTA>
          </Reveal>

        </section>

        {/* ================= TRUST SECTION ================= */}
        <section className="relative z-10 max-w-6xl mx-auto px-6 pb-28">
          <Reveal>
            <h2 className="text-4xl font-bold text-center mb-4">
              Why Choose Our Products
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-14">
              Designed with performance, security, and scalability in mind.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <ShieldCheck className="w-8 h-8 text-green-400" />,
                  title: "Enterprise Security",
                  desc: "Built with modern architecture and encrypted systems.",
                },
                {
                  icon: <Zap className="w-8 h-8 text-yellow-400" />,
                  title: "Instant Access",
                  desc: "Get immediate delivery after purchase.",
                },
                {
                  icon: <Crown className="w-8 h-8 text-purple-400" />,
                  title: "Premium Quality",
                  desc: "Crafted for professionals and teams.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -6 }}
                  className="bg-white/70 dark:bg-[#0a0d16]/80 backdrop-blur-lg rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-xl text-center"
                >
                  <div className="flex justify-center mb-4">
                    {item.icon}
                  </div>

                  <h3 className="text-lg font-semibold mb-3">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ================= PRODUCTS SECTION ================= */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
          <Reveal>
            <h2 className="text-4xl font-bold text-center mb-4">
              Featured Premium Products
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-14">
              Carefully crafted tools to accelerate your success.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-10">
            {products.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -8 }}
                className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-[#0a0d16] dark:to-[#101424] rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-xl transition-all duration-300"
              >
                <div className="absolute top-6 right-6 text-xs px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-green-400 text-black font-semibold shadow-md">
                  {product.badge}
                </div>

                <ShoppingBag className="w-10 h-10 text-green-400 mb-6" />

                <h3 className="text-2xl font-bold mb-3">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {product.category}
                </p>

                <div className="flex mb-6">
                  {Array(Math.floor(product.rating)).fill(0).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400" />
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-extrabold bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
                    {product.price}
                  </span>

                  <motion.a
                    href="/signup"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-green-400 text-black font-semibold shadow-lg"
                  >
                    Buy Now
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section className="relative z-10 max-w-4xl mx-auto px-6 pb-32 text-center">
          <Reveal>
            <h2 className="text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-10">
              Everything you need to know before purchasing.
            </p>
          </Reveal>

          <FAQ faqs={faqs} />
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="relative z-10 text-center pb-32">
          <Reveal>
            <h2 className="text-5xl font-extrabold mb-6">
              Upgrade Your Digital Experience
            </h2>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
              Join thousands of professionals using Cashog premium tools.
            </p>

            <PrimaryCTA href="/signup">
              Get Started Now
            </PrimaryCTA>
          </Reveal>
        </section>

      </main>
    </>
  );
}
