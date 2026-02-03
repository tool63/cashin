"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Brain, Gamepad2, Gift } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12 },
  }),
}

export default function HomeHero() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <motion.div
              initial="hidden"
              animate="show"
              className="space-y-8"
            >
              <motion.h1
                variants={fadeUp}
                custom={1}
                className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight"
              >
                Earn Real Money
                <span className="block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  Playing Games & Apps
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-lg text-gray-600 dark:text-gray-300 max-w-xl"
              >
                Complete offers, play games, answer surveys and cash out instantly.
                Trusted by millions worldwide.
              </motion.p>

              <motion.div
                variants={fadeUp}
                custom={3}
                className="flex gap-4"
              >
                <Link href="/start-earning">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3 rounded-xl font-semibold shadow-xl text-white"
                  >
                    Start Earning
                    <ArrowRight />
                  </motion.button>
                </Link>

                <Link href="/how-it-works">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    className="px-6 py-3 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition"
                  >
                    How It Works
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right placeholder */}
            <div className="hidden lg:block" />
          </div>
        </div>
      </section>

      {/* ================= OFFER CARDS ================= */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <OfferCard
              icon={<Brain />}
              title="Surveys"
              desc="Share your opinion and earn instantly"
            />
            <OfferCard
              icon={<Gamepad2 />}
              title="Play Games"
              desc="Play & reach levels to earn"
            />
            <OfferCard
              icon={<Gift />}
              title="Offerwall"
              desc="Complete offers from partners"
            />
          </div>
        </div>
      </section>

      {/* ================= LIVE EARNINGS (SEPARATE) ================= */}
      <section className="py-24 bg-gray-50 dark:bg-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-10 text-center">
            Live Earnings
          </h2>

          <div className="space-y-4">
            {[
              ["User #1200", "$2.45"],
              ["User #1201", "$6.10"],
              ["User #1202", "$12.00"],
            ].map(([user, amount]) => (
              <div
                key={user}
                className="flex justify-between items-center bg-white dark:bg-black/30 rounded-xl px-6 py-4 shadow-sm"
              >
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {user}
                </span>
                <span className="font-semibold text-green-500">
                  {amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function OfferCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <div className="rounded-2xl border border-black/5 dark:border-white/10 p-6 hover:shadow-lg transition">
      <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
    </div>
  )
}
