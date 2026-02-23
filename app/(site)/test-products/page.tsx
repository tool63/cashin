"use client";

import { motion } from "framer-motion";
import SeoEngine from "@/components/seo/SeoEngine";
import Background from "@/components/Background";
import TypingText from "@/components/typing/TypingText";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";
import FAQ from "@/components/faq/FAQ";
import {
  CheckCircle,
  PackageCheck,
  Star,
  Gift,
  Rocket,
  ShieldCheck,
} from "lucide-react";

/* ================= PRODUCT DATA ================= */

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
    description:
      "Get early access to the latest smartphone and earn rewards by reviewing it.",
    reward: "$15.00",
    duration: "7 Days",
    popular: true,
  },
  {
    id: 2,
    title: "Headphones Trial",
    description:
      "Test premium headphones and submit feedback for instant payout.",
    reward: "$8.00",
    duration: "3 Days",
  },
  {
    id: 3,
    title: "Fitness Tracker Test",
    description:
      "Try new fitness tracker features and report your experience.",
    reward: "$12.00",
    duration: "5 Days",
  },
];

/* ================= FAQ DATA ================= */

const faqs = [
  {
    q: "How do product tests work?",
    a: "Sign up, apply for a product test, receive instructions, complete the test, and submit feedback to earn your reward.",
  },
  {
    q: "When will I receive my reward?",
    a: "Rewards are credited instantly once your submission is approved.",
  },
  {
    q: "Do I keep the product?",
    a: "Some tests allow you to keep the product, while others require returns. Details are provided beforehand.",
  },
  {
    q: "Is product testing free?",
    a: "Yes. There are no hidden fees — you simply complete the test and earn rewards.",
  },
];

export default function TestProductsPage() {
  return (
    <>
      <SeoEngine
        title="Test Products | Cashog"
        description="Join exclusive product testing programs and earn instant rewards with Cashog."
      />

      <main className="relative bg-white dark:bg-zinc-950 text-gray-900 dark:text-white overflow-hidden">

        <Background />

        {/* ================= HERO ================= */}
        <section className="relative z-10 py-32 px-6 text-center max-w-5xl mx-auto">
          <Reveal>
            <TypingText
              text="Test Products & Earn Real Rewards"
              className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
            />
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10">
              Join exclusive product trials, provide feedback, and get paid instantly.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <PrimaryCTA href="/signup">
              Start Testing Products <Rocket size={20} />
            </PrimaryCTA>
          </Reveal>
        </section>

        {/* ================= PRODUCT SECTION ================= */}
        <section className="relative z-10 py-28 px-6 max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Featured Product Tests
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-16">
              Apply for premium brand trials and start earning today.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-10">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                className={`relative bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border ${
                  product.popular
                    ? "border-green-400 scale-105"
                    : "border-gray-200 dark:border-zinc-800"
                } hover:shadow-2xl transition-all duration-300`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                {product.popular && (
                  <div className="absolute -top-4 right-6 bg-gradient-to-r from-yellow-400 to-green-500 text-black px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                    Most Popular
                  </div>
                )}

                <PackageCheck className="w-9 h-9 text-yellow-500 mb-5" />

                <h3 className="text-xl font-semibold mb-3">
                  {product.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {product.description}
                </p>

                <div className="mb-6 space-y-1">
                  <p className="text-green-600 font-bold text-lg">
                    Reward: {product.reward}
                  </p>
                  <p className="text-sm text-gray-500">
                    Duration: {product.duration}
                  </p>
                </div>

                <PrimaryCTA href="/signup" className="w-full justify-center">
                  Apply Now <CheckCircle size={18} />
                </PrimaryCTA>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= TRUST SECTION ================= */}
        <section className="relative z-10 py-28 px-6 bg-gray-50 dark:bg-zinc-900">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Why Test Products with Cashog?
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-16">
              Safe, verified and rewarding experience.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              {
                icon: Star,
                title: "Premium Brands",
                desc: "Access high-quality products before public release.",
              },
              {
                icon: Gift,
                title: "Instant Rewards",
                desc: "Get paid immediately after completing approved tests.",
              },
              {
                icon: ShieldCheck,
                title: "Secure & Verified",
                desc: "All product tests are verified and secure.",
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div className="bg-white dark:bg-zinc-800 p-8 rounded-3xl shadow-lg text-center">
                  <item.icon className="w-9 h-9 mx-auto mb-5 text-yellow-500" />
                  <h3 className="text-xl font-semibold mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section className="relative z-10 max-w-6xl mx-auto px-6 py-28">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
              Everything you need to know about product testing.
            </p>
          </Reveal>

          <FAQ faqs={faqs} />
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="relative z-10 py-32 px-6 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold mb-10">
              Ready to Start Testing?
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <PrimaryCTA href="/signup">
              Join Cashog Now <Rocket size={20} />
            </PrimaryCTA>
          </Reveal>
        </section>

      </main>
    </>
  );
}
