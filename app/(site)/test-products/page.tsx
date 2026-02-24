"use client";

import React from "react";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import Background from "@/components/Background";
import Reveal from "@/components/animations/Reveal";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import FAQ from "@/components/faq/FAQ";
import {
  ShoppingBag,
  Star,
  Users,
  TrendingUp,
  Gift,
  Package,
} from "lucide-react";

/* ================= PRODUCTS (9) ================= */
const products = [
  { id: 1, name: "Premium VPN Access", category: "Security", price: 5, rating: 4.8 },
  { id: 2, name: "Gaming Gift Card", category: "Gaming", price: 10, rating: 4.9 },
  { id: 3, name: "E-Book: Growth Hacking", category: "Business", price: 3, rating: 4.7 },
  { id: 4, name: "Pro Design Assets", category: "Design", price: 8, rating: 4.8 },
  { id: 5, name: "Stock Photos Pack", category: "Media", price: 6, rating: 4.6 },
  { id: 6, name: "AI Writing Credits", category: "AI Tools", price: 4, rating: 4.9 },
  { id: 7, name: "Crypto Trading Course", category: "Finance", price: 12, rating: 4.7 },
  { id: 8, name: "Advanced SEO Toolkit", category: "Marketing", price: 9, rating: 4.8 },
  { id: 9, name: "Premium Notion Templates", category: "Productivity", price: 7, rating: 4.6 },
];

/* ================= FAQ (9 QUESTIONS) ================= */
const faqs = [
  { q: "Are these digital products?", a: "Yes. All products are delivered digitally." },
  { q: "Is payment secure?", a: "Yes. We use encrypted secure payment systems." },
  { q: "Can I request a refund?", a: "Refund policies depend on the specific product." },
  { q: "How will I receive my product?", a: "After purchase, you will receive instant access via your dashboard." },
  { q: "Do products expire?", a: "Most products offer lifetime access unless stated otherwise." },
  { q: "Can I resell these products?", a: "No. Products are licensed for personal use only." },
  { q: "Are updates included?", a: "Yes. Many products include free future updates." },
  { q: "Do you offer customer support?", a: "Yes. Our support team is available 24/7." },
  { q: "Can I earn rewards for purchases?", a: "Yes. Selected products may offer cashback or reward points." },
];

/* ================= STATS ================= */
type Stat = {
  label: string;
  number: number;
  icon: React.ReactNode;
};

const stats: Stat[] = [
  { label: "Active Buyers", number: 180000, icon: <Users className="w-6 h-6 text-green-400" /> },
  { label: "Products Sold", number: 950000, icon: <TrendingUp className="w-6 h-6 text-green-400" /> },
  { label: "Total Revenue", number: 1200000, icon: <Gift className="w-6 h-6 text-green-400" /> },
  { label: "Total Products", number: 320, icon: <Package className="w-6 h-6 text-green-400" /> },
];

/* ================= COUNT UP ================= */
function CountUp({ end }: { end: number }) {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef<HTMLDivElement | null>(null);
  const hasAnimated = React.useRef(false);

  React.useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          let start = 0;
          const duration = 2000;
          const increment = end / (duration / 16);

          const counter = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(counter);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);

          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <div ref={ref}>{count.toLocaleString()}</div>;
}

/* ================= CARD ANIMATION ================= */
const cardAnimation = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
  whileHover: { y: -4 },
};

/* ================= PAGE ================= */
export default function ProductsPage() {
  return (
    <>
      <Meta
        title="Products | Cashog"
        description="Browse premium digital products and earn rewards."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        {/* HERO */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
          <Reveal>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              Discover Premium Digital Products
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-10">
              Boost your productivity with high-quality tools and resources.
            </p>

            <PrimaryCTA href="/signup">Get Started</PrimaryCTA>
          </Reveal>
        </section>

        {/* STATS */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 pb-24">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Marketplace Performance
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Real numbers from our growing marketplace
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                {...cardAnimation}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-md"
              >
                <div className="flex justify-center mb-2">
                  {stat.icon}
                </div>

                <h3 className="text-sm uppercase tracking-wide text-gray-600 dark:text-gray-400">
                  {stat.label}
                </h3>

                <div className="text-3xl font-extrabold mt-2 text-green-500">
                  <CountUp end={stat.number} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PRODUCTS GRID */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Featured Products
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Hand-picked premium items
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {products.map((product) => (
              <motion.div
                key={product.id}
                {...cardAnimation}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-md flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3">
                  <ShoppingBag className="text-green-400 w-5 h-5" />
                  <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                    {product.category}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-2">
                  {product.name}
                </h3>

                <div className="flex mb-3">
                  {Array(Math.floor(product.rating))
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400" />
                    ))}
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <span className="text-green-500 font-bold text-lg">
                    ${product.price}
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

        {/* FAQ */}
        <section className="relative z-10 max-w-4xl mx-auto px-4 py-20 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-300 mb-8">
              Everything you need to know before purchasing
            </p>
          </Reveal>

          <FAQ faqs={faqs} />
        </section>

        {/* FINAL CTA */}
        <section className="relative z-10 text-center py-28">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              Start Shopping Today
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-10">
              Join Cashog and access premium digital products instantly.
            </p>

            <PrimaryCTA href="/signup">Join Now</PrimaryCTA>
          </Reveal>
        </section>
      </main>
    </>
  );
}
