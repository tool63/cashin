"use client";

import React from "react";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";
import Background from "@/components/Background";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";
import {
  ClipboardList,
  Star,
  Trophy,
  User,
  TrendingUp,
  Gift,
} from "lucide-react";

/* ================= OFFERS ================= */
const apps = [
  {
    id: 1,
    name: "Photo Editor Pro",
    category: "Utilities",
    reward: "$2",
    rating: 4.8,
    installs: "500K+",
    description: "Edit photos with professional tools and effects.",
  },
  {
    id: 2,
    name: "Fitness Tracker",
    category: "Health",
    reward: "$3",
    rating: 4.7,
    installs: "350K+",
    description: "Track workouts and improve your health.",
  },
  {
    id: 3,
    name: "Language Learner",
    category: "Education",
    reward: "$2",
    rating: 4.6,
    installs: "200K+",
    description: "Learn new languages with interactive lessons.",
  },
  {
    id: 4,
    name: "Crypto Wallet",
    category: "Finance",
    reward: "$4",
    rating: 4.9,
    installs: "600K+",
    description: "Securely store and manage your crypto assets.",
  },
];

/* ================= EXPANDABLE CARD ================= */
function ExpandableCard({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  return (
    <motion.div
      onClick={() => setOpen(!open)}
      className="cursor-pointer overflow-hidden rounded-2xl"
      animate={{ height: open ? "auto" : "140px" }}
      transition={{ duration: 0.25 }}
    >
      {children}

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-sm text-gray-600 dark:text-gray-300"
        >
          Click card again to collapse.
        </motion.div>
      )}
    </motion.div>
  );
}

/* ================= STATS ================= */
const stats = [
  {
    label: "Total Installs",
    number: 1200000,
    icon: <Trophy className="w-6 h-6 text-yellow-400" />,
    description: "Total successful app installs on the platform.",
  },
  {
    label: "Active Users",
    number: 350000,
    icon: <User className="w-6 h-6 text-green-400" />,
    description: "Users actively earning rewards daily.",
  },
  {
    label: "Avg Reward",
    number: 3,
    icon: <TrendingUp className="w-6 h-6 text-blue-400" />,
    description: "Average reward per completed task.",
  },
];

/* ================= PAGE ================= */
export default function AppInstallPage() {
  return (
    <>
      <Meta
        title="Install Apps & Earn | Cashog"
        description="Install apps and earn rewards instantly with Cashog."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        <section className="relative z-10 max-w-7xl mx-auto px-4 py-20">

          {/* HERO */}
          <Reveal>
            <div className="text-center mb-20">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                Install Apps & Earn Rewards
              </h1>

              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold gradient-text mb-6">
                <TypingText />
              </div>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed mb-10">
                Install premium apps and complete actions to earn real rewards instantly.
              </p>

              <PrimaryCTA href="/signup">Start Earning</PrimaryCTA>
            </div>
          </Reveal>

          {/* OFFERS GRID (Expandable) */}
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Featured Offers
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Install apps and complete tasks to earn
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3 mb-24">
            {apps.map((app) => (
              <Reveal key={app.id}>
                <ExpandableCard>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-md"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <ClipboardList className="text-green-400 w-5 h-5" />
                      <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                        {app.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold mb-2">{app.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Installs: {app.installs}
                    </p>

                    <div className="flex justify-center mt-2">
                      {Array(Math.floor(app.rating))
                        .fill(0)
                        .map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400" />
                        ))}
                    </div>

                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                      {app.description}
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-green-500 font-bold">{app.reward}</span>

                      <motion.a
                        href="/signup"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-yellow-400 to-green-400 text-black shadow-sm hover:shadow-md"
                      >
                        Install Now
                      </motion.a>
                    </div>
                  </motion.div>
                </ExpandableCard>
              </Reveal>
            ))}
          </div>

          {/* STATS (Expandable) */}
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Platform Performance
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Real numbers from our growing community
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3 mb-24">
            {stats.map((stat) => (
              <ExpandableCard key={stat.label}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-md"
                >
                  <div className="flex justify-center mb-2">{stat.icon}</div>
                  <h3 className="text-sm uppercase tracking-wide text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </h3>
                  <div className="text-3xl font-extrabold mt-2">
                    {stat.number.toLocaleString()}
                  </div>

                  <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                    {stat.description}
                  </div>
                </motion.div>
              </ExpandableCard>
            ))}
          </div>

          {/* HOW IT WORKS (Expandable) */}
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              How It Works
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Start earning in three simple steps
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3 mb-24">
            {[
              {
                icon: <User className="w-8 h-8 text-yellow-400" />,
                title: "Sign Up",
                desc: "Create your free account.",
              },
              {
                icon: <ClipboardList className="w-8 h-8 text-green-400" />,
                title: "Install Apps",
                desc: "Download apps and complete tasks.",
              },
              {
                icon: <Gift className="w-8 h-8 text-yellow-400" />,
                title: "Withdraw",
                desc: "Redeem your earnings instantly.",
              },
            ].map((step) => (
              <ExpandableCard key={step.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-md"
                >
                  <div className="flex justify-center items-center mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                    {step.desc}
                  </p>
                </motion.div>
              </ExpandableCard>
            ))}
          </div>

          {/* FINAL CTA */}
          <Reveal>
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                Ready to Start Earning?
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed mb-10">
                Join Cashog today and unlock unlimited earning opportunities.
              </p>
              <PrimaryCTA href="/signup">Join Now</PrimaryCTA>
            </div>
          </Reveal>

        </section>
      </main>
    </>
  );
}
