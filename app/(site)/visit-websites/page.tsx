"use client";

import { motion } from "framer-motion";
import SeoEngine from "@/components/seo/SeoEngine";
import { Globe, CheckCircle, Star, Rocket, ShieldCheck } from "lucide-react";

type WebsiteOffer = {
  id: number;
  title: string;
  url: string;
  reward: string;
  category: string;
  popular?: boolean;
};

const websites: WebsiteOffer[] = [
  {
    id: 1,
    title: "Tech News Portal",
    url: "https://technews.com",
    reward: "$1.50",
    category: "News",
    popular: true,
  },
  {
    id: 2,
    title: "Fitness Blog Visit",
    url: "https://fitblog.com",
    reward: "$1.00",
    category: "Health",
  },
  {
    id: 3,
    title: "E-commerce Shop Demo",
    url: "https://shopdemo.com",
    reward: "$2.00",
    category: "Shopping",
  },
];

export default function VisitWebsitesPage() {
  return (
    <>
      <SeoEngine
        title="Visit Websites | Cashog"
        description="Visit websites, explore offers, and earn instant rewards. Premium, secure and modern browsing rewards experience."
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
              Visit Websites & Earn Rewards
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10">
              Explore websites, complete actions, and earn instant rewards with Cashog. Verified and secure offers.
            </p>

            <motion.a
              href="/signup"
              className="cta-observer inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-lg hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Start Visiting Websites <Rocket size={20} />
            </motion.a>
          </motion.div>
        </section>

        {/* ================= WEBSITE CARDS ================= */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Featured Website Offers
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {websites.map((site, i) => (
              <motion.div
                key={site.id}
                className={`relative bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border ${
                  site.popular
                    ? "border-green-400 scale-105"
                    : "border-gray-200 dark:border-zinc-800"
                } hover:shadow-2xl transition-all duration-300`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                {site.popular && (
                  <div className="absolute -top-4 right-6 bg-gradient-to-r from-yellow-400 to-green-500 text-black px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                    Most Popular
                  </div>
                )}

                <Globe className="w-8 h-8 text-yellow-500 mb-4" />

                <h3 className="text-xl font-semibold mb-2">{site.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Category: {site.category}
                </p>

                <div className="mb-6">
                  <p className="text-green-600 font-bold text-lg">Reward: {site.reward}</p>
                  <p className="text-sm text-gray-500">Visit: {site.url}</p>
                </div>

                <motion.a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-observer inline-flex w-full justify-center items-center gap-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-4 py-3 rounded-xl font-semibold shadow hover:scale-105 transition-transform duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  Visit Website <CheckCircle size={18} />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= TRUST SECTION ================= */}
        <section className="py-24 px-6 bg-gray-50 dark:bg-zinc-900 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-14">
            Why Visit Websites with Cashog?
          </h2>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              {
                icon: ShieldCheck,
                title: "Verified Websites",
                desc: "All website offers are safe, verified, and high-quality."
              },
              {
                icon: Star,
                title: "Premium Rewards",
                desc: "Earn instant rewards for visiting websites."
              },
              {
                icon: Globe,
                title: "Easy & Fast",
                desc: "Open websites and claim rewards quickly."
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
            Ready to Visit Websites & Earn Rewards?
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
