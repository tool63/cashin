"use client";

import { motion } from "framer-motion";
import SeoEngine from "@/components/seo/SeoEngine";
import Background from "@/components/Background";
import Reveal from "@/components/animations/Reveal";
import TypingText from "@/components/typing/TypingText";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import FAQ from "@/components/faq/FAQ";
import {
  CheckCircle,
  ClipboardList,
  Star,
  ShieldCheck,
  Trophy,
} from "lucide-react";

type TaskReview = {
  id: number;
  title: string;
  category: string;
  reward: string;
  difficulty: string;
  completionRate: number;
  popular?: boolean;
};

/* ================= 9 TASK OFFERS ================= */
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
  {
    id: 4,
    title: "Gaming Experience Feedback",
    category: "Gaming",
    reward: "$1.30",
    difficulty: "Easy",
    completionRate: 88,
  },
  {
    id: 5,
    title: "E-commerce Shopping Review",
    category: "Shopping",
    reward: "$2.10",
    difficulty: "Medium",
    completionRate: 80,
  },
  {
    id: 6,
    title: "Health & Fitness App Review",
    category: "Health",
    reward: "$1.80",
    difficulty: "Medium",
    completionRate: 75,
  },
  {
    id: 7,
    title: "Social Media Experience Survey",
    category: "Social",
    reward: "$1.20",
    difficulty: "Easy",
    completionRate: 92,
  },
  {
    id: 8,
    title: "Tech Product Usability Review",
    category: "Tech",
    reward: "$2.50",
    difficulty: "Hard",
    completionRate: 68,
  },
  {
    id: 9,
    title: "Short Feedback Submission",
    category: "Feedback",
    reward: "$1.10",
    difficulty: "Easy",
    completionRate: 95,
  },
];

/* ================= FAQ (5-7 QUESTIONS) ================= */
const faqs = [
  { q: "Is it free to complete review tasks?", a: "Yes. All tasks are free and reward-based." },
  { q: "How fast are payouts?", a: "Most payouts are instant or processed within hours." },
  { q: "Are tasks safe and verified?", a: "Yes. All tasks are verified and secure." },
  { q: "Can I use mobile?", a: "Yes. The platform works perfectly on mobile devices." },
  { q: "How much can I earn?", a: "Earnings vary per task and activity level." },
  { q: "Do I need experience?", a: "No. Anyone can complete tasks and earn rewards." },
];

export default function ReviewTasksPage() {
  return (
    <>
      <SeoEngine
        title="Review Tasks | Cashog"
        description="Review tasks, submit feedback, and earn instant rewards. Modern and premium experience."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        {/* ================= HERO WITH TYPING TEXT ================= */}
        <section className="relative z-10 py-28 px-6 text-center">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Review Tasks & Earn Rewards
            </h1>

            <div className="text-2xl md:text-3xl font-bold gradient-text mb-6">
              <TypingText />
            </div>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
              Complete reviews for apps, products, and websites. Submit feedback
              and earn instant rewards with Cashog.
            </p>

            <PrimaryCTA href="/signup">
              Start Reviewing Tasks <Trophy size={20} />
            </PrimaryCTA>
          </Reveal>
        </section>

        {/* ================= TASK REVIEW CARDS ================= */}
        <section className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Available Tasks for Review
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-14">
              Complete reviews and earn rewards
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {tasks.map((task, i) => (
              <motion.div
                key={task.id}
                whileHover={{ y: -4 }}
                className={`relative bg-white dark:bg-[#0a0d16] rounded-2xl p-6 border shadow-md flex flex-col ${
                  task.popular
                    ? "border-green-400"
                    : "border-gray-200 dark:border-gray-800"
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                {task.popular && (
                  <div className="absolute -top-3 right-4 bg-gradient-to-r from-yellow-400 to-green-500 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg">
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
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-6 inline-flex w-full justify-center items-center gap-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-4 py-3 rounded-xl font-semibold shadow"
                >
                  Review Task <CheckCircle size={18} />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= TRUST SECTION ================= */}
        <section className="relative z-10 max-w-6xl mx-auto px-6 py-24">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Why Review Tasks with Cashog
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-14">
              Secure, verified, and rewarding review experience
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: "Verified Tasks", desc: "All tasks are safe and verified." },
              { icon: Star, title: "High Rewards", desc: "Earn premium rewards for completing tasks." },
              { icon: ClipboardList, title: "Quick & Easy", desc: "Submit reviews and claim rewards instantly." },
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
              Everything you need to know about earning with tasks
            </p>
          </Reveal>

          <FAQ faqs={faqs} />
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="relative z-10 py-28 px-6 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Turn Reviews Into Real Rewards
            </h2>

            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-10">
              Join Cashog today and start earning by completing review tasks.
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
