"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SeoEngine from "@/components/seo/SeoEngine";
import { ClipboardList, Star, Gift, Trophy, User } from "lucide-react";

/* ================= SURVEY TYPE ================= */
type Survey = {
  id: number;
  title: string;
  category: string;
  reward: string;
  popularity: number; // out of 100
};

/* ================= SAMPLE SURVEY DATA ================= */
const surveys: Survey[] = [
  { id: 1, title: "Customer Satisfaction Survey", category: "Marketing", reward: "$2", popularity: 95 },
  { id: 2, title: "Product Feedback Survey", category: "Product", reward: "$3", popularity: 90 },
  { id: 3, title: "App Experience Survey", category: "Tech", reward: "$1.5", popularity: 80 },
  { id: 4, title: "Website Feedback Survey", category: "UX", reward: "$2.5", popularity: 85 },
  { id: 5, title: "Brand Awareness Survey", category: "Marketing", reward: "$2", popularity: 88 },
  { id: 6, title: "Employee Satisfaction Survey", category: "HR", reward: "$3.5", popularity: 70 },
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
  { label: "Total Surveys", number: 1200 },
  { label: "Active Users", number: 15000 },
  { label: "Average Reward ($)", number: 2.8 },
];

/* ================= PAGE COMPONENT ================= */
export default function SurveyWallPage() {
  return (
    <>
      <SeoEngine
        title="SurveyWall | Cashog"
        description="Complete premium surveys on Cashog SurveyWall. Earn rewards and cash instantly by sharing your opinions."
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
              Discover Cashog SurveyWall
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8">
              Complete premium surveys and share your opinions to earn cash and rewards instantly.
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

        {/* ================= SURVEYS GRID ================= */}
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Featured Surveys
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {surveys.map((survey) => (
              <motion.div
                key={survey.id}
                className="bg-white dark:bg-zinc-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <ClipboardList className="text-yellow-500 w-6 h-6" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">{survey.category}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{survey.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">Reward: {survey.reward}</p>
                  <div className="w-full bg-gray-200 dark:bg-zinc-700 h-2 rounded-full mt-2">
                    <div
                      className="bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${survey.popularity}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{survey.popularity}% Popularity</p>
                </div>
                <div className="flex justify-end mt-4">
                  <motion.a
                    href="/signup"
                    className="px-4 py-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black rounded-xl font-semibold shadow hover:scale-105 transition-transform duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Claim Survey
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="py-20 px-6 bg-gray-50 dark:bg-zinc-900">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            SurveyWall Stats
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
          <h2 className="text-3xl md:text-4xl font-bold mb-12">How the SurveyWall Works</h2>
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
                Create your Cashog account to access premium surveys.
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
              <h3 className="text-xl font-semibold mb-2">Complete Surveys</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Browse and complete surveys to earn cash and points instantly.
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
              <h3 className="text-xl font-semibold mb-2">Claim Rewards</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Redeem rewards instantly via PayPal, gift cards, or points.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="py-28 px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Ready to Start Completing Surveys & Earning Rewards?
          </h2>
          <motion.a
            href="/signup"
            className="cta-observer inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-xl hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Start Completing Surveys <Trophy size={20} />
          </motion.a>
        </section>

      </main>
    </>
  );
}
