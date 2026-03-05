import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Heart, Sparkles, Star, Percent } from "lucide-react";
import { buildSEO, SEOOutput } from "@/components/SEO/seoEngine";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";
import SeoRenderer from "@/components/SEO/SeoRenderer";
import TypingText from "@/components/typing/TypingText";

/* =========================
   Dynamic Metadata (Server-Side)
========================= */
export async function generateMetadata() {
  try {
    const seo: SEOOutput = await buildSEO({
      route: "/shopping-rewards/beauty",
      locale: SEO_CONFIG.defaultLocale,
    });

    return {
      ...seo.metadata,
      alternates: {
        canonical: seo.canonical,
        languages: seo.hreflang,
      },
      robots: seo.metadata?.robots,
    };
  } catch (error) {
    console.error("Metadata generation failed:", error);

    return {
      title: SEO_CONFIG.defaultTitle,
      description: SEO_CONFIG.defaultDescription,
    };
  }
}

/* ================= ANIMATION ================= */
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/* ================= BEAUTY OFFERS ================= */
const beautyOffers = [
  {
    id: 1,
    title: "Skincare Cashback",
    reward: "Up to 15% Back",
    badge: "Top",
    icon: <Sparkles size={30} className="text-pink-400" />,
  },
  {
    id: 2,
    title: "Makeup Deals",
    reward: "Up to 12% Cashback",
    badge: "Popular",
    icon: <Heart size={30} className="text-red-400" />,
  },
  {
    id: 3,
    title: "Luxury Beauty Bonus",
    reward: "₹500 Extra",
    badge: "Exclusive",
    icon: <Star size={30} className="text-yellow-400" />,
  },
  {
    id: 4,
    title: "Personal Care Essentials",
    reward: "Flat 10% Back",
    badge: "Bonus",
    icon: <Percent size={30} className="text-teal-400" />,
  },
];

export default function BeautyRewards() {
  return (
    <>
      <SeoRenderer seo={null} />

      <main className="bg-white dark:bg-[#070F12] text-gray-900 dark:text-white min-h-screen transition-colors duration-300">
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="py-24 px-4 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4"
            >
              Beauty & Personal Care Rewards
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-red-400"
            >
              <TypingText
                words={[
                  "Cashback on Skincare & Makeup",
                  "Exclusive Luxury Beauty Deals",
                  "Daily Rewards on Personal Care",
                  "Shop Smart, Earn Premium Cashback",
                ]}
              />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 dark:text-gray-400"
            >
              Discover cashback offers on beauty products and earn rewards daily.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-10">
              <Link href="/signup" className="cta-observer inline-block">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-400 via-purple-400 to-red-400 text-black px-12 py-5 rounded-2xl font-bold shadow-xl"
                >
                  Start Earning Now <ArrowRight size={20} />
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* OFFERS GRID */}
        <section className="max-w-7xl mx-auto px-4 py-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {beautyOffers.map((offer, i) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative bg-gray-100 dark:bg-[#162125] rounded-3xl p-8 shadow-md hover:shadow-2xl"
            >
              <div className="absolute top-4 right-4 text-xs font-bold bg-pink-400 text-black px-3 py-1 rounded-full">
                {offer.badge}
              </div>

              <div className="mb-6">{offer.icon}</div>

              <h3 className="text-xl font-semibold mb-3">{offer.title}</h3>

              <p className="text-lg font-bold text-pink-500 mb-6">{offer.reward}</p>

              <Link href="/signup" className="cta-observer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-pink-400 via-purple-400 to-red-400 text-black py-3 rounded-xl font-semibold shadow-lg"
                >
                  Claim Cashback
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </section>

        {/* FINAL CTA */}
        <section className="text-center py-28">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-red-400">
            Turn Beauty Shopping Into Real Rewards
          </h2>

          <Link href="/signup" className="cta-observer">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-400 via-purple-400 to-red-400 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-xl"
            >
              Join & Start Earning <ArrowRight size={20} />
            </motion.span>
          </Link>
        </section>
      </main>
    </>
  );
}
