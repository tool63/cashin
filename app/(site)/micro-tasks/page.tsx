"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SeoEngine from "@/components/seo/SeoEngine";
import Background from "@/components/Background";
import TypingText from "@/components/typing/TypingText";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";
import FAQ from "@/components/faq/FAQ";
import {
  CheckCircle,
  ClipboardList,
  Gift,
  Star,
  User,
  Users,
} from "lucide-react";

/* ================= TASK TYPE ================= */
type Task = {
  id: number;
  title: string;
  category: string;
  reward: string;
  difficulty: string;
  completionRate: number;
};

/* ================= TASKS ================= */
const tasks: Task[] = [
  { id: 1, title: "Like & Follow Social Page", category: "Social", reward: "$0.30", difficulty: "Easy", completionRate: 95 },
  { id: 2, title: "Submit Email Signup", category: "Signup", reward: "$0.50", difficulty: "Easy", completionRate: 90 },
  { id: 3, title: "App Review Submission", category: "App", reward: "$0.75", difficulty: "Medium", completionRate: 80 },
  { id: 4, title: "Short Product Feedback", category: "Survey", reward: "$1.00", difficulty: "Medium", completionRate: 85 },
  { id: 5, title: "Download & Open App", category: "Install", reward: "$1.20", difficulty: "Easy", completionRate: 92 },
  { id: 6, title: "Data Entry Micro Job", category: "Task", reward: "$1.50", difficulty: "Hard", completionRate: 70 },
  { id: 7, title: "Watch Tutorial Video", category: "Education", reward: "$0.80", difficulty: "Easy", completionRate: 88 },
  { id: 8, title: "Share Feedback on Product", category: "Feedback", reward: "$1.10", difficulty: "Medium", completionRate: 84 },
  { id: 9, title: "Complete Quick Survey", category: "Survey", reward: "$0.90", difficulty: "Easy", completionRate: 93 },
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
  { label: "Available Micro Tasks", number: 5400, icon: <ClipboardList className="w-6 h-6 text-green-400" /> },
  { label: "Tasks Completed", number: 82000, icon: <CheckCircle className="w-6 h-6 text-green-400" /> },
  { label: "Active Workers", number: 15000, icon: <Users className="w-6 h-6 text-green-400" /> },
];

/* ================= FAQ ================= */
const faqs = [
  {
    q: "How do I start completing micro-tasks?",
    a: "Create a free account, browse available tasks, and start completing them instantly.",
  },
  {
    q: "When will I receive my rewards?",
    a: "Most rewards are credited instantly after successful task completion.",
  },
  {
    q: "Is there a minimum payout threshold?",
    a: "Yes, you can withdraw once you reach the minimum balance required for your selected payout method.",
  },
  {
    q: "Can I complete tasks from mobile?",
    a: "Absolutely! Our platform is fully optimized for mobile devices.",
  },
  {
    q: "Are micro-tasks available worldwide?",
    a: "Yes, users from most countries can access tasks, though availability may vary by region.",
  },
  {
    q: "Why are brands paying for these tasks?",
    a: "Companies pay for engagement, installs, signups, and feedback. We share that revenue with you.",
  },
];

/* ================= PAGE ================= */
export default function MicroTasksPage() {
  return (
    <>
      <SeoEngine
        title="Micro Tasks | Cashog"
        description="Complete micro-tasks on Cashog and earn instant rewards. Simple jobs, fast payouts, premium earning experience."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        {/* HERO */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
          <Reveal>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              Complete Micro-Tasks & Earn Instantly
            </h1>

            <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold gradient-text mb-6">
              <TypingText />
            </div>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-10">
              Simple tasks. Fast completion. Instant rewards. Experience premium micro-earning with Cashog.
            </p>

            <PrimaryCTA href="/signup">
              Start Completing Tasks
            </PrimaryCTA>
          </Reveal>
        </section>

        {/* TASK GRID */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Available Micro-Tasks
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Complete tasks and earn rewards
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-md flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <ClipboardList className="w-6 h-6 text-yellow-500" />
                  <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                    {task.difficulty}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-2">{task.title}</h3>

                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Category: {task.category}
                </p>

                <p className="font-bold text-green-500 mt-2">
                  Reward: {task.reward}
                </p>

                <div className="w-full bg-gray-200 dark:bg-zinc-700 h-2 rounded-full mt-4">
                  <div
                    className="bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 h-2 rounded-full"
                    style={{ width: `${task.completionRate}%` }}
                  />
                </div>

                <p className="text-xs text-gray-500 mt-1">
                  {task.completionRate}% Completion Rate
                </p>

                <motion.a
                  href="/signup"
                  whileHover={{ scale: 1.05 }}
                  className="mt-6 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-green-400 text-black px-4 py-3 rounded-xl font-semibold shadow"
                >
                  Complete Task <CheckCircle size={18} />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* STATS */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 pb-24">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Micro-Task Platform Stats
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Real numbers from our growing community
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
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

                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 pb-24">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              How Micro-Tasks Work
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Start earning in three simple steps
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: User, title: "Create Account", desc: "Sign up to access tasks instantly." },
              { icon: Star, title: "Complete Tasks", desc: "Finish jobs quickly with simple instructions." },
              { icon: Gift, title: "Earn Rewards", desc: "Get instant payouts via cash or gift cards." },
            ].map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-md"
              >
                <div className="flex justify-center mb-4">
                  <item.icon className="w-8 h-8 text-yellow-400" />
                </div>

                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 pb-24">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Everything you need to know about micro-tasks
            </p>
          </Reveal>

          <FAQ faqs={faqs} />
        </section>

        {/* FINAL CTA */}
        <section className="relative z-10 text-center py-28">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              Turn Micro-Tasks Into Real Rewards
            </h2>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed mb-10">
              Join Cashog today and start earning with every task you complete.
            </p>

            <PrimaryCTA href="/signup">
              Join Now
            </PrimaryCTA>
          </Reveal>
        </section>
      </main>
    </>
  );
}
