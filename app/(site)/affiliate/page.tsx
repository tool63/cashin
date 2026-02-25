Here is the complete and updated code for your `app-installs/page.tsx`:

```tsx
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  ChevronDown,
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
    label: "Avg Reward ($)",
    number: 3,
    icon: <TrendingUp className="w-6 h-6 text-blue-400" />,
    description: "Average reward per completed task.",
  },
];

/* ================= EXPANDABLE CARD ================= */
function ExpandableCard({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  return (
    <motion.div
      layout
      onClick={() => setOpen(!open)}
      className="cursor-pointer"
      transition={{ layout: { duration: 0.35, type: "spring" } }}
    >
      <motion.div
        layout
        className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${
          open ? "shadow-xl" : "shadow-md"
        }`}
      >
        {/* Chevron Indicator */}
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-4 right-4 text-gray-400"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>

        {children}

        <AnimatePresence>
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-4 text-sm text-gray-600 dark:text-gray-300 px-6 pb-6"
            >
              Click card again to collapse.
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

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

          {/* OFFERS SECTION */}
          <Reveal>
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                Featured Offers
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
                Install apps and complete tasks to earn
              </p>
            </>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3 mb-24">
            {apps.map((app) => (
              <Reveal key={app.id}>
                <ExpandableCard>
                  <motion.div
                    layout
                    whileHover={{ y: -4 }}
                    className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800"
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
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-yellow-400 to-green-400 text-black"
                      >
                        Install Now
                      </motion.a>
                    </div>
                  </motion.div>
                </ExpandableCard>
              </Reveal>
            ))}
          </div>

          {/* STATS SECTION */}
          <Reveal>
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              
                Platform Performance
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
                Real numbers from our growing community
              </p>
            </>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3 mb-24">
            {stats.map((stat) => (
              <Reveal key={stat.label}>
                <ExpandableCard>
                  <motion.div
                    layout
                    whileHover={{ y: -4 }}
                    className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800"
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
              </Reveal>
            ))}
          </div>

          {/* HOW IT WORKS */}
          <Reveal>
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                How It Works
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
                Start earning in three simple steps
              </p>
           
          <div className="grid gap-6 md:grid-cols-3 mb-24">
            <Reveal>
              <motion.div
                layout
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800"
              >
                <div className="text-4xl mb-4">
                  <Gift className="text-yellow-400 w-8 h-8 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Install Apps</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Install any of our featured apps and start earning rewards.
                </p>
              </motion.div>
            </Reveal>

            <Reveal>
              <motion.div
                layout
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800"
              >
                <div className="text-4xl mb-4">
                  <ClipboardList className="text-green-400 w-8 h-8 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Complete Tasks</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Complete simple tasks within the app to earn rewards.
                </p>
              </motion.div>
            </Reveal>

            <Reveal>
              <motion.div
                layout
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800"
              >
                <div className="text-4xl mb-4">
                  <Trophy className="text-blue-400 w-8 h-8 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Rewards</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Redeem your rewards or cash out your earnings.
                </p>
              </motion.div>
            </Reveal>
          </div>

          {/* FOOTER */}
          <div className="py-20 bg-gray-100 dark:bg-[#111315]">
            <div className="max-w-7xl mx-auto text-center">
              <p className="text-base text-gray-600 dark:text-gray-300">
                © 2026 Cashog. All rights reserved.
              </p>
              <div className="mt-4 flex justify-center space-x-8">
                <a
                  href="/terms"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                >
                  Terms of Service
                </a>
                <a
                  href="/privacy"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                >
                  Privacy Policy
                </a>
                <a
                  href="/contact"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
