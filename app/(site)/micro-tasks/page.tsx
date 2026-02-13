"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SeoEngine from "@/components/seo/SeoEngine";
import { CheckCircle, ClipboardList, Gift, Star, Trophy, User } from "lucide-react";

/* ================= TASK TYPE ================= */
type Task = {
  id: number;
  title: string;
  category: string;
  reward: string;
  difficulty: string;
  completionRate: number;
};

/* ================= SAMPLE DATA ================= */
const tasks: Task[] = [
  { id: 1, title: "Like & Follow Social Page", category: "Social", reward: "$0.30", difficulty: "Easy", completionRate: 95 },
  { id: 2, title: "Submit Email Signup", category: "Signup", reward: "$0.50", difficulty: "Easy", completionRate: 90 },
  { id: 3, title: "App Review Submission", category: "App", reward: "$0.75", difficulty: "Medium", completionRate: 80 },
  { id: 4, title: "Short Product Feedback", category: "Survey", reward: "$1.00", difficulty: "Medium", completionRate: 85 },
  { id: 5, title: "Download & Open App", category: "Install", reward: "$1.20", difficulty: "Easy", completionRate: 92 },
  { id: 6, title: "Data Entry Micro Job", category: "Task", reward: "$1.50", difficulty: "Hard", completionRate: 70 },
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

/* ================= STATS ================= */
const stats = [
  { label: "Available Micro Tasks", number: 5400 },
  { label: "Tasks Completed", number: 82000 },
  { label: "Active Workers", number: 15000 },
];

/* ================= PAGE ================= */
export default function MicroTasksPage() {
  return (
    <>
      <SeoEngine
        title="Micro Tasks | Cashog"
        description="Complete micro-tasks on Cashog and earn instant rewards. Simple jobs, fast payouts, premium earning experience."
      />

      <main className="bg-white dark:bg-[#070A14] text-gray-900 dark:text-white transition-colors duration-300">

        {/* ================= HERO ================= */}
        <section className="relative py-24 px-6 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/40 via-green-200/30 to-yellow-300/40 dark:from-yellow-900/20 dark:via-green-900/10 dark:to-yellow-800/20 blur-3xl" />

          <motion.div
            className="relative max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              Complete Micro-Tasks & Earn Instantly
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10">
              Simple tasks. Fast completion. Instant rewards. Experience premium micro-earning with Cashog.
            </p>

            <motion.a
              href="/signup"
              className="cta-observer inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-lg hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Start Completing Tasks <Trophy size={20} />
            </motion.a>
          </motion.div>
        </section>

        {/* ================= TASK GRID ================= */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
            Available Micro-Tasks
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                className="bg-white dark:bg-zinc-800 p-7 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between border border-transparent hover:border-green-400/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <ClipboardList className="w-6 h-6 text-yellow-500" />
                    <span className="text-xs px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-medium">
                      {task.difficulty}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                    Category: {task.category}
                  </p>
                  <p className="font-bold text-green-600 mb-4">
                    Reward: {task.reward}
                  </p>

                  <div className="w-full bg-gray-200 dark:bg-zinc-700 h-2 rounded-full">
                    <div
                      className="bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 h-2 rounded-full"
                      style={{ width: `${task.completionRate}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {task.completionRate}% Completion Rate
                  </p>
                </div>

                <motion.a
                  href="/signup"
                  className="mt-6 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-4 py-3 rounded-xl font-semibold shadow hover:scale-105 transition-transform duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  Complete Task <CheckCircle size={18} />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="py-20 px-6 bg-gray-50 dark:bg-zinc-900">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
            Micro-Task Platform Stats
          </h2>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="bg-white dark:bg-zinc-800 p-10 rounded-3xl shadow-lg text-center hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <h3 className="text-4xl font-extrabold text-green-600">
                  <CountUp end={stat.number} />
                </h3>
                <p className="mt-3 text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section className="py-24 px-6 max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-14">
            How Micro-Tasks Work
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: User, title: "Create Account", desc: "Sign up to access premium micro-tasks instantly." },
              { icon: Star, title: "Complete Tasks", desc: "Finish simple jobs quickly with guided instructions." },
              { icon: Gift, title: "Earn Rewards", desc: "Get instant payouts via cash, gift cards or points." }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white dark:bg-zinc-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
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
            Ready to Complete Micro-Tasks & Start Earning?
          </h2>

          <motion.a
            href="/signup"
            className="cta-observer inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-xl hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Start Now <Trophy size={20} />
          </motion.a>
        </section>

      </main>
    </>
  );
}
