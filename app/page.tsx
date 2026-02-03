"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

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
  const earningOptions = [
    ["🧠", "Surveys", "/surveys"],        // Survey card first
    ["📱", "App Installs", "/app-installs"],
    ["🎮", "Playing Games", "/play-games"],
    ["📺", "Watching Videos", "/watch-videos"],
    ["⛏️", "Mining Rewards", "/mining-rewards"],
    ["✅", "Completing Offers", "/complete-offers"],
    ["🧩", "Offerwall", "/offerwall"],    // Offerwall stays in original position
    ["📋", "Surveywall", "/surveywall"],  // Surveywall moved below Offerwall
    ["🎬", "Watching Ads", "/watch-ads"],
    ["🛠️", "Micro Tasks", "/micro-tasks"],
    ["🎁", "Free Trials", "/complete-free-trials"],
    ["🧪", "Testing Products", "/test-products"],
    ["📧", "Reading Emails", "/read-emails"],
    ["🌐", "Visiting Websites", "/visit-websites"],
    ["⭐", "Review Tasks", "/review-tasks"],
    ["🎡", "Spinning Wheel", "/spinning-wheel"],
    ["🏆", "Loyalty", "/loyalty"],
    ["💳", "Vouchers", "/vouchers"],
  ]

  return (
    <main className="transition-colors duration-300">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-cyan-500/20 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 text-gray-900 dark:text-gray-100">
          <motion.div initial="hidden" animate="visible" className="space-y-6">
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight"
            >
              Earn Real Money  
              <span className="block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Playing Games & Apps
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl"
            >
              Complete offers, play games, answer surveys and cash out instantly.
              Trusted by millions worldwide.
            </motion.p>

            {/* UPDATED: Buttons as Links */}
            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/start-earning" passHref>
                <motion.a
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="group flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3 rounded-xl font-semibold shadow-xl text-white"
                >
                  Start Earning
                  <ArrowRight className="group-hover:translate-x-1 transition" />
                </motion.a>
              </Link>

              <Link href="/how-it-works" passHref>
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  className="flex justify-center px-6 py-3 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition text-gray-900 dark:text-gray-100"
                >
                  How It Works
                </motion.a>
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT – LIVE CARD */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }} className="relative">
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className="relative bg-white/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Live Earnings</p>

              <div className="space-y-3">
                {["$2.45", "$6.10", "$12.00"].map((amt, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.02 }} className="flex justify-between bg-black/10 dark:bg-white/5 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100">
                    <span>User #{1200 + i}</span>
                    <span className="text-emerald-400 font-semibold">{amt}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* OFFER CARDS */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-gray-900 dark:text-gray-100">
        {earningOptions.map(([icon, title, href]) => (
          <Link
            key={title}
            href={href}
            className="group bg-white/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl p-6 transition flex flex-col items-center text-center hover:scale-105 transform"
          >
            <div className="text-4xl">{icon}</div>
            <h3 className="mt-4 text-xl font-semibold">{title}</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {title === "Surveys" ? "Answer & get paid" :
               title === "Surveywall" ? "Complete multiple surveys" :
               `Earn by ${title.toLowerCase()}`}
            </p>
          </Link>
        ))}
      </section>
    </main>
  )
}
