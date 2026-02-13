"use client";

import { motion } from "framer-motion";
import SeoEngine from "@/components/seo/SeoEngine";
import { CheckCircle, ClipboardList, Star, ShieldCheck, Trophy } from "lucide-react";

type TaskReview = {
  id: number;
  title: string;
  category: string;
  reward: string;
  difficulty: string;
  completionRate: number;
  popular?: boolean;
};

const tasks: TaskReview[] = [
  {
    id: 1,
    title: "App Feedback Submission",
    category: "App",
    reward: "$1.50",
    difficulty: "Medium",
    completionRate: 85,
    popular: true,
  },
  {
    id: 2,
    title: "Website UX Survey",
    category: "Survey",
    reward: "$1.00",
    difficulty: "Easy",
    completionRate: 90,
  },
  {
    id: 3,
    title: "Short Product Review",
    category: "Review",
    reward: "$2.00",
    difficulty: "Hard",
    completionRate: 70,
  },
];

export default function ReviewTasksPage() {
  return (
    <>
      <SeoEngine
        title="Review Tasks | Cashog"
        description="Review tasks, submit feedback, and earn instant rewards. Modern, secure and premium experience."
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
              Review Tasks & Earn Rewards
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10">
              Complete reviews for apps, products, and websites. Submit your feedback and earn instantly with Cashog.
            </p>

            <motion.a
              href="/signup"
              className="cta-observer inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-lg hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Start Reviewing Tasks <Trophy size={20} />
            </motion.a>
          </motion.div>
        </section>

        {/* ================= TASK REVIEW CARDS ================= */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Available Tasks for Review
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {tasks.map((task, i) => (
              <motion.div
                key={task.id}
                className={`relative bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border ${
                  task.popular
                    ? "border-green-400 scale-105"
                    : "border-gray-200 dark:border-zinc-800"
                } hover:shadow-2xl transition-all duration-300`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                {task.popular && (
                  <div className="absolute -top-4 right-6 bg-gradient-to-r from-yellow-400 to-green-500 text-black px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                    Most Popular
                  </div>
                )}

                <ClipboardList className="w-8 h-8 text-yellow-500 mb-4" />

                <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  Category: {task.category}
                </p>

                <p className="text-green-600 font-bold mb-2">Reward: {task.reward}</p>

                <div className="w-full bg-gray-200 dark:bg-zinc-700 h-2 rounded-full mb-2">
                  <div
                    className="bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 h-2 rounded-full"
                    style={{ width: `${task.completionRate}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  {task.completionRate}% Completion Rate
                </p>

                <motion.a
                  href="/signup"
                  className="cta-observer mt-6 inline-flex w-full justify-center items-center gap-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-4 py-3 rounded-xl font-semibold shadow hover:scale-105 transition-transform duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  Review Task <CheckCircle size={18} />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= TRUST SECTION ================= */}
        <section className="py-24 px-6 bg-gray-50 dark:bg-zinc-900 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-14">
            Why Review Tasks with Cashog?
          </h2>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              {
                icon: ShieldCheck,
                title: "Verified Tasks",
                desc: "All review tasks are secure and verified for instant rewards."
              },
              {
                icon: Star,
                title: "High Rewards",
                desc: "Earn premium rewards for completing reviews."
              },
              {
                icon: ClipboardList,
                title: "Easy & Quick",
                desc: "Submit reviews quickly and claim rewards instantly."
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
            Ready to Review Tasks & Earn Rewards?
          </h2>

          <motion.a
            href="/signup"
            className="cta-observer inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-xl hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Join Cashog Now <Trophy size={20} />
          </motion.a>
        </section>

      </main>
    </>
  );
}
