"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SeoEngine from "@/components/seo/SeoEngine";
import Background from "@/components/Background";
import Reveal from "@/components/animations/Reveal";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import FAQ from "@/components/faq/FAQ";
import { Globe, CheckCircle, Star, Rocket, ShieldCheck, Users, DollarSign, TrendingUp } from "lucide-react";

/* ================= COUNT UP ================= */
function CountUp({ end }: { end: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let counter: NodeJS.Timeout | null = null;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const duration = 2000;
        const increment = end / (duration / 16);

        counter = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            if (counter) clearInterval(counter);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
      } else {
        if (counter) {
          clearInterval(counter);
          counter = null;
        }
      }
    }, { threshold: 0.3 });

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (counter) clearInterval(counter);
    };
  }, [end]);

  return <div ref={ref}>{count.toLocaleString()}</div>;
}

/* ================= WEBSITE OFFER TYPE ================= */
type WebsiteOffer = {
  id: number;
  title: string;
  url: string;
  reward: string;
  category: string;
  popular?: boolean;
};

/* ================= 9 WEBSITE OFFERS ================= */
const websites: WebsiteOffer[] = [
  { id: 1, title: "Tech News Portal", url: "https://technews.com", reward: "$1.50", category: "News", popular: true },
  { id: 2, title: "Fitness Blog Visit", url: "https://fitblog.com", reward: "$1.00", category: "Health" },
  { id: 3, title: "E-commerce Shop Demo", url: "https://shopdemo.com", reward: "$2.00", category: "Shopping" },
  { id: 4, title: "Business Insights", url: "https://businessinsights.com", reward: "$1.80", category: "Business" },
  { id: 5, title: "Learning Platform Trial", url: "https://learnplatform.com", reward: "$2.20", category: "Education" },
  { id: 6, title: "Gaming Portal Visit", url: "https://gamingportal.com", reward: "$1.40", category: "Gaming" },
  { id: 7, title: "Travel Deals Site", url: "https://traveldeals.com", reward: "$2.50", category: "Travel", popular: true },
  { id: 8, title: "Crypto Insights", url: "https://cryptonews.com", reward: "$1.70", category: "Finance" },
  { id: 9, title: "Lifestyle Blog", url: "https://lifestyleblog.com", reward: "$1.20", category: "Lifestyle" },
];

/* ================= STATS ================= */
const stats = [
  { label: "Website Offers", number: 950, icon: <Globe className="w-6 h-6 text-green-400" /> },
  { label: "Active Users", number: 18000, icon: <Users className="w-6 h-6 text-green-400" /> },
  { label: "Average Reward ($)", number: 1.9, icon: <DollarSign className="w-6 h-6 text-green-400" /> },
  { label: "Sites Visited", number: 920000, icon: <TrendingUp className="w-6 h-6 text-green-400" /> },
];

/* ================= FAQ ================= */
const faqs = [
  { q: "Is it free to visit websites?", a: "Yes. Visiting websites and earning rewards is free." },
  { q: "How fast are payouts?", a: "Most payouts are instant or processed within hours." },
  { q: "Are websites safe?", a: "All website offers are verified and safe for users." },
  { q: "Can I use mobile?", a: "Yes. The platform is fully mobile optimized." },
  { q: "How much can I earn?", a: "Earnings vary per website offer and activity." },
  { q: "Do I need experience?", a: "No. Anyone can visit websites and earn rewards." },
];

export default function VisitWebsitesPage() {
  return (
    <>
      <SeoEngine
        title="Visit Websites | Cashog"
        description="Visit websites, explore offers, and earn instant rewards. Secure and modern browsing rewards experience."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        {/* ================= HERO ================= */}
        <section className="relative z-10 py-28 px-6 text-center">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Visit Websites & Earn Rewards
            </h1>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
              Explore websites, complete actions, and earn instant rewards with Cashog.
              Verified and secure browsing offers.
            </p>

            <PrimaryCTA href="/signup">
              Start Visiting Websites
            </PrimaryCTA>
          </Reveal>
        </section>

        {/* ================= STATS ================= */}
        <section className="relative z-10 py-24 px-6 max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Website Activity Stats
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Real numbers from our growing community
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-md"
              >
                <div className="flex justify-center mb-2">{stat.icon}</div>

                <h3 className="text-3xl font-extrabold text-green-500">
                  <CountUp end={stat.number} />
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= WEBSITE CARDS ================= */}
        <section className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Featured Website Offers
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-14">
              Visit websites and claim rewards
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {websites.map((site, i) => (
              <motion.div
                key={site.id}
                whileHover={{ y: -4 }}
                className={`relative bg-white dark:bg-[#0a0d16] rounded-2xl p-6 border shadow-md flex flex-col ${
                  site.popular
                    ? "border-green-400"
                    : "border-gray-200 dark:border-gray-800"
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                {site.popular && (
                  <div className="absolute -top-3 right-4 bg-gradient-to-r from-yellow-400 to-green-500 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg">
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
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-auto inline-flex w-full justify-center items-center gap-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-4 py-3 rounded-xl font-semibold shadow"
                >
                  Visit Website <CheckCircle size={18} />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= TRUST SECTION ================= */}
        <section className="relative z-10 max-w-6xl mx-auto px-6 py-24">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Why Visit Websites with Cashog
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-14">
              Secure, verified, and rewarding browsing experience
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: "Verified Websites", desc: "All website offers are safe and verified." },
              { icon: Star, title: "Premium Rewards", desc: "Earn rewards for visiting websites." },
              { icon: Globe, title: "Easy & Fast", desc: "Open sites and claim rewards instantly." },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-800"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <item.icon className="w-8 h-8 mx-auto mb-4 text-yellow-500" />
                <h3 className="text-xl font-semibold mb-2 text-center">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-300 mb-8">
              Everything you need to know about earning with websites
            </p>
          </Reveal>

          <FAQ faqs={faqs} />
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="relative z-10 py-28 px-6 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Turn Website Visits Into Real Rewards
            </h2>

            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-10">
              Join Cashog today and start earning by exploring and visiting websites.
            </p>

            <PrimaryCTA href="/signup">
              Join Cashog Now
            </PrimaryCTA>
          </Reveal>
        </section>
      </main>
    </>
  );
}
