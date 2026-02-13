"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SeoEngine from "@/components/seo/SeoEngine";
import { Video, Star, Gift, User, ClipboardList, Trophy } from "lucide-react";

/* ================= VIDEO TYPE ================= */
type VideoItem = {
  id: number;
  title: string;
  category: string;
  reward: string;
  rating: number;
  views: string;
};

/* ================= SAMPLE VIDEO DATA ================= */
const videos: VideoItem[] = [
  { id: 1, title: "Crypto Insights", category: "Finance", reward: "$2", rating: 4.8, views: "50K+" },
  { id: 2, title: "Brain Training", category: "Education", reward: "$1.5", rating: 4.7, views: "75K+" },
  { id: 3, title: "Action Highlights", category: "Entertainment", reward: "$3", rating: 4.9, views: "120K+" },
  { id: 4, title: "Daily Motivation", category: "Lifestyle", reward: "$2", rating: 4.6, views: "40K+" },
  { id: 5, title: "Puzzle Tutorials", category: "Puzzle", reward: "$1.8", rating: 4.8, views: "60K+" },
  { id: 6, title: "Tech Reviews", category: "Tech", reward: "$2.5", rating: 4.7, views: "55K+" },
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
  { label: "Videos Watched", number: 400000 },
  { label: "Happy Viewers", number: 180000 },
  { label: "Average Reward ($)", number: 2.3 },
];

/* ================= PAGE COMPONENT ================= */
export default function WatchVideosPage() {
  return (
    <>
      <SeoEngine
        title="Watch Videos & Earn | Cashog"
        description="Watch fun and educational videos online and earn instant rewards with Cashog. Join thousands of viewers and start earning today."
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
              Watch Videos & Earn Rewards
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8">
              Enjoy curated videos, learn, get entertained, and earn real cash instantly.
            </p>
            <motion.a
              href="/signup"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-14 py-5 rounded-2xl font-bold shadow-lg hover:scale-105 transition-transform duration-300 cta-observer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Start Watching <Video size={20} />
            </motion.a>
          </motion.div>
        </section>

        {/* ================= FEATURED VIDEOS ================= */}
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Top Rewarding Videos
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {videos.map((video) => (
              <motion.div
                key={video.id}
                className="bg-white dark:bg-zinc-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <ClipboardList className="text-yellow-500 w-6 h-6" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">{video.category}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{video.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-1">Reward: {video.reward}</p>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">Views: {video.views}</p>
                  <StarRating rating={video.rating} />
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-green-600 font-bold">{video.reward}</span>
                  <motion.a
                    href="/signup"
                    className="px-4 py-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black rounded-xl font-semibold shadow hover:scale-105 transition-transform duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Watch Now
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="py-20 px-6 bg-gray-50 dark:bg-zinc-900">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Platform Performance
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
                Create your free Cashog account to start watching videos.
              </p>
            </motion.div>
            <motion.div
              className="bg-white dark:bg-zinc-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Trophy className="w-8 h-8 text-green-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Watch Videos</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Watch engaging videos selected for rewards and entertainment.
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
                Redeem rewards instantly via PayPal, gift cards, or points.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="py-28 px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Ready to Watch & Earn Now?
          </h2>
          <motion.a
            href="/signup"
            className="cta-observer inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-xl hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Start Watching Videos <Video size={20} />
          </motion.a>
        </section>
      </main>
    </>
  );
}
