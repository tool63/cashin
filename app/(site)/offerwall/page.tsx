"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SeoEngine from "@/components/seo/SeoEngine";
import { ClipboardList, Star, Gift, Trophy, User } from "lucide-react";

/* ================= OFFER TYPE ================= */
type Offer = {
  id: number;
  title: string;
  category: string;
  reward: string;
  popularity: number; // out of 100
};

/* ================= SAMPLE OFFER DATA ================= */
const offers: Offer[] = [
  { id: 1, title: "Install MegaApp", category: "App Install", reward: "$3", popularity: 90 },
  { id: 2, title: "Complete Quick Survey", category: "Survey", reward: "$2", popularity: 85 },
  { id: 3, title: "Watch Promo Video", category: "Video", reward: "$1", popularity: 70 },
  { id: 4, title: "Sign Up for Newsletter", category: "Signup", reward: "$2.5", popularity: 60 },
  { id: 5, title: "Download Game X", category: "App Install", reward: "$4", popularity: 95 },
  { id: 6, title: "Refer a Friend", category: "Referral", reward: "$5", popularity: 80 },
  { id: 7, title: "Complete Daily Task", category: "Task", reward: "$1.5", popularity: 75 },
];

/* ================= COUNT UP COMPONENT ================= */
function CountUp({ end }: { end: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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
          return () => clearInterval(counter);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <div ref={ref}>{count.toLocaleString()}</div>;
}

/* ================= STATS ================= */
const stats = [
  { label: "Total Offers", number: 3200 },
  { label: "Active Users", number: 15000 },
  { label: "Average Reward ($)", number: 3.7 },
];

/* ================= PAGE COMPONENT ================= */
export default function OfferWallPage() {
  return (
    <>
      <SeoEngine
        title="OfferWall | Cashog"
        description="Discover premium high-paying offers on Cashog. Complete tasks, surveys, app installs, and videos to earn instant rewards and cash."
      />

      <main className="bg-white dark:bg-[#070A14] text-gray-900 dark:text-white transition-colors duration-300">

        {/* ================= HERO ================= */}
        <section className="relative py-24 px-6 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/40 via-green-200/30 to-yellow-300/40 dark:from-yellow-900/20 dark:via-green-900/10 dark:to-yellow-800/20 blur-3xl" />

          <motion.div
            className="relative max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Explore the Cashog OfferWall
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8">
              Complete premium offers, tasks, surveys, and installs to earn cash and rewards instantly.
            </p>
            <motion.a
              href="/signup"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-14 py-5 rounded-2xl font-bold shadow-lg hover:scale-105 transition-transform duration-300 cta-observer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Start Earning Now <Trophy size={20} />
            </motion.a>
          </motion.div>
        </section>

        {/* ================= OFFERS GRID ================= */}
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Featured Offers
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {offers.map((offer) => (
              <motion.div
                key={offer.id}
                className="bg-white dark:bg-zinc-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <ClipboardList className="text-yellow-500 w-6 h-6" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">{offer.category}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{offer.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">Reward: {offer.reward}</p>
                  <div className="w-full bg-gray-200 dark:bg-zinc-700 h-2 rounded-full mt-2">
                    <div
                      className="bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${offer.popularity}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{offer.popularity}% Popularity</p>
                </div>
                <div className="flex justify-end mt-4">
                  <motion.a
                    href="/signup"
                    className="px-4 py-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black rounded-xl font-semibold shadow hover:scale-105 transition-transform duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Claim Offer
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="py-20 px-6 bg-gray-50 dark:bg-zinc-900">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            OfferWall Stats
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="p-8 bg-white dark:bg-zinc-800 rounded-3xl shadow-lg text-center hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <h3 className="text-4xl font-extrabold text-green-600">
                  <CountUp end={stat.number} />
                  {stat.label === "Average Reward ($)" && "$"}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section className="py-24 px-6 max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">How the OfferWall Works</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <motion.div
              className="bg-white dark:bg-zinc-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <User className="w-8 h-8 text-yellow-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create your Cashog account to access premium offers.
              </p>
            </motion.div>
            <motion.div
              className="bg-white dark:bg-zinc-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Star className="w-8 h-8 text-green-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Complete Offers</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Browse offers, complete tasks, installs, surveys, or videos.
              </p>
            </motion.div>
            <motion.div
              className="bg-white dark:bg-zinc-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Gift className="w-8 h-8 text-yellow-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Redeem Rewards</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Claim rewards instantly via PayPal, gift cards, or points.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="py-28 px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Ready to Explore the OfferWall & Earn Rewards?
          </h2>
          <motion.a
            href="/signup"
            className="cta-observer inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-xl hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Start Exploring Offers <Trophy size={20} />
          </motion.a>
        </section>

      </main>
    </>
  );
}
