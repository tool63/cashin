"use client";

import React from "react";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import Background from "@/components/Background";
import Reveal from "@/components/animations/Reveal";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import FAQ from "@/components/faq/FAQ";
import {
  ShoppingBag,
  Star,
  Users,
  TrendingUp,
  Gift,
  Package,
} from "lucide-react";

/* ================= EARNING TASKS (9) ================= */
const tasks = [
  { id: 1, name: "Install VPN App", category: "Security", reward: "$2", rating: 4.8 },
  { id: 2, name: "Play Mobile Game", category: "Gaming", reward: "$3", rating: 4.9 },
  { id: 3, name: "Complete Survey", category: "Survey", reward: "$1.5", rating: 4.7 },
  { id: 4, name: "Test Design Tool", category: "Design", reward: "$2.5", rating: 4.8 },
  { id: 5, name: "Watch Video Ads", category: "Ads", reward: "$1", rating: 4.6 },
  { id: 6, name: "Try AI Tool", category: "AI Tools", reward: "$3", rating: 4.9 },
  { id: 7, name: "Sign Up Offer", category: "Offers", reward: "$4", rating: 4.7 },
  { id: 8, name: "Complete Quiz", category: "Education", reward: "$2", rating: 4.8 },
  { id: 9, name: "Download App", category: "Apps", reward: "$2.5", rating: 4.6 },
];

/* ================= FAQ (7 QUESTIONS) ================= */
const faqs = [
  { q: "How do I earn rewards?", a: "Complete tasks and test offers to earn rewards." },
  { q: "When are rewards credited?", a: "Rewards are credited after task verification." },
  { q: "Can I withdraw earnings?", a: "Yes. After reaching minimum withdrawal limits." },
  { q: "Is this free to use?", a: "Yes. You can earn without any investment." },
  { q: "Do I need experience?", a: "No. Tasks are beginner-friendly." },
  { q: "How fast can I earn?", a: "Earnings depend on task completion speed." },
  { q: "Is payment secure?", a: "Yes. We use secure payment systems." },
];

/* ================= STATS ================= */
type Stat = {
  label: string;
  number: number;
  icon: React.ReactNode;
};

const stats: Stat[] = [
  { label: "Active Earners", number: 180000, icon: <Users className="w-6 h-6 text-green-400" /> },
  { label: "Tasks Completed", number: 950000, icon: <TrendingUp className="w-6 h-6 text-green-400" /> },
  { label: "Total Rewards Paid", number: 1200000, icon: <Gift className="w-6 h-6 text-green-400" /> },
  { label: "Available Tasks", number: 320, icon: <Package className="w-6 h-6 text-green-400" /> },
];

/* ================= COUNT UP ================= */
function CountUp({ end }: { end: number }) {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef<HTMLDivElement | null>(null);
  const hasAnimated = React.useRef(false);

  React.useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

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

          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <div ref={ref}>{count.toLocaleString()}</div>;
}

/* ================= CARD ANIMATION ================= */
const cardAnimation = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
  whileHover: { y: -4 },
};

/* ================= PAGE ================= */
export default function EarningPage() {
  return (
    <>
      <Meta
        title="Earn Rewards | Cashog"
        description="Complete tasks and earn real rewards."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        {/* HERO */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
          <Reveal>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              Earn Rewards by Completing Tasks
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-10">
              Join thousands of users earning rewards with simple tasks.
            </p>

            <PrimaryCTA href="/signup">Start Earning</PrimaryCTA>
          </Reveal>
        </section>

        {/* STATS */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 pb-24">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Platform Performance
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Real numbers from our growing earning community
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                {...cardAnimation}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-md"
              >
                <div className="flex justify-center mb-2">
                  {stat.icon}
                </div>

                <h3 className="text-sm uppercase tracking-wide text-gray-600 dark:text-gray-400">
                  {stat.label}
                </h3>

                <div className="text-3xl font-extrabold mt-2 text-green-500">
                  <CountUp end={stat.number} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TASK GRID */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Available Tasks
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Complete tasks and earn rewards instantly
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                {...cardAnimation}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-md flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3">
                  <ShoppingBag className="text-green-400 w-5 h-5" />
                  <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                    {task.category}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-2">
                  {task.name}
                </h3>

                <div className="flex mb-3">
                  {Array(Math.floor(task.rating))
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400" />
                    ))}
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <span className="text-green-500 font-bold text-lg">
                    Earn {task.reward}
                  </span>

                  <motion.a
                    href="/signup"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-yellow-400 to-green-400 text-black shadow-sm"
                  >
                    Start Task
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="relative z-10 max-w-4xl mx-auto px-4 py-20 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-300 mb-8">
              Everything you need to know about earning rewards
            </p>
          </Reveal>

          <FAQ faqs={faqs} />
        </section>

        {/* FINAL CTA */}
        <section className="relative z-10 text-center py-28">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              Start Earning Today
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-10">
              Join Cashog and complete tasks to earn real rewards.
            </p>

            <PrimaryCTA href="/signup">Join Now</PrimaryCTA>
          </Reveal>
        </section>
      </main>
    </>
  );
}
