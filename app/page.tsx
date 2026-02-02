"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
}

export default function Home() {
  return (
    <main className="bg-white text-gray-900 dark:bg-black dark:text-white overflow-hidden transition-colors duration-300">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-cyan-500/20 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14">
          {/* LEFT */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-5xl md:text-6xl font-extrabold leading-tight"
            >
              Earn Real Money
              <span className="block bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
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
              className="flex gap-4 pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3 rounded-xl font-semibold text-white shadow-xl"
              >
                Start Earning
                <ArrowRight className="group-hover:translate-x-1 transition" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                className="px-6 py-3 rounded-xl border border-gray-300 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition"
              >
                How It Works
              </motion.button>
            </motion.div>

            {/* STATS */}
            <motion.div
              variants={fadeUp}
              custom={4}
              className="flex gap-10 pt-8"
            >
              {[
                ["$50M+", "Paid Out"],
                ["17M+", "Users"],
                ["260K+", "Reviews"],
              ].map(([value, label]) => (
                <div key={label}>
                  <div className="text-3xl font-bold text-emerald-500">
                    {value}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT CARD */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Live Earnings
              </p>

              <div className="space-y-3">
                {["$2.45", "$6.10", "$12.00"].map((amt, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="flex justify-between bg-black/10 dark:bg-black/40 rounded-lg px-4 py-3"
                  >
                    <span>User #{1200 + i}</span>
                    <span className="text-emerald-500 font-semibold">
                      {amt}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* OFFER CARDS */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {[
            ["🎮", "Games", "Play & earn real cash"],
            ["📱", "Apps", "Install & complete tasks"],
            ["🧠", "Surveys", "Answer & get paid"],
          ].map(([icon, title, desc], i) => (
            <motion.div
              key={title}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -6 }}
              className="group bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6 hover:bg-black/10 dark:hover:bg-white/10 transition"
            >
              <div className="text-4xl">{icon}</div>
              <h3 className="mt-4 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  )
}
