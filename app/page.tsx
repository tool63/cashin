"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ShieldCheck, Wallet, Zap } from "lucide-react"
import Link from "next/link"

import LiveEarnings from "../components/LiveEarnings"
import LiveWithdrawals from "../components/LiveWithdrawals"
import LiveOfferCompletion from "../components/LiveOfferCompletion"
import { SectionTitle, Stat, Badge, Feature } from "../components/SmallComponents"

export default function Home() {
  const earningOptions = [
    ["🧠", "Surveys", "/surveys"],
    ["📱", "App Installs", "/app-installs"],
    ["🎮", "Playing Games", "/play-games"],
    ["📺", "Watching Videos", "/watch-videos"],
    ["⛏️", "Mining Rewards", "/mining-rewards"],
    ["✅", "Completing Offers", "/complete-offers"],
    ["🧩", "Offerwall", "/offerwall"],
    ["📋", "Surveywall", "/surveywall"],
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

      {/* ================= HERO ================= */}
      <HeroSection />

      {/* ================= LIVE SECTIONS ================= */}
      <LiveEarnings />
      <LiveOfferCompletion />
      <LiveWithdrawals />

      {/* ================= TRUST / STATS ================= */}
      <section className="py-16 bg-black/5 dark:bg-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Trusted by Millions Worldwide</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
            Cashog is one of the most trusted earning platforms, paying users daily
            across the globe with fast and secure withdrawals.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Stat title="Total Users" value="25M+" />
            <Stat title="Users Paid" value="3.2M+" />
            <Stat title="Total Payouts" value="$12M+" />
            <Stat title="Trust Rating" value="4.8 ★" />
          </div>
        </div>
      </section>

      {/* ================= PAYMENT METHODS ================= */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-4 text-white">
            Payment Methods
          </h2>
          <p className="text-gray-400 mb-14 max-w-2xl mx-auto">
            Fast, secure, and trusted payout options.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
            {[
              { name: "PayPal", emoji: "💸" },
              { name: "USDT", emoji: "🪙" },
              { name: "Bitcoin", emoji: "₿" },
              { name: "Gift Cards", emoji: "🎁" },
              { name: "Local Payouts", emoji: "🏦" },
            ].map((method) => (
              <div
                key={method.name}
                className="relative p-[1px] rounded-2xl bg-gradient-to-br from-emerald-500/60 via-cyan-500/40 to-purple-500/60"
              >
                <div className="rounded-2xl bg-gray-900 px-6 py-8 flex flex-col items-center justify-center hover:scale-105 transition">
                  <span className="text-4xl mb-3">{method.emoji}</span>
                  <span className="text-lg font-semibold text-white">
                    {method.name}
                  </span>
                  <span className="text-sm text-gray-400 mt-1">
                    Instant payout
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EARN MONEY TASKS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <SectionTitle icon="🎯" text="Earn Money Tasks" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {earningOptions.map(([icon, title, href]) => (
            <Link
              key={title}
              href={href}
              className="bg-white/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition"
            >
              <div className="text-4xl">{icon}</div>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                Earn by {title.toLowerCase()}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= FEATURE HIGHLIGHTS ================= */}
      <section className="py-20 bg-black/5 dark:bg-white/5">
        <SectionTitle icon="🌟" text="Why Choose Us" />
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <Feature icon={<Zap />} title="Instant Withdrawals" />
          <Feature icon={<ShieldCheck />} title="Secure & Trusted" />
          <Feature icon={<Wallet />} title="Multiple Payment Options" />
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-20 text-center">
        <h2 className="text-4xl font-bold mb-6 text-white">
          Start Earning Real Money Today!
        </h2>
        <p className="mb-8 text-lg text-gray-300">
          Join millions of users who are already earning daily.
        </p>
        <Link href="/signup">
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 px-10 py-4 rounded-xl font-semibold shadow-lg text-white"
          >
            Get Started Now <ArrowRight />
          </motion.span>
        </Link>
      </section>
    </main>
  )
}

/* ================= HERO SECTION ================= */
const HeroSection = () => {
  const phrases = ["Surveys", "App Installs", "Playing Games", "Watching Videos"]
  const [current, setCurrent] = useState(0)
  const [text, setText] = useState("")

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      const phrase = phrases[current]
      setText(phrase.slice(0, i + 1))
      i++
      if (i > phrase.length) {
        setTimeout(() => {
          setText("")
          setCurrent((prev) => (prev + 1) % phrases.length)
        }, 800)
        clearInterval(interval)
      }
    }, 90)
    return () => clearInterval(interval)
  }, [current])

  return (
    <section className="flex items-center justify-center min-h-[65vh] px-4 dark:bg-gray-900">
      <div className="max-w-4xl w-full text-center flex flex-col items-center gap-4">

        <h1 className="text-3xl md:text-5xl font-extrabold">
          Earn Real Money By
        </h1>

        {/* fixed height prevents shifting */}
        <div className="h-[48px] flex items-center justify-center">
          <span className="text-3xl md:text-5xl font-extrabold text-cyan-400">
            {text}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 max-w-2xl text-base md:text-lg">
          Complete offers, play games, answer surveys and cash out instantly.
          Trusted by millions worldwide.
        </p>

        <Link href="/signup">
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 px-8 md:px-10 py-3 md:py-4 rounded-xl font-semibold shadow-xl text-white"
          >
            Start Earning Now <ArrowRight />
          </motion.span>
        </Link>
      </div>
    </section>
  )
}
