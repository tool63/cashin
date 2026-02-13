"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SeoEngine from "@/components/seo/SeoEngine";
import { Eye, Download, Star, User, Gift, ClipboardList } from "lucide-react";

type AppInstall = {
  id: number;
  name: string;
  category: string;
  reward: string;
  rating: number;
  downloads: string;
};

const apps: AppInstall[] = [
  { id: 1, name: "TaskMaster Pro", category: "Productivity", reward: "$2", rating: 4.8, downloads: "100K+" },
  { id: 2, name: "FitLife Tracker", category: "Health & Fitness", reward: "$3", rating: 4.6, downloads: "250K+" },
  { id: 3, name: "GameZone 3D", category: "Gaming", reward: "$4", rating: 4.9, downloads: "500K+" },
  { id: 4, name: "Travel Buddy", category: "Travel", reward: "$3", rating: 4.7, downloads: "150K+" },
  { id: 5, name: "SnapShop Deals", category: "Shopping", reward: "$2", rating: 4.5, downloads: "200K+" },
  { id: 6, name: "MindCalm Meditation", category: "Health & Wellness", reward: "$3", rating: 4.8, downloads: "300K+" },
];

/* ================= COUNT UP ================= */
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

/* ================= STAR RATING ================= */
function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex justify-center items-center mt-1">
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <Star key={`full-${i}`} className="w-5 h-5 text-yellow-400 animate-pulse" />
        ))}
      {halfStar && <Star key="half" className="w-5 h-5 text-yellow-400 opacity-50 animate-pulse" />}
      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300 dark:text-gray-600" />
        ))}
    </div>
  );
}

/* ================= STATS ================= */
const stats = [
  { label: "Apps Installed", number: 320000 },
  { label: "Satisfied Users", number: 125000 },
  { label: "Average Reward ($)", number: 3.5 },
];

/* ================= PAGE ================= */
export default function AppInstallsPage() {
  return (
    <>
      <SeoEngine
        title="App Installs | Cashog"
        description="Install apps, try new products, and earn instant rewards with Cashog. Fast payouts for every app install."
      />

      <main className="bg-white dark:bg-[#070A14] text-gray-900 dark:text-white transition-colors duration-300">

        {/* ================= HERO ================= */}
        <section className="relative py-24 px-6 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-100/30 via-yellow-100/20 to-green-200/30 dark:from-green-900/20 dark:via-yellow-900/10 dark:to-green-800/20 blur-3xl" />

          <motion.div
            className="relative max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Earn Rewards by Installing Apps
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8">
              Try new apps, complete simple tasks, and earn real money instantly. Apps hand-picked for maximum rewards.
            </p>
            <motion.a
              href="/signup"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-14 py-5 rounded-2xl font-bold shadow-lg hover:scale-105 transition-transform duration-300 cta-observer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Get Started <Download size={20} />
            </motion.a>
          </motion.div>
        </section>

        {/* ================= FEATURED APPS ================= */}
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Top Earning Apps
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {apps.map((app) => (
              <motion.div
                key={app.id}
                className="bg-white dark:bg-zinc-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <ClipboardList className="text-green-500 w-6 h-6" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">{app.category}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{app.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-1">Reward: {app.reward}</p>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">Downloads: {app.downloads}</p>
                  <StarRating rating={app.rating} />
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-green-600 font-bold">{app.reward}</span>
                  <motion.a
                    href="/signup"
                    className="px-4 py-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black rounded-xl font-semibold shadow hover:scale-105 transition-transform duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Install Now
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="py-20 px-6 bg-gray-50 dark:bg-zinc-900">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Our Platform Performance
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
          <h2 className="text-3xl md:text-4xl font-bold mb-12">How It Works</h2>
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
                Create a free account and access all app rewards.
              </p>
            </motion.div>
            <motion.div
              className="bg-white dark:bg-zinc-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <ClipboardList className="w-8 h-8 text-green-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Install Apps</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Download apps and try features to earn rewards.
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
              <h3 className="text-xl font-semibold mb-2">Earn Rewards</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Redeem rewards instantly via PayPal or gift cards.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="py-28 px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Ready to Install Apps & Earn?
          </h2>
          <motion.a
            href="/signup"
            className="cta-observer inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-xl hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Start Installing Apps <Download size={20} />
          </motion.a>
        </section>
      </main>
    </>
  );
}
